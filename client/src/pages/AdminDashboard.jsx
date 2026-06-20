import { useCallback, useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Admin.css";

function AdminDashboard() {

  const [products,setProducts] =
  useState([]);

  const [formData,setFormData] =
  useState({
    title:"",
    description:"",
    price:"",
    image:"",
    category:"",
    stock:"",
    discount:""
  });

  const fetchProducts = useCallback(async () => {

    const res =
    await api.get("/products");

    setProducts(res.data);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleChange=(e)=>{

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value

    });

  };

  const addProduct =
  async()=>{

    await api.post(
      "/products",
      formData
    );

    fetchProducts();

    alert(
      "Product Added"
    );
  };

  const deleteProduct =
  async(id)=>{

    await api.delete(
      `/products/${id}`
    );

    fetchProducts();
  };

  return (

    <div className="page-shell admin-page">

      <div className="admin-hero">

        <span className="page-header__eyebrow">
          Store management
        </span>

        <h2 className="mb-2">
          Admin Dashboard
        </h2>

        <p>
          Manage inventory with a cleaner dashboard, polished form cards, and a stronger product grid.
        </p>

      </div>

      <div className="admin-layout">

        <div className="admin-panel">

          <h4 className="mb-3">
            Add Product
          </h4>

          <div className="admin-form">

            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={handleChange}
            />

            <input
              type="text"
              name="description"
              placeholder="Description"
              onChange={handleChange}
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              onChange={handleChange}
            />

            <input
              type="text"
              name="image"
              placeholder="Image URL"
              onChange={handleChange}
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              onChange={handleChange}
            />

            <input
              type="number"
              name="stock"
              placeholder="Stock"
              onChange={handleChange}
            />

            <input
              type="number"
              name="discount"
              placeholder="Discount"
              onChange={handleChange}
            />

            <button
              onClick={addProduct}
            >
              Add Product
            </button>

          </div>

        </div>

        <div className="admin-panel">

          <h4 className="mb-3">
            Inventory
          </h4>

          <div className="admin-products-grid">

            {
              products.map(product => (

                <div
                  key={product._id}
                  className="admin-product-card"
                >

                  <img
                    src={product.image}
                    alt={product.title}
                    height="220"
                  />

                  <h5>
                    {product.title}
                  </h5>

                  <p>
                    ₹ {product.price}
                  </p>

                  <button
                    className="btn btn-danger"
                    onClick={() =>
                    deleteProduct(
                      product._id
                    )}
                  >
                    Delete
                  </button>

                </div>

              ))
            }

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;