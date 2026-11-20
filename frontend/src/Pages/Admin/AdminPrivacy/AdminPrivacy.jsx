import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPrivacy.css";

function AdminPrivacy() {
  const API = import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io";

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [privacyList, setPrivacyList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPrivacy = async () => {
    const res = await axios.get(`${API}/privacy`);
    setPrivacyList(res.data.data);
  };

  useEffect(() => {
    fetchPrivacy();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    await axios.post(`${API}/privacy`, formData);

    setFormData({ title: "", content: "" });
    setLoading(false);

    fetchPrivacy();
  };

  return (
    <div className="admin-privacy-page">

      <h2>Privacy Policy Management</h2>

      {/* FORM */}

      <form className="privacy-form" onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Policy Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="content"
          placeholder="Policy Content"
          value={formData.content}
          onChange={handleChange}
          rows="6"
          required
        />

        <button>
          {loading ? "Saving..." : "Add Privacy Policy"}
        </button>

      </form>

      {/* LIST */}

      <div className="privacy-grid">

        {privacyList.map((item) => (

          <div className="privacy-card" key={item.id}>

            <h3>{item.title}</h3>

            <p>{item.content}</p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AdminPrivacy;