import React from 'react';
import { Route } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import Header from "./commponents/Header";
import Footer from "./commponents/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} /> 
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;

///cart/:id?  --- ? because id is going to be optional so we can puut a question mark to make this optional, because
//      when we just go to the cart link, it is not going to have any ID in it