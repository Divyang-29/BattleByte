const express = require("express");
const {
  addFAQ,
  fetchFAQs,
  fetchFAQById,
} = require("../controllers/faqController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

/* PUBLIC */
router.get("/", fetchFAQs);
router.get("/:id", fetchFAQById);

/* ADMIN */
router.post("/", authMiddleware, adminMiddleware, addFAQ);

module.exports = router;