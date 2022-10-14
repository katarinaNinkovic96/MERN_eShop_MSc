import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// components
import Message from '../commponents/Message';
import Loader from '../commponents/Loader';

// actions
import { register } from '../actions/userActions';
import { userRegisterReset, userRegisterFail } from '../reducers/userReducers';

const EmailActivationScreen = ( {history, match} ) => {
    const dispatch = useDispatch();

    const userRegister = useSelector( state => state.userRegister)
    const { loading, error, success } = userRegister;

    const userLogin = useSelector( state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch(userRegisterReset());

        if (userInfo) {
            dispatch(userRegisterFail("You are signed in! Please sign out and use activation link again"));
        } else {
            dispatch(register(match.params.token));
        }
        //dependencies - history, userInfo(beacuse of that changes we want to redirect), redirect
    }, [dispatch, match, history, userInfo])

    return <>
        { loading && <Loader /> }
        { (!loading && !!success) &&
        <Message variant="success">
            {success.line1}
            <br/>
            {success.line2}
            <br/>
            Please <Link to='/login'>sign in</Link> to write a review
        </Message> }
        { (!loading && !!error) && <Message variant='danger'>{error}</Message> }
    </>;
};

export default EmailActivationScreen;
