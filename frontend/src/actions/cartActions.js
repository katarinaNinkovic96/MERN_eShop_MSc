import axios from 'axios'
import { cartAddItem, cartRemoveItem, cartSaveShippingAddress } from '../reducers/cartReducers'


export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);
    const { _id, name, image, price, countInStock } = data;

    dispatch(cartAddItem({
        product: _id,
        name,
        image,
        price,
        countInStock,
        qty
    }));

    localStorage.setItem(`cartItems`, JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch(cartRemoveItem({
        id
    }));

    localStorage.setItem(`cartItems`, JSON.stringify(getState().cart.cartItems))
}


//we import axios because when we add an item to the cart, we want to make a request to API products and
//   then yhe ID to get the fields to get the data for that particular product toadd to our cart


export const saveShippingAddress = (data) => (dispatch) => {
    dispatch(cartSaveShippingAddress({
        data
    }));

    localStorage.setItem(`shippingAddress`, JSON.stringify(data))
}
