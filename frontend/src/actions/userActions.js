import axios from 'axios'
import { userLoginRequest, userLoginSuccess, userLoginFail, userLogout } from '../reducers/userReducers';
import { userRegisterRequest, userRegisterSuccess, userRegisterFail } from '../reducers/userReducers';
import { userDetailsRequest, userDetailsSuccess, userDetailsFail, userDetailsReset } from '../reducers/userReducers';
import { userUpdateProfileRequest, userUpdateProfileSuccess, userUpdateProfileFail } from '../reducers/userReducers';
import { userListRequest, userListSuccess, userListFail, userListReset } from '../reducers/userReducers';
import { userManipulateRequest, userManipulateSuccess, userManipulateFail } from '../reducers/userReducers';
import { userUpdateRequest, userUpdateSuccess, userUpdateFail } from '../reducers/userReducers';
import { userResetForgotPasswordRequest, userResetForgotPasswordSuccess, userResetForgotPasswordFail } from '../reducers/userReducers';
import { orderListMyReset } from '../reducers/orderReducers'
import { cartReset } from '../reducers/cartReducers';

//login
export const login = ( email, password ) => async (dispatch) => {
    try {

        //dispatch - the request
        dispatch(userLoginRequest());

        //create config object bacause when we are actually sending data, we want to send in the headers, a content type
            //of application/json
        //this is also where we will pass the token for protected routes, will set the authorization here for the token
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        //we will make our requests
        const { data } = await axios.post(
            '/api/users/login',
            {email, password },
            config
        );

        //we want to dispatch our user login success
        dispatch(userLoginSuccess(data));

        //set our user to local storage
        //we want json.stringify because we are saving the local storage, so has to be a string pass in data
            //it is going to be the user object
        localStorage.setItem(`userInfo`, JSON.stringify(data))

    } catch (error) {
        dispatch(userLoginFail(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
}

//logout
export const logout = () => async (dispatch) => {
    // clear localStorage
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('paymentMethod');
    localStorage.removeItem('shippingAddress');

    // we want to dispatch our user logout
    dispatch(userLogout());
    dispatch(userDetailsReset());
    dispatch(userListReset());
    dispatch(orderListMyReset());
    dispatch(cartReset());
}

// forgot password
export const forgotPassword = ( email ) => async (dispatch) => {
    try {
        dispatch(userResetForgotPasswordRequest());

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/users/forgot-password',
            { email },
            config
        );

        dispatch(userResetForgotPasswordSuccess(data));
    } catch (error) {
        dispatch(userResetForgotPasswordFail(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
}

// reset password
export const resetPassword = ( token, password ) => async (dispatch) => {
    try {
        dispatch(userResetForgotPasswordRequest());

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(
            '/api/users/reset-password',
            { token, password },
            config
        );

        dispatch(userResetForgotPasswordSuccess(data));
    } catch (error) {
        dispatch(userResetForgotPasswordFail(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
}

// pre register action for new user
export const preRegister = ( name, email, password ) => async (dispatch) => {
    try {
        dispatch(userRegisterRequest());

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/users/pre-register',
            { name, email, password },
            config
        );

        dispatch(userRegisterSuccess(data));

    } catch (error) {
        dispatch(userRegisterFail(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
}

// register new user
export const register = (token) => async (dispatch) => {
    try {

        //dispatch - the request
        dispatch(userRegisterRequest());

        //create config object bacause when we are actually sending data, we want to send in the headers, a content type
            //of application/json
        //this is also where we will pass the token for protected routes, will set the authorization here for the token
        //we want application json, we're sending data
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        //we will make our requests
        //post request
        //we want to pass in, want name, email, pass
        const { data } = await axios.post(
            '/api/users/register',
            { token },
            config
        );

        //we want to dispatch our user login success
        //we're going to pass the data, get in as the payload
        dispatch(userRegisterSuccess(data));

    } catch (error) {
        dispatch(userRegisterFail(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
}

//details
//we need to send a token so I', going to say getState here, because we can get our user info from getState, 
    //which has the token in it.
//getUserDetails - id - profile gets passed in
export const getUserDetails = ( id ) => async (dispatch, getState) => {
    try {

        //dispatch - the request
        dispatch(userDetailsRequest());

        //destruction from getState which is a function
        //we want to get the user login, but then we want to destruction another level and we want to get userInfo
            //which is in user login
        //that should give us access to the logged in users object
        const {userLogin: { userInfo } } = getState()

        //create config object bacause when we are actually sending data, we want to send in the headers, a content type
            //of application/json
        //this is also where we will pass the token for protected routes, will set the authorization here for the token
        //we want application json, we're sending data
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //we will make our requests
        //get request
        //`/api/users/${id}` => `/api/users/profile`
        const { data } = await axios.get( `/api/users/${id}`, config);

        //we're going to pass the data, get in as the payload
        dispatch(userDetailsSuccess(data));

    } catch (error) {
        dispatch(userDetailsFail(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
}

//UpdateProfile
//this is going to take in the entire user object
export const updateUserProfile = ( user ) => async (dispatch, getState) => {
    try {

        //dispatch - the request
        dispatch(userUpdateProfileRequest());

        //destruction from getState which is a function
        //we want to get the user login, but then we want to destruction another level and we want to get userInfo
            //which is in user login
        //that should give us access to the logged in users object
        //we get userInfo
        const {userLogin: { userInfo } } = getState()

        //create config object bacause when we are actually sending data, we want to send in the headers, a content type
            //of application/json
        //this is also where we will pass the token for protected routes, will set the authorization here for the token
        //we want application json, we're sending data
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //we will make our requests
        //put request
        const { data } = await axios.put( '/api/users/profile', user, config);

        //we're going to pass the data, get in as the payload
        dispatch(userUpdateProfileSuccess(data));

        //userLoginSuccess will get fired off, it will be a pass into our state and then it will update the local storage
        //we're going to pass the data, get in as the payload
        dispatch(userLoginSuccess(data));

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch(userUpdateProfileFail(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
}

//List users
//it's not going to take anything in
export const listUsers = () => async (dispatch, getState) => {
    try {

        //dispatch - the request
        dispatch(userListRequest());

        //destruction from getState which is a function
        //we want to get the user login, but then we want to destruction another level and we want to get userInfo
            //which is in user login
        //that should give us access to the logged in users object
        //we get userInfo
        const {userLogin: { userInfo } } = getState()

        //this is also where we will pass the token for protected routes, will set the authorization here for the token
        //we want application json, we're sending data
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //we will make our requests
        //get request
        const { data } = await axios.get( '/api/users', config);

        //we're going to pass the data, get in as the payload
        dispatch(userListSuccess(data));

    } catch (error) {
        dispatch(userListFail(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
}

//Delete user
export const deleteUser = (id) => async (dispatch, getState) => {
    try {

        //dispatch - the request
        dispatch(userManipulateRequest());

        //destruction from getState which is a function
        //we want to get the user login, but then we want to destruction another level and we want to get userInfo
            //which is in user login
        //that should give us access to the logged in users object
        //we get userInfo
        const {userLogin: { userInfo } } = getState()

        //this is also where we will pass the token for protected routes, will set the authorization here for the token
        //we want application json, we're sending data
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //we will make our requests
        //delete request
        const { data: { message } } = await axios.delete( `/api/users/${id}`, config);

        //we're going to pass the data, get in as the payload
        dispatch(userManipulateSuccess(message));

    } catch (error) {
        dispatch(userManipulateFail(error.response && error.response.data.message ? error.response.data.message : error.message))
    }

    // update user list
    dispatch(listUsers());
}

//Update user
export const updateUser = (user) => async (dispatch, getState) => {
    try {

        //dispatch - the request
        dispatch(userUpdateRequest());

        //destruction from getState which is a function
        //we want to get the user login, but then we want to destruction another level and we want to get userInfo
            //which is in user login
        //that should give us access to the logged in users object
        //we get userInfo
        const {userLogin: { userInfo } } = getState()

        //this is also where we will pass the token for protected routes, will set the authorization here for the token
        //we want application json, we're sending data
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //we will make our requests
        //delete request
        const { data } = await axios.put( `/api/users/${user._id}`, user, config);

        //we're going to pass the data, get in as the payload
        dispatch(userUpdateSuccess());

        dispatch(userDetailsSuccess(data));

    } catch (error) {
        dispatch(userUpdateFail(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
}

// Deactivate user
export const deactivateUser = (id) => async (dispatch, getState) => {
    try {
        dispatch(userManipulateRequest());

        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data: { message } } = await axios.post( `/api/users/${id}/deactivate`, null, config);

        dispatch(userManipulateSuccess(message));
    } catch (error) {
        dispatch(userManipulateFail(error.response && error.response.data.message ? error.response.data.message : error.message))
    }

    // update user list
    dispatch(listUsers());
}

// Re-activate user
export const reActivateUser = (id) => async (dispatch, getState) => {
    try {
        dispatch(userManipulateRequest());

        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data: { message } } = await axios.post( `/api/users/${id}/re-activate`, null, config);

        dispatch(userManipulateSuccess(message));
    } catch (error) {
        dispatch(userManipulateFail(error.response && error.response.data.message ? error.response.data.message : error.message))
    }

    // update user list
    dispatch(listUsers());
}
