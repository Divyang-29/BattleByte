const express = require("express");
const {
  addTerm,
  fetchTerms,
  fetchTermById,
} = require("../controllers/termController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

/* PUBLIC */
router.get("/", fetchTerms);
router.get("/:id", fetchTermById);

/* ADMIN */
router.post("/", authMiddleware, adminMiddleware, addTerm);

module.exports = router;