import express from 'express'
const router = express.Router()
import { addOrderItems, getOrderByID, updateOrderToPaid } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

//all the functionality will go in the controller
//Controller with all the functions and Routes just have the root and point to the specific controller functions

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderByID);
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router

//after we bring this use routs into the server
