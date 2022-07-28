import image from "../images/banner-1.jpg";
import image1 from "../images/banner-2.jpg";
const Home = () => {
  return (
    <div id="demo" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#demo"
          data-bs-slide-to="0"
          className="active"
        ></button>
        <button
          type="button"
          data-bs-target="#demo"
          data-bs-slide-to="1"
        ></button>
      </div>

      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src={image}
            alt="Los Angeles"
            className="d-block w-100"
            style={{ height: "100vh" }}
          />
        </div>
        <div className="carousel-item">
          <img
            src={image1}
            alt="Chicago"
            className="d-block w-100"
            style={{ height: "100vh" }}
          />
        </div>
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#demo"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#demo"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
};
export default Home;
