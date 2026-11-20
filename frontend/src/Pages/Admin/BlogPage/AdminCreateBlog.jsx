import { useState } from "react";
import axios from "axios";
import "./AdminCreateBlog.css";

export default function AdminCreateBlog() {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    short_description: "",
    publish_date: "",
    section_title: "",
    section_description: "",
    quote: "",
    text_content: "",
    category_ids: "",
    tag_ids: "",
  });

  const [images, setImages] = useState({
    primary_image: null,
    image1: null,
    image2: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages({
      ...images,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // text fields
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    // images
    formData.append("primary_image", images.primary_image);
    formData.append("image1", images.image1);
    formData.append("image2", images.image2);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io"}/api/blogs`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Blog Created Successfully!");
    } catch (error) {
      console.log(error.response?.data);
      alert("Error creating blog");
    }
  };

  return (
    <div className="admin-blog-page">
      <h2>Create New Blog</h2>

      <form onSubmit={handleSubmit} className="blog-form">

        <input
          name="short_description"
          placeholder="Short Description"
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="publish_date"
          onChange={handleChange}
          required
        />

        <input
          name="section_title"
          placeholder="Section Title"
          onChange={handleChange}
          required
        />

        <textarea
          name="section_description"
          placeholder="Section Description"
          onChange={handleChange}
          required
        />

        <input
          name="quote"
          placeholder="Quote"
          onChange={handleChange}
        />

        <textarea
          name="text_content"
          placeholder="Full Blog Content"
          onChange={handleChange}
          required
        />

        <input
          name="category_ids"
          placeholder='Category IDs (example: [1,2])'
          onChange={handleChange}
          required
        />

        <input
          name="tag_ids"
          placeholder='Tag IDs (example: [1,3])'
          onChange={handleChange}
          required
        />

        <label>Primary Image</label>
        <input
          type="file"
          name="primary_image"
          onChange={handleImageChange}
          required
        />

        <label>Image 1</label>
        <input
          type="file"
          name="image1"
          onChange={handleImageChange}
          required
        />

        <label>Image 2</label>
        <input
          type="file"
          name="image2"
          onChange={handleImageChange}
          required
        />

        <button type="submit" className="submit-btn">
          Publish Blog
        </button>

      </form>
    </div>
  );
}