import { useState } from "react";
import axios from "axios";
import "./AdminFAQ.css";

export default function AdminAddFAQ() {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io"}/api/faq`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("FAQ Created Successfully!");
      setForm({ title: "", content: "" });

    } catch (error) {
      console.log(error.response?.data);
      alert("Error creating FAQ");
    }
  };

  return (
    <div className="admin-faq-page">

      <h2>Add FAQ</h2>

      <form onSubmit={handleSubmit} className="faq-form">

        <input
          name="title"
          placeholder="FAQ Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="content"
          placeholder="FAQ Content"
          value={form.content}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Add FAQ
        </button>

      </form>

    </div>
  );
}