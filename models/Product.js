const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  rating: {
    type: Number,
    default: 4,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
