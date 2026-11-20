const Terms = require("../models/termsModel");

/* CREATE */
exports.addTerms = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and Content are required",
      });
    }

    const terms = await Terms.createTerms({ title, content });

    res.status(201).json({
      message: "Terms created successfully",
      data: terms,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* GET ALL */
exports.fetchTerms = async (req, res) => {
  try {
    const terms = await Terms.getAllTerms();

    res.json({
      count: terms.length,
      data: terms,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* GET SINGLE */
exports.fetchSingleTerms = async (req, res) => {
  try {
    const terms = await Terms.getTermsById(req.params.id);

    if (!terms) {
      return res.status(404).json({ message: "Terms not found" });
    }

    res.json({ data: terms });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* UPDATE */
exports.editTerms = async (req, res) => {
  try {
    const { title, content } = req.body;

    const updated = await Terms.updateTerms(req.params.id, {
      title,
      content,
    });

    res.json({
      message: "Terms updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* DELETE */
exports.removeTerms = async (req, res) => {
  try {
    await Terms.deleteTerms(req.params.id);

    res.json({
      message: "Terms deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};