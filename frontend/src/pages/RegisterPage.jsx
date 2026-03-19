import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FadeInUp, CardWithAnimation } from '../components/AnimationComponents';

export default function RegisterPage() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(formData.name, formData.email, formData.password, formData.phone, formData.address);
      toast.success('Account created successfully! Welcome to our culinary family.');
      navigate('/');
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex">
      {/* Left Side - Image/Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-orange-600/90"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=1000&fit=crop&crop=center')`
          }}
        ></div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-orange-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-400/20 rounded-full blur-lg animate-pulse delay-500"></div>

        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
          <FadeInUp>
            <div className="text-center mb-12">
              <h1 className="text-6xl font-bold mb-6">Join Our Family</h1>
              <p className="text-xl text-orange-100 leading-relaxed max-w-md">
                Become part of our culinary community. Create your account to unlock exclusive
                reservations, personalized recommendations, and special member benefits.
              </p>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.3}>
            <div className="grid grid-cols-2 gap-8 max-w-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Priority Booking</h3>
                <p className="text-sm text-orange-200">Skip the line for reservations</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Exclusive Offers</h3>
                <p className="text-sm text-orange-200">Member-only discounts</p>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <FadeInUp>
            <CardWithAnimation variant="default" className="bg-white shadow-2xl border-0">
              <div className="p-12">
                {/* Header */}
                <div className="text-center mb-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-orange-500 rounded-3xl mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-secondary mb-3">Create Account</h2>
                  <p className="text-gray-600">Join our culinary community today</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-secondary mb-3">Full Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 pl-12 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-lg transition-all duration-300 bg-gray-50 focus:bg-white"
                        placeholder="Enter your full name"
                      />
                      <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-secondary mb-3">Email Address</label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 pl-12 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-lg transition-all duration-300 bg-gray-50 focus:bg-white"
                        placeholder="your@email.com"
                      />
                      <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-secondary mb-3">Password</label>
                    <div className="relative">
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 pl-12 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-lg transition-all duration-300 bg-gray-50 focus:bg-white"
                        placeholder="Create a strong password"
                      />
                      <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-secondary mb-3">Phone</label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-6 py-4 pl-12 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-lg transition-all duration-300 bg-gray-50 focus:bg-white"
                          placeholder="(555) 123-4567"
                        />
                        <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-secondary mb-3">Address</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className="w-full px-6 py-4 pl-12 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-lg transition-all duration-300 bg-gray-50 focus:bg-white"
                          placeholder="Your address"
                        />
                        <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <input type="checkbox" required className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary mt-1" />
                    <span className="ml-3 text-sm text-gray-600 leading-relaxed">
                      I agree to the{' '}
                      <Link to="/terms" className="text-primary hover:text-orange-600 font-semibold">Terms of Service</Link>
                      {' '}and{' '}
                      <Link to="/privacy" className="text-primary hover:text-orange-600 font-semibold">Privacy Policy</Link>
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-primary to-orange-600 hover:from-primary hover:to-orange-700 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <span>Create Account</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    Already have an account?
                    <Link to="/login" className="text-primary hover:text-orange-600 font-semibold ml-2 transition-colors">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </div>
            </CardWithAnimation>
          </FadeInUp>
        </div>
      </div>
    </div>
  );
}