import express from 'express'
const router = express.Router()
import { getProductById, getProducts, deleteProduct } from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

//all the functionality will go in the controller
//Controller with all the functions and Routes just have the root and point to the specific controller functions

//router.get('/', getProducts) - it can be like this, but we will work:
//route.route and for / will handle a 'get request' and call getProducts
router.route('/').get(getProducts);



//same for ID
//route.get('/:id', getProductById) - it can be like this, but we will work:
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct);

export default router
