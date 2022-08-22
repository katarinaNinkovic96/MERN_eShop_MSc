// PRODUCT CONSTANTS (from productConstants.js)
// export const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST';
// export const PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS';
// export const PRODUCT_LIST_FAIL = 'PRODUCT_LIST_FAIL';

// OBSOLETE REDUCER
// export const productListReducer = (state = { products: [] }, action) => {
//     switch (action.type) {
//         case PRODUCT_LIST_REQUEST:
//             return { loading: true, products: [] };
//         case PRODUCT_LIST_SUCCESS:
//             return { loading: false, products: action.payload };
//         case PRODUCT_LIST_FAIL:
//             return { loading: false, error: action.payload };
//         default:
//             return state;
//     }
// }

import { createSlice } from '@reduxjs/toolkit';

const initialState = {};
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        productListRequest: (state, action) => {
            state.loading = true;
            state.products = [];
        },
        productListSuccess: (state, action) => {
            state.loading = false;
            state.products = action.payload;
        },
        productListFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const productReducer = productSlice.reducer;
export const { productListRequest, productListSuccess, productListFail } = productSlice.actions;
