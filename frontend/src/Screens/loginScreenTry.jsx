import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import React from 'react';
import { USER_URL } from "../constant"; // Added constant import
import axios from 'axios'; // Added axios import
import { toast } from 'react-toastify';
import { useState } from 'react'; // Removed unnecessary imports

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${USER_URL}/auth`, 
      { email, password });
      
      // Dispatch action or set data to local storage, whatever is appropriate
      navigate(redirect);
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error(error.response?.data?.message || error.message || "An error occurred");
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup controlId='email' className='my-3'>
          <FormLabel>Email Address</FormLabel>
          <FormControl type='email' placeholder='Enter email' value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </FormGroup>

        <FormGroup controlId='password' className='my-3'>
          <FormLabel>Password</FormLabel>
          <FormControl type='password' placeholder='Enter password' value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </FormGroup>
        <Button type="submit" variant='primary' className='mt-2'>
          Sign In
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
