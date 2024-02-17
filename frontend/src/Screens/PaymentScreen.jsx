import { Button, Col, Form, FormCheck, FormGroup, FormLabel } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CheckoutStep from '../components/CheckoutStep';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('Paypal');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const {shippingAddress} = cart;

    useEffect(() => {
        if (!shippingAddress) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    };

    return (
        <FormContainer>
            <CheckoutStep step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <FormGroup>
                    <FormLabel as="legend">Select Method</FormLabel>
                    <Col>
                        <FormCheck
                            type="radio"
                            className="my-2"
                            label="Paypal or Credit card"
                            id="paypal"
                            name="paymentMethod"
                            value="Paypal"
                            checked={paymentMethod === 'Paypal'}
                 onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                    </Col>
                </FormGroup>
        <Button type="submit" variant="primary" className="my-2">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};

export default PaymentScreen;
