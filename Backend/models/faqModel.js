const pool = require("../config/db");

/* CREATE FAQ */
const createFAQ = async (title, content) => {
  const query = `
    INSERT INTO faq (title, content)
    VALUES ($1, $2)
    RETURNING *;
  `;

  const result = await pool.query(query, [title, content]);
  return result.rows[0];
};

/* GET ALL FAQ */
const getAllFAQs = async () => {
  const result = await pool.query(
    "SELECT * FROM faq ORDER BY id DESC"
  );
  return result.rows;
};

/* GET SINGLE FAQ */
const getFAQById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM faq WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

module.exports = {
  createFAQ,
  getAllFAQs,
  getFAQById,
};