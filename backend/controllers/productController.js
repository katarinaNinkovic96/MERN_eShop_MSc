import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    
    res.json(products)
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error ('Product not found')
    }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product){
        await product.remove()
        res.json({ message: 'Product removed'})
    }else{
        res.status(404)
        throw new Error ('Product not found')
    }
})


// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description
    } = req.body

    const productExists = await Product.findById(req.params.id)

    if(productExists) {
        res.status(400)
        throw new Error('Product already exists')
    }

    const product  = new Product({
        name,
        price,
        // logged in user
        user: req.user._id,
        image,
        brand,
        category,
        countInStock,
        description,
        numReviews: 0
    });

    // new constant - product saved in database
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
 })

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {

    const {
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description
    } = req.body

    //id in URL
    const product = await Product.findById(req.params.id);

    if(product) {
        product.name = name
        product.price = price
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock
        product.description = description


        //new constant - product save in database
        const updatedProduct = await product.save();
        res.json(updatedProduct);

    } else {
        res.status(404);
        throw new Error ('Product not found')
    }
})


export { getProducts, getProductById, deleteProduct, createProduct, updateProduct }

