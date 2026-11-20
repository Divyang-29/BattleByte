const pool = require("../config/db");

const createTournament = async (
  title,
  team1_image,
  team2_image,
  match_date,
  platform,
  total_slots,
  watch_link
) => {
  const result = await pool.query(
    `INSERT INTO tournaments 
    (title, team1_image, team2_image, match_date, platform, total_slots, watch_link)
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *`,
    [title, team1_image, team2_image, match_date, platform, total_slots, watch_link]
  );

  return result.rows[0];
};

const getAllTournaments = async () => {
  const result = await pool.query(
    "SELECT * FROM tournaments ORDER BY id DESC"
  );
  return result.rows;
};

module.exports = {
  createTournament,
  getAllTournaments,
};