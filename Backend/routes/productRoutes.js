const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const {
  createProduct,
  getProducts,
  getProduct,
  addReview,
} = require("../controllers/productController");

const router = express.Router();

router.post("/", upload.single("primary_image"), createProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/:id/review", addReview);

module.exports = router;