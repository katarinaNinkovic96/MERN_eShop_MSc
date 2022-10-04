import axios from 'axios'
import {productListRequest, productListSuccess, productListFail} from '../reducers/productReducers';
import { productDetailsRequest, productDetailsSuccess, productDetailsFail } from '../reducers/productReducers';
import { productDeleteRequest, productDeleteSuccess, productDeleteFail } from '../reducers/productReducers';
import { productCreateRequest, productCreateSuccess, productCreateFail } from '../reducers/productReducers';
import { productUpdateRequest, productUpdateSuccess, productUpdateFail } from '../reducers/productReducers';

export const listProducts = () => async (dispatch) => {
    try {
        dispatch(productListRequest());

        const { data } = await axios.get('/api/products');

        dispatch(productListSuccess(data));
    } catch (error) {
        dispatch(productListFail(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
}


export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch(productDetailsRequest());

        const { data } = await axios.get(`/api/products/${id}`);

        dispatch(productDetailsSuccess(data));
    } catch (error) {
        dispatch(productDetailsFail(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
}


//delete product
export const deleteProduct = (id) => async (dispatch, getState) => {
    try {

        //dispatch - the request
        dispatch(productDeleteRequest());

        //destruction from getState which is a function
        //we want to get the user login, but then we want to destruction another level and we want to get userInfo
            //which is in user login
        //that should give us access to the logged in users object
        //we get userInfo
        const {userLogin: { userInfo } } = getState()

       
        //this is also where we will pass the token for protected routes, will set the authorization here for the token
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //we will make our requests
        //delete request
        await axios.delete( `/api/products/${id}`, config);


        //we're going to pass the data, get in as the payload
        dispatch(productDeleteSuccess());

    } catch (error) {
        dispatch(productDeleteFail(error.response && error.response.data.message
            ? error.response.data.message
            : error.message))
    }

    // update product list
    dispatch(listProducts());
}



//create product
export const createProduct = (product) => async (dispatch, getState) => {
    try {

        //dispatch - the request
        dispatch(productCreateRequest());

        //destruction from getState which is a function
        //we want to get the user login, but then we want to destruction another level and we want to get userInfo
            //which is in user login
        //that should give us access to the logged in users object
        //we get userInfo
        const {userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                //'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //we will make our requests
        //post request
        //second argument {} - because we making post req but we're not actually sending any data here.
        const { data } = await axios.post( `/api/products`, product,  config);


        //we're going to pass the data, get in as the payload
        dispatch(productCreateSuccess(data));

    } catch (error) {
        dispatch(productCreateFail(error.response && error.response.data.message
            ? error.response.data.message
            : error.message))
    }
}


//update product
export const updateProduct = (product) => async (dispatch, getState) => {
    try {

        //dispatch - the request
        dispatch(productUpdateRequest());

        //destruction from getState which is a function
        //we want to get the user login, but then we want to destruction another level and we want to get userInfo
            //which is in user login
        //that should give us access to the logged in users object
        //we get userInfo
        const {userLogin: { userInfo } } = getState()

       
        //this is also where we will pass the token for protected routes, will set the authorization here for the token
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        //we will make our requests
        //put request
        const { data } = await axios.put( `/api/products/${product._id}`, product, config);


        //we're going to pass the data, get in as the payload
        dispatch(productUpdateSuccess(data));

    } catch (error) {
        dispatch(productUpdateFail(error.response && error.response.data.message
            ? error.response.data.message
            : error.message))
    }
}




