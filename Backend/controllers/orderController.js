const Order = require("../models/orderModel");


// USER - Place Order
const placeOrder = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { billingData, payment_method } = req.body;

    const order = await Order.createOrder(
      user_id,
      billingData,
      payment_method
    );

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ADMIN - Get All Orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ADMIN - Update Status
const changeOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Order.updateOrderStatus(id, status);

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  placeOrder,
  getAllOrders,
  changeOrderStatus
};