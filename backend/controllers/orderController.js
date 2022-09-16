import asyncHandler from 'express-async-handler'
//import { restart } from 'nodemon'
import Order from '../models/orderModel.js'

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
    } else {
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
        })

        const createdOrder = await order.save()
        res.status(201).json(createdOrder);
    }
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

export { addOrderItems, getOrderByID, updateOrderToPaid, getMyOrders }
