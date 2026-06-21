import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Auth.css";

function Login() {

  const navigate = useNavigate();

  const [email,setEmail] =
  useState("");

  const [password,setPassword] =
  useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    console.log('Login form submitted', { email, password });

    try {

      const res =
      await api.post(
        "/users/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data)
      );

      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      alert("Login Success");

    } catch {

      console.error('Login failed');
      alert("Login Failed");

    }
  };

  return (

    <div className="auth-page">

      <div className="auth-shell">

        <div className="auth-visual">

          <span className="eyebrow">
            Welcome back to ShopVerse
          </span>

          <h1>
            Sign in to continue shopping
          </h1>

          <p>
            Access your account to view orders, manage your cart, and checkout faster.
          </p>

          <div className="auth-points">
            <div className="auth-point">Exclusive deals</div>
            <div className="auth-point">Order tracking</div>
            <div className="auth-point">Saved carts</div>
          </div>

        </div>

        <div className="auth-card">

          <h2>Sign in</h2>

          <p className="auth-subtitle">
            Enter your email and password to access your account.
          </p>

          <form onSubmit={handleSubmit} className="auth-form">

            <input
              type="email"
              placeholder="Email"
              className="form-control"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="form-control"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="auth-btn"
            >
              Sign in
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Login;