const pool = require("../config/db");

/* CREATE */
const createSponsor = async (imagePath) => {
  const query = `
    INSERT INTO sponsors (image)
    VALUES ($1)
    RETURNING *;
  `;

  const result = await pool.query(query, [imagePath]);
  return result.rows[0];
};

/* GET ALL */
const getAllSponsors = async () => {
  const result = await pool.query(
    "SELECT * FROM sponsors ORDER BY id DESC"
  );
  return result.rows;
};

module.exports = {
  createSponsor,
  getAllSponsors,
};