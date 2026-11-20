import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminOrders.css";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io"}/orders/admin`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const changeStatus = async (id, status) => {
    await axios.put(
      `${import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io"}/orders/admin/${id}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchOrders();
  };

  return (
    <div className="admin-orders">

      <h2>Orders</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
            <th>Payment</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{order.username}</td>
              <td>₹{order.total}</td>
              <td>
                <select
                  value={order.order_status}
                  onChange={(e) =>
                    changeStatus(order.id, e.target.value)
                  }
                >
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td>{order.payment_status}</td>
              <td>
                {new Date(order.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}