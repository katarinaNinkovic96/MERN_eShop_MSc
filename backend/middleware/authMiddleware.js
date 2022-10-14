//authMiddleware use for validate the tokens
import jwt from 'jsonwebtoken'

//use asyncHandler to handle any exceptions
import asyncHandler from 'express-async-handler'

import User from '../models/userModel.js'

import dotenv from 'dotenv';
dotenv.config();

const activeCheck = (user) => {
    if (user) {
        if (!user.isActive && !user.isAdmin) {
            throw new Error("User is not active");
        }
    } else {
        throw new Error("User can't be found");
    }
}

//this middleware function - req, res, next
const tokenMiddleware = asyncHandler(async (req, res, next) => {

    // initialize a variable called token
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //want only token not all - with Bearer [0]
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //only we dont return is password
            req.user = await User.findById(decoded.id).select('-password')
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }

    activeCheck(req.user);

    if (!token) {
        res.status(401)
        throw new Error('Not authoruzed, no token')
    }

    // call next method at the end
    next();
})

const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}

export { activeCheck, tokenMiddleware, adminMiddleware };
