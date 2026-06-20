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

      alert("Login Failed");

    }
  };

  return (

    <div className="auth-page">

      <div className="auth-shell">

        <div className="auth-visual">

          <span className="eyebrow">
            Welcome back
          </span>

          <h1>
            Sign in for a faster, cleaner shopping experience.
          </h1>

          <p>
            Pick up where you left off, track your orders, and keep your cart ready with a smoother account flow.
          </p>

          <div className="auth-points">
            <div className="auth-point">Curated product access</div>
            <div className="auth-point">Quick order review</div>
            <div className="auth-point">Secure dashboard access</div>
          </div>

        </div>

        <div className="auth-card">

          <h2>Login</h2>

          <p className="auth-subtitle">
            Use your account to continue shopping.
          </p>

          <form onSubmit={handleSubmit} className="auth-form">

            <input
              type="email"
              placeholder="Email"
              className="form-control"
              onChange={(e)=>
                setEmail(e.target.value)
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="form-control"
              onChange={(e)=>
                setPassword(e.target.value)
              }
            />

            <button
              className="auth-btn"
            >
              Login
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Login;