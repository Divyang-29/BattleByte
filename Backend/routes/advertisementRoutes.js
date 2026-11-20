const express = require("express");
const {
  addAdvertisement,
  fetchAdvertisements,
} = require("../controllers/advertisementController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

/* PUBLIC */
router.get("/", fetchAdvertisements);

/* ADMIN */
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  addAdvertisement
);

module.exports = router;