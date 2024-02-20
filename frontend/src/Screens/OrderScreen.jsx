import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import React, { useEffect } from 'react';
import { useGetOrderDetailsQuery, useGetPayClientIdQuery, usePayOrderMutation } from '../slices/orderApiSlice';

import Loader from '../components/Loader';
import Message from '../components/message';
import {toast} from 'react-toastify';
import { useSelector } from 'react-redux';

const OrderScreen = () => {
    const { id: orderId } = useParams();
    const { data: order, refetch, isLoading, isError } = useGetOrderDetailsQuery(orderId);

    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
    const { userInfo } = useSelector((state) => state.auth);
    const { data: paypal, isLoading: loadingPaypal, error: errorPaypal } = useGetPayClientIdQuery();

    useEffect(() => {
        if (!errorPaypal && !loadingPaypal && paypal.clientId) {
            const loadPayPalScript = async () => {
                paypalDispatch({
                    type: "resetOptions",
                    value: {
                        'clientId': paypal.clientId,
                        currency: "USD"
                    }
                });
                paypalDispatch({
                    type: "setLoadingStatus",
                    value: "pending"
                })
            }
            if (order && order.isPaid) {
                if (!window.paypal) {
                    loadPayPalScript();
                }
            }
        }
    }, [order, paypal, paypalDispatch, loadingPaypal, errorPaypal])

    
    async function onApproveTest() {
      await payOrder({
        orderId,
        details:{
          payer:{}
        }
      });
      refetch();
      toast.success("Payment was successful")
    }
    function onApprove(data, actions){
  return actions.order.capture().then(async function(details){
try {
  await payOrder({
    orderId,
    details
  });
  refetch();
  toast.success("Payment was successful")
} catch (error) {
  toast.error(error?.data?.message || error.message)
}
  })
  };
  const onError = () => {
    // Handle test payment approval
};
function createOrder(data, actions){
  return actions.order.create({
    purchase_units:[
      {
        amount:{
          value:order.totalPrice
        },
      }
  
    ]
    }
  ).then((orderId)=>{
    return orderId
  })
};

    return isLoading ? <Loader /> : isError ? <Message variant='danger'>Error loading order</Message> : (
        <>
            <h1>Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong> {order.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong>{order.user.email}
                            </p>
                            <p>
                                <strong>Address: </strong>{order.shippingAddress.address}{' '}
                                {order.shippingAddress.city}{' '} {order.shippingAddress.postalCode}
                                {' '}{order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (<Message variant='success'>Delivered on
                                {order.deliveredAt}</Message>) : (<Message variant='danger'>
                                    Not delivered
                                </Message>)}

                        </ListGroupItem>
                        <ListGroupItem>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (<Message variant='success'>
                                Paid on {order.paidAt}
                            </Message>) : (<Message variant='danger'>Not Paid</Message>)}
                        </ListGroupItem>
                        <ListGroupItem>
                            <h2>Order Items</h2>
                            {order.orderItems.map((item, index) => (
                                <ListGroupItem key={index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={4}>
                                            {item.qty} X ${item.price} = ${item.qty * item.price}
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            ))}
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
                                        Items:
                                    </Col>
                                    <Col>
                                        ${order.itemsPrice}
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>
                                        Shipping:
                                    </Col>
                                    <Col>
                                        ${order.shippingPrice}
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>
                                        Tax:
                                    </Col>
                                    <Col>
                                        ${order.taxPrice}
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>
                                        Total:
                                    </Col>
                                    <Col>
                                        ${order.totalPrice}
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            {!order.isPaid && (
                                <ListGroupItem>
                                    {loadingPay && <Loader />}
                                    {isPending ? <Loader /> : (
                                        <>
                                            <div>
                                                <Button
                                                    onClick={onApproveTest}
                                                    style={{ marginBottom: "10px" }}
                                                >
                                                    Test pay Order
                                                </Button>
                                            </div>
                                            <div>
                                          <PayPalButtons
                                          createOrder={createOrder}
                                          onApprove={onApprove}
                                          onError={onError}
                                          >

                                          </PayPalButtons>
                                            </div>
                                        </>
                                    )}

                                </ListGroupItem>
                            )}

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default OrderScreen;
