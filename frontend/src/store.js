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

import {configureStore } from '@reduxjs/toolkit';
import {productReducer, productDetailsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer } from './reducers/userReducers'

const store = configureStore({
  reducer: {
    productList: productReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer

  }
});

export default store;
