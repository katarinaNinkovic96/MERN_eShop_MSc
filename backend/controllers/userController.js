import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {

   //body data in postman - the way that we access that in here (userController) is with request body- 
   //that will give us the data that sent the body
   //req.body will be able to access like req body email, body pass...
   //for this we need body parser in server.js - app.use(express.json())

   //structure that data from req body, I want pull out the email and pass
   const { email, password } = req.body

   //we want to find one document it by email
   //const user = await User.find({ email : email}) because is match we write only one email
   //we want to find email that matches with email in req body (line up)
   const user = await User.findOne({ email})

   //because pass in database is encrypted we need to use decrypt - function is userModel.js
   //password in () is palin text we get from the body
   if(user && (await user.matchPassword(password))){

    //we want to return:
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
    })
   } else {
    //401 is unauthorized
    res.status(401)
    throw new Error('Invalid email or password')
   }
   
})


// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {

    //body data in postman - the way that we access that in here (userController) is with request body- 
        //that will give us the data that sent the body
    //req.body will be able to access like req body email,name, body pass...
    //for this we need body parser in server.js - app.use(express.json())
 
    //structure that data from req body, I want pull out the name, email and pass (yhose three pieces of data from the body)
    const { name, email, password } = req.body
 
    //we want to find one document it by email
    //const user = await User.find({ email : email}) because is match we write only one email
    //we want to find email that matches with email in req body (line up)
    const userExists = await User.findOne({ email})
 
    //error 400 is bad request
    if(userExists) {
        res.status(400)
        throw new Error('Users already exists')
    }

    //if I write only password - this password is unencrypted, its just plain text why we use Mangus middleware to encrypt it.
    //create like save
    const user  = await User.create({
        name,
        email,
        password
    })

    //if user creite, if everithing goes ok
    //status 201 which means somethiing was created
    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }   
 })


// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })

    } else {
        res.status(404)
        throw new Error ('User not found')
    }
 })


// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private - need to be logged in and they will need to send a token
const updateUserProfile = asyncHandler(async (req, res) => {

    //we are going to get the user by ID and we are going to have the logged in user
    const user = await User.findById(req.user._id)

    if (user) {
        //we're going to set user.name we set to requast body.name or if that's not thete, 
            //it's just going to be it's going to stay whatever the user name is 
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        //for the password we want to first check to see if a password was sent
        if(req.body.password){
            user.password = req.body.password
        }

        //we want to take that user and save
        const updateUser = await user.save()

        //
        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            token: generateToken(updateUser._id)
        })
    } else {
        res.status(404)
        throw new Error ('User not found')
    }
 })


// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin --not only is it protected and you have to log in, but you also have to be an admin
const getUsers = asyncHandler(async (req, res) => {

    //empty object because we want to get all users
    const users = await User.find({})
    res.json(users)   
 })


export { authUser, registerUser, getUserProfile, updateUserProfile, getUsers }

