//authMiddleware use for validate the tokens
import jwt from 'jsonwebtoken'

//use asyncHandler to handle any exceptions
import asyncHandler from 'express-async-handler'

import User from '../models/userModel.js'

//this middleware function - req, res, next
const protect = asyncHandler(async (req, res, next) => {

    // initialize a variable called token
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //want only token not all - with Bearer [0]
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //only we dont return is password
            req.user = await User.findById(decoded.id).select('-password')

            next();
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authoruzed, no token')
    }
})

export { protect }
