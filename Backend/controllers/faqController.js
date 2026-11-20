const {
  createFAQ,
  getAllFAQs,
  getFAQById,
} = require("../models/faqModel");

/* ADD FAQ (Admin) */
const addFAQ = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const newFAQ = await createFAQ(title, content);

    res.status(201).json({
      message: "FAQ created successfully",
      data: newFAQ,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* GET ALL (Public) */
const fetchFAQs = async (req, res) => {
  try {
    const faqs = await getAllFAQs();

    res.json({
      count: faqs.length,
      data: faqs,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* GET ONE (Public) */
const fetchFAQById = async (req, res) => {
  try {
    const { id } = req.params;

    const faq = await getFAQById(id);

    if (!faq) {
      return res.status(404).json({
        message: "FAQ not found",
      });
    }

    res.json(faq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addFAQ,
  fetchFAQs,
  fetchFAQById,
};