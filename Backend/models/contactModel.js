const pool = require("../config/db");

/* CREATE MESSAGE */
const createContactMessage = async (
  name,
  email,
  subject,
  phone,
  message
) => {
  const query = `
    INSERT INTO contact_messages (name, email, subject, phone, message)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [name, email, subject, phone, message];
  const result = await pool.query(query, values);

  return result.rows[0];
};

/* GET ALL */
const getAllContactMessages = async () => {
  const result = await pool.query(
    "SELECT * FROM contact_messages ORDER BY id DESC"
  );
  return result.rows;
};

module.exports = {
  createContactMessage,
  getAllContactMessages,
};