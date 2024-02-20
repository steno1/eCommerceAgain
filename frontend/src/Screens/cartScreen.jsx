import {
    Button,
    Card,
    Col,
    FormControl,
    Image,
    ListGroup,
    ListGroupItem,
    Row
} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { addToCart, removeFromCart } from '../slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux'

import { FaTrash } from 'react-icons/fa'
import Message from '../components/message'
import React from 'react'

const CartScreen = () => {
    const {cartItems}=useSelector((state)=>state.cart)
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const addToCartHandler=async (product, qty)=>{
dispatch(addToCart({
  ...product,
  qty
}))
    }
    const deleteCartHandler=async(productId)=>{
      dispatch(removeFromCart(productId))
    }
    const checkOutHandler=()=>{
      navigate("/login?redirect=/shipping")
    }
  return (
    <div>
      <Row>
        <Col md={8}>
        <h1 style={{marginBottom:"20px"}}>Shopping Cart</h1>
        {cartItems.length===0?(
     <Message variant='danger'>
Your cart is empty <Link to="/">Go Back</Link>
     </Message>
        ):(
            <ListGroup variant='flush'>
                {cartItems.map((item)=>(
                    <ListGroupItem key={item._id}>
                        <Row>
                            <Col md={2}>
                            <Image src={item.image} fluid rounded/>
                            </Col>

                            <Col md={3}>
              <Link to={`/product/${item._id}`}>{item.name}</Link>
                            </Col>

                            
                            <Col md={2}>
                       ${item.price}
                            </Col>
                            
                            <Col md={2}>
                            <FormControl
                            as="select"
                            value={item.qty}
                 onChange={(e) =>addToCartHandler(item, Number(e.target.value))}
                          >
   {[...Array(item.countInStock).keys()].map((count) => (
                   <option key={count + 1} value={count + 1}>
                                {count + 1}
                              </option>
                            ))}
                          </FormControl>
            
                            </Col>
                            <Col md={2}>
                <Button type='button' variant='light' 
                onClick={()=>
                  deleteCartHandler(item._id)
                }>
                              <FaTrash/>
                            </Button>
                            </Col>
                            
                        </Row>

                    </ListGroupItem>
                ))}


            </ListGroup>
        )}
        </Col>

        <Col md={4}>
                            <Card>
                              <ListGroup variant="flush">

                                <ListGroupItem>
                     <h2>Subtotal {cartItems.reduce((acc, item)=>acc+item.qty,0)}  Items
                                  </h2>
              ${cartItems.reduce((acc, item)=>acc+item.qty*item.price,0).toFixed(2)}
                                </ListGroupItem>
                                <ListGroupItem>
                         <Button type='button'
              className='btn-block' disabled={cartItems.length===0}
              onClick={checkOutHandler}>
                                Proceed to Checkout
                                  </Button>
                                </ListGroupItem>
                              </ListGroup>
                            </Card>
                            </Col>
        
        
      </Row>
    </div>
  )
}

export default CartScreen
