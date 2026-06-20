import { useCallback, useEffect, useState } from "react";

import api from "../services/api";

import ProductCard from "../components/ProductCard";

function Products() {

  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(async () => {

    try {

      const res =
      await api.get("/products");

      setProducts(res.data);

    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="page-shell">

      <header className="page-header">

        <span className="page-header__eyebrow">
          Catalog
        </span>

        <h2 className="page-header__title">
          All Products
        </h2>

        <p className="page-header__copy">
          Browse the latest collection, compare items at a glance, and open any product for a refined detail view.
        </p>

      </header>

      <div className="row g-4">

        {
          products.map((product) => (

            <div
              className="col-md-3 mb-4"
              key={product._id}
            >
              <ProductCard
                product={product}
              />
            </div>

          ))
        }

      </div>

    </div>
  );
}

export default Products;