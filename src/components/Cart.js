import React, { useContext, useEffect } from "react";
import CartContext from "../store/CartContext";
const Cart = () => {
  const cartCtx = useContext(CartContext);
  const increaseItemHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const decreaseItemHandler = (item) => {
    cartCtx.removeItem({ ...item, amount: 1 });
  };
  const itemsAvailable = cartCtx.items.reduce(
    (total, item) => total + item.amount,
    0
  );
  const cartItems = cartCtx.items;
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  const removeCartItemHandler = (item) => {
    cartCtx.removeCartItem({ ...item });
  };
  return (
    <div className="container mt-5">
      <div className="row">
        {itemsAvailable === 0 && (
          <div className="align-items-center d-flex justify-content-center">
            <h3>Your Cart is Empty</h3>
          </div>
        )}
        {itemsAvailable > 0 && (
          <div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {cartCtx.items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: "150px" }}
                      />
                    </td>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    {/* <td>{item.quantity}</td> */}
                    <td>
                      <button
                        className="btn btn-secondary"
                        onClick={decreaseItemHandler.bind(null, item)}
                      >
                        -
                      </button>
                      <span className="p-2">{item.amount}</span>
                      <button
                        className="btn btn-secondary"
                        onClick={increaseItemHandler.bind(null, item)}
                      >
                        +
                      </button>
                    </td>
                    <td>
                      {item.amountSum}
                      <i
                        className="fa fa-trash"
                        aria-hidden="true"
                        style={{
                          float: "right",
                          margin: "3px",
                          cursor: "pointer",
                        }}
                        onClick={removeCartItemHandler.bind(null, item)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-lg-end">{cartCtx.totalAmount.toFixed(2)}</div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Cart;
