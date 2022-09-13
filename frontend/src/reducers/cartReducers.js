import { createSlice } from '@reduxjs/toolkit';

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []


const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}



const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    reducers: {
        cartAddItem: (state, action) => {
            const item = action.payload
            const existItem = state.cartItems.find((x) => x.product === item.product)

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) => 
                        x.product === existItem.product ? item : x),
                }
            } else {
                return{
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        },
        cartRemoveItem: (state, action) => {
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload.id)
            }
        },

        cartSaveShippingAddress: (state, action) => {
            return {
                ...state,
                shippingAddress: action.payload
            }
        },

        cartSavePaymentMethod: (state, action) => {
            return {
                ...state,
                paymentMethod: action.payload
            }
        }
    }
});

export const cartReducer = cartSlice.reducer;
export const { cartAddItem, cartRemoveItem, cartSaveShippingAddress, cartSavePaymentMethod} = cartSlice.actions;
