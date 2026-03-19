import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const { cart, clearCart, getTotalPrice } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    guestName: user?.name || '',
    guestEmail: user?.email || '',
    guestPhone: user?.phone || '',
    deliveryType: 'delivery',
    deliveryAddress: user?.address || '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        items: cart.map(item => ({
          menuId: item._id,
          menuName: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: getTotalPrice() * 1.1,
        deliveryType: formData.deliveryType,
        deliveryAddress: formData.deliveryType === 'delivery' ? formData.deliveryAddress : null,
        userId: user?.id || null,
        guestEmail: formData.guestEmail,
        guestName: formData.guestName,
        guestPhone: formData.guestPhone,
        notes: formData.notes
      };

      const response = await axios.post('/api/orders', orderData);
      toast.success('Order placed successfully!');
      clearCart();
      navigate(`/track-order/${response.data._id}`);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-32">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-16">
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h1 className="text-5xl font-bold mb-6 text-secondary">Your Cart is Empty</h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Add some delicious items to your cart before proceeding to checkout
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 text-secondary">Checkout</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Complete your order with delivery information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-br from-secondary to-blue-800 p-8 text-white">
                <h2 className="text-4xl font-bold mb-4">Delivery Information</h2>
                <p className="text-blue-100 text-lg">Please provide your delivery details</p>
              </div>
              
              <form onSubmit={handleSubmit} className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <label className="block text-lg font-semibold mb-3 text-secondary">Full Name</label>
                    <input
                      type="text"
                      name="guestName"
                      value={formData.guestName}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary text-lg transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-lg font-semibold mb-3 text-secondary">Email</label>
                    <input
                      type="email"
                      name="guestEmail"
                      value={formData.guestEmail}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary text-lg transition-all duration-300"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-lg font-semibold mb-3 text-secondary">Phone</label>
                    <input
                      type="tel"
                      name="guestPhone"
                      value={formData.guestPhone}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary text-lg transition-all duration-300"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-lg font-semibold mb-3 text-secondary">Delivery Type</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, deliveryType: 'delivery' }))}
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                        formData.deliveryType === 'delivery'
                          ? 'border-primary bg-primary bg-opacity-10 text-primary'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                      <div className="font-semibold">Delivery</div>
                      <div className="text-sm opacity-70">We'll bring it to you</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, deliveryType: 'pickup' }))}
                      className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                        formData.deliveryType === 'pickup'
                          ? 'border-primary bg-primary bg-opacity-10 text-primary'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <div className="font-semibold">Pickup</div>
                      <div className="text-sm opacity-70">Come collect it</div>
                    </button>
                  </div>
                </div>

                {formData.deliveryType === 'delivery' && (
                  <div className="mb-8">
                    <label className="block text-lg font-semibold mb-3 text-secondary">Delivery Address</label>
                    <textarea
                      name="deliveryAddress"
                      value={formData.deliveryAddress}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary text-lg transition-all duration-300 resize-none"
                      rows="3"
                      placeholder="Enter your complete delivery address"
                    />
                  </div>
                )}

                <div className="mb-8">
                  <label className="block text-lg font-semibold mb-3 text-secondary">Special Requests</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary text-lg transition-all duration-300 resize-none"
                    rows="4"
                    placeholder="Any special requests, allergies, or delivery instructions..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-6 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      Placing Order...
                    </>
                  ) : (
                    <>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Place Order
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h3 className="text-3xl font-bold mb-8 text-secondary text-center">Order Summary</h3>
              <div className="space-y-6 mb-8">
                {cart.map(item => (
                  <div key={item._id} className="flex justify-between items-center py-3 border-b border-gray-200">
                    <div>
                      <span className="font-semibold text-lg">{item.name}</span>
                      <span className="text-gray-600 ml-2">x{item.quantity}</span>
                    </div>
                    <span className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-t border-gray-200">
                  <span className="text-lg text-gray-600">Subtotal:</span>
                  <span className="text-xl font-semibold">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-lg text-gray-600">Tax (10%):</span>
                  <span className="text-xl font-semibold">${(getTotalPrice() * 0.1).toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between items-center py-6 border-t-2 border-primary">
                <span className="text-3xl font-bold text-secondary">Total:</span>
                <span className="text-4xl font-bold text-primary">${(getTotalPrice() * 1.1).toFixed(2)}</span>
              </div>
            </div>

            {/* Security Badge */}
            <div className="bg-green-50 border border-green-200 rounded-3xl p-6 text-center">
              <svg className="w-12 h-12 mx-auto mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <h4 className="text-lg font-bold text-green-800 mb-2">Secure Checkout</h4>
              <p className="text-green-600">Your payment information is protected and secure</p>
            </div>

            {/* Delivery Info */}
            <div className="bg-gradient-to-br from-primary to-orange-600 rounded-3xl shadow-xl p-8 text-white">
              <h4 className="text-2xl font-bold mb-4">Fast Delivery</h4>
              <p className="text-orange-100 text-lg mb-4">
                Estimated delivery time: 30-45 minutes
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
