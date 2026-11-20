import { useEffect, useState } from "react";
import "./LatestNews.css";

export default function LatestNews() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io"}/api/blogs`)
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="latest-news-section">
      <div className="container">
        <div className="news-header">
          <h2>Latest Torado News</h2>
          <button className="view-all-btn">View All</button>
        </div>

        <div className="row">
          {blogs.slice(0, 4).map((blog) => (
            <div className="col-lg-3 col-md-6" key={blog.id}>
              <div className="news-card">
                <div className="news-image">
                  <img
                    src={`${import.meta.env.VITE_API_URL || "https://battlebyte.130-210-12-68.sslip.io"}/uploads/${blog.primary_image}`}
                    alt="blog"
                  />
                </div>

                <div className="news-content">
                  <h5>{blog.short_description}</h5>
                  <p>
                    Torado Sport •{" "}
                    {new Date(blog.publish_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}