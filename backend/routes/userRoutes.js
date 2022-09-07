import express from 'express'
const router = express.Router()
import { authUser, registerUser, getUserProfile, updateUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

//all the functionality will go in the controller
//Controller with all the functions and Routes just have the root and point to the specific controller functions

//we only going to have a post req to users login because we use router.post
//we use '/login' because this is going to be hooked to /api/users
//rouut post 'login' and then we call authUser
router.post('/login', authUser)

router.route('/').post(registerUser)

//we use router.route because we will be making more - making a GET req and a put req to update the user profile
//getUserProfile I want to protect and this method that runs, so to implement middleware (put it as a first argument)
router
    .route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

export default router

//after we bring this use routs into the server
