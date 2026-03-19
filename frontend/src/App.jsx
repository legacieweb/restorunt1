import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ReservationPage from './pages/ReservationPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AccountPage from './pages/AccountPage';
import AdminDashboard from './pages/AdminDashboard';
import OrderTrackingPage from './pages/OrderTrackingPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <CartProvider>
          <Toaster position="top-right" />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/product/:id" element={<ProductDetailsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/reservations" element={<ReservationPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/track-order/:orderId" element={<OrderTrackingPage />} />
                <Route path="/admin/*" element={<AdminDashboard />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
