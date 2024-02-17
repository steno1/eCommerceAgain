import {
  Button,
  Card,
  Col,
  FormControl,
  Image,
  ListGroup,
  ListGroupItem,
  Row
} from 'react-bootstrap';
import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import Loader from '../components/Loader.js';
import Message from '../components/message.jsx';
import Rating from '../components/Rating.jsx';
import { addToCart } from '../slices/cartSlice.js';
import { useDispatch } from 'react-redux';
import { useGetSingleProductQuery } from '../slices/productApiSlice';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ProductScreen = () => {
  const { id: productId } = useParams();
  const { data: productItem, isLoading, error } = useGetSingleProductQuery(productId);
  const [qty, setQty] = useState(1);
  
const dispatch=useDispatch();
const navigate=useNavigate();

  const addToCartHandler=()=>{
dispatch(addToCart({
  ...productItem,
  qty
}));
navigate("/cart")
  }
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          <div>{error.data.message || error.error}</div>
        </Message>
      ) : (
        <>
          <Link className="btn btn-light my-3" to="/">
            Go Back
          </Link>

          <Row>
            <Col md={5}>
              <Image src={productItem.image} alt={productItem.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup>
                <ListGroupItem>
                  <h3>{productItem.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating value={productItem.rating} text={`${productItem.numReviews} reviews`} />
                </ListGroupItem>
                <ListGroupItem>
                  <strong>Description: </strong>
                  {productItem.description}
                </ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price</Col>
                      <Col>
                        <strong>${productItem.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroupItem>
                    <Row>
                      <Col>Status</Col>
                      <Col>
         <strong>{productItem.countInStock > 0 ? 'In Stock' : 'Out of stock'}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  {productItem.countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <FormControl
                            as="select"
                            value={qty}
                 onChange={(e) => setQty(Number(e.target.value))}
                          >
   {[...Array(productItem.countInStock).keys()].map((count) => (
                   <option key={count + 1} value={count + 1}>
                                {count + 1}
                              </option>
                            ))}
                          </FormControl>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}
                  <ListGroupItem>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={productItem.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
