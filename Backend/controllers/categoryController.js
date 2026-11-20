const {
  createCategory,
  getAllCategories,
} = require("../models/categoryModel");

const addCategory = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title required" });
  }

  const category = await createCategory(title);
  res.status(201).json(category);
};

const fetchCategories = async (req, res) => {
  const categories = await getAllCategories();
  res.json(categories);
};

module.exports = {
  addCategory,
  fetchCategories,
};