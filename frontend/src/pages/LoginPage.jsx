import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FadeInUp, CardWithAnimation } from '../components/AnimationComponents';

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      toast.success('Welcome back!');
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
            backgroundImage: `url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=1000&fit=crop&crop=center')`
          }}
        ></div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-orange-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-400/20 rounded-full blur-lg animate-pulse delay-500"></div>

        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
          <FadeInUp>
            <div className="text-center mb-12">
              <h1 className="text-6xl font-bold mb-6">Welcome Back</h1>
              <p className="text-xl text-orange-100 leading-relaxed max-w-md">
                Continue your culinary journey with us. Access your account to manage reservations,
                view order history, and discover new favorites.
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
                <h3 className="font-semibold mb-2">Quick Access</h3>
                <p className="text-sm text-orange-200">Manage your reservations</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Order History</h3>
                <p className="text-sm text-orange-200">Track your favorites</p>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <FadeInUp>
            <CardWithAnimation variant="default" className="bg-white shadow-2xl border-0">
              <div className="p-12">
                {/* Header */}
                <div className="text-center mb-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-orange-500 rounded-3xl mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-secondary mb-3">Welcome Back</h2>
                  <p className="text-gray-600">Sign in to your account to continue</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
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
                        placeholder="Enter your password"
                      />
                      <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                      <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    <Link to="/forgot-password" className="text-sm text-primary hover:text-orange-600 font-semibold transition-colors">
                      Forgot password?
                    </Link>
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
                        Signing in...
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    Don't have an account?
                    <Link to="/register" className="text-primary hover:text-orange-600 font-semibold ml-2 transition-colors">
                      Create one here
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
