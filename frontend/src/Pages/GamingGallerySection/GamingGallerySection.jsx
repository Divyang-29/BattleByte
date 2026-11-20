import React, { useEffect, useState } from "react";
import "./GamingGallerySection.css";

export default function GamingGallerySection() {
  const [images, setImages] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io"}/api/gallery`)
      .then((res) => res.json())
      .then((data) => {
        setImages(data?.data || []);
      })
      .catch((err) => {
        console.error("Error fetching gallery:", err);
        setImages([]);
      });
  }, []);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <section className="gallery-wrapper">
      <div className="container">
        <div className="row">
          {images.slice(0, visibleCount).map((item) => (
            <div className="col-lg-4 col-md-6 mb-4" key={item.id}>
              <div className="gallery-card">
                <img
                  src={`${import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io"}/uploads/${item.image}`}
                  alt="Gaming"
                  className="img-fluid"
                />
              </div>
            </div>
          ))}
        </div>

        {visibleCount < images.length && (
          <div className="text-center mt-4">
            <button className="gallery-load-btn" onClick={loadMore}>
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
