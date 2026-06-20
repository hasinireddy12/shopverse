import { useState } from "react";
import api from "../services/api";

function Checkout() {

  const [address,setAddress] =
    useState("");

  const [paymentMethod,
    setPaymentMethod] =
    useState("COD");

  const placeOrder = async () => {

    try {

      const user =
        JSON.parse(
          localStorage.getItem("user")
        );

      if (!user) {
        alert("Please login first");
        return;
      }

      if (user.role === "admin") {
        alert("Admins are not allowed to place orders");
        return;
      }

      const cartRes =
        await api.get(
          `/cart/${user._id}`
        );

      const cart =
        cartRes.data;

      let totalAmount = 0;

      cart.products.forEach(item => {

        totalAmount +=
          item.productId.price *
          item.quantity;

      });

      await api.post(
        "/orders",
        {
          userId: user._id,
          products: cart.products,
          address,
          paymentMethod,
          totalAmount
        }
      );

      alert(
        "Order Placed Successfully"
      );

      window.location.href =
        "/orders";

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div className="page-shell">

      <header className="page-header">

        <span className="page-header__eyebrow">
          Secure payment
        </span>

        <h2 className="page-header__title">
          Checkout
        </h2>

        <p className="page-header__copy">
          Finish your order through a polished, distraction-free checkout experience.
        </p>

      </header>

      <div className="checkout-grid">

        <div className="checkout-panel">

          <h4 className="mb-4">Shipping details</h4>

          <input
            type="text"
            placeholder="Address"
            className="form-control mb-3"
            onChange={(e)=>
              setAddress(
                e.target.value
              )
            }
          />

          <select
            className="form-control mb-3"
            onChange={(e)=>
              setPaymentMethod(
                e.target.value
              )
            }
          >

            <option>
              COD
            </option>

            <option>
              UPI
            </option>

            <option>
              Card
            </option>

          </select>

          <button
            className="btn btn-success w-100 action-button"
            onClick={placeOrder}
          >
            Place Order
          </button>

        </div>

        <aside className="summary-panel">

          <span className="page-header__eyebrow mb-3">
            Order perks
          </span>

          <div className="stack-list">
            <div className="list-card">
              <h5>Protected payment</h5>
              <p className="muted-text">A cleaner checkout panel keeps the path to purchase focused.</p>
            </div>

            <div className="list-card">
              <h5>Fast confirmation</h5>
              <p className="muted-text">Orders are placed with a direct confirmation flow and clear navigation.</p>
            </div>
          </div>

        </aside>

      </div>

    </div>
  );
}

export default Checkout;