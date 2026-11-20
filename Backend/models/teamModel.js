const pool = require("../config/db");

/* CREATE */
const createTeamMember = async (name, imagePath) => {
  const query = `
    INSERT INTO team_members (name, image)
    VALUES ($1, $2)
    RETURNING *;
  `;

  const result = await pool.query(query, [name, imagePath]);
  return result.rows[0];
};

/* GET ALL */
const getAllTeamMembers = async () => {
  const result = await pool.query(
    "SELECT * FROM team_members ORDER BY id DESC"
  );
  return result.rows;
};

/* GET BY ID */
const getTeamMemberById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM team_members WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

module.exports = {
  createTeamMember,
  getAllTeamMembers,
  getTeamMemberById,
};