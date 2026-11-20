const pool = require("../config/db");

/* CREATE TAG */
const createTag = async (title) => {
  const result = await pool.query(
    "INSERT INTO tags (title) VALUES ($1) RETURNING *",
    [title]
  );
  return result.rows[0];
};

/* GET ALL TAGS */
const getAllTags = async () => {
  const result = await pool.query(
    "SELECT * FROM tags ORDER BY id DESC"
  );
  return result.rows;
};

module.exports = {
  createTag,
  getAllTags,
};