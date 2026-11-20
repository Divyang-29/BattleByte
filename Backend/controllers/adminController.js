const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");

const getAdminStats = async (req, res) => {
  try {
    console.log("Admin stats route hit");

    const totalOrders = await Order.countOrders();

    const totalProducts = await Product.countProducts();

    const totalUsers = await User.countUsers();

    res.json({
      totalOrders,
      totalProducts,
      totalUsers,
    });
  } catch (error) {
    console.error("Admin Stats Error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAdminStats };
