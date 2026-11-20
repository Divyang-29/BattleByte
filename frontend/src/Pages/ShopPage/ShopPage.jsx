import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ShopPage.css";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io"}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Product fetch error:", err));
  }, []);

  return (
    <section className="shop-wrapper">
      <div className="container">
        <div className="shop-grid">
          {products.map((product) => (
            <div key={product.id} className="shop-card">
              
              <div
                className="shop-image-wrapper"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img
                  src={`${import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io"}/uploads/${product.primary_image}`}
                  alt={product.title}
                />
              </div>

              <h4 className="shop-title">
                {product.title}
              </h4>

              <div className="shop-price">
                <span className="old-price">
                  ${product.price}
                </span>
                <span className="new-price">
                  ${product.discounted_price}
                </span>
              </div>

              <button className="add-cart-btn">
                Add To Cart
              </button>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}