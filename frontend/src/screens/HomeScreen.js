import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../commponents/Product'
import Message from '../commponents/Message'
import Loader from '../commponents/Loader'
import Paginate from '../commponents/Paginate'
import { listProducts } from '../actions/productActions'
import ProductCarousel from '../commponents/ProductCarousel'
import Meta from '../commponents/Meta'


const HomeScreen = ({ match }) => {

  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() =>{
    dispatch(listProducts(keyword, pageNumber))

  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
        <h1>Products</h1>
        { loading ? (
            <Loader />
          ) : error ? (
            <Message variant = 'danger'>{error}</Message>
          ) : (
            <>
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ''}
            />
            </>
          )
        }
    </>
  )
}

export default HomeScreen