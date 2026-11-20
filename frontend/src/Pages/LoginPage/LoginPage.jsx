import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // Save token
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        // Save role
        if (data.user?.role) {
          localStorage.setItem("role", data.user.role);
        }

        setStatus("Login successful 🔥");

        // 🔥 Redirect based on role
        if (data.role) {
          localStorage.setItem("role", data.role);
        }

        if (data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        setStatus(data.message || "Invalid credentials ❌");
      }
    } catch (error) {
      console.error("Login error:", error);
      setStatus("Server error ❌");
    }

    setLoading(false);
  };

  return (
    <section className="login-wrapper">
      <div className="container">
        <h2 className="login-heading">Login</h2>

        <form className="login-form mt-4" onSubmit={handleSubmit}>
          <label>Email or Phone</label>
          <input
            type="text"
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {status && <p className="login-status">{status}</p>}
        </form>
      </div>
    </section>
  );
}
