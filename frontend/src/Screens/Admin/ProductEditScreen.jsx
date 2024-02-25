import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useGetSingleProductQuery, useUpdateProductMutation } from '../../slices/productApiSlice'

import FormContainer from '../../components/FormContainer'
import Loader from '../../components/Loader'
import Message from '../../components/message'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

const ProductEditScreen = () => {
    const {id:productId}=useParams();
    const [name, setName]=useState("");
    const [price, setPrice]=useState(0);
    const [image, setImage]=useState("");
    const [category, setCategory]=useState("");
    const [countInStock,setCountInStock]=useState(0);
    const [description, setDescription]=useState("")
    const [brand, setBrand]=useState("")

    const {data:product, isLoading,refetch, error}=useGetSingleProductQuery(productId);
   const [updateProduct, {isLoading:loadingUpdate}]=useUpdateProductMutation();
   const navigate=useNavigate();
   
   useEffect(()=>{
if(product){
setName(product.name);
setCategory(product.category)
setPrice(product.price);
setImage(product.image);
setCountInStock(product.countInStock);
setDescription(product.description);
setBrand(product.brand);
}
   },[product]);

   const submitHandler=async(e)=>{
e.preventDefault();
const updatedProduct={
  productId, 
  name,
  price,
  brand,
  category,
  countInStock,
  description
};
const result=await updateProduct(updatedProduct);
if(result.error){
toast.error(result.error)
}else{
  toast.success("Product update");
  navigate('/admin/productList')
}
   }
  return (
    <>
    <Link to ='/admin/productList' className='btn btn-light my-3'>
    Go Back
    
    </Link>
    <FormContainer>
      <h1>Edit Product</h1>
      {loadingUpdate && <Loader/>}
      {isLoading?<Loader/>:error?<Message variant='danger'>
        {error}
        </Message>:(
          <Form onSubmit={submitHandler}>
            <FormGroup controlId='name' className='my-2'>
              <FormLabel>Name</FormLabel>
              <FormControl type='text' placeholder='Enter your name'
          value={name} onChange={(e)=>setName(e.target.value)}>

          </FormControl>

            </FormGroup>

            <FormGroup controlId='price' className='my-2'>
              <FormLabel>Price</FormLabel>
              <FormControl type='number' placeholder='Enter Price'
          value={price} onChange={(e)=>setPrice(e.target.value)}>

          </FormControl>
            </FormGroup>
            <FormGroup controlId='brand' className='my-2'>
              <FormLabel>Brand</FormLabel>
              <FormControl type='text' placeholder='Enter brand'
          value={brand} onChange={(e)=>setBrand(e.target.value)}>


          </FormControl>

            </FormGroup>
            <FormGroup controlId='countInStock' className='my-2'>
              <FormLabel>Count In Stock</FormLabel>
              <FormControl type='number' placeholder='Count in Stock'
          value={countInStock} onChange={(e)=>setCountInStock(e.target.value)}>


          </FormControl>

            </FormGroup>
        

            <FormGroup controlId='category' className='my-2'>
              <FormLabel>Category</FormLabel>
              <FormControl type='category' placeholder='Enter Category'
          value={category} onChange={(e)=>setCategory(e.target.value)}>


          </FormControl>

            </FormGroup>
            <FormGroup controlId='description' className='my-2'>
              <FormLabel>Description</FormLabel>
              <FormControl type='description' placeholder='Enter Description'
          value={description} onChange={(e)=>setDescription(e.target.value)}>


          </FormControl>

            </FormGroup>
         <Button type='submit' 
         variant='primary'
          className='my-2'>
          Update
         </Button>
          </Form>
        )}

    </FormContainer>
    </>
  )
}

export default ProductEditScreen
