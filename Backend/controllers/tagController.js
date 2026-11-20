const {
  createTag,
  getAllTags,
} = require("../models/tagModel");

/* ADMIN - ADD TAG */
const addTag = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Tag title is required",
      });
    }

    const tag = await createTag(title);

    res.status(201).json({
      message: "Tag created successfully",
      data: tag,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* PUBLIC - GET TAGS */
const fetchTags = async (req, res) => {
  try {
    const tags = await getAllTags();

    res.json({
      count: tags.length,
      data: tags,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addTag,
  fetchTags,
};