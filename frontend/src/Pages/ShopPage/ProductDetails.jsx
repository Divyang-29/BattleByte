import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Single product error:", err));
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:8080/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product_id: product.id,
        quantity: Number(quantity),
      }),
    });

    navigate("/cart");
  };

  if (!product) return <div className="product-wrapper">Loading...</div>;

  return (
    <section className="product-wrapper">
      <div className="container">
        <div className="product-top">
          {/* LEFT IMAGE */}
          <div className="product-image">
            <img
              src={`http://localhost:8080/uploads/${product.primary_image}`}
              alt={product.title}
            />
          </div>

          {/* RIGHT DETAILS */}
          <div className="product-info">
            <h2 className="product-title">{product.title}</h2>

            <div className="product-price">
              <span className="old-price">${product.price}</span>
              <span className="new-price">${product.discounted_price}</span>
            </div>

            <p className="short-desc">
              {product.description?.description?.slice(0, 200)}...
            </p>

            <div className="quantity-row">
              <label>Quantity:</label>
              <input
                type="number"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <button className="add-cart-btn-lg" onClick={handleAddToCart}>
              Add To Cart
            </button>

            <div className="product-meta">
              <p>
                <strong>Category:</strong> {product.category}
              </p>
              <p>
                <strong>Tags:</strong> {product.tag}
              </p>
            </div>
          </div>
        </div>

        {/* TABS SECTION */}
        <div className="product-tabs">
          <div className="tab-headers">
            <button
              className={activeTab === "description" ? "active" : ""}
              onClick={() => setActiveTab("description")}
            >
              DESCRIPTION
            </button>

            <button
              className={activeTab === "additional" ? "active" : ""}
              onClick={() => setActiveTab("additional")}
            >
              ADDITIONAL INFORMATION
            </button>

            <button
              className={activeTab === "reviews" ? "active" : ""}
              onClick={() => setActiveTab("reviews")}
            >
              REVIEWS ({product.reviews?.length || 0})
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "description" && (
              <p>{product.description?.description}</p>
            )}

            {activeTab === "additional" && (
              <p>{product.additional_information?.information}</p>
            )}

            {activeTab === "reviews" && <p>No reviews yet.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
