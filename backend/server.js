const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurant')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/menu', require('./routes/menu'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/reservations', require('./routes/reservations'));
app.use('/api/admin', require('./routes/admin'));

app.get('/', (req, res) => {
  res.json({ message: 'Restaurant API Server' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
