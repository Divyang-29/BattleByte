const pool = require("../config/db");

const createCategory = async (title) => {
  const result = await pool.query(
    "INSERT INTO categories (title) VALUES ($1) RETURNING *",
    [title]
  );
  return result.rows[0];
};

const getAllCategories = async () => {
  const result = await pool.query("SELECT * FROM categories ORDER BY id DESC");
  return result.rows;
};

module.exports = {
  createCategory,
  getAllCategories,
};