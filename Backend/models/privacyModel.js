const pool = require("../config/db");

/* CREATE */
const createPrivacy = async (title, content) => {
  const query = `
    INSERT INTO privacy_policy (title, content)
    VALUES ($1, $2)
    RETURNING *;
  `;

  const result = await pool.query(query, [title, content]);
  return result.rows[0];
};

/* GET ALL */
const getAllPrivacy = async () => {
  const result = await pool.query(
    "SELECT * FROM privacy_policy ORDER BY id DESC"
  );
  return result.rows;
};

/* GET BY ID */
const getPrivacyById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM privacy_policy WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

module.exports = {
  createPrivacy,
  getAllPrivacy,
  getPrivacyById,
};