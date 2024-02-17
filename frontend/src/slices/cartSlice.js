// Import necessary functions/modules from external libraries

import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

/* Check if there is any existing cart data in localStorage,
 and use it as the initial state if available */
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress:{}, paymentMethod:"paypal" };

// Create a Redux slice for managing the cart state
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Reducer function to handle adding items to the cart
    addToCart: (state, action) => {
      // Extract the payload (item to be added) from the action
      const item = action.payload;

      // Check if the item to be added already exists in the cart
      const existItem = state.cartItems.find((x) =>
       x._id === item._id);
       

      /* If the item exists, update its quantity; 
      otherwise, add it to the cart*/
      if (existItem) {
        state.cartItems = state.cartItems.map((x) => 
        (x._id === existItem._id ? item : x));
      } else {
        state.cartItems = [...state.cartItems, item];
      };

      // Use the updateCart function to perform additional cart-related updates and return the updated state
      return updateCart(state);
    },
    removeFromCart:(state, action)=>{
const item=action.payload;
state.cartItems=state.cartItems.filter((x)=>x._id !==item);
return updateCart(state);
    },
  saveShippingAddress:(state, action)=>{
state.shippingAddress=action.payload;
return updateCart(state)
  },
  savePaymentMethod:(state, action)=>{
state.paymentMethod=action.payload;
return updateCart(state)
  },
  clearCartItems:(state, action)=>{
    state.cartItems=[];
    return updateCart(state)
  }
  },
 
});

// Export the addToCart action and the reducer function for use in other parts of the application
export const { addToCart, removeFromCart,
   saveShippingAddress, savePaymentMethod, clearCartItems} = cartSlice.actions;
export default cartSlice.reducer;
