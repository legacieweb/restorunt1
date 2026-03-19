const express = require('express');
const Reservation = require('../models/Reservation');
const { auth, adminAuth } = require('../middleware/auth');
const { sendReservationConfirmation } = require('../config/email');

const router = express.Router();

const generateReservationNumber = () => {
  return 'RES-' + Date.now() + Math.floor(Math.random() * 1000);
};

router.post('/', async (req, res) => {
  try {
    const { guestName, guestEmail, guestPhone, numberOfGuests, reservationDate, reservationTime, tablePreference, specialRequests, userId } = req.body;

    if (!guestName || !guestEmail || !guestPhone || !numberOfGuests || !reservationDate || !reservationTime) {
      return res.status(400).json({ error: 'All required fields must be filled' });
    }

    const reservationNumber = generateReservationNumber();

    const reservation = new Reservation({
      reservationNumber,
      userId: userId || null,
      guestName,
      guestEmail,
      guestPhone,
      numberOfGuests,
      reservationDate,
      reservationTime,
      tablePreference,
      specialRequests,
      status: 'pending'
    });

    await reservation.save();
    await sendReservationConfirmation(guestEmail, reservation);

    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', adminAuth, async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('userId').sort({ reservationDate: 1 });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate('userId');
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/user/:userId', auth, async (req, res) => {
  try {
    const reservations = await Reservation.find({ userId: req.params.userId }).sort({ reservationDate: 1 });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', adminAuth, async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.json({ message: 'Reservation deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
