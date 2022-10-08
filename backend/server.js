import path from 'path';
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'



dotenv.config()

connectDB()

const app = express()


//only run in development mode
//can in production but not prefer
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}


//that will allow us to accept JSON data in the body
app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

//when we're ready to make our payment, we'll hit this route and we'll fetch this client ID
app.get('/api/config/paypal', (req,res) => res.send(process.env.PAYPAL_CLIENT_ID))

//uploads folder is not going to be accessible by default
//We need to make this a static folder so that it can get loaded in the browser
//make folder static in an express
//join - we can just join different segments of files
//__ (current folder)
//__dirname - this point to the current directory. Only can use in Common JS
//with E modules we can mimic that using path.resolve
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));
    app.get('*', (req, res) => res.sendFile(
        path.resolve(__dirname, 'frontend', 'build', 'index.html')
    ));
} else {
    app.get('/', (req, res) => {
        res.send('API is running...')
    });
}

app.use(notFound)

app.use (errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);
