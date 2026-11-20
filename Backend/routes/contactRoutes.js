const express = require("express");
const {
  sendContactMessage,
  fetchContactMessages,
} = require("../controllers/contactController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

/* PUBLIC - SEND */
router.post("/", sendContactMessage);

/* ADMIN - VIEW */
router.get("/", authMiddleware, adminMiddleware, fetchContactMessages);

module.exports = router;