import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminGallery.css";

function AdminGallery() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io";

  const fetchImages = async () => {
    const res = await axios.get(`${API}/gallery`);
    setGallery(res.data.data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return alert("Select an image");

    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);

    await axios.post(`${API}/gallery`, formData);

    setImage(null);
    setPreview(null);
    setLoading(false);
    fetchImages();
  };

  return (
    <div className="admin-gallery-page">

      <h2>Gallery Admin Panel</h2>

      <form className="upload-card" onSubmit={handleUpload}>

        <label className="upload-box">
          Choose Image
          <input type="file" onChange={handleFileChange} />
        </label>

        {preview && (
          <div className="preview-box">
            <img src={preview} alt="preview" />
          </div>
        )}

        <button className="upload-btn">
          {loading ? "Uploading..." : "Upload Image"}
        </button>

      </form>

      <div className="gallery-grid">
        {gallery.map((img) => (
          <div className="gallery-card" key={img.id}>
            <img
              src={`${API}/uploads/${img.image_path}`}
              alt="gallery"
            />
          </div>
        ))}
      </div>

    </div>
  );
}

export default AdminGallery;