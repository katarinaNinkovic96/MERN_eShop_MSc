import React from 'react';
import { Route } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import Header from "./commponents/Header";
import Footer from "./commponents/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/product/:id' component={ProductScreen} />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
