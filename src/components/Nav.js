import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import CartContext from "../store/CartContext";
const Nav = () => {
  const cartCtx = useContext(CartContext);
  const numberOfCartItems = cartCtx.items.reduce((total, item) => {
    return total + item.amount;
  }, 0);
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          Logo
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mynavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="mynavbar"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                Products
              </NavLink>
            </li>
            <li>
              <Link to="/cart">
                <i className="fa fa-shopping-cart" style={{ padding: "0 5px" }}>
                  <span style={{ padding: "0 5px" }}>{numberOfCartItems}</span>
                </i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Nav;
