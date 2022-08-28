import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, FormControl} from 'react-bootstrap'
import Rating from '../commponents/Rating'
import { listProductDetails } from '../actions/productActions'
import Loader from '../commponents/Loader'
import Message from '../commponents/Message'


const ProductScreen = ( {history, match}) => {
  const [qty, setQty] = useState(1)

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() =>{
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }
  

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? <Loader /> : error ? <Message variant = 'danger'>{error}</Message> : (
        <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid /> 
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
                />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup.Item>
              <Row>
                <Col>Price:</Col>
                <Col>
                  <strong>${product.price}</strong>
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Status:</Col>
                <Col>
                  {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                </Col>
              </Row>
            </ListGroup.Item>
          
            {product.countInStock > 0 && (
              <ListGroup.Item>
                <Row>
                  <Col>Quantity</Col>
                  <Col>
                    <FormControl 
                      as = 'select' 
                      value = {qty} 
                      onChange = {(e) => setQty(e.target.value)}
                    >
                       {[...Array(product.countInStock).keys()].map(x => (
                        <option key = {x + 1} value = {x + 1}>
                          {x + 1}
                        </option>
                       ))}
                    </FormControl>
                  </Col>
                </Row>
              </ListGroup.Item>
            )}

            <ListGroup.Item>
              <Button 
                onClick = {addToCartHandler}
                className='btn-block' 
                type='button'
                disabled={product.countInStock ===0}
                >
                Add To Cart
              </Button>
            </ListGroup.Item>
          </Card>
        </Col>
      </Row>
      )} 
    </>
  )
}

export default ProductScreen
//fluid kako bi slika bila zadrzana u kontejneru
//[...Array(product.countInStock).keys()] ovaj niz predstavljao kao npr da imamo niz od 5 clana pisalo bi [0,1,2,3,4], predstavlja kolicini Qty in Stock
//key use when i create list.  We ser key to x+1 because array starts with 0 and we wnat 1,2,3..
//inside option for text displays and also be x+1