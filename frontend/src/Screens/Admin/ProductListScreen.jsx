import { Button, Col, Row, Table } from 'react-bootstrap'
import {FaEdit, FaTrash} from "react-icons/fa"

import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../../components/Loader'
import Message from '../../components/message'
import React from 'react'
import { toast } from 'react-toastify'
import { useCreateOrderMutation } from '../../slices/orderApiSlice'
import { useGetProductsQuery } from '../../slices/productApiSlice'

const ProductListScreen = () => {
    const {data:products, isLoading, error, refetch}=useGetProductsQuery();
    const deleteHandler=(productId)=>{
       console.log("delete product", productId) 
    }
   const [createProduct, {isLoading:createProductLoading}]=useCreateOrderMutation()
  const createProductHandler=async()=>{
if(window.confirm("Are you sure you want to create a new Product?")){
try {
    await createProduct();
    refetch();
} catch (error) {
    toast.error(error?.data?.message || error.message)
}
}
  }
  
   return (
    <>
    <Row className='align-items-center'>
        <Col>
        <h1>Products</h1>
        </Col>
        <Col className='text-end'>
            <Button className='btn-sm-m-3'
             onClick={createProductHandler}>
                <FaEdit/> Create Product
            </Button>
        
        </Col>
    </Row>
    {createProductLoading&& <Loader/>}
    {isLoading?<Loader/>:error?<Message variant='danger'>
        {error}
        </Message>:(
            <>
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th></th>
                </tr>

                </thead>
                <tbody>
                {products.map((product)=>(
                    <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>
              <LinkContainer to={`/admin/product/${product._id}/edit`}>
              <Button variant='light' className='btn-sm mx-2'>

                <FaEdit/>
              </Button>
                        </LinkContainer >
 <Button variant='danger' className='btn-sm mx-2'
  onClick={()=>deleteHandler(product._id)}>

                <FaTrash style={{color:"white"}}/>
                </Button>
                        </td>
                    </tr>
                ))}
            

                </tbody>
            </Table>
            </>
          
        )}
    </>
  )
}

export default ProductListScreen
