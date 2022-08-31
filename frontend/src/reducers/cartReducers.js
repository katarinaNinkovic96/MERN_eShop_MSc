import { createSlice } from '@reduxjs/toolkit';

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: cartItemsFromStorage
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
        }
    }
});

export const cartReducer = cartSlice.reducer;
export const { cartAddItem, cartRemoveItem} = cartSlice.actions;