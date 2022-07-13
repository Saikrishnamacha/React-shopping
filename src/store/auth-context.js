import React, { useReducer } from "react";
const initialState = {
  items: [],
  totalAmount: 0
};
const reducer = (state, action) => {
  if (action.type === "ADD_ITEM_TOCART") {
    // const cartQty = state.cartCount + 1;
    const updatedTotalAmounts =
      state.totalAmount + action.item.price * action.item.amount;
    // console.log(updatedTotalAmounts);
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
        amountSum:
          (existingCartItem.amount + action.item.amount) * action.item.price
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmounts
    };
  }
  if (action.type === "DELETE_ITEM_FROMCART") {
    // debugger;
    const existingCartItemIndex = state.items.findIndex((item) => {
      return item.id === action.item.id;
    });
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmounts = state.totalAmount - existingCartItem.price;
    console.log(existingCartItem.amount);
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
          (existingCartItem.amount - action.item.amount) * action.item.price
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmounts
    };
  }
  return initialState;
};
export const authContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {}
});

const AuthContext = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [cartCount, setCartCount] = useState(0);
  const addItemToCartHandler = (item) => {
    dispatch({
      type: "ADD_ITEM_TOCART",
      item: item
    });
  };
  const removeItemFromCartHandler = (item) => {
    dispatch({
      type: "DELETE_ITEM_FROMCART",
      item: item
    });
  };
  return (
    <authContext.Provider
      value={{
        items: state.items,
        totalAmount: state.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};
export default AuthContext;
