import axios from 'axios'
import {productListRequest, productListSuccess, productListFail} from '../reducers/productSlice';

export const listProducts = () => async (dispatch) => {
    try {
        dispatch(productListRequest());

        const { data } = await axios.get('/api/products');

        dispatch(productListSuccess(data));
    } catch (error) {
        dispatch(productListFail(error.response && error.response.data.message ? error.response.data.message : error.message))
    }
}