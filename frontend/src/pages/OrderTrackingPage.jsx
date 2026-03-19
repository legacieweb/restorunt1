import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FiCheck, FiClock } from 'react-icons/fi';

export default function OrderTrackingPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
    const interval = setInterval(fetchOrder, 10000);
    return () => clearInterval(interval);
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`/api/orders/${orderId}`);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!order) return <div className="min-h-screen flex items-center justify-center">Order not found</div>;

  const statuses = ['pending', 'confirmed', 'preparing', 'ready', 'delivered'];
  const currentStatusIndex = statuses.indexOf(order.status);

  return (
    <div className="min-h-screen bg-light py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="card mb-6">
          <h1 className="text-3xl font-bold mb-2">Order #{order.orderNumber}</h1>
          <p className="text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
        </div>

        <div className="card mb-6">
          <h2 className="text-2xl font-bold mb-6">Order Status</h2>
          <div className="flex justify-between items-center mb-2">
            {statuses.map((status, index) => (
              <div key={status} className="flex flex-col items-center flex-1">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${index <= currentStatusIndex ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>
                  {index < currentStatusIndex ? <FiCheck size={24} /> : <FiClock size={24} />}
                </div>
                <span className="text-xs capitalize text-center">{status}</span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 h-2 rounded mt-4">
            <div className="bg-primary h-2 rounded" style={{ width: `${(currentStatusIndex / (statuses.length - 1)) * 100}%` }}></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="card">
            <h3 className="text-xl font-bold mb-4">Order Items</h3>
            <ul className="space-y-2">
              {order.items.map((item, idx) => (
                <li key={idx} className="flex justify-between text-sm">
                  <span>{item.menuName} x{item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-4">Delivery Details</h3>
            <p className="mb-2"><strong>Type:</strong> {order.deliveryType.charAt(0).toUpperCase() + order.deliveryType.slice(1)}</p>
            {order.deliveryAddress && <p className="mb-2"><strong>Address:</strong> {order.deliveryAddress}</p>}
            <p className="mb-2"><strong>Name:</strong> {order.guestName}</p>
            <p className="mb-2"><strong>Email:</strong> {order.guestEmail}</p>
            <p><strong>Phone:</strong> {order.guestPhone}</p>
          </div>
        </div>

        {order.notes && (
          <div className="card">
            <h3 className="text-xl font-bold mb-2">Special Requests</h3>
            <p className="text-gray-600">{order.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
