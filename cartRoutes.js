const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// GET all cart items
router.get('/', async (req, res) => {
  const items = await Cart.find().populate('productId');
  res.json(items);
});

// ADD item to cart
router.post('/', async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const newItem = new Cart({ productId, qty });
    await newItem.save();
    res.status(201).json({ message: 'Item added to cart', item: newItem });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error });
  }
});

module.exports = router;
