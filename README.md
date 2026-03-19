# Restaurant & Cafe Website

A full-stack restaurant management web application built with React, Node.js, Express, MongoDB, and Tailwind CSS.

## Features

- **Online Ordering**: Browse menu, add items to cart, and place orders with delivery or pickup options
- **Table Reservations**: Book a table with date, time, and special requests
- **User Authentication**: Register and login with secure JWT authentication
- **Order Tracking**: Real-time order status tracking with email notifications
- **Admin Dashboard**: Manage orders, reservations, menu items, and analytics
- **Email Notifications**: Automated emails for order confirmations and status updates using Nodemailer
- **Responsive Design**: Mobile-friendly UI built with Tailwind CSS

## Tech Stack

**Frontend:**
- React 18
- React Router DOM
- Axios
- React Hot Toast
- React Icons
- Tailwind CSS
- Vite

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (JSON Web Tokens)
- Bcryptjs (Password hashing)
- Nodemailer (Email sending)
- CORS

## Project Structure

```
restaurant/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Authentication middleware
│   ├── config/          # Configuration files
│   ├── server.js        # Main server file
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React Context (Auth, Cart)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file and configure:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/restaurant
JWT_SECRET=your_secret_key_here
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
NODE_ENV=development
```

4. Start the server:
```bash
npm run dev
```

Server runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Menu
- `GET /api/menu` - Get all menu items
- `GET /api/menu?category=category_name` - Get items by category
- `GET /api/menu/:id` - Get menu item details
- `POST /api/menu` - Create menu item (Admin only)
- `PUT /api/menu/:id` - Update menu item (Admin only)
- `DELETE /api/menu/:id` - Delete menu item (Admin only)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `GET /api/orders/user/:userId` - Get user orders
- `GET /api/orders` - Get all orders (Admin only)
- `PUT /api/orders/:id/status` - Update order status (Admin only)

### Reservations
- `POST /api/reservations` - Create reservation
- `GET /api/reservations/:id` - Get reservation details
- `GET /api/reservations/user/:userId` - Get user reservations
- `GET /api/reservations` - Get all reservations (Admin only)
- `PUT /api/reservations/:id` - Update reservation (Admin only)

### Admin
- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/users` - Get all users
- `GET /api/admin/orders-analytics` - Get orders analytics

## Email Configuration

To enable email notifications, configure Gmail App Password:

1. Enable 2FA on your Google Account
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Add to `.env`:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
```

## Features Breakdown

### Online Ordering
- Browse menu with filters by category
- Add items to cart with quantity selection
- View cart with price calculation
- Checkout with guest or registered user info
- Choose delivery or pickup
- Order tracking with real-time status

### Reservations
- Select date and time
- Specify number of guests
- Choose table preferences
- Add special requests
- Email confirmation

### Admin Dashboard
- View key metrics (orders, revenue, users)
- Manage orders and update status
- Manage reservations
- View and manage menu items
- User analytics

### Authentication
- Secure registration and login
- JWT-based authentication
- Password hashing with bcryptjs
- Profile management

## Database Schema

### User
- name, email, password, phone, address, role

### Menu
- name, description, price, category, image, vegetarian, spicy

### Order
- orderNumber, userId, items[], totalAmount, deliveryType, status, paymentMethod

### Reservation
- reservationNumber, userId, guestName, reservationDate, numberOfGuests, status

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Protected admin routes
- Environment variables for sensitive data
- CORS enabled

## Future Enhancements

- Payment gateway integration (Stripe, PayPal)
- SMS notifications
- Advanced analytics and reporting
- Multiple language support
- Rating and review system
- Push notifications
- Image upload for menu items

## License

MIT

## Support

For issues or questions, please contact: info@restaurant.com
