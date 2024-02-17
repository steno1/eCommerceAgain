import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import React from 'react';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import { useRegisterUserMutation } from '../slices/userApiSlice';

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword]=useState("")
  const [name, setName]=useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if(password !==confirmPassword){
        toast.error("Password does not match")
    }else{
        try {
            const res = await registerUser({ email, password, name }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
          } catch (error) {
            console.error("Error occurred:", error);
            toast.error(error?.data?.message || error?.message || "An error occurred");
          }
    }
  
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={submitHandler}>
      <FormGroup controlId='name' className='my-3'>
          <FormLabel>Name</FormLabel>
          <FormControl type='text' placeholder='Enter Name' value={name}
            onChange={(e) => setName(e.target.value)} />
        </FormGroup>

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

        <FormGroup controlId='password' className='my-3'>
          <FormLabel>Confirm Password</FormLabel>
          <FormControl type='password' 
          placeholder='Re-enter password' value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} />
        </FormGroup>
        <Button type="submit" variant='primary'
          className='mt-2' disabled={isLoading}>
          Register
        </Button>
        {isLoading && <Loader />}
      </Form>
      <Row className='py-3'>
        <Col>
           Already a Customer? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
