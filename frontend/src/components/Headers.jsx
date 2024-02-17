import {Badge, Container, Nav, NavDropdown, Navbar} from "react-bootstrap"

import { FaShoppingCart } from "react-icons/fa";
import {LinkContainer} from "react-router-bootstrap"
import Logo from "../assets/steno_logo.jpg"
import React from 'react'
import { logout } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux"

const Headers = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const {userInfo}=useSelector((state)=>state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutApi] = useLogoutMutation();
    

    const logoutHandler=async()=>{
        
        try {
          await logoutApi().unwrap();
          dispatch(logout());
          navigate("/login")
        } catch (error) {
            console.log(error?.data?.message || error.error)
        }
    }
    
  return (
 <header>
    <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
<Container>
    <LinkContainer to="/">
    <Navbar.Brand>
        <img src={Logo}
     alt="logo" style={{height:"30px", margin:"10px",
      borderRadius:"50%"}}/>eCommerce</Navbar.Brand>
    </LinkContainer>
    
    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
    <Navbar.Collapse id='basic-navbar-nav'>
<Nav className="ms-auto">
    <LinkContainer to="/cart">
    <Nav.Link><FaShoppingCart/> Carts
    {cartItems.length > 0 && (
    <Badge pill bg='success' style={{ marginLeft: "5px" }}>
        {cartItems.reduce((acc, item) => acc + (item.qty || 0), 0)}
    </Badge>
)}


    </Nav.Link>
   
    </LinkContainer>
    {userInfo?(
        <NavDropdown title={userInfo.email} id="username">
<LinkContainer to="/profile">
    <NavDropdown.Item>
        Profile
    </NavDropdown.Item>
</LinkContainer>
<NavDropdown.Item onClick={logoutHandler}>
logout
</NavDropdown.Item>
        </NavDropdown>
    ):(<LinkContainer to="/login">
<Nav.Link><FaShoppingCart/> Sign In</Nav.Link>
</LinkContainer>)}


    
</Nav>
    </Navbar.Collapse>
</Container>
    </Navbar>
 </header>
  )
}

export default Headers
