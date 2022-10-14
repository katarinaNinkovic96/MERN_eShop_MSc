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
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductManageScreen from './screens/ProductManageScreen';
import OrderListScreen from './screens/OrderListScreen';
import EmailActivationScreen from './screens/EmailActivationScreen';

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} /> 
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/admin/productlist' component={ProductListScreen} exact />
          <Route path='/admin/productlist/:pageNumber' component={ProductListScreen} exact />
          <Route path='/admin/product/:id/edit' component={ProductManageScreen} />
          <Route path='/admin/product/create' component={ProductManageScreen} />
          <Route path='/admin/orderlist' component={OrderListScreen} />
          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} exact />
          <Route path='/auth/account/activate/:token' component={EmailActivationScreen} />
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

