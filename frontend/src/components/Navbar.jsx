import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { getCartCount } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-secondary text-white shadow-lg sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3 font-bold text-2xl">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-white">Restaurant</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:text-primary transition font-semibold text-lg">Home</Link>
            <Link to="/menu" className="hover:text-primary transition font-semibold text-lg">Menu</Link>
            <Link to="/reservations" className="hover:text-primary transition font-semibold text-lg">Reservations</Link>
            
            <div className="flex items-center gap-4">
              <Link to="/cart" className="relative hover:text-primary transition">
                <div className="w-12 h-12 bg-white bg-opacity-10 rounded-2xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5m6 0L19 13m-2-2.5l-2.5-2.5M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6" />
                  </svg>
                </div>
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    {getCartCount()}
                  </span>
                )}
              </Link>

              {user ? (
                <div className="flex items-center gap-4">
                  <Link to="/account" className="hover:text-primary transition flex items-center gap-2 bg-white bg-opacity-10 px-4 py-2 rounded-2xl">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-semibold">{user.name}</span>
                  </Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="hover:text-primary transition text-sm bg-primary px-4 py-2 rounded-2xl font-semibold">
                      Admin
                    </Link>
                  )}
                  <button onClick={handleLogout} className="hover:text-primary transition bg-white bg-opacity-10 p-2 rounded-2xl">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/login" className="hover:text-primary transition font-semibold text-lg">Login</Link>
                  <Link to="/register" className="bg-primary hover:bg-orange-600 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-12 h-12 bg-white bg-opacity-10 rounded-2xl flex items-center justify-center"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-6 space-y-3">
            <Link to="/" className="block hover:text-primary transition py-3 font-semibold text-lg" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/menu" className="block hover:text-primary transition py-3 font-semibold text-lg" onClick={() => setIsOpen(false)}>
              Menu
            </Link>
            <Link to="/reservations" className="block hover:text-primary transition py-3 font-semibold text-lg" onClick={() => setIsOpen(false)}>
              Reservations
            </Link>
            <Link to="/cart" className="block hover:text-primary transition py-3 font-semibold text-lg" onClick={() => setIsOpen(false)}>
              Cart ({getCartCount()})
            </Link>
            
            {user ? (
              <>
                <Link to="/account" className="block hover:text-primary transition py-3 font-semibold text-lg" onClick={() => setIsOpen(false)}>
                  Account
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="block hover:text-primary transition py-3 font-semibold text-lg" onClick={() => setIsOpen(false)}>
                    Admin Dashboard
                  </Link>
                )}
                <button onClick={handleLogout} className="block hover:text-primary transition py-3 w-full text-left font-semibold text-lg">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block hover:text-primary transition py-3 font-semibold text-lg" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="block hover:text-primary transition py-3 font-semibold text-lg" onClick={() => setIsOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </motion.nav>
  );
}
