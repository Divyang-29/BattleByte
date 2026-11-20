const express = require("express");
const {
  addTag,
  fetchTags,
} = require("../controllers/tagController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

/* PUBLIC */
router.get("/", fetchTags);

/* ADMIN */
router.post("/", authMiddleware, adminMiddleware, addTag);

module.exports = router;