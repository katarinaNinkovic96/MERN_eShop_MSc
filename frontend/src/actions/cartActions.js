import axios from 'axios'
import { cartAddItem } from '../reducers/cartReducers'


export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: cartAddItem,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            counterInStock: data.counterInStock,
            qty
        }
    })

    localStorage.setItem(`cartItems`, JSON.stringify(getState().cart.cartItems))
}



//we import axios because when we add an item to the cart, we want to make a request to API products and
//   then yhe ID to get the fields to get the data for that particular product toadd to our cart