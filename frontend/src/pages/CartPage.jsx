import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useContext(CartContext);

  // Food images mapping for better visuals
  const foodImages = {
    'Grilled Salmon': 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&h=200&fit=crop&crop=center',
    'Margherita Pizza': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop&crop=center',
    'Spicy Curry': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200&h=200&fit=crop&crop=center',
    'Caesar Salad': 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=200&h=200&fit=crop&crop=center',
    'Bruschetta': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=200&fit=crop&crop=center',
    'French Fries': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&h=200&fit=crop&crop=center',
    'Tiramisu': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=200&h=200&fit=crop&crop=center',
    'Iced Coffee': 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=200&h=200&fit=crop&crop=center',
    'Pancakes': 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=200&h=200&fit=crop&crop=center',
    'Eggs Benedict': 'https://images.unsplash.com/photo-1543353071-087092ec393e?w=200&h=200&fit=crop&crop=center'
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-32">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-16">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5m6 0L19 13m-2-2.5l-2.5-2.5M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6" />
              </svg>
            </div>
            <h1 className="text-5xl font-bold mb-6 text-secondary">Your Cart is Empty</h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Looks like you haven't added any delicious items to your cart yet. 
              Explore our menu and find something amazing!
            </p>
            <Link 
              to="/menu" 
              className="inline-flex items-center gap-3 bg-primary hover:bg-orange-600 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 text-secondary">Your Cart</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Review your selections and proceed to checkout when ready
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map(item => (
              <div key={item._id} className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className="flex items-center gap-6 p-8">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                    <img 
                      src={foodImages[item.name] || `https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=200&fit=crop&crop=center`} 
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold mb-2 text-secondary">{item.name}</h3>
                    <p className="text-gray-600 text-lg mb-4">${item.price.toFixed(2)} each</p>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm text-gray-600">4.5 rating</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-2xl flex items-center justify-center transition-all duration-300"
                    >
                      <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="w-12 text-center font-bold text-xl">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-2xl flex items-center justify-center transition-all duration-300"
                    >
                      <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>
                  <div className="text-right w-32">
                    <p className="text-3xl font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="w-12 h-12 bg-red-50 hover:bg-red-100 text-red-500 rounded-2xl flex items-center justify-center transition-all duration-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-24">
              <h3 className="text-3xl font-bold mb-8 text-secondary text-center">Order Summary</h3>
              <div className="space-y-6 mb-8">
                <div className="flex justify-between items-center py-4 border-b border-gray-200">
                  <span className="text-lg text-gray-600">Subtotal:</span>
                  <span className="text-xl font-semibold">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-gray-200">
                  <span className="text-lg text-gray-600">Tax (10%):</span>
                  <span className="text-xl font-semibold">${(getTotalPrice() * 0.1).toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between items-center mb-10 py-6 border-t-2 border-primary">
                <span className="text-3xl font-bold text-secondary">Total:</span>
                <span className="text-4xl font-bold text-primary">${(getTotalPrice() * 1.1).toFixed(2)}</span>
              </div>
              <div className="space-y-4">
                <Link 
                  to="/checkout" 
                  className="w-full bg-primary hover:bg-orange-600 text-white py-6 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg text-center block"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  Proceed to Checkout
                </Link>
                <Link 
                  to="/menu" 
                  className="w-full bg-secondary hover:bg-blue-800 text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-300 text-center block"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-gradient-to-br from-primary to-orange-600 rounded-3xl shadow-xl p-8 text-white">
              <h4 className="text-2xl font-bold mb-4">Free Delivery</h4>
              <p className="text-orange-100 text-lg mb-4">
                Enjoy free delivery on orders over $25
              </p>
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-orange-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-orange-100">30 minutes or it's free</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
