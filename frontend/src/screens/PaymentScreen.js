// it's actually a payment method to screen. This isn't where we make the payment, 
//this is where we choose the payment method

import React, { useState } from 'react'
import { Button, Form, Col} from 'react-bootstrap'
//import useDispatch and useSelector so we can deal with our redux state
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../commponents/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'
import ChechoutSteps from '../commponents/ChechoutSteps'


//history - our props, we just want history beacuse we're goinng to want to, when we submit the form,
//we're going to want to redirect our push to our payment screen
const PaymentScreen = ({ history }) => {
    const cart = useSelector (state => state.cart)
    const { shippingAddress } = cart

    //if don't have shippingAddress back to shipping
    if(!shippingAddress) {
        history.push('/shipping');
    }

    //default PayPal
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod));
        //after dispatch I want to move to the next page
        history.push('/placeorder');
    }


  return (
    <FormContainer>
        <ChechoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
            <Col>
                <Form.Check
                    type='radio'
                    label='PayPal or Credit Card'
                    id='PayPal'
                    name='paymentMethod'
                    value='PayPal'
                    checked
                    onChange = {(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>

                {/*If we want to have more payment methods
                <Form.Check
                    type='radio'
                    label='Stripe'
                    id='Stripe'
                    name='paymentMethod'
                    value='Stripe'
                    onChange = {(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>   */}
            </Col>
            </Form.Group>
            <Button type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen
