import express from 'express'
const router = express.Router()
import { authUser } from '../controllers/userController.js'

//all the functionality will go in the controller
//Controller with all the functions and Routes just have the root and point to the specific controller functions

//we only going to have a post req to users login because we use router.post
//we use '/login' because this is going to be hooked to /api/users
//rouut post 'login' and then we call authUser
router.post('/login', authUser)


export default router

//after we bring this use routs into the server
