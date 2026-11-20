const express = require("express");
const {
  addCategory,
  fetchCategories,
} = require("../controllers/categoryController");

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", fetchCategories);
router.post("/", auth, admin, addCategory);

module.exports = router;