import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

// components
import Message from '../commponents/Message';
import Loader from '../commponents/Loader';
import FormContainer from '../commponents/FormContainer';

// actions
import { userResetForgotPasswordReset, userResetForgotPasswordFail } from '../reducers/userReducers';
import { resetPassword } from '../actions/userActions';

const ResetPasswordScreen = ( {match} ) => {

    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')

    const dispatch = useDispatch();

    const userResetPassword = useSelector( state => state.userResetForgotPassword)
    const { loading, error, success } = userResetPassword;

    useEffect(() => {
        dispatch(userResetForgotPasswordReset())

    }, [dispatch])

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            dispatch(userResetForgotPasswordFail("Entered passwords do not match"));
        } else {
            dispatch(resetPassword(match.params.token, password));
        }
    }

    return <FormContainer>
        { (!loading && !!error) && <Message variant='danger'>{error}</Message> }
        { (!loading && !!success) &&
        <Message variant="success">
            {success.line1}
            <br/>
            {success.line2}
            <br/>
            Please <Link to='/login'>sign in</Link>
        </Message> }
        <h1>Reset Password</h1>
        <Form onSubmit={submitHandler} autoComplete="on">

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter new password'
                    value={password} // value is password from the state
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Confirm password'
                    value={confirmPassword} // value is password from the state
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="off"
                ></Form.Control>
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

export default ResetPasswordScreen;
