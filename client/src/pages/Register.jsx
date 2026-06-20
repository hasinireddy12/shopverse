import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Auth.css";

function Register() {

  const navigate = useNavigate();

  const [formData,setFormData] =
  useState({
    name:"",
    email:"",
    password:"",
    phone:""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
      e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post(
        "/users/register",
        formData
      );

      navigate("/login");

      alert(
        "Registration Success"
      );

    } catch {

      alert(
        "Registration Failed"
      );

    }
  };

  return (

    <div className="auth-page">

      <div className="auth-shell">

        <div className="auth-visual">

          <span className="eyebrow">
            Create your account
          </span>

          <h1>
            Join ShopVerse and start shopping with style.
          </h1>

          <p>
            Save favorites, place orders faster, and get access to a cleaner storefront built for modern browsing.
          </p>

          <div className="auth-points">
            <div className="auth-point">One clean shopping profile</div>
            <div className="auth-point">Easy order tracking</div>
            <div className="auth-point">Smooth admin separation</div>
          </div>

        </div>

        <div className="auth-card">

          <h2>Register</h2>

          <p className="auth-subtitle">
            Create your account in a few quick steps.
          </p>

          <form onSubmit={handleSubmit} className="auth-form">

            <input
              type="text"
              name="name"
              placeholder="Name"
              className="form-control"
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control"
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              className="form-control"
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control"
              onChange={handleChange}
            />

            <button
              className="auth-btn"
            >
              Register
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Register;