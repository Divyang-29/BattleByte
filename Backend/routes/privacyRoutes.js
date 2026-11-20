const express = require("express");
const {
  addPrivacy,
  fetchPrivacy,
  fetchPrivacyById,
} = require("../controllers/privacyController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

/* PUBLIC */
router.get("/", fetchPrivacy);
router.get("/:id", fetchPrivacyById);

/* ADMIN */
router.post("/", authMiddleware, adminMiddleware, addPrivacy);

module.exports = router;