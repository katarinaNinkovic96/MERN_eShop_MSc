import express from 'express'
const router = express.Router()
import { addOrderItems, getOrderByID } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

//all the functionality will go in the controller
//Controller with all the functions and Routes just have the root and point to the specific controller functions

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderByID);

export default router

//after we bring this use routs into the server
