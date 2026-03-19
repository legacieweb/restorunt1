const mongoose = require('mongoose');
const Menu = require('./models/Menu');
require('dotenv').config();

const menuItems = [
  {
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with lemon butter sauce',
    price: 24.99,
    category: 'mains',
    vegetarian: false,
    spicy: false
  },
  {
    name: 'Margherita Pizza',
    description: 'Classic pizza with fresh mozzarella and basil',
    price: 14.99,
    category: 'mains',
    vegetarian: true,
    spicy: false
  },
  {
    name: 'Spicy Curry',
    description: 'Chicken tikka masala with rice and naan',
    price: 16.99,
    category: 'mains',
    vegetarian: false,
    spicy: true
  },
  {
    name: 'Caesar Salad',
    description: 'Crisp romaine with parmesan and croutons',
    price: 10.99,
    category: 'salads',
    vegetarian: true,
    spicy: false
  },
  {
    name: 'Bruschetta',
    description: 'Toasted bread with tomatoes and garlic',
    price: 8.99,
    category: 'appetizers',
    vegetarian: true,
    spicy: false
  },
  {
    name: 'French Fries',
    description: 'Golden crispy fries with sea salt',
    price: 5.99,
    category: 'sides',
    vegetarian: true,
    spicy: false
  },
  {
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee and mascarpone',
    price: 7.99,
    category: 'desserts',
    vegetarian: true,
    spicy: false
  },
  {
    name: 'Iced Coffee',
    description: 'Cold brew coffee with ice and cream',
    price: 4.99,
    category: 'beverages',
    vegetarian: true,
    spicy: false
  },
  {
    name: 'Pancakes',
    description: 'Fluffy pancakes with maple syrup and butter',
    price: 9.99,
    category: 'breakfast',
    vegetarian: true,
    spicy: false
  },
  {
    name: 'Eggs Benedict',
    description: 'Poached eggs with hollandaise sauce on English muffin',
    price: 12.99,
    category: 'breakfast',
    vegetarian: false,
    spicy: false
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurant');
    console.log('Connected to MongoDB');

    await Menu.deleteMany({});
    console.log('Cleared existing menu items');

    const inserted = await Menu.insertMany(menuItems);
    console.log(`Inserted ${inserted.length} menu items`);

    await mongoose.connection.close();
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
