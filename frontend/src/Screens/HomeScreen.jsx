import { Col, Row } from "react-bootstrap";

import Loader from "../components/Loader";
import Message from "../components/message";
import Product from "../components/Product";
import React from 'react';
import { useGetProductsQuery } from "../slices/productApiSlice";

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        // Loading state
        <Loader/>
      ) : error ? (
        <div>
<Message variant='danger'>
{error?.data?.message || error.error}
</Message>
          
        </div>
      ) : (
        // Render products
        <>
          <h1>Products</h1>
          <Row>
            {products.map((product, index) => (
              <Col key={index} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
