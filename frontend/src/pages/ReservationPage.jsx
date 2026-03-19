import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import ReservationModal from '../components/ReservationModal';
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
  CardWithAnimation,
  ButtonWithAnimation
} from '../components/AnimationComponents';

export default function ReservationPage() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [formData, setFormData] = useState({
    guestName: user?.name || '',
    guestEmail: user?.email || '',
    guestPhone: user?.phone || '',
    numberOfGuests: '2',
    reservationDate: '',
    reservationTime: '19:00',
    specialRequests: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTableSelect = (table) => {
    setSelectedTable(table);
    toast.success(`Table ${table.name} selected!`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/reservations', {
        ...formData,
        selectedTable,
        userId: user?.id || null
      });

      toast.success('Reservation confirmed!');
      setFormData({
        guestName: user?.name || '',
        guestEmail: user?.email || '',
        guestPhone: user?.phone || '',
        numberOfGuests: '2',
        reservationDate: '',
        reservationTime: '19:00',
        specialRequests: ''
      });
      setSelectedTable(null);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to make reservation');
    } finally {
      setLoading(false);
    }
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#fafaf9] to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-end pb-12">
          <FadeInUp>
            <span className="text-amber-500 font-semibold tracking-widest uppercase text-sm mb-2 block">Exquisite Dining</span>
            <h1 className="text-5xl font-serif text-white mb-4">Reservations</h1>
            <p className="text-gray-300 max-w-xl text-lg">
              Secure your place at our table for a journey through the finest flavors and most elegant atmosphere.
            </p>
          </FadeInUp>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Reservation Form Card */}
          <div className="lg:col-span-8">
            <FadeInUp>
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="text-2xl font-serif text-gray-900">Booking Details</h2>
                  <div className="flex gap-2 text-xs font-medium uppercase tracking-tighter">
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded">Step 1: Information</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                  <StaggerContainer className="space-y-8">
                    {/* Guest Info */}
                    <StaggerItem>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                          <input
                            type="text"
                            name="guestName"
                            value={formData.guestName}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none"
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                          <input
                            type="email"
                            name="guestEmail"
                            value={formData.guestEmail}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>
                    </StaggerItem>

                    <StaggerItem>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Phone Number</label>
                          <input
                            type="tel"
                            name="guestPhone"
                            value={formData.guestPhone}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none"
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Number of Guests</label>
                          <select
                            name="numberOfGuests"
                            value={formData.numberOfGuests}
                            onChange={handleChange}
                            className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none appearance-none cursor-pointer"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                              <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </StaggerItem>

                    {/* Date/Time/Table */}
                    <StaggerItem>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Date</label>
                          <input
                            type="date"
                            name="reservationDate"
                            value={formData.reservationDate}
                            onChange={handleChange}
                            min={minDate}
                            required
                            className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Time</label>
                          <input
                            type="time"
                            name="reservationTime"
                            value={formData.reservationTime}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Table</label>
                          <button
                            type="button"
                            onClick={() => setShowModal(true)}
                            className="w-full bg-amber-50 px-4 py-3 rounded-xl border border-amber-200 text-amber-900 font-medium hover:bg-amber-100 transition-all flex items-center justify-between"
                          >
                            <span>{selectedTable ? selectedTable.name : 'Choose Table'}</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </StaggerItem>

                    <StaggerItem>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Special Requests</label>
                        <textarea
                          name="specialRequests"
                          value={formData.specialRequests}
                          onChange={handleChange}
                          rows={4}
                          className="w-full bg-gray-50 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none resize-none"
                          placeholder="Tell us about any allergies or special occasions..."
                        />
                      </div>
                    </StaggerItem>

                    <StaggerItem>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-black transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 disabled:opacity-70"
                      >
                        {loading ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        ) : (
                          <>
                            <span>Confirm Reservation</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </>
                        )}
                      </button>
                    </StaggerItem>
                  </StaggerContainer>
                </form>
              </div>
            </FadeInUp>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <FadeInUp delay={0.2}>
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <h3 className="text-xl font-serif text-gray-900 mb-6">Our Location</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Address</p>
                      <p className="text-gray-600 text-sm">123 Gastronomy St, Culinary District, NY 10001</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.4}>
              <div className="bg-gray-900 p-8 rounded-2xl shadow-xl text-white">
                <h3 className="text-xl font-serif mb-6">Explore the Venue</h3>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                  Can't decide where to sit? View our interactive seat map and select your preferred table with a single click.
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full bg-amber-500 text-gray-900 py-3 rounded-xl font-bold hover:bg-amber-400 transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A2 2 0 013 15.485V5.13a2 2 0 011.553-1.944L9 2l5.447 2.724A2 2 0 0115 6.67v10.354a2 2 0 01-1.553 1.944L9 20z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20V2m6 18V6" />
                  </svg>
                  Open Seat Map
                </button>
              </div>
            </FadeInUp>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ReservationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSelectTable={handleTableSelect}
      />
    </div>
  );
}
