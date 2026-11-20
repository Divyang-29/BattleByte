const Tournament = require("../models/tournamentModel");

const createTournament = async (req, res) => {
  try {
    const { title, match_date, platform, total_slots, watch_link } = req.body;

    const team1_image = req.files["team1_image"][0].filename;
    const team2_image = req.files["team2_image"][0].filename;

    const tournament = await Tournament.createTournament(
      title,
      team1_image,
      team2_image,
      match_date,
      platform,
      total_slots,
      watch_link
    );

    res.status(201).json(tournament);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.getAllTournaments();
    res.json(tournaments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTournament,
  getTournaments,
};