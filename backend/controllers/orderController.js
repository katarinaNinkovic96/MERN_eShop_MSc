import asyncHandler from 'express-async-handler';
//import { restart } from 'nodemon';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
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
    res.status(201).json(createdOrder);
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

    // remove order
    await order.remove();
    res.json({ message: 'Order removed'});
})

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
    if (order) {
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

        //stuff in order - we want to save it in the database
        const updatedOrder = await order.save()
        res.json(updatedOrder);
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    //we have id by URL - req.params.id
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        //stuff in order - we want to save it in the database
        const updatedOrder = await order.save()
        res.json(updatedOrder);
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
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

export { addOrderItems, deleteOrder, getOrderByID, updateOrderToPaid, updateOrderToDelivered, getMyOrders, getOrders }
