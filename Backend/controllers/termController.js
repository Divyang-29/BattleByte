const {
  createTerm,
  getAllTerms,
  getTermById,
} = require("../models/termModel");

/* ADD TERM (ADMIN) */
const addTerm = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const newTerm = await createTerm(title, content);

    res.status(201).json({
      message: "Term created successfully",
      data: newTerm,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* GET ALL (PUBLIC) */
const fetchTerms = async (req, res) => {
  try {
    const terms = await getAllTerms();

    res.json({
      count: terms.length,
      data: terms,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* GET SINGLE (PUBLIC) */
const fetchTermById = async (req, res) => {
  try {
    const { id } = req.params;

    const term = await getTermById(id);

    if (!term) {
      return res.status(404).json({
        message: "Term not found",
      });
    }

    res.json(term);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addTerm,
  fetchTerms,
  fetchTermById,
};