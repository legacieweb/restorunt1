import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiLogOut, FiEdit2 } from 'react-icons/fi';

export default function AccountPage() {
  const { user, updateProfile, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchUserData();
  }, [user]);

  const fetchUserData = async () => {
    try {
      const [ordersRes, reservationsRes] = await Promise.all([
        axios.get(`/api/orders/user/${user._id}`),
        axios.get(`/api/reservations/user/${user._id}`)
      ]);
      setOrders(ordersRes.data);
      setReservations(reservationsRes.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(formData);
      toast.success('Profile updated!');
      setEditing(false);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-light py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div>
            <div className="card">
              <div className="text-5xl text-center mb-4">👤</div>
              <h1 className="text-2xl font-bold text-center mb-4">{user.name}</h1>
              <p className="text-gray-600 text-center mb-4">{user.email}</p>

              {!editing ? (
                <>
                  <button
                    onClick={() => setEditing(true)}
                    className="w-full bg-secondary text-white py-2 rounded mb-2 flex items-center justify-center gap-2 hover:bg-blue-700"
                  >
                    <FiEdit2 /> Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 text-white py-2 rounded flex items-center justify-center gap-2 hover:bg-red-600"
                  >
                    <FiLogOut /> Logout
                  </button>
                </>
              ) : (
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Phone</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} className="input-field" />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" disabled={loading} className="flex-1 btn-primary">Save</button>
                    <button type="button" onClick={() => setEditing(false)} className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500">Cancel</button>
                  </div>
                </form>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">My Orders</h2>
              {orders.length === 0 ? (
                <div className="card text-center text-gray-600">No orders yet</div>
              ) : (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order._id} className="card">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-lg">{order.orderNumber}</h3>
                          <p className="text-gray-600 text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <span className={`px-3 py-1 rounded text-white text-sm font-semibold ${order.status === 'delivered' ? 'bg-green-500' : order.status === 'cancelled' ? 'bg-red-500' : 'bg-blue-500'}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{order.items.length} items - ${order.totalAmount.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">My Reservations</h2>
              {reservations.length === 0 ? (
                <div className="card text-center text-gray-600">No reservations yet</div>
              ) : (
                <div className="space-y-4">
                  {reservations.map(res => (
                    <div key={res._id} className="card">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-lg">{res.reservationNumber}</h3>
                          <p className="text-gray-600 text-sm">{new Date(res.reservationDate).toLocaleDateString()} at {res.reservationTime}</p>
                        </div>
                        <span className="px-3 py-1 rounded text-white text-sm font-semibold bg-primary">
                          {res.numberOfGuests} guests
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
