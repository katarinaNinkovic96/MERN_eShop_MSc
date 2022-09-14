import React from 'react';
import { Route } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import Header from "./commponents/Header";
import Footer from "./commponents/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} /> 
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;

///cart/:id?  --- ? because id is going to be optional so we can puut a question mark to make this optional, because
//      when we just go to the cart link, it is not going to have any ID in it