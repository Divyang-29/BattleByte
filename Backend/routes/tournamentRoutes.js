const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const {
  createTournament,
  getTournaments,
} = require("../controllers/tournamentController");

const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "team1_image", maxCount: 1 },
    { name: "team2_image", maxCount: 1 },
  ]),
  createTournament
);

router.get("/", getTournaments);

module.exports = router;