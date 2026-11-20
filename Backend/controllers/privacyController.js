const {
  createPrivacy,
  getAllPrivacy,
  getPrivacyById,
} = require("../models/privacyModel");

/* ADD (ADMIN) */
const addPrivacy = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const newPrivacy = await createPrivacy(title, content);

    res.status(201).json({
      message: "Privacy policy created successfully",
      data: newPrivacy,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* GET ALL (PUBLIC) */
const fetchPrivacy = async (req, res) => {
  try {
    const privacyList = await getAllPrivacy();

    res.json({
      count: privacyList.length,
      data: privacyList,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* GET SINGLE */
const fetchPrivacyById = async (req, res) => {
  try {
    const { id } = req.params;

    const privacy = await getPrivacyById(id);

    if (!privacy) {
      return res.status(404).json({
        message: "Privacy policy not found",
      });
    }

    res.json(privacy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addPrivacy,
  fetchPrivacy,
  fetchPrivacyById,
};