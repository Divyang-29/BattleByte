const express = require("express");
const {
  addGalleryImage,
  fetchGalleryImages,
} = require("../controllers/galleryController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

/* PUBLIC ROUTE */
router.get("/", fetchGalleryImages);

/* ADMIN ROUTE */
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  addGalleryImage
);

module.exports = router;