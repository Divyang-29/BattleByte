const Cart = require("../models/cartModel");

const addProductToCart = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { product_id, quantity } = req.body;

    const item = await Cart.addToCart(user_id, product_id, quantity);

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchCart = async (req, res) => {
  const user_id = req.user.id;
  const cart = await Cart.getCart(user_id);
  res.json(cart);
};

const changeQuantity = async (req, res) => {
  const user_id = req.user.id;
  const cart_id = req.params.id;
  const { quantity } = req.body;

  const updated = await Cart.updateQuantity(cart_id, quantity, user_id);
  res.json(updated);
};

const deleteCartItem = async (req, res) => {
  const user_id = req.user.id;
  const cart_id = req.params.id;

  await Cart.removeFromCart(cart_id, user_id);
  res.json({ message: "Removed" });
};

module.exports = {
  addProductToCart,
  fetchCart,
  changeQuantity,
  deleteCartItem,
};