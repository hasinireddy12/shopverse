import { useCallback, useEffect, useState } from "react";

import api from "../services/api";

function Orders() {

  const [orders,setOrders] =
    useState([]);

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const fetchOrders = useCallback(async () => {

      try {

        const res =
          await api.get(
            `/orders/user/${user._id}`
          );

        setOrders(res.data);

      } catch (error) {

        console.log(error);

      }
    }, [user]);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [fetchOrders, user]);

  return (
    <div className="page-shell">

      <header className="page-header">

        <span className="page-header__eyebrow">
          Purchase history
        </span>

        <h2 className="page-header__title">
          My Orders
        </h2>

        <p className="page-header__copy">
          Review completed purchases with a cleaner status presentation and stronger hierarchy.
        </p>

      </header>

      <div className="stack-list">

        {
          orders.map(order => (

            <div
              key={order._id}
              className="order-card"
            >

              <div className="summary-row mb-2">

                <h5 className="mb-0">
                  Order ID: {order._id}
                </h5>

                <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
                  <span className="status-pill">
                    {order.status}
                  </span>
                  <span className="status-pill" style={{background: order.paid ? '#198754' : '#6c757d'}}>
                    {order.paid ? 'Paid' : 'Not Paid'}
                  </span>
                </div>

              </div>

              <p className="muted-text mb-2">
                Amount: ₹ {order.totalAmount}
              </p>

              <p className="muted-text">
                Address: {order.address}
              </p>

            </div>

          ))
        }

      </div>

    </div>
  );
}

export default Orders;