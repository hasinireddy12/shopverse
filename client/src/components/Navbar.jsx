import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const logoutHandler = () => {

    localStorage.removeItem("user");

    navigate("/login");

    window.location.reload();

  };

  return (

    <nav className="navbar navbar-expand-lg custom-navbar">

      <div className="container">

        <Link
          className="navbar-brand brand-logo"
          to="/"
        >
          ShopVerse
        </Link>

        <div className="navbar-links">

          <Link to="/">
            Home
          </Link>

          <Link to="/products">
            Products
          </Link>

          {
            user && (
              <>
                <Link to="/cart">
                  Cart
                </Link>

                <Link to="/orders">
                  Orders
                </Link>

                <Link to="/profile">
                  Profile
                </Link>
              </>
            )
          }

          {
            user?.role === "admin" && (
              <Link to="/admin">
                Admin
              </Link>
            )
          }

          {
            !user ? (
              <>
                <Link
                  className="login-btn"
                  to="/login"
                >
                  Login
                </Link>

                <Link
                  className="register-btn"
                  to="/register"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                className="logout-btn"
                onClick={logoutHandler}
              >
                Logout
              </button>
            )
          }

        </div>

      </div>

    </nav>

  );
}

export default Navbar;