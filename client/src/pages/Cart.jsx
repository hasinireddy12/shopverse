import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Cart() {

  const [cart, setCart] =
    useState(null);

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const fetchCart = useCallback(async () => {

    try {

      const res =
        await api.get(
          `/cart/${user._id}`
        );

      setCart(res.data);

    } catch (error) {

      console.log(error);

    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [fetchCart, user]);

  const removeProduct =
    async (productId) => {

      await api.delete(
        `/cart/${user._id}/${productId}`
      );

      fetchCart();
    };

  if (!user) {
    return <h2>Please Login</h2>;
  }

  if (!cart) {
    return <h2>Loading...</h2>;
  }

  let total = 0;

  cart.products.forEach(item => {

    total +=
      item.productId.price *
      item.quantity;

  });

  return (
    <div className="page-shell">

      <header className="page-header">

        <span className="page-header__eyebrow">
          Shopping bag
        </span>

        <h2 className="page-header__title">
          My Cart
        </h2>

        <p className="page-header__copy">
          Review items, adjust quantities, and continue to a polished checkout.
        </p>

      </header>

      <div className="cart-layout">

        <div className="soft-list">

          {
            cart.products.map(item => (

              <div
                key={item.productId._id}
                className="cart-item"
              >

                <div className="summary-row">

                  <div>
                    <h5 className="mb-1">
                      {item.productId.title}
                    </h5>

                    <p className="muted-text">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <strong className="price">
                    ₹ {item.productId.price}
                  </strong>

                </div>

                <button
                  className="btn btn-danger mt-3"
                  onClick={() =>
                    removeProduct(
                      item.productId._id
                    )
                  }
                >
                  Remove
                </button>

              </div>

            ))
          }

        </div>

        <aside className="summary-panel">

          <span className="page-header__eyebrow mb-3">
            Order summary
          </span>

          <h4>Total: ₹ {total}</h4>

          <p className="muted-text mb-4">
            Your selected items are ready for secure checkout.
          </p>

          <Link
            to="/checkout"
            className="btn btn-success w-100"
          >
            Proceed To Checkout
          </Link>

        </aside>

      </div>

    </div>
  );
}

export default Cart;