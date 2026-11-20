const express = require("express");
const {
  addSponsor,
  fetchSponsors,
} = require("../controllers/sponsorController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

/* PUBLIC */
router.get("/", fetchSponsors);

/* ADMIN */
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  addSponsor
);

module.exports = router;