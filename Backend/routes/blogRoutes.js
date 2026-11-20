const express = require("express");
const {
  addBlog,
  fetchBlogs,
  fetchBlogById,
  fetchPopularBlogs,
  getSidebar
} = require("../controllers/blogController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

/* PUBLIC */
router.get("/", fetchBlogs);
router.get("/sidebar", getSidebar);
router.get("/:id", fetchBlogById);
router.get("/popular", fetchPopularBlogs);


/* ADMIN */
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.fields([
    { name: "primary_image", maxCount: 1 },
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  addBlog
);

module.exports = router;