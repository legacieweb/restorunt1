const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  guestEmail: String,
  guestName: String,
  guestPhone: String,
  items: [
    {
      menuId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu',
        required: true
      },
      menuName: String,
      quantity: {
        type: Number,
        required: true
      },
      price: Number,
      specialInstructions: String
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  deliveryType: {
    type: String,
    enum: ['delivery', 'pickup'],
    required: true
  },
  deliveryAddress: String,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['cash'],
    default: 'cash'
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
