// OBSOLETE IMPORTS
// import { combineReducers, applyMiddleware, createStore } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';

// OBSOLETE APPROACH
// const initialState = {};
// const reducer = combineReducers({
//   productList: productListReducer
// });
// const middleware = [thunk];
// const store = createStore(
//   reducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

import { configureStore } from '@reduxjs/toolkit';
import {
  productReducer,
  productDetailsReducer,
  productDeleteReducer,
  productManageReducer,
  productReviewCreateReducer,
  productTopRatedReducer
} from './reducers/productReducers';

import { cartReducer } from './reducers/cartReducers';
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer
} from './reducers/userReducers';

import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListMyReducer,
  orderListReducer
} from './reducers/orderReducers';

const store = configureStore({
  reducer: {
    productList: productReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productManage: productManageReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer
  }
});

export default store;

//store.js - load it from localStorage through our store.js ?????
