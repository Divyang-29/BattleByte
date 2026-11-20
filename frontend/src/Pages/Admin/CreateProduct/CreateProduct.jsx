import { useState } from "react";
import axios from "axios";
import "./CreateProduct.css";

export default function CreateProduct() {
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    discounted_price: "",
    quantity: "",
    category: "",
    tag: "",
    description: "",
    additional_information: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      data.append("primary_image", image);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io"}/api/products`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Product created successfully!");
      console.log(res.data);

    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Product creation failed");
    }
  };

  return (
    <div className="create-product">
      <h2>Create Product</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Product Title"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="discounted_price"
          placeholder="Discounted Price"
          onChange={handleChange}
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          onChange={handleChange}
        />

        <input
          type="text"
          name="tag"
          placeholder="Tag"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        ></textarea>

        <textarea
          name="additional_information"
          placeholder="Additional Information"
          onChange={handleChange}
        ></textarea>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />

        <button type="submit">
          Create Product
        </button>

      </form>
    </div>
  );
}