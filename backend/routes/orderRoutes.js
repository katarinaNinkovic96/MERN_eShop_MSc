import express from 'express'
const router = express.Router()
import {
    addOrderItems,
    deleteOrder,
    getOrderByID,
    updateOrderToPaid,
    updateOrderToDelivered,
    getMyOrders,
    getOrders
} from '../controllers/orderController.js'
import { tokenMiddleware, adminMiddleware } from '../middleware/authMiddleware.js'

//all the functionality will go in the controller
//Controller with all the functions and Routes just have the root and point to the specific controller functions

router.route('/')
    .post(tokenMiddleware, addOrderItems)
    .get(tokenMiddleware, adminMiddleware, getOrders);

router.route('/myorders').get(tokenMiddleware, getMyOrders);

router.route('/:id')
    .get(tokenMiddleware, getOrderByID)
    .delete(tokenMiddleware, deleteOrder);

router.route('/:id/pay').put(tokenMiddleware, updateOrderToPaid);
router.route('/:id/deliver').put(tokenMiddleware, adminMiddleware, updateOrderToDelivered);

export default router;

//after we bring this use routs into the server
