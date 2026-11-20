const pool = require("../config/db");

/* CREATE */
const createTerms = async ({ title, content }) => {
  const result = await pool.query(
    "INSERT INTO terms (title, content) VALUES ($1, $2) RETURNING *",
    [title, content]
  );
  return result.rows[0];
};

/* GET ALL */
const getAllTerms = async () => {
  const result = await pool.query(
    "SELECT * FROM terms ORDER BY id DESC"
  );
  return result.rows;
};

/* GET BY ID */
const getTermsById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM terms WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

/* UPDATE */
const updateTerms = async (id, { title, content }) => {
  const result = await pool.query(
    "UPDATE terms SET title = $1, content = $2 WHERE id = $3 RETURNING *",
    [title, content, id]
  );
  return result.rows[0];
};

/* DELETE */
const deleteTerms = async (id) => {
  await pool.query("DELETE FROM terms WHERE id = $1", [id]);
};

module.exports = {
  createTerms,
  getAllTerms,
  getTermsById,
  updateTerms,
  deleteTerms,
};