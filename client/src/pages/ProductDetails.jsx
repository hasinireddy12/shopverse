import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import api from "../services/api";

function ProductDetails() {

  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  const fetchProduct = useCallback(async () => {

    try {

      const res =
        await api.get(`/products/${id}`);

      setProduct(res.data);

    } catch (error) {

      console.log(error);

    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const addToCart = async () => {

    try {

      const user =
        JSON.parse(
          localStorage.getItem("user")
        );

      if (!user) {
        alert("Please Login First");
        return;
      }

      await api.post(
        "/cart/add",
        {
          userId: user._id,
          productId: product._id,
          quantity: 1
        }
      );

      alert("Added To Cart");

    } catch (error) {

      console.log(error);

    }
  };

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="page-shell">

      <header className="page-header">

        <span className="page-header__eyebrow">
          Product details
        </span>

        <h2 className="page-header__title">
          Explore the product
        </h2>

        <p className="page-header__copy">
          A cleaner product view with stronger imagery, clearer pricing, and a more premium call to action.
        </p>

      </header>

      <div className="detail-grid">

        <div className="detail-media">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid"
          />
        </div>

        <div className="detail-panel">

          <span className="status-pill mb-3">
            {product.category || "Featured"}
          </span>

          <h2>{product.title}</h2>

          <p className="detail-description">
            {product.description}
          </p>

          <div className="price-row my-4">

            <h3 className="mb-0">₹ {product.price}</h3>

            <span className="chip">
              In stock
            </span>

          </div>

          <p className="muted-text">Category: {product.category}</p>

          <p className="muted-text">Stock: {product.stock}</p>

          <p className="muted-text">Discount: {product.discount}%</p>

          <button
            className="btn btn-primary action-button mt-3"
            onClick={addToCart}
          >
            Add To Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;