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

export { authUser }