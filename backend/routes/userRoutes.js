import express from 'express'
const router = express.Router();

import { authUser, forgotPassword, resetPassword, registerUser, preRegisterUser, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser, deactivateUser, reActivateUser } from '../controllers/userController.js'
import { tokenMiddleware, adminMiddleware } from '../middleware/authMiddleware.js'

//all the functionality will go in the controller
//Controller with all the functions and Routes just have the root and point to the specific controller functions

router.route('/').get(tokenMiddleware, adminMiddleware, getUsers);

//we only going to have a post req to users login because we use router.post
//we use '/login' because this is going to be hooked to /api/users
//route post 'login' and then we call authUser
router.post('/login', authUser);
router.post('/pre-register', preRegisterUser);
router.post('/register', registerUser);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password', resetPassword);

//we use router.route because we will be making more - making a GET req and a put req to update the user profile
//getUserProfile I want to token and this method that runs, so to implement middleware (put it as a first argument)
router.route('/profile')
    .get(tokenMiddleware, getUserProfile)
    .put(tokenMiddleware, updateUserProfile);

router.route('/:id')
    .delete(tokenMiddleware, adminMiddleware, deleteUser)
    .get(tokenMiddleware, adminMiddleware, getUserById)
    .put(tokenMiddleware, adminMiddleware, updateUser);

router.route('/:id/deactivate').post(tokenMiddleware, adminMiddleware, deactivateUser);
router.route('/:id/re-activate').post(tokenMiddleware, adminMiddleware, reActivateUser);

export default router;

//after we bring this use routs into the server
