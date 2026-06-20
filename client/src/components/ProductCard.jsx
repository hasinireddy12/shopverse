import { Link } from "react-router-dom";
import "../styles/ProductCard.css";

function ProductCard({ product }) {

  return (
    <div className="product-card">

      <div className="product-media">

        <img
          src={product.image}
          alt={product.title}
          className="product-img"
        />

        <span className="product-badge">
          {product.category || "Featured"}
        </span>

      </div>

      <div className="product-body">

        <p className="product-kicker">
          Premium pick
        </p>

        <h5>{product.title}</h5>

            <p className="product-description">
              {product.description}
            </p>

            <div className="product-meta">

              {product && product.discount > 0 ? (
                <div className="price-block">
                  <span className="price discounted">
                    ₹ {Math.round(product.price * (1 - product.discount / 100))}
                  </span>
                  <span className="original-price">
                    ₹ {product.price}
                  </span>
                </div>
              ) : (
                <p className="price">₹ {product.price}</p>
              )}

              <span className="stock-chip">
                Ready to ship
              </span>

            </div>

        <Link
          to={`/product/${product._id}`}
          className="shop-btn"
        >
          View Details
        </Link>

      </div>

    </div>
  );
}

export default ProductCard;