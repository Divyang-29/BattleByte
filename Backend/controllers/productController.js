const Product = require("../models/productModel");

const generateSKU = (title) => {
  const random = Math.floor(1000 + Math.random() * 9000);
  return title.substring(0, 3).toUpperCase() + random;
};

const calculateDeliveryDate = (quantity) => {
  const today = new Date();
  let days = quantity > 20 ? 3 : quantity > 0 ? 7 : 15;
  today.setDate(today.getDate() + days);
  return today;
};

const createProduct = async (req, res) => {
  try {
    const {
      title,
      price,
      discounted_price,
      quantity,
      category,
      tag,
      description,
      additional_information,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Primary image required" });
    }

    const primary_image = req.file.filename;
    const sku = generateSKU(title);
    const expected_delivery = calculateDeliveryDate(quantity);

    const product = await Product.createProduct(
      primary_image,
      title,
      price,
      discounted_price,
      quantity,
      category,
      tag,
      sku,
      expected_delivery,
      description,
      additional_information
    );

    res.status(201).json({
      ...product,
      delivery_message: `It will deliver to you on ${expected_delivery.toDateString()}`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProducts = async (req, res) => {
  const products = await Product.getAllProducts();
  res.json(products);
};

const getProduct = async (req, res) => {
  const product = await Product.getProductById(req.params.id);
  res.json(product);
};

const addReview = async (req, res) => {
  const { name, email, review } = req.body;
  const newReview = await Product.addReview(
    req.params.id,
    name,
    email,
    review
  );
  res.status(201).json(newReview);
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  addReview,
};