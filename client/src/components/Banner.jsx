import { Link } from "react-router-dom";

function Banner() {
  return (
    <section
      className="container-fluid py-5"
      style={{
        background:
          "linear-gradient(135deg,#F8F9FF,#EEF1FF)",
      }}
    >
      <div className="container">

        <div className="row align-items-center">

          <div className="col-md-6">

            <h1
              className="fw-bold"
              style={{
                color:"#333",
                fontSize:"3rem"
              }}
            >
              Welcome To ShopVerse
            </h1>

            <p
              className="mt-3"
              style={{
                color:"#666",
                fontSize:"1.1rem"
              }}
            >
              Discover amazing products,
              exciting discounts and a
              seamless shopping experience.
            </p>

            <Link
              to="/products"
              className="btn btn-primary mt-3"
            >
              Shop Now
            </Link>

          </div>

          <div className="col-md-6 text-center">

            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da"
              alt="Banner"
              className="img-fluid rounded"
            />

          </div>

        </div>

      </div>
    </section>
  );
}

export default Banner;