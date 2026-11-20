const {
  createMatch,
  getMatches,
} = require("../models/matchModel");

/* ADMIN - ADD MATCH */
const addMatch = async (req, res) => {
  try {
    const { match_date } = req.body;

    if (!match_date || !req.files?.image1 || !req.files?.image2) {
      return res.status(400).json({
        message: "Match date and both images are required",
      });
    }

    const image1 = req.files.image1[0].filename;
    const image2 = req.files.image2[0].filename;

    const match = await createMatch(image1, image2, match_date);

    res.status(201).json({
      message: "Upcoming match created successfully",
      data: match,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* PUBLIC - GET MATCHES */
const fetchMatches = async (req, res) => {
  try {
    const matches = await getMatches();
    res.json({
      count: matches.length,
      data: matches,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addMatch,
  fetchMatches,
};