import React, { useState, useEffect } from 'react';
import { Button, Form} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

// components
import Message from '../commponents/Message'
import Loader from '../commponents/Loader'
import FormContainer from '../commponents/FormContainer'

// actions
import { forgotPassword } from '../actions/userActions'
import { userResetForgotPasswordReset } from '../reducers/userReducers';

const ForgotPasswordScreen = () => {
    const [ email, setEmail ] = useState('');

    const dispatch = useDispatch();

    const userForgotPassword = useSelector(state => state.userResetForgotPassword);
    const { success, loading, error } = userForgotPassword;

    useEffect(() => {
        dispatch(userResetForgotPasswordReset());

    }, [dispatch])

    const forgotPasswordHandler = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email));
    }

    return <FormContainer>
        <h1>Forgot Password</h1>
        { (!loading && !!error) && <Message variant='danger'>{error}</Message> }
        { (!loading && !!success) && <Message variant='success'>{success.line1}<br/>{success.line2}</Message> }
        <Form onSubmit={forgotPasswordHandler}>
            <Form.Group autoComplete="on">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email} //value is email from the state
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>

            { loading ?
            <Loader /> :
            <Button
                className='btn-sm'
                variant='warning'
                type='submit'
            >
                Send
            </Button> }
        </Form>
    </FormContainer>;
}

export default ForgotPasswordScreen;
