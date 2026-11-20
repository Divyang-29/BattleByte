const pool = require("../config/db");

/* CREATE TERM */
const createTerm = async (title, content) => {
  const query = `
    INSERT INTO terms (title, content)
    VALUES ($1, $2)
    RETURNING *;
  `;

  const result = await pool.query(query, [title, content]);
  return result.rows[0];
};

/* GET ALL TERMS */
const getAllTerms = async () => {
  const result = await pool.query(
    "SELECT * FROM terms ORDER BY id DESC"
  );
  return result.rows;
};

/* GET BY ID */
const getTermById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM terms WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

module.exports = {
  createTerm,
  getAllTerms,
  getTermById,
};