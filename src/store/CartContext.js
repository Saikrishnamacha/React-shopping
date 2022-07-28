import React from "react";
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  login: () => {},
  logout: () => {},
  isLoggedIn: null,
  user: null,
  removeCartItem: (item) => {},
});
export default CartContext;
