import {Col, Container, Row} from "react-bootstrap"

import React from 'react'

const Footer = () => {
  const currentYear=new Date().getFullYear();
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
        <p>StenoMarket &copy;{currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
