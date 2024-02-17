import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import CheckoutStep from '../components/CheckoutStep'
import FormContainer from '../components/FormContainer'
import React from 'react'
import { saveShippingAddress } from '../slices/cartSlice'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const ShippingScreen = () => {
    const cart=useSelector((state)=>state.cart)
const {shippingAddress}=cart
    const [address, setAddress]=useState(shippingAddress?.address || "");
    const [city, setCity]=useState(shippingAddress?.city || "");
    const [country, setCountry]=useState(shippingAddress?.country || "")
    const [postalCode, setPostalCode]=useState(shippingAddress?.postalCode||"")
  
   
    const dispatch=useDispatch();
    const navigate=useNavigate();

     const submitHandler=(e)=>{
        e.preventDefault();
dispatch(saveShippingAddress({address,city,country,postalCode}));
navigate("/payment")
    }
  return (
   <FormContainer>
    <CheckoutStep step1 step2/>
    <h1>Shipping</h1>
<Form onSubmit={submitHandler}>
<FormGroup controlId='address' className='my-2'>
    <FormLabel>Address</FormLabel>
    <FormControl type='text' placeholder='Enter Address' value={address}
    onChange={(e)=>setAddress(e.target.value)}>

    </FormControl>

</FormGroup>
<FormGroup controlId='city' className='my-2'>
<FormLabel> City</FormLabel>
<FormControl type='text' placeholder='Enter City' value={city}
onChange={(e)=>setCity(e.target.value)}>


</FormControl>
</FormGroup>
<FormGroup controlId='postalCode' className='my-2'>
<FormLabel>Postal Code</FormLabel>
<FormControl type='text' placeholder='Enter Postal Code' value={postalCode}
onChange={(e)=>setPostalCode(e.target.value)}>


</FormControl>
</FormGroup>

<FormGroup controlId='country' className='my-2'>
<FormLabel>Country</FormLabel>
<FormControl type='text' placeholder='Enter Country' value={country}
onChange={(e)=>setCountry(e.target.value)}>


</FormControl>
</FormGroup>
<Button type='submit' variant='primary' className='my-2'>
    Continue</Button>

</Form>
    
   </FormContainer>
  )
}

export default ShippingScreen
