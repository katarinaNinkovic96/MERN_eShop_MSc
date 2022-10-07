import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema({
    name: { type:String, required: true },
    rating: { type:Number, required: true },
    comment: { type:String, required: true },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        //ref serves to connect admin with the product --- 'User' is specific model for thi object ID
        ref: 'User'
    }
}, {
    timestamps: true
})

const productSchema = mongoose.Schema({

    //only the administrator can insert new products, and with this 'user' we check which admin added the new product
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        //ref serves to connect admin with the product --- 'User' is specific model for thi object ID
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)

export default Product