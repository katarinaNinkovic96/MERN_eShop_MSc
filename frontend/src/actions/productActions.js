import axios from 'axios'
import {productListRequest, productListSuccess, productListFail} from '../reducers/productReducers';
import { productDetailsRequest, productDetailsSuccess, productDetailsFail } from '../reducers/productReducers';

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
