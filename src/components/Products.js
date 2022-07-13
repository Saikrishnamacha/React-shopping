import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      const res = await fetch(
        "https://webstore-1a3fb-default-rtdb.firebaseio.com/products.json"
      );
      const data = await res.json();
      const transformedData = [];
      for (let item in data) {
        const product = {
          id: item,
          title: data[item].title,
          price: data[item].price,
          image: data[item].image
        };
        transformedData.push(product);
      }
      setProducts(transformedData);
      setLoader(false);
    };
    fetchData();
  }, []);
  // console.log(parms);
  return (
    <div className="container mt-5">
      <div className="row">
        {products.map((product) => {
          return (
            <div key={product.id} className="col-md-4">
              {/* <Link to={product.title.split(" ").join("-").toLowerCase()}> */}
              <Link to={product.id}>
                <div>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="img-fluid"
                    style={{ height: "420px" }}
                  />
                </div>
                <div>{product.title}</div>
                <div>{product.price}</div>
              </Link>
            </div>
          );
        })}
      </div>
      {loader && <Loader />}
    </div>
  );
};
export default Products;
