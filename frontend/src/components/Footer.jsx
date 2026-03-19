export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-secondary to-blue-800 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold">Restaurant</h3>
            </div>
            <p className="text-blue-100 text-lg leading-relaxed">Experience world-class dining with exceptional service, premium ingredients, and an unforgettable atmosphere.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="/" className="text-blue-100 hover:text-white transition font-semibold">Home</a></li>
              <li><a href="/menu" className="text-blue-100 hover:text-white transition font-semibold">Menu</a></li>
              <li><a href="/reservations" className="text-blue-100 hover:text-white transition font-semibold">Reservations</a></li>
              <li><a href="/cart" className="text-blue-100 hover:text-white transition font-semibold">Cart</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-6">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">+1 (555) 123-4567</p>
                  <p className="text-blue-200 text-sm">Call us anytime</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">info@restaurant.com</p>
                  <p className="text-blue-200 text-sm">Email us</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-6">Opening Hours</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Mon-Fri</p>
                  <p className="text-blue-200 text-sm">10:00 AM - 10:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold">Sat-Sun</p>
                  <p className="text-blue-200 text-sm">11:00 AM - 9:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-blue-700 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-blue-200">&copy; 2024 Restaurant. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-blue-200 hover:text-white transition">Privacy Policy</a>
              <a href="#" className="text-blue-200 hover:text-white transition">Terms of Service</a>
              <a href="#" className="text-blue-200 hover:text-white transition">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
