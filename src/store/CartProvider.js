import { useEffect, useReducer } from "react";
import CartContext from "./CartContext";
const initialState = {
  items: JSON.parse(localStorage.getItem("cart")) || [],
  totalAmount: JSON.parse(localStorage.getItem("totalAmount")) || 0,
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
    };
  }
  return initialState;
};
const CartProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items));
  }, [state.items]);
  useEffect(() => {
    localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
  }, [state.totalAmount]);
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
  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalAmount: state.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
