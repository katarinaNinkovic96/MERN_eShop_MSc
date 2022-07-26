import axios from 'axios'
import {productListRequest, productListSuccess, productListFail} from '../reducers/productReducers';
import { productDetailsRequest, productDetailsSuccess, productDetailsFail } from '../reducers/productReducers';
import { productDeleteRequest, productDeleteSuccess, productDeleteFail } from '../reducers/productReducers';
import { productManageRequest, productManageSuccess, productManageFail } from '../reducers/productReducers';
import { productCreateReviewRequest, productCreateReviewSuccess, productCreateReviewFail } from '../reducers/productReducers';
import { productTopRequest, productTopSuccess, productTopFail } from '../reducers/productReducers';

export const listProducts = (keyword = '', pageNumber = '') => async (dispatch) => {
    try {
        dispatch(productListRequest());

        const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);

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
        dispatch(productManageRequest());

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
        dispatch(productManageSuccess(data));

    } catch (error) {
        dispatch(productManageFail(error.response && error.response.data.message
            ? error.response.data.message
            : error.message))
    }
}

//update product
export const updateProduct = (product) => async (dispatch, getState) => {
    try {

        //dispatch - the request
        dispatch(productManageRequest());

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
        dispatch(productManageSuccess(data));

    } catch (error) {
        dispatch(productManageFail(error.response && error.response.data.message
            ? error.response.data.message
            : error.message))
    }
}


//create product review
//review object have rating and comment
export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        //dispatch - the request
        dispatch(productCreateReviewRequest());

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
        await axios.post( `/api/products/${productId}/reviews`, review, config);

        //we're going to pass the data, get in as the payload
        dispatch(productCreateReviewSuccess());

    } catch (error) {
        dispatch(productCreateReviewFail(error.response && error.response.data.message
            ? error.response.data.message
            : error.message))
    }
}

export const listTopProducts = () => async (dispatch) => {
    try {
        dispatch(productTopRequest());

        const { data } = await axios.get(`/api/products/top`);

        dispatch(productTopSuccess(data));
    } catch (error) {
        dispatch(productTopFail(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
}
