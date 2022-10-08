import { createSlice } from '@reduxjs/toolkit';

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const paymentMethodFormLocalStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : {}

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFormLocalStorage,
    },
    reducers: {
        cartAddItem: (state, action) => {
            const item = action.payload
            const existItem = state.cartItems.find((x) => x.product === item.product)

            if (existItem) {
                state.cartItems = state.cartItems.map((x) => x.product === existItem.product ? item : x);
            } else {
                state.cartItems = [...state.cartItems, item];
            }
        },
        cartRemoveItem: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x.product !== action.payload.id);
        },
        cartSaveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload
        },
        cartSavePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
        },
        cartReset: (state) => {
            state.cartItems = [];
            state.shippingAddress = '';
            state.paymentMethod = '';
        }
    }
});

export const cartReducer = cartSlice.reducer;
export const { cartAddItem, cartRemoveItem, cartSaveShippingAddress, cartSavePaymentMethod, cartReset } = cartSlice.actions;
