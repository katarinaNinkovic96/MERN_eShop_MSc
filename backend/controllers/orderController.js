import asyncHandler from 'express-async-handler';
//import { restart } from 'nodemon';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';

import dotenv from 'dotenv';
dotenv.config();

import sgMail from '@sendgrid/mail'; // SENDGRID_API_KEY
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const CLIENT_URL = (process.env.NODE_ENV === 'development') ? process.env.CLIENT_URL_DEV : process.env.CLIENT_URL_PROD;

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
    const { 
        orderItems, 
        shippingAddress, 
        paymentMethod, 
        itemsPrice, 
        taxPrice, 
        shippingPrice,
        totalPrice 
    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error ('No order items')
    }
    const order = new Order ({
        orderItems,
        //user because is private- protected with id
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    });

    if (!order) {
        res.status(401);
        throw new Error("Can't create order");
    }

    // iterate through all items and take them from the stock
    for (let i=0; i<order.orderItems.length; i++) {
        const item = order.orderItems[i];
        const productId = item.product.toString().replace(/ObjectId\("(.*)"\)/, "$1");
        const product = await Product.findById(productId);
        if (product) {
            product.countInStock -= item.qty;
            await product.save();
        }
    }

    const createdOrder = await order.save();

    const orderId = createdOrder._id.toString().replace(/ObjectId\("(.*)"\)/, "$1");
    const emailData = {
        to: req.user.email,
        from: `${process.env.SENDGRID_SENDER_MAIL}`,
        subject: `Order ${orderId} created`,
        html: `
            <p>Follow order status <a href="${CLIENT_URL}/order/${orderId}">here</a></p>
            <hr/>
            <p>This email may contain sensetive information</p>
            <p>${CLIENT_URL}</p>
        `
    };

    sgMail
        .send(emailData)
        .then(() => {
            return res.status(201).json({message: `Order ${orderId} created`});
        })
        .catch((errorMessage) => {
            console.error("error occured on sgMail send: ", errorMessage);
            res.status(401);
            throw new Error(`Failed to send account activation e-mail.\n${errorMessage}`);
        });
});

// @desc    Delete a order
// @route   DELETE /api/orders/:id
// @access  Private
const deleteOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    // check is order or user missing
    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    } else if (!req.user) {
        res.status(404);
        throw new Error('User not found');
    }
    const id1 = req.user._id.toString().replace(/ObjectId\("(.*)"\)/, "$1");
    const id2 = order.user.toString().replace(/ObjectId\("(.*)"\)/, "$1");

    // check is user authorized to delete/cancel order or is order already paid
    if (id1 !== id2 && !req.user.isAdmin) {
        res.status(401);
        throw new Error("User not authorized to delete order");
    } else if (order.isPaid) {
        res.status(401);
        throw new Error("Order can't be removed because customer has already paid");
    }

    // iterate through all items and give them back to the stock before delete
    for (let i=0; i<order.orderItems.length; i++) {
        const item = order.orderItems[i];
        const productId = item.product.toString().replace(/ObjectId\("(.*)"\)/, "$1");
        const product = await Product.findById(productId);
        if (product) {
            product.countInStock += item.qty;
            await product.save();
        }
    }

    // make sure to send email to owner of order, not to admin
    let email;
    const orderOwnerId = order.user.toString().replace(/ObjectId\("(.*)"\)/, "$1");
    if (orderOwnerId === req.user._id) {
        email = req.user.email;
    } else {
        const orderOwner = await User.findById(orderOwnerId);
        email = orderOwner.email;
    }

    const orderId = order._id.toString().replace(/ObjectId\("(.*)"\)/, "$1");
    const emailData = {
        to: email,
        from: `${process.env.SENDGRID_SENDER_MAIL}`,
        subject: `Order ${orderId} cancelled`,
        html: `
            <p>We're sorry to hear that your order has been cancelled.</p>
            <hr/>
            <p>This email may contain sensetive information</p>
            <p>${CLIENT_URL}</p>
        `
    };

    // remove order
    await order.remove();
    sgMail
        .send(emailData)
        .then(() => {
            return res.json({ message: 'Order removed'});
        })
        .catch((errorMessage) => {
            console.error("error occured on sgMail send: ", errorMessage);
            res.status(401);
            throw new Error(`Failed to send account activation e-mail.\n${errorMessage}`);
        });
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderByID = asyncHandler(async (req, res) => {
    //we have id by URL - req.params.id
    //we also want to get the user's name and email that's associated with this order .populate('from user', 'fields we want')
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    //we have id by URL - req.params.id
    const order = await Order.findById(req.params.id)
    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }
    order.isPaid = true;
    order.paidAt = Date.now();

    //paymentResult - come from PayPal
    order.paymentResult = {
        //going to come from the PayPal response
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address
    }

    const emailData = {
        to: req.user.email,
        from: `${process.env.SENDGRID_SENDER_MAIL}`,
        subject: `Order ${req.params.id} succesfully paid`,
        html: `
            <p>We're happy to inform you that order is succesfully paid.</p>
            <p>You'll soon be informed by admin when product will be delivered.</p>
            <br/>
            <p>Follow order status <a href="${CLIENT_URL}/order/${req.params.id}">here</a></p>
            <hr/>
            <p>This email may contain sensetive information</p>
            <p>${CLIENT_URL}</p>
        `
    };

    //stuff in order - we want to save it in the database
    const updatedOrder = await order.save();
    sgMail
        .send(emailData)
        .then(() => {
            return res.json(updatedOrder);
        })
        .catch((errorMessage) => {
            console.error("error occured on sgMail send: ", errorMessage);
            res.status(401);
            throw new Error(`Failed to send account activation e-mail.\n${errorMessage}`);
        });
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    //we have id by URL - req.params.id
    const order = await Order.findById(req.params.id)

    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    // make sure to send email to owner of order, not to admin
    const orderOwnerId = order.user.toString().replace(/ObjectId\("(.*)"\)/, "$1");
    const orderOwner = await User.findById(orderOwnerId);

    const emailData = {
        to: orderOwner.email,
        from: `${process.env.SENDGRID_SENDER_MAIL}`,
        subject: `Order ${req.params.id} delivered`,
        html: `
            <p>Just disclaimer that order has been succesfully delivered.</p>
            <p>Enjoy your new stuff :)</p>
            <hr/>
            <p>This email may contain sensetive information</p>
            <p>${CLIENT_URL}</p>
        `
    };

    //stuff in order - we want to save it in the database
    const updatedOrder = await order.save();
    sgMail
        .send(emailData)
        .then(() => {
            return res.json(updatedOrder);
        })
        .catch((errorMessage) => {
            console.error("error occured on sgMail send: ", errorMessage);
            res.status(401);
            throw new Error(`Failed to send account activation e-mail.\n${errorMessage}`);
        });
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    //we want to set orders to our model (Order model) and we want to use find (not find by index) because we're getting
        //more than one, and pass in an object (want to find orders where the user is equal to the req.user._id - only the
            //logged in user )
    const orders = await Order.find({ user: req.user._id }) 
    res.json(orders);
    
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    //we want to set orders to our model (Order model) 
    //populate - from the user i want to get the ID and the name
    const orders = await Order.find({}).populate('user', 'id name'); 
    res.json(orders);
    
});

export { createOrder, deleteOrder, getOrderByID, updateOrderToPaid, updateOrderToDelivered, getMyOrders, getOrders }
