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

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    console.log('Login form submitted', { email, password });
    setLoading(true);
    // temporary visible feedback for debugging
    const flash = document.createElement('div');
    flash.textContent = 'Submitting...';
    flash.style.position = 'fixed';
    flash.style.top = '12px';
    flash.style.right = '12px';
    flash.style.padding = '8px 12px';
    flash.style.background = '#111';
    flash.style.color = '#fff';
    flash.style.zIndex = 9999;
    document.body.appendChild(flash);

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
    setLoading(false);
    setTimeout(()=> flash.remove(), 1200);
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
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Login;