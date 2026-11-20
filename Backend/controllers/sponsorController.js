const {
  createSponsor,
  getAllSponsors,
} = require("../models/sponsorModel");

/* ADD SPONSOR (ADMIN) */
const addSponsor = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Sponsor image is required",
      });
    }

    const imagePath = req.file.filename;

    const newSponsor = await createSponsor(imagePath);

    res.status(201).json({
      message: "Sponsor added successfully",
      data: newSponsor,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* GET ALL (PUBLIC) */
const fetchSponsors = async (req, res) => {
  try {
    const sponsors = await getAllSponsors();

    res.json({
      count: sponsors.length,
      data: sponsors,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addSponsor,
  fetchSponsors,
};