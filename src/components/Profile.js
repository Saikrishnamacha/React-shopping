import React, { useContext } from "react";
import CartContext from "../store/CartContext";
const Profile = () => {
  const ctx = useContext(CartContext);
  return (
    <div className="d-flex justify-content-center align-items-center">
      <h1>Hello {ctx.user} Welcome to the Store</h1>
    </div>
  );
};

export default Profile;
