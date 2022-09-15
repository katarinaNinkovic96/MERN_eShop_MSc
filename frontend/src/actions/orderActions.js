import { 
    orderCreateRequest, 
    orderCreateSuccess, 
    orderCreateFail, 
    orderDetailsRequest,
    orderDetailsSuccess,
    orderDetailsFail
} from '../reducers/orderReducers'

import axios from 'axios';

export const createOrder = ( order ) => async (dispatch, getState) => {
    try {

        //dispatch - the request
        dispatch(orderCreateRequest());

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
                //because post req we need content type. For get req we don't need
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //we will make our requests
        //put request
        const { data } = await axios.post( '/api/orders', order, config);


        //we're going to pass the data, get in as the payload
        dispatch(orderCreateSuccess(data));

        //userLoginSuccess will get fired off, it will be a pass into our state and then it will update the local storage
        //we're going to pass the data, get in as the payload
        //dispatch(userLoginSuccess(data));

        //localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch(orderCreateFail(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
}



export const getOrderDetails = ( id ) => async (dispatch, getState) => {
    try {

        //dispatch - the request
        dispatch(orderDetailsRequest());

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
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //we will make our requests
        //put request
        const { data } = await axios.get( `/api/orders/${id}`, config);


        //we're going to pass the data, get in as the payload
        dispatch(orderDetailsSuccess(data));

        //userLoginSuccess will get fired off, it will be a pass into our state and then it will update the local storage
        //we're going to pass the data, get in as the payload
        //dispatch(userLoginSuccess(data));

        //localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch(orderDetailsFail(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
}
