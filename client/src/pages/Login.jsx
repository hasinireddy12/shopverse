import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext.js";
import api from "../services/api";
import "../styles/Auth.css";

function Login() {

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email,setEmail] =
  useState("");

  const [password,setPassword] =
  useState("");

  const [loading, setLoading] = useState(false);
  const [flash, setFlash] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    console.log('Login form submitted', { email, password });
    setLoading(true);
    setFlash(true);

    try {

      const res =
      await api.post(
        "/users/login",
        {
          email,
          password
        }
      );

      // update auth context and localStorage
      login(res.data);

      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/products");
      }

      alert("Login Success");

    } catch (error) {

      console.error('Login failed', error);
      alert("Login Failed");

    }
    setLoading(false);
    setTimeout(()=> setFlash(false), 1200);
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

          {flash && (
            <div style={{
              position: 'fixed',
              top: 12,
              right: 12,
              padding: '8px 12px',
              background: '#111',
              color: '#fff',
              zIndex: 9999,
              borderRadius: 6
            }}>
              Submitting...
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Login;