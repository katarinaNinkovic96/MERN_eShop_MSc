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

//first//////////////////////////////////
const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: []
    },
    reducers: {
        productListRequest: (state, action) => {
            state.loading = true;
            state.products = [];
        },
        productListSuccess: (state = { products: [] }, action) => {
            state.loading = false;
            state.products = action.payload.products;
            state.pages = action.payload.pages;
            state.page = action.payload.page;
        },
        productListFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const productReducer = productSlice.reducer;
export const { productListRequest, productListSuccess, productListFail } = productSlice.actions;

//second/////////////////////////////////////////////////////
const productDetailsSlice = createSlice({
    name: 'products',
    initialState: {
        product: { reviews: [] }
    },
    reducers: {
        productDetailsRequest: (state, action) => {
            state.loading = true;
        },
        productDetailsSuccess: (state, action) => {
            state.loading = false;
            state.product = action.payload;
        },
        productDetailsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const productDetailsReducer = productDetailsSlice.reducer;
export const { productDetailsRequest, productDetailsSuccess, productDetailsFail } = productDetailsSlice.actions;


//delete product
//again import old product from data =>   npm run data: import
const productDeleteSlice = createSlice({
    name: 'products',
    initialState: {
        
    },
    reducers: {
        productDeleteRequest: (state) => {
            state.loading = true;
        },
        productDeleteSuccess: (state) => {
            state.loading = false;
            state.success = true;
        },
        productDeleteFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const productDeleteReducer = productDeleteSlice.reducer;
export const { productDeleteRequest, productDeleteSuccess, productDeleteFail } = productDeleteSlice.actions;


//create product
const productManageSlice = createSlice({
    name: 'products',
    initialState: {
        
    },
    reducers: {
        productManageRequest: (state) => {
            state.loading = true;
        },
        productManageSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.product = action.payload;
        },
        productManageFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        productManageReset: (state) => {
            state.success = false;
        }
    }
});

export const productManageReducer = productManageSlice.reducer;
export const {
    productManageRequest,
    productManageSuccess,
    productManageFail,
    productManageReset
} = productManageSlice.actions;

//create product reviews
const productReviewCreateSlice = createSlice({
    name: 'products',
    initialState: {
    },
    reducers: {
        productCreateReviewRequest: (state, action) => {
            state.loading = true;
        },
        productCreateReviewSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
        },
        productCreateReviewFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        productCreateReviewReset: (state, action) => {
            state.success = false;
            state.error = false;
        }
    }
});

export const productReviewCreateReducer = productReviewCreateSlice.reducer;
export const {
    productCreateReviewRequest,
    productCreateReviewSuccess,
    productCreateReviewFail,
    productCreateReviewReset
} = productReviewCreateSlice.actions;


//product Top rated
const productTopRatedSlice = createSlice({
    name: 'products',
    initialState: {
        products: []
    },
    reducers: {
        productTopRequest: (state, action) => {
            state.loading = true;
            state.products = [];
        },
        productTopSuccess: (state, action) => {
            state.loading = false;
            state.products = action.payload;
        },
        productTopFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const productTopRatedReducer = productTopRatedSlice.reducer;
export const { productTopRequest, productTopSuccess, productTopFail } = productTopRatedSlice.actions;
