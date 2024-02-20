import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CheckoutStep from '../components/CheckoutStep';
import Loader from '../components/Loader';
import Message from '../components/message';
import { clearCartItems } from '../slices/cartSlice';
import { toast } from 'react-toastify';
import { useCreateOrderMutation } from '../slices/orderApiSlice';

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const { shippingAddress, paymentMethod, cartItems } = cart;
    const dispatch = useDispatch();

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        } else if (!paymentMethod) {
            navigate('/payment');
        }
    }, [navigate, shippingAddress, paymentMethod]);
    const [createOrder, {isLoading, error}]=useCreateOrderMutation()
    const placeOrderHandler = async () => {
        console.log('cart:', cart);
    
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice
            }).unwrap();
    
            dispatch(clearCartItems());
            navigate(`/order/${res._id}`);
        } catch (error) {
            toast.error(error.message);
        }
    };
    
    return (
        <>
        <CheckoutStep step1 step2 step3 step4/>
        <Row>
            <Col md={8}>
           <ListGroup variant='flush'>
        <ListGroupItem>

            <h2>Shipping</h2>
            <p>
                <strong>Address:</strong>
                {` `}{shippingAddress.address}, {shippingAddress.city},
                {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
        </ListGroupItem>
        <ListGroupItem>
            <strong>Method: </strong>
            {paymentMethod}
        </ListGroupItem>
        <ListGroupItem>
            <h2>Order Item</h2>
            {cartItems.length===0?(
                <Message>
                    Your cart is empty
                </Message>
            ):(
                <ListGroup variant='flush'>
                {cartItems.map((item, index) => (
                    <ListGroupItem key={index}>
                        <Row>
                            <Col md={1}>
              <Image src={item.image} alt={item.name} fluid rounded/>
                            </Col>
                            <Col>
                         <Link to={`/products/${item.product}`}>
                         {item.name}
                         
                         </Link>   
                            </Col>
                            <Col md={4}>
               {item.qty} x ${item.price}={item.qty * item.price} 
                            </Col>
                        </Row>
                    </ListGroupItem>
                ))}
            </ListGroup>
            )}
        </ListGroupItem>

           </ListGroup>
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                    <ListGroupItem>
                        <h2>Order Summary</h2>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col>
                            Items Price: 
                            </Col>
                            <Col>
                            ${cart.itemPrice}
                            </Col>
                            </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                            <Row>
                            <Col>
                            Shipping: 
                            </Col>
                            <Col>
                            ${cart.shippingPrice}
                            </Col>
                            </Row>
                            </ListGroupItem>
                           
                           <ListGroupItem>
                           <Row>
                            <Col>
                            Tax price: 
                            </Col>
                            <Col>
                            {cart.taxPrice}
                            </Col>

                            </Row>
                           </ListGroupItem>
                           <ListGroupItem>
                            <Row>
                                <Col>Total: </Col>
                                <Col>{cart.totalPrice}</Col>
                            </Row>
                           </ListGroupItem>
                           <ListGroupItem>
                           {error && <Message variant='danger'>{error.message}</Message>}

                           </ListGroupItem>
                           <ListGroupItem>
                           <Button type='button' className='btn-block'
                           disabled={cart.cartItems.length===0}
                           onClick={placeOrderHandler}>
                            Place Order
                            </Button>
                            {isLoading && 
                                <Loader/>
                            }
                           </ListGroupItem>
                         
                    </ListGroup>
                </Card>
          
            </Col>
        </Row>
        
        </>
    );
};

export default PlaceOrderScreen;
