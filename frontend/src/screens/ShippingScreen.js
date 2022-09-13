import React, { useState } from 'react'
import { Button, Form} from 'react-bootstrap'
//import useDispatch and useSelector so we can deal with our redux state
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../commponents/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'


//history - our props, we just want history beacuse we're goinng to want to, when we submit the form,
//we're going to want to redirect our push to our payment screen
const ShippingScreen = ({ history }) => {
    const cart = useSelector (state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        //after dispatch I want to move to the next page
        history.push('/payment');
    }


  return (
    <FormContainer>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter address' 
                    //value is name from the state
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}
                ></Form.Control>
            </Form.Group>

                <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter city' 
                    //value is name from the state
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='postalCode'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter postal code' 
                    //value is name from the state
                    value={postalCode}
                    required
                    onChange={(e) => setPostalCode(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Enter country' 
                    //value is name from the state
                    value={country}
                    required
                    onChange={(e) => setCountry(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default ShippingScreen
