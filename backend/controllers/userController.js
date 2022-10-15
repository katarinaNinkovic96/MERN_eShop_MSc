import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import jwt from 'jsonwebtoken';
import { activeCheck } from '../middleware/authMiddleware.js';

import dotenv from 'dotenv';
dotenv.config();

import sgMail from '@sendgrid/mail'; // SENDGRID_API_KEY
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

    // check is user account activated
    activeCheck(user);

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

// @desc    Pre-Register a new user
// @route   POST /api/users/pre-register
// @access  Public
export const preRegisterUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body;

    // check does user already exist
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
        //error 400 is bad request
        res.status(400);
        throw new Error('User already exists');
    }

    // create new user
    const user = await User.create({
        name,
        email,
        password
    });

    // check is user succesfully created
    if (!user) {
        res.status(400);
        throw new Error('Invalid user data');
    }

    // form activation e-mail content
    const token = jwt.sign({ email: email.toLowerCase() }, process.env.JWT_ACCOUNT_ACTIVATION, { expiresIn: '10m' });
    const CLIENT_URL = (process.env.NODE_ENV === 'development') ? process.env.CLIENT_URL_DEV : process.env.CLIENT_URL_PROD;
    const emailData = {
        to: email,
        from: `${process.env.SENDGRID_SENDER_MAIL}`,
        subject: `Account activation link`,
        html: `
            <p>Please use the following link to activate your account:</p>
            <p>${CLIENT_URL}/account/activate/${token}</p>
            <hr/>
            <p>This email may contain sensetive information</p>
            <p>${CLIENT_URL}</p>
        `
    };

    sgMail
        .send(emailData)
        .then(() => {
            return res.json({
                line1: `Email has been sent to ${email}.`,
                line2: "Follow the instructions to activate your account."
            })
        })
        .catch((errorMessage) => {
            console.error("error occured on sgMail send: ", errorMessage);
            res.status(401);
            throw new Error(`Failed to send account activation e-mail.\n${errorMessage}`);
        });
})

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {

    //body data in postman - the way that we access that in here (userController) is with request body- 
        //that will give us the data that sent the body
    //req.body will be able to access like req body email,name, body pass...
    //for this we need body parser in server.js - app.use(express.json())

    // check does token exist
    const token = req.body.token;
    if (!token) {
        throw new Error("Missing token key in JSON object/body");
    }

    // decode token to get email
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION);
    } catch (error) {
        res.status(401);
        if(error.name === 'TokenExpiredError') {
            // find user anyway
            const { email } = jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, { ignoreExpiration: true });
            const user = await User.findOne({ email });

            // check is user already verified
            if (user.isVerified) {
                // just throw error if it is verified
                res.status(400);
                throw new Error("User account has already been verified.");
            } else {
                // remove account if it is not
                await user.remove();
                throw new Error("Token has been expired. Register once again.");
            }
        }
        throw error;
    }

    //we want to find email that matches with email in req body (line up)
    const { email } = decoded;
    const user = await User.findOne({ email });

    //error 400 is bad request
    if (!user) {
        res.status(400);
        throw new Error("User doesn't exists.");
    } else if (user.isVerified) {
        res.status(400);
        throw new Error("User account has already been verified.");
    }

    user.isActive = true;
    user.isVerified = true;

    const result = await user.save();
    if (!result) {
        res.status(400);
        throw new Error('Invalid user data');
    }

    res.json({
        line1: "Congratulations!",
        line2: "You have been successfully activated account"
    });
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


// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id);

    if(user) {
        await user.remove();
        res.json({ message: 'User removed '});

    } else {
        res.status(404);
        throw new Error ('User not found');
    }
})


// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {

    //select - we want to send user back without password
    const user = await User.findById(req.params.id).select('-passwprd');

    if(user) {
        res.json(user)
    } else {
        res.status(404);
        throw new Error ('User not found');
    }
})


// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id)

    if (user) {
        //we're going to set user.name we set to requast body.name or if that's not thete,
            //it's just going to be it's going to stay whatever the user name is
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin
        //user.isAdmin = req.body.isAdmin || user.isAdmin

        //we want to take that user and save
        const updateUser = await user.save()

        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin
        })
    } else {
        res.status(404)
        throw new Error ('User not found')
    }
})


// @desc    Deactivate user
// @route   POST /api/users/:id/deactivate
// @access  Private/Admin
const deactivateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        if (!user.isAdmin) {
            user.isActive = false;
            await user.save();
            res.json({ message: 'User deactivated '});
        } else {
            res.status(404);
            throw new Error ("User can't be deactivated, because it's admin");
        }
    } else {
        res.status(404);
        throw new Error ('User not found');
    }
})

// @desc    Re-activate user
// @route   POST /api/users/:id/re-activate
// @access  Private/Admin
const reActivateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.isActive = true;
        await user.save();
        res.json({ message: 'User re-activated '});
    } else {
        res.status(404);
        throw new Error ('User not found');
    }
})

export { authUser, registerUser, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser, deactivateUser, reActivateUser };
