import { PayPalButton } from 'react-paypal-button-v2'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import React, { useEffect } from 'react'
import { Row, Col, ListGroup, Image, Card, Button} from 'react-bootstrap'

//import useDispatch and useSelector so we can deal with our redux state
import { useDispatch, useSelector } from 'react-redux'
import Message from '../commponents/Message'
import Loader from '../commponents/Loader'
import { Link } from 'react-router-dom'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions';
import { orderPayReset, orderDeliverReset } from '../reducers/orderReducers';
import { getPaypalId } from '../actions/paypalIdActions';
import { paypalIdReset } from '../reducers/paypalIdReducer';

const OrderScreen = ({ match, history }) => {
    const orderId = match.params.id;

    const dispatch = useDispatch();
    
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;
    
    const orderPay = useSelector((state) => state.orderPay);
    //beacuse we have loading in orderDetails we just rename this loading: loadingPay
    const { loading: loadingPay, success: successPay } = orderPay;

    const orderDeliver = useSelector((state) => state.orderDeliver);
    //beacuse we have loading in orderDetails we just rename this loading: loadingPay
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const paypalId = useSelector((state) => state.paypalId);

    useEffect(() => {
        if (paypalId.error) {
            dispatch(paypalIdReset())
        }
        if (!paypalId.ppId) {
            dispatch(getPaypalId());
        }

        if (!userInfo) {
            history.push('/login');
        }

        //check for the order and also make sure that the order ID matches the ID in the URL.
        //if it does not, then dispatch getOrderDetails() to fetch the most recent order
        if (!order || successPay || successDeliver) {
            //without orderPayReset when we Pay, it's just going to keep refreshing
            dispatch(orderPayReset());
            dispatch(orderDeliverReset());
            dispatch(getOrderDetails(orderId));
        } else if (order._id !== orderId) {
            dispatch(getOrderDetails(orderId));
        }
    }, [dispatch, paypalId, order, successPay, successDeliver, orderId, userInfo, history])

    //where we want to call that pay order action that we created
    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult);
        dispatch(payOrder(orderId, paymentResult));
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order));
    }
   
    return (
        paypalId.error ? <Message variant='danger'>{paypalId.error}</Message> :
        !paypalId.ppId ? <Loader/> :
        <PayPalScriptProvider
            options={{
                "client-id" : `${paypalId.ppId}`,
                "currency" : "EUR",
                "components" : "buttons"
            }}
        >
            { loading ?
            <Loader /> : error ?
            <Message variant='danger'>{error}</Message> :
            <>
                <h1>Order {order._id}</h1>
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name: </strong> {order.user.email}
                                </p>
                                <p>
                                    <strong>Email: </strong> {' '}
                                    <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                                </p>
                                <p>
                                    <strong>Address:</strong>
                                    {order.shippingAddress.address},
                                    {order.shippingAddress.city},
                                    {order.shippingAddress.postalCode},
                                    {order.shippingAddress.country}
                                </p>
                                { order.isDelivered ?
                                <Message variant='success'>Delivered on {order.deliveredAt}</Message> :
                                <Message variant='danger'>Not Delivered</Message> }
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Method: </strong>
                                    {order.paymentMethod}
                                </p>
                                { order.isPaid ?
                                <Message variant='success'>Paid on {order.paidAt}</Message> :
                                <Message variant='danger'>Not Paid</Message> }
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                { (order.orderItems.length === 0) ?
                                <Message>Order is empty</Message> :
                                <ListGroup variant='flush'>
                                    { order.orderItems.map((item, index) => (
                                        <ListGroup.Item key = {index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x {item.price}€ = {item.qty * item.price}€
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )) }
                                </ListGroup> }
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Order Summary</h2>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>{order.itemsPrice}€</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>{order.shippingPrice}€</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>{order.taxPrice}€</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>{order.totalPrice}€</Col>
                                    </Row>
                                </ListGroup.Item>

                                { !order.isPaid && <ListGroup.Item>
                                    { loadingPay && <Loader /> }
                                    <PayPalButton
                                        amount={order.totalPrice}
                                        currency="EUR"
                                        onSuccess={successPaymentHandler}
                                    />
                                </ListGroup.Item> }

                                { loadingDeliver && <Loader /> }
                                { userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && <ListGroup.Item>
                                    <Button
                                        type='button'
                                        className='btn btn-block'
                                        onClick={deliverHandler}
                                    >
                                        Mark As Delivered
                                    </Button>
                                </ListGroup.Item> }
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </> }
        </PayPalScriptProvider>
    );
}

export default OrderScreen;
