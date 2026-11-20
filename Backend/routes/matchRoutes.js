const express = require("express");
const {
  addMatch,
  fetchMatches,
} = require("../controllers/matchController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

/* PUBLIC */
router.get("/", fetchMatches);

/* ADMIN */
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  addMatch
);

module.exports = router;