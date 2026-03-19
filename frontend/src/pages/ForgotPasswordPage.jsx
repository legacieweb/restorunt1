import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FadeInUp, CardWithAnimation } from '../components/AnimationComponents';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState('email'); // 'email', 'otp', 'password'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStep('otp');
        toast.success('OTP sent to your email!');
      } else {
        toast.error(data.error || 'Failed to send OTP');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok && data.verified) {
        setStep('password');
        toast.success('OTP verified! Please set your new password.');
      } else {
        toast.error(data.error || 'Invalid OTP');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Password reset successfully! Please log in with your new password.');
        // Redirect to login page
        window.location.href = '/login';
      } else {
        toast.error(data.error || 'Failed to reset password');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
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
              <h1 className="text-6xl font-bold mb-6">
                {step === 'email' && 'Reset Password'}
                {step === 'otp' && 'Verify Code'}
                {step === 'password' && 'New Password'}
              </h1>
              <p className="text-xl text-orange-100 leading-relaxed max-w-md">
                {step === 'email' && 'Forgot your password? No worries! Enter your email address and we\'ll send you a verification code.'}
                {step === 'otp' && 'We\'ve sent a 6-digit code to your email. Enter it below to continue.'}
                {step === 'password' && 'Great! Now set a strong password for your account.'}
              </p>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.3}>
            <div className="grid grid-cols-1 gap-8 max-w-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  {step === 'email' && (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  )}
                  {step === 'otp' && (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {step === 'password' && (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                  )}
                </div>
                <h3 className="font-semibold mb-2">
                  {step === 'email' && 'Secure Reset'}
                  {step === 'otp' && 'Verification'}
                  {step === 'password' && 'Password Update'}
                </h3>
                <p className="text-sm text-orange-200">
                  {step === 'email' && 'Your password is safe with us'}
                  {step === 'otp' && 'Enter the code from your email'}
                  {step === 'password' && 'Choose a strong password'}
                </p>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>

      {/* Right Side - Multi-step Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <FadeInUp>
            <CardWithAnimation variant="default" className="bg-white shadow-2xl border-0">
              <div className="p-12">
                {/* Step Indicator */}
                <div className="flex justify-center mb-8">
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      step === 'email' ? 'bg-primary text-white' :
                      'bg-green-500 text-white'
                    }`}>
                      1
                    </div>
                    <div className={`w-8 h-1 ${
                      step === 'email' ? 'bg-gray-300' : 'bg-green-500'
                    }`}></div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      step === 'otp' ? 'bg-primary text-white' :
                      step === 'email' ? 'bg-gray-300 text-gray-500' :
                      'bg-green-500 text-white'
                    }`}>
                      2
                    </div>
                    <div className={`w-8 h-1 ${
                      step === 'password' ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      step === 'password' ? 'bg-primary text-white' : 'bg-gray-300 text-gray-500'
                    }`}>
                      3
                    </div>
                  </div>
                </div>

                {/* Header */}
                <div className="text-center mb-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-orange-500 rounded-3xl mb-6">
                    {step === 'email' && (
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                    )}
                    {step === 'otp' && (
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {step === 'password' && (
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    )}
                  </div>
                  <h2 className="text-3xl font-bold text-secondary mb-3">
                    {step === 'email' && 'Forgot Password?'}
                    {step === 'otp' && 'Enter Verification Code'}
                    {step === 'password' && 'Set New Password'}
                  </h2>
                  <p className="text-gray-600">
                    {step === 'email' && 'Enter your email address and we\'ll send you a verification code'}
                    {step === 'otp' && 'Enter the 6-digit code sent to your email'}
                    {step === 'password' && 'Create a strong password for your account'}
                  </p>
                </div>

                {/* Forms */}
                {step === 'email' && (
                  <form onSubmit={handleEmailSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-secondary mb-3">Email Address</label>
                      <div className="relative">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full px-6 py-4 pl-12 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-lg transition-all duration-300 bg-gray-50 focus:bg-white"
                          placeholder="your@email.com"
                        />
                        <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                      </div>
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
                          Sending Code...
                        </>
                      ) : (
                        <>
                          <span>Send Verification Code</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                )}

                {step === 'otp' && (
                  <form onSubmit={handleOTPSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-secondary mb-3">Verification Code</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          required
                          maxLength="6"
                          className="w-full px-6 py-4 pl-12 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-lg transition-all duration-300 bg-gray-50 focus:bg-white text-center tracking-widest font-mono"
                          placeholder="000000"
                        />
                        <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-500 mt-2 text-center">Enter the 6-digit code sent to {email}</p>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || otp.length !== 6}
                      className="w-full bg-gradient-to-r from-primary to-orange-600 hover:from-primary hover:to-orange-700 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Verifying...
                        </>
                      ) : (
                        <>
                          <span>Verify Code</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep('email')}
                      className="w-full text-primary hover:text-orange-600 font-semibold py-2 transition-colors"
                    >
                      Didn't receive code? Send again
                    </button>
                  </form>
                )}

                {step === 'password' && (
                  <form onSubmit={handlePasswordSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-secondary mb-3">New Password</label>
                      <div className="relative">
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          minLength="6"
                          className="w-full px-6 py-4 pl-12 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-lg transition-all duration-300 bg-gray-50 focus:bg-white"
                          placeholder="Enter new password"
                        />
                        <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-secondary mb-3">Confirm New Password</label>
                      <div className="relative">
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          minLength="6"
                          className="w-full px-6 py-4 pl-12 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-lg transition-all duration-300 bg-gray-50 focus:bg-white"
                          placeholder="Confirm new password"
                        />
                        <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || !password || !confirmPassword}
                      className="w-full bg-gradient-to-r from-primary to-orange-600 hover:from-primary hover:to-orange-700 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Resetting Password...
                        </>
                      ) : (
                        <>
                          <span>Reset Password</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* Footer */}
                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    Remember your password?
                    <Link to="/login" className="text-primary hover:text-orange-600 font-semibold ml-2 transition-colors">
                      Back to Login
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