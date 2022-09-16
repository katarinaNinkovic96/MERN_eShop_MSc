import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

//we want to take in props, we're going to be structure children
const FormContainer = ({ children }) => {
  return (

    //wrapper element is Container
    //md - medium screens, xs - extra small
    //props of children
    <Container>
        <Row className='justify-content-md-center'>
            <Col xs={12} md={6}>
                {children}
            </Col>
        </Row>
      
    </Container>
  )
}

export default FormContainer
