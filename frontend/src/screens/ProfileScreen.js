//This will be a form and when we have a form, usully our form fields are going to be part of the component state
    //so we do need useState also want useEffect

    import React, { useState, useEffect } from 'react'
    import { Row, Col, Button, Form} from 'react-bootstrap'
    //import useDispatch and useSelector so we can deal with our redux state
    import { useDispatch, useSelector } from 'react-redux'
    import Message from '../commponents/Message'
    import Loader from '../commponents/Loader'
    import { getUserDetails } from '../actions/userActions'
    
    
    const ProfileScreen = ({ history }) => {
        //set some component level state, so basicilly for out fields and we're going to have just name, email and password
        //set email and the function to manipulate that piece of state will be setEmail
        const [ name, setName ] = useState('')
        const [ email, setEmail ] = useState('')
        const [ password, setPassword ] = useState('')
        const [ confirmPassword, setConfirmPassword ] = useState('')
        const [ message, setMessage ] = useState(null)
    
        const dispatch = useDispatch()
    
        //we get from our state the userRegister, part of our state
        const userDetails = useSelector( state => state.userDetails)
        const { loading, error, user } = userDetails

        //check to see if the user isn't logged in because if not, then we don't want them to access this page
        //bring userLogin and put userInfo
        const userLogin = useSelector( state => state.userLogin)
        const { userInfo } = userLogin
    
    
        //I want to redirect if we aew already logged in, I don't want to be able to come to the login screen if we're already logged in.
        // add useEffect

        useEffect(() => {

            //check for userInfo, if not userInfo, then we're going to want to redirect to login
            if(!userInfo) {
                history.push('/login')
            } else {

                //if not user - check for the name
                if(!user.name){

                    //getUserDetails takes in an ID but in this case we're getting our profile
                    dispatch(getUserDetails('profile'))
                } else {
                    setName(user.name)
                    setEmail(user.email)
                }
            }

            //dependencies - history, userInfo(beacuse of that changes we want to redirect), redirect
        }, [dispatch, user, history, userInfo])
    
        // submitHandler is a form so we're going to pass e and then call e.preventDefault so the page doesn't actually refresh
        const submitHandler = (e) => {
            e.preventDefault()
            // DISPATCH REGISTER - this is where we want to dispatch register
            //pass email and password from the form 

            //we want to check for the passwords first
            if(password !== confirmPassword) {
                setMessage('Passwords do not match')
            } else {
                // DISPATCH UPDATE PROFILE
            }
        }
    
      return <Row>
        <Col md = {3}>
        <h2>User Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
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
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type='password' 
                        placeholder='Confirm password' 
                        //value is password from the state
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
    
                <Button type='submit' variant='primary'>
                    Update
                </Button>  
            </Form>
        </Col>

        <Col md = {9}>
            <h2>My Orders</h2>
        </Col>
      </Row>
    }
    
    export default ProfileScreen
    