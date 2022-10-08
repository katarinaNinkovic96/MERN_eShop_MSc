//This will be a form and when we have a form, usully our form fields are going to be part of the component state
    //so we do need useState also want useEffect

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Form} from 'react-bootstrap'
//import useDispatch and useSelector so we can deal with our redux state
import { useDispatch, useSelector } from 'react-redux'
import Message from '../commponents/Message'
import Loader from '../commponents/Loader'
import { login } from '../actions/userActions'
import { userLoginReset } from '../reducers/userReducers';
import FormContainer from '../commponents/FormContainer'


const LoginScreen = ({ location, history }) => {
    //set some component level state, so basicilly for out fields and we're going to have just email and password
    //set email and the function to manipulate that piece of state will be setEmail
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const dispatch = useDispatch()

    //we get from our state the userLogin, part of our state
    const userLogin = useSelector( state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    //we want to check that location.search beacuse that's going to have the URL a query string
    //if that exists, then let's take location.search anf let's split which is going to turn it into an array split by '='
        //we want rhe one index which willbe to the right of the equals sign
    const redirect = location.search ? location.search.split('=')[1] : '/'

    //I want to redirect if we aew already logged in, I don't want to be able to come to the login screen if we're already logged in.
    // add useEffect
    useEffect(() => {
        dispatch(userLoginReset());

        //check for userInfo, if userInfo exists (null if we're not logged in) let's take our props history and call push
        //we want to go to wharever is in redirect 
        if(userInfo) {
            history.push(redirect)
        }
        //dependencies - history, userInfo(beacuse of that changes we want to redirect), redirect
    }, [dispatch, history, userInfo, redirect])

    // submitHandler is a form so we're going to pass e and then call e.preventDefault so the page doesn't actually refresh
    const submitHandler = (e) => {
        e.preventDefault()
        // DISPATCH LOGIN - this is where we want to dispatch login
        //pass email and password from the form 
        dispatch(login(email, password))
    }

  return (
    <FormContainer>
        <h1>Sing In</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                    type='email' 
                    placeholder='Enter email' 
                    //value is email from the state
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type='password' 
                    placeholder='Enter password' 
                    //value is password from the state
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="on"
                ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
                Sign In
            </Button>  
        </Form>

        <Row className='py-3'>
            <Col>
                New Customer? {' '}
                <Link to={ redirect ? `/register?redirect=${redirect}` : '/register'}>
                    Register
                </Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen
