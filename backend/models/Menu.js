const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['appetizers', 'mains', 'sides', 'desserts', 'beverages', 'breakfast', 'salads'],
    required: true
  },
  image: String,
  available: {
    type: Boolean,
    default: true
  },
  vegetarian: Boolean,
  spicy: Boolean,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Menu', menuSchema);
