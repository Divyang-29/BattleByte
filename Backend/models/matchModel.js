const pool = require("../config/db");

const createMatch = async (image1, image2, match_date) => {
  const result = await pool.query(
    "INSERT INTO upcoming_matches (image1, image2, match_date) VALUES ($1,$2,$3) RETURNING *",
    [image1, image2, match_date]
  );
  return result.rows[0];
};

const getMatches = async () => {
  const result = await pool.query(
    "SELECT * FROM upcoming_matches ORDER BY match_date ASC"
  );
  return result.rows;
};

module.exports = {
  createMatch,
  getMatches,
};