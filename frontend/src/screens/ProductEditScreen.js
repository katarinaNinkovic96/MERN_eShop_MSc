//This will be a form and when we have a form, usully our form fields are going to be part of the component state
    //so we do need useState also want useEffect

    import React, { useState, useEffect } from 'react'
    import { Link } from 'react-router-dom'
    import { Button, Form} from 'react-bootstrap'
    //import useDispatch and useSelector so we can deal with our redux state
    import { useDispatch, useSelector } from 'react-redux'
    import Message from '../commponents/Message'
    import Loader from '../commponents/Loader'
    import FormContainer from '../commponents/FormContainer'
    import { listProductDetails, updateProduct } from '../actions/productActions'
    import { productUpdateReset } from '../reducers/productReducers'
    
    
    const ProductEditScreen = ({ match, history }) => {

        const productId = match.params.id;

        //set some component level state, so basicilly for out fields and we're going to have just name, email...
        //set email and the function to manipulate that piece of state will be setEmail
        const [ name, setName ] = useState('')
        const [ price, setPrice ] = useState(0)
        const [ image, setImage ] = useState('')
        const [ brand, setBrand ] = useState('')
        const [ category, setCategory ] = useState('')
        const [ countInStock, setCountInStock ] = useState(0)
        const [ description, setDescription ] = useState('')
    
        const dispatch = useDispatch()
    
        //we get from our state the userDetails, part of our state
        const productDetails = useSelector( state => state.productDetails)
        const { loading, error, product } = productDetails


        const productUpdate = useSelector( state => state.productUpdate)
        const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = productUpdate


        useEffect(() => {
            if (successUpdate) {
                dispatch(productUpdateReset());
                history.push('/admin/productlist');
            } else {
                if(!product.name || product._id !== productId) {
                    dispatch(listProductDetails(productId));   
                } else {
                    setName(product.name);
                    setPrice(product.price);
                    setImage(product.image);
                    setBrand(product.brand);
                    setCategory(product.category);
                    setCountInStock(product.countInStock);
                    setDescription(product.description);
                }
            }     
        }, [dispatch, history, productId, product, successUpdate ])
    
        // submitHandler is a form so we're going to pass e and then call e.preventDefault so the page doesn't actually refresh
        const submitHandler = (e) => {
            e.preventDefault()
            dispatch(updateProduct({_id: productId, name, price, image, brand, category, countInStock, description }))
        }
    
      return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>
                Go Back
            </Link>

            <FormContainer>
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? ( 
            <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message> 
            ) : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type='name' 
                            placeholder='Enter name' 
                            //value is name from the state
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='price'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control 
                            type='number' 
                            placeholder='Enter price' 
                            //value is email from the state
                            value={price} 
                            onChange={(e) => setPrice(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control 
                            type='text' 
                            placeholder='Enter image url' 
                            //value is email from the state
                            value={image} 
                            onChange={(e) => setImage(e.target.value)}
                        ></Form.Control>
                    </Form.Group>


                    <Form.Group controlId='brand'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control 
                            type='text' 
                            placeholder='Enter brand' 
                            //value is email from the state
                            value={brand} 
                            onChange={(e) => setBrand(e.target.value)}
                        ></Form.Control>
                    </Form.Group>


                    <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control 
                            type='text' 
                            placeholder='Enter category' 
                            //value is email from the state
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)}
                        ></Form.Control>
                    </Form.Group>


                    <Form.Group controlId='countInStock'>
                        <Form.Label>Count In Stock</Form.Label>
                        <Form.Control 
                            type='number' 
                            placeholder='Enter count in stock' 
                            //value is email from the state
                            value={countInStock} 
                            onChange={(e) => setCountInStock(e.target.value)}
                        ></Form.Control>
                    </Form.Group>


                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            type='text' 
                            placeholder='Enter description' 
                            //value is email from the state
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
    
                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>
            )}
        </FormContainer>
        </>
        
      )
    }
    
    export default ProductEditScreen
    
    