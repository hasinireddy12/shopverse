import { useCallback, useEffect, useMemo, useState } from "react";

import api from "../services/api";

import ProductCard from "../components/ProductCard";

function Products() {

  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

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

  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [products]);

  const visibleProducts = useMemo(() => {
    let list = products.slice();

    if (selectedCategory && selectedCategory !== "All") {
      list = list.filter(p => p.category === selectedCategory);
    }

    if (sortOption === "price_desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortOption === "price_asc") {
      list.sort((a, b) => a.price - b.price);
    }

    return list;
  }, [products, sortOption, selectedCategory]);

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

      <div className="mb-3 d-flex gap-2 align-items-center">
        <label className="muted-text">Category:</label>
        <select className="form-control" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <label className="muted-text">Sort:</label>
        <select className="form-control" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="">Default</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="price_asc">Price: Low to High</option>
        </select>
      </div>

      <div className="row g-4">

        {
          visibleProducts.map((product) => (

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