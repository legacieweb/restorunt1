const express = require('express');
const Order = require('../models/Order');
const Menu = require('../models/Menu');
const { auth, adminAuth } = require('../middleware/auth');
const { sendOrderConfirmation, sendOrderStatusUpdate, sendAdminOrderNotification } = require('../config/email');

const router = express.Router();

const generateOrderNumber = () => {
  return 'ORD-' + Date.now() + Math.floor(Math.random() * 1000);
};

router.post('/', async (req, res) => {
  try {
    const { items, totalAmount, deliveryType, deliveryAddress, userId, guestEmail, guestName, guestPhone, notes } = req.body;

    if (!items || items.length === 0 || !totalAmount) {
      return res.status(400).json({ error: 'Items and total amount are required' });
    }

    if (deliveryType === 'delivery' && !deliveryAddress) {
      return res.status(400).json({ error: 'Delivery address is required for delivery orders' });
    }

    const orderNumber = generateOrderNumber();

    const order = new Order({
      orderNumber,
      userId: userId || null,
      guestEmail,
      guestName,
      guestPhone,
      items,
      totalAmount,
      deliveryType,
      deliveryAddress,
      notes,
      status: 'pending'
    });

    await order.save();

    // Send confirmation email to customer if guest order
    const emailToSend = userId ? null : guestEmail;
    if (emailToSend) {
      await sendOrderConfirmation(emailToSend, order);
    }

    // Always send notification to admin
    await sendAdminOrderNotification(order);

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', adminAuth, async (req, res) => {
  try {
    const orders = await Order.find().populate('userId').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId');
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/user/:userId', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id/status', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const oldStatus = order.status;
    order.status = status;
    order.updatedAt = new Date();
    await order.save();

    const emailToSend = order.guestEmail || (order.userId ? null : order.guestEmail);
    if (emailToSend) {
      await sendOrderStatusUpdate(emailToSend, order, oldStatus);
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
