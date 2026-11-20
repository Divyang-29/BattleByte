import { useEffect, useState } from "react";
import { fetchWithCache, API_URL } from "../../../config/api";
import "./ProductsSection.css";

export default function ProductsSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchWithCache(`${API_URL}/api/products`)
      .then((data) => setProducts(data || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="products-section">
      <div className="container">
        <div className="products-header">
          <h2>Explore Our Products</h2>
          <button className="view-btn">View All</button>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                className="product-img"
                src={`${API_URL}/uploads/${product.primary_image}`}
                alt={product.title}
                loading="lazy"
                decoding="async"
              />

              <h5 className="product-title">{product.title}</h5>

              <div className="price">
                <span className="old-price">${product.price}</span>
                <span className="new-price">${product.discounted_price}</span>
              </div>

              <button className="cyber-btn">Add To Cart</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
