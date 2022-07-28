import { useEffect, useReducer } from "react";
import CartContext from "./CartContext";
const initialState = {
  items: [],
  totalAmount: 0,
  isLoggedIn: false,
  user: "",
};
const reducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingItemIndex];
    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
        amountSum:
          (existingCartItem.amount + action.item.amount) * action.item.price,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      isLoggedIn: state.isLoggedIn,
      user: state.user,
    };
  }
  if (action.type === "REMOVE") {
    const existingItemIndex = state.items.findIndex((item) => {
      return item.id === action.item.id;
    });
    const existingCartItem = state.items[existingItemIndex];
    let updatedItems;
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => {
        return item.id !== action.item.id;
      });
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
        amountSum:
          (existingCartItem.amount - action.item.amount) * action.item.price,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }
    const updatedTotalAmount =
      (state.totalAmount - action.item.price) * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      isLoggedIn: state.isLoggedIn,
      user: state.user,
    };
  }
  if (action.type === "LOGIN") {
    state.isLoggedIn = true;
    let userName = action.user.email;
    let name = userName.substring(0, userName.indexOf("@"));
    state.user = name;
    return {
      items: state.items,
      totalAmount: state.totalAmount,
      isLoggedIn: state.isLoggedIn,
      user: state.user,
    };
  }
  if (action.type === "LOGOUT") {
    state.isLoggedIn = false;
    // state.items = [];
    // state.totalAmount = 0;
    return {
      items: state.items,
      totalAmount: state.totalAmount,
      isLoggedIn: state.isLoggedIn,
      user: state.user,
    };
  }
  if (action.type === "REMOVE_CARTITEM") {
    let updatedItems = state.items.filter((item) => {
      return item.id !== action.item.id;
    });
    const updatedTotalAmount =
      state.totalAmount - action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      isLoggedIn: state.isLoggedIn,
      user: state.user,
    };
  }
  return initialState;
};
const CartProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(state.items));
  // }, [state.items]);
  // useEffect(() => {
  //   localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
  // }, [state.totalAmount]);
  // useEffect(() => {
  //   localStorage.setItem("UserLogin", JSON.stringify(state.isLoggedIn));
  // }, [state.isLoggedIn]);
  // useEffect(() => {
  //   localStorage.setItem("UserEmail", JSON.stringify(state.user));
  // }, [state.user]);
  const addItemHandler = (item) => {
    dispatch({
      type: "ADD",
      item: item,
    });
  };
  const removeItemHandler = (item) => {
    dispatch({
      type: "REMOVE",
      item: item,
    });
  };
  const loginHandler = (user) => {
    dispatch({
      type: "LOGIN",
      user: user,
    });
  };
  const logOutHandler = () => {
    dispatch({
      type: "LOGOUT",
    });
  };
  const cartRemoveItem = (item) => {
    dispatch({
      type: "REMOVE_CARTITEM",
      item: item,
    });
  };
  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalAmount: state.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        login: loginHandler,
        logout: logOutHandler,
        isLoggedIn: state.isLoggedIn,
        user: state.user,
        removeCartItem: cartRemoveItem,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
