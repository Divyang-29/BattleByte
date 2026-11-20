import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminTerms.css";

function AdminTerms() {
  const API = import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io";

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTerms = async () => {
    const res = await axios.get(`${API}/terms`);
    setTerms(res.data.data);
  };

  useEffect(() => {
    fetchTerms();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    await axios.post(`${API}/terms`, formData);
    setLoading(false);

    setFormData({ title: "", content: "" });
    fetchTerms();
  };

  return (
    <div className="admin-terms-container">
      <h1>Terms & Conditions Management</h1>

      {/* FORM */}
      <form className="terms-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Term Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="content"
          placeholder="Term Content"
          value={formData.content}
          onChange={handleChange}
          rows="6"
          required
        />

        <button>
          {loading ? "Saving..." : "Add Term"}
        </button>
      </form>

      {/* TERMS LIST */}
      <div className="terms-list">
        {terms.map((term) => (
          <div className="term-card" key={term.id}>
            <h3>{term.title}</h3>
            <p>{term.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminTerms;