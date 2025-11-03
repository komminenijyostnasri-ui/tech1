const Cart = require('../models/Cart');

exports.createCart = async (req, res) => {
  try {
    const cart = new Cart(req.body);
    await cart.save();
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCarts = async (req, res) => {
  try {
    const carts = await Cart.find().sort({ createdAt: -1 });
    res.json(carts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cart removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
