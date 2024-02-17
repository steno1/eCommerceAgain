export const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

// cartUtils.js
export const updateCart = (state) => {
    state.itemPrice = addDecimal(state.cartItems.reduce((acc, item) =>
     acc + item.price * item.qty, 0));
    state.shippingPrice = addDecimal(state.itemPrice > 100 ? 0 : 10);
    state.taxPrice = addDecimal(Number(state.itemPrice * 0.15).toFixed(2));
     state.totalPrice = addDecimal(Number(state.itemPrice)
      + Number(state.shippingPrice) + Number(state.taxPrice));
    
    // Save only cartItems to local storage
    localStorage.setItem("cart", JSON.stringify(state));
  return state;
  };
  