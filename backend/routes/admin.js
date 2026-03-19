const express = require('express');
const { adminAuth } = require('../middleware/auth');
const User = require('../models/User');
const Order = require('../models/Order');
const Reservation = require('../models/Reservation');
const Menu = require('../models/Menu');

const router = express.Router();

router.get('/dashboard', adminAuth, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalReservations = await Reservation.countDocuments();
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalMenuItems = await Menu.countDocuments();
    
    const pendingOrders = await Order.countDocuments({ status: 'pending' });
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5);
    const recentReservations = await Reservation.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      totalOrders,
      totalReservations,
      totalUsers,
      totalMenuItems,
      pendingOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      recentOrders,
      recentReservations
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/orders-analytics', adminAuth, async (req, res) => {
  try {
    const ordersByStatus = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const ordersByDeliveryType = await Order.aggregate([
      { $group: { _id: '$deliveryType', count: { $sum: 1 } } }
    ]);

    const revenueByDay = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          revenue: { $sum: '$totalAmount' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      ordersByStatus,
      ordersByDeliveryType,
      revenueByDay
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
