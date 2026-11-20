import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminSponsor.css";

function AdminSponsor() {
  const API = import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io";

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSponsors = async () => {
    const res = await axios.get(`${API}/sponsors`);
    setSponsors(res.data.data);
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) return alert("Please select an image");

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true);
    await axios.post(`${API}/sponsors`, formData);
    setLoading(false);

    setImage(null);
    setPreview(null);
    fetchSponsors();
  };

  return (
    <div className="admin-sponsor-container">
      <h1>Sponsor Management</h1>

      {/* Upload Form */}
      <form className="sponsor-form" onSubmit={handleSubmit}>
        <label className="file-label">
          Upload Sponsor Logo
          <input type="file" onChange={handleFileChange} required />
        </label>

        {preview && (
          <div className="preview-box">
            <img src={preview} alt="preview" />
          </div>
        )}

        <button>
          {loading ? "Uploading..." : "Add Sponsor"}
        </button>
      </form>

      {/* Sponsors Grid */}
      <div className="sponsor-grid">
        {sponsors.map((sponsor) => (
          <div className="sponsor-card" key={sponsor.id}>
            <img
              src={`${API}/uploads/${sponsor.image_path}`}
              alt="sponsor"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminSponsor;