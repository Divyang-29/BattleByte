const express = require("express");
const {
  addLiveStream,
  fetchLiveStreams,
} = require("../controllers/liveStreamController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

/* PUBLIC */
router.get("/", fetchLiveStreams);

/* ADMIN */
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.fields([
    { name: "banner_image", maxCount: 1 },
    { name: "streamer_image", maxCount: 1 },
  ]),
  addLiveStream
);

module.exports = router;