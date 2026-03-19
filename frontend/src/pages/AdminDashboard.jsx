import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tab, setTab] = useState('dashboard');
  const [dashboard, setDashboard] = useState(null);
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchDashboard();
  }, [user, navigate]);

  const fetchDashboard = async () => {
    try {
      const [dashRes, ordersRes, resRes, menuRes] = await Promise.all([
        axios.get('/api/admin/dashboard'),
        axios.get('/api/orders'),
        axios.get('/api/reservations'),
        axios.get('/api/menu')
      ]);
      setDashboard(dashRes.data);
      setOrders(ordersRes.data);
      setReservations(resRes.data);
      setMenuItems(menuRes.data);
    } catch (error) {
      toast.error('Failed to load dashboard');
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`/api/orders/${orderId}/status`, { status });
      toast.success('Order updated');
      fetchDashboard();
    } catch (error) {
      toast.error('Failed to update');
    }
  };

  const updateReservationStatus = async (resId, status) => {
    try {
      await axios.put(`/api/reservations/${resId}`, { status });
      toast.success('Reservation updated');
      fetchDashboard();
    } catch (error) {
      toast.error('Failed to update');
    }
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen bg-light">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        <div className="flex gap-2 mb-8 overflow-x-auto">
          {['dashboard', 'orders', 'reservations', 'menu'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded font-semibold capitalize ${tab === t ? 'bg-primary text-white' : 'bg-white border border-primary text-primary'}`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 'dashboard' && dashboard && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="card text-center">
              <p className="text-gray-600">Total Orders</p>
              <p className="text-3xl font-bold">{dashboard.totalOrders}</p>
            </div>
            <div className="card text-center">
              <p className="text-gray-600">Reservations</p>
              <p className="text-3xl font-bold">{dashboard.totalReservations}</p>
            </div>
            <div className="card text-center">
              <p className="text-gray-600">Users</p>
              <p className="text-3xl font-bold">{dashboard.totalUsers}</p>
            </div>
            <div className="card text-center">
              <p className="text-gray-600">Revenue</p>
              <p className="text-3xl font-bold text-primary">${dashboard.totalRevenue?.toFixed(2) || 0}</p>
            </div>
          </div>
        )}

        {tab === 'orders' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Orders</h2>
            <div className="space-y-4">
              {orders.slice(0, 10).map(order => (
                <div key={order._id} className="card p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="font-bold">{order.orderNumber}</p>
                      <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="font-semibold">${order.totalAmount.toFixed(2)}</p>
                    </div>
                    <div>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        className="input-field text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="preparing">Preparing</option>
                        <option value="ready">Ready</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'reservations' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Reservations</h2>
            <div className="space-y-4">
              {reservations.slice(0, 10).map(res => (
                <div key={res._id} className="card p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="font-bold">{res.guestName}</p>
                      <p className="text-sm">{res.reservationNumber}</p>
                    </div>
                    <div>
                      <p className="font-semibold">{new Date(res.reservationDate).toLocaleDateString()} {res.reservationTime}</p>
                    </div>
                    <div>
                      <p>{res.numberOfGuests} guests</p>
                    </div>
                    <div>
                      <select
                        value={res.status}
                        onChange={(e) => updateReservationStatus(res._id, e.target.value)}
                        className="input-field text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'menu' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Menu Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {menuItems.map(item => (
                <div key={item._id} className="card">
                  <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                  <p className="text-primary font-bold">${item.price}</p>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded mt-2 inline-block capitalize">{item.category}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
