import { useState } from "react";
import axios from "axios";
import "./AdminAdvertisement.css";

export default function AdminAddAdvertisement() {
  const token = localStorage.getItem("token");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io"}/api/advertisements`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Advertisement Uploaded Successfully!");
      setImage(null);
    } catch (error) {
      console.log(error.response?.data);
      alert("Error uploading advertisement");
    }
  };

  return (
    <div className="admin-ad-page">

      <h2>Add Advertisement</h2>

      <form onSubmit={handleSubmit} className="ad-form">

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        {image && (
          <div className="ad-preview">
            <img src={URL.createObjectURL(image)} alt="preview" />
          </div>
        )}

        <button type="submit">
          Upload Advertisement
        </button>

      </form>

    </div>
  );
}