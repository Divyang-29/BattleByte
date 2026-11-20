const pool = require("../config/db");

/* Create User */
const createUser = async (username, email, phone, hashedPassword, role) => {
  try {
    const query = `
      INSERT INTO users (username, email, phone, password, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, username, email, phone, role;
    `;

    const values = [username, email, phone, hashedPassword, role];

    const result = await pool.query(query, values);

    return result.rows[0];
  } catch (error) {
    // 🔥 Handle duplicate errors
    if (error.code === "23505") {
      throw new Error("Username, email, or phone already exists");
    }

    throw error;
  }
};

/* Find User */
const findUserByIdentifier = async (identifier) => {
  const query = `
    SELECT * FROM users
    WHERE email = $1 OR phone = $1 OR username = $1
    LIMIT 1;
  `;

  const result = await pool.query(query, [identifier]);

  return result.rows[0];
};

const getAllUsers = async () => {
  const result = await pool.query(
    `SELECT id, username, email, phone, role, created_at
     FROM users
     ORDER BY created_at DESC`,
  );

  return result.rows;
};

const countUsers = async () => {
  const result = await pool.query("SELECT COUNT(*) FROM users");
  return parseInt(result.rows[0].count);
};

module.exports = {
  createUser,
  findUserByIdentifier,
  getAllUsers,
  countUsers,
};
