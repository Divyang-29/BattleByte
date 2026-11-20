const {
  createTeamMember,
  getAllTeamMembers,
  getTeamMemberById,
} = require("../models/teamModel");

/* ADD (Admin) */
const addTeamMember = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !req.file) {
      return res.status(400).json({
        message: "Name and image are required",
      });
    }

    const imagePath = req.file.filename;

    const newMember = await createTeamMember(name, imagePath);

    res.status(201).json({
      message: "Team member added successfully",
      data: newMember,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* GET ALL (Public) */
const fetchAllTeamMembers = async (req, res) => {
  try {
    const members = await getAllTeamMembers();

    res.json({
      count: members.length,
      data: members,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* GET ONE (Public) */
const fetchTeamMemberById = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await getTeamMemberById(id);

    if (!member) {
      return res.status(404).json({
        message: "Team member not found",
      });
    }

    res.json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addTeamMember,
  fetchAllTeamMembers,
  fetchTeamMemberById,
};