import { Button, Col, FormControl, FormGroup, FormLabel, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import {FaTimes} from "react-icons/fa"
import { Form } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/message'
import React from 'react'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'
import { useGetMyOrdersQuery } from '../slices/orderApiSlice'
import { useNavigate } from 'react-router-dom'
import { useProfileMutation } from '../slices/userApiSlice'

const ProfileScreen = () => {
    const [name, setName]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [confirmPassword, setConfirmPassword]=useState("");
    const dispatch=useDispatch();
    const {userInfo}=useSelector((state)=>state.auth);
    const [updateProfile, {isLoading:loadingUpdateProfile}]=useProfileMutation();
    const {data:orders, isLoading:myOrdersLoading,error}=useGetMyOrdersQuery()
    console.log(orders)
    useEffect(()=>{
      if(userInfo){
        setName(userInfo.name);
        setEmail(userInfo.email);
      }
    },[userInfo, userInfo.name, userInfo.email]);

    const submitHandler=async(e)=>{
      e.preventDefault();
      if(password!==confirmPassword){
        toast.error("Password do not match")
      }else{
        try {
        const res=updateProfile({
          _id:userInfo._id, name, email, password
        }).unwrap(); 
        dispatch(setCredentials(res))
        toast.success("Profile Updated")
        } catch (error) {
          toast.error(error?.data?.Message || error.error)
        }
      }
    }
  return (
   <Row>
    <Col md={3}>
      <h2>User Profile</h2>
    <Form onSubmit={submitHandler}>
      <FormGroup controlId='name' className='my-2'>
    <FormLabel>Name</FormLabel>
    <FormControl type='name' placeholder='Enter name'
    onChange={(e)=>setName(e.target.value)}>

    </FormControl>
      </FormGroup>

      <FormGroup controlId='email' className='my-2'>
    <FormLabel>Email</FormLabel>
    <FormControl type='email' placeholder='Enter Email'
    onChange={(e)=>setEmail(e.target.value)}>

    </FormControl>
      </FormGroup>

      <FormGroup controlId='password' className='my-2'>
    <FormLabel>Password</FormLabel>
    <FormControl type='password' placeholder='Enter Password'
    onChange={(e)=>setPassword(e.target.value)}>

    </FormControl>
      </FormGroup>

      <FormGroup controlId='confirmPassword' className='my-2'>
    <FormLabel>Confirm Password</FormLabel>
    <FormControl type='password' placeholder='Confirm Password'
    onChange={(e)=>setConfirmPassword(e.target.value)}>

    </FormControl>
      </FormGroup>
      <Button type='submit' variant='primary' className='my-2'>
        Update
        </Button>
        {loadingUpdateProfile&&(
          <Loader/>
        )}
      
    </Form>
    </Col>
    <Col md={9}>
    {myOrdersLoading?(
      <Loader/>
    ):error?(
      <Message variant='danger'>
        {error?.data?.message || error.error}
        </Message>
    ):(
<Table striped bordered hover responsive className='table-sm'>
  <thead>
    <tr>
      <th>ID</th>
      <th>DATE</th>
      <th>TOTAL</th>
      <th>PAID</th>
      <th>DELIVERED</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
  {orders.map((order) => (
    <tr key={order._id}>
      <td>{order._id}</td>
      <td>{order.createdAt.substring(0, 10)}</td>
      <td>${order.totalPrice}</td>
      <td>
        {order.isPaid ? (
          order.paidAt.substring(0, 10)
        ) : (
          <FaTimes style={{ color: "red" }} />
        )}
      </td>
    </tr>
  ))}
</tbody>

</Table>
    )}
    </Col>
   </Row>
  )
}

export default ProfileScreen
