const express = require('express');
const Menu = require('../models/Menu');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category, available: true } : { available: true };
    const menuItems = await Menu.find(query);
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const menuItem = await Menu.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', adminAuth, async (req, res) => {
  try {
    const { name, description, price, category, image, vegetarian, spicy } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ error: 'Name, price, and category are required' });
    }

    const menuItem = new Menu({
      name,
      description,
      price,
      category,
      image,
      vegetarian: vegetarian || false,
      spicy: spicy || false,
      available: true
    });

    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', adminAuth, async (req, res) => {
  try {
    const menuItem = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const menuItem = await Menu.findByIdAndUpdate(
      req.params.id,
      { available: false },
      { new: true }
    );
    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.json({ message: 'Menu item deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
