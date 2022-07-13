import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import CartContext from "../store/CartContext";
import Loader from "./Loader";
const ProductDetails = () => {
  const [details, setDetails] = useState({});
  const [loader, setLoader] = useState(false);
  const params = useParams();
  const id = params.id;
  const cartCtx = useContext(CartContext);
  useEffect(() => {
    const fetchDetail = async () => {
      setLoader(true);
      const res = await fetch(
        `https://webstore-1a3fb-default-rtdb.firebaseio.com/details/${id}.json`
      );
      const data = await res.json();
      setDetails(data);
      setLoader(false);
    };
    fetchDetail();
  }, [id]);
  const addItemToCartHandler = (item) => {
    cartCtx.addItem({
      ...item,
      id: id,
      amount: 1,
      amountSum: item.price
    });
  };
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6">
          <img src={details.image} alt={details.title} />
        </div>
        <div className="col-md-6">
          <h2>{details.title}</h2>
          <p>{details.description}</p>
          <h2>Price: {details.price}</h2>
          {/* <button
            className="btn btn-success"
            onClick={() => cartCtx.addItem(details)}
          >
            Add to cart
          </button> */}
          <button
            className="btn btn-success"
            onClick={addItemToCartHandler.bind(null, details)}
          >
            Add to cart
          </button>
        </div>
      </div>
      {loader && <Loader />}
    </div>
  );
};
export default ProductDetails;
