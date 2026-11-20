import { useEffect, useState } from "react";
import "./ProductsSection.css";

export default function ProductsSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io"}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
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
                src={`${import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io"}/uploads/${product.primary_image}`}
                alt={product.title}
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
