import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io"}/admin/stats`);

        // Safe mapping
        setStats({
          totalOrders: res.data.totalOrders || 0,
          totalProducts: res.data.totalProducts || 0,
          totalUsers: res.data.totalUsers || 0
        });

      } catch (err) {
        console.error("Dashboard Error:", err);
        setError("Failed to load stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="dashboard">Loading stats...</div>;
  }

  if (error) {
    return <div className="dashboard">{error}</div>;
  }

  return (
    <div className="dashboard">
      <div className="stats-grid">

        <div className="stat-card">
          <h4>Total Orders</h4>
          <h2>{stats.totalOrders}</h2>
        </div>

        <div className="stat-card">
          <h4>Total Products</h4>
          <h2>{stats.totalProducts}</h2>
        </div>

        <div className="stat-card">
          <h4>Total Users</h4>
          <h2>{stats.totalUsers}</h2>
        </div>

      </div>
    </div>
  );
}