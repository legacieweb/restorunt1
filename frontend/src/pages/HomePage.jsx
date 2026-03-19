import { Link } from 'react-router-dom';
import {
  FadeInUp,
  FadeInDown,
  StaggerContainer,
  StaggerItem,
  CardWithAnimation,
  ButtonWithAnimation,
  HoverScale,
  AnimatedCounter,
  TextReveal
} from '../components/AnimationComponents';

export default function HomePage() {
  const featuredItems = [
    {
      id: 1,
      backendId: "64f8a2b5c9d4e1f2a3b4c5d6", // Sample MongoDB ObjectId
      name: "Grilled Salmon",
      description: "Fresh Atlantic salmon with herbs and lemon",
      price: 28.99,
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop&crop=center",
      category: "mains",
      rating: 4.8,
      vegetarian: false,
      spicy: false
    },
    {
      id: 2,
      backendId: "64f8a2b5c9d4e1f2a3b4c5d7",
      name: "Caesar Salad",
      description: "Crisp romaine lettuce with homemade dressing",
      price: 16.50,
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop&crop=center",
      category: "salads",
      rating: 4.6,
      vegetarian: true,
      spicy: false
    },
    {
      id: 3,
      backendId: "64f8a2b5c9d4e1f2a3b4c5d8",
      name: "Chocolate Lava Cake",
      description: "Warm chocolate cake with vanilla ice cream",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop&crop=center",
      category: "desserts",
      rating: 4.9,
      vegetarian: true,
      spicy: false
    },
    {
      id: 4,
      backendId: "64f8a2b5c9d4e1f2a3b4c5d9",
      name: "Spicy Wings",
      description: "Crispy chicken wings with buffalo sauce",
      price: 18.75,
      image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&h=300&fit=crop&crop=center",
      category: "appetizers",
      rating: 4.7,
      vegetarian: false,
      spicy: true
    },
    {
      id: 5,
      backendId: "64f8a2b5c9d4e1f2a3b4c5da",
      name: "Margherita Pizza",
      description: "Fresh tomatoes, mozzarella, and basil",
      price: 22.00,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&crop=center",
      category: "mains",
      rating: 4.5,
      vegetarian: true,
      spicy: false
    },
    {
      id: 6,
      backendId: "64f8a2b5c9d4e1f2a3b4c5db",
      name: "Fresh Juice Blend",
      description: "Seasonal fruits blended to perfection",
      price: 8.50,
      image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=400&h=300&fit=crop&crop=center",
      category: "beverages",
      rating: 4.4,
      vegetarian: true,
      spicy: false
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "Absolutely amazing experience! The food was incredible and the service was top-notch. Will definitely be back!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      rating: 5,
      comment: "Best restaurant in the city! The atmosphere is perfect and every dish we've tried has been outstanding.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      rating: 5,
      comment: "Perfect place for special occasions. The reservations were easy to make and the food exceeded our expectations.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face"
    }
  ];

  const galleryImages = [
    { 
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop&crop=center",
      title: "Elegant Dining Room"
    },
    { 
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop&crop=center",
      title: "Wine Collection"
    },
    { 
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=300&h=200&fit=crop&crop=center",
      title: "Dessert Artistry"
    },
    { 
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center",
      title: "Chef's Special"
    },
    { 
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop&crop=center",
      title: "Fresh Ingredients"
    },
    { 
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=200&fit=crop&crop=center",
      title: "Fine Atmosphere"
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 78, 137, 0.8), rgba(255, 107, 53, 0.8)), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop&crop=center')`
          }}
        ></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
          <FadeInUp>
            <div className="mb-12">
              <h1 className="text-7xl md:text-8xl font-bold mb-8 leading-tight gradient-text animate-gradient">
                Culinary
                <span className="text-primary block">Excellence</span>
              </h1>
              <FadeInUp delay={0.3}>
                <TextReveal 
                  text="Experience world-class dining with exceptional service, premium ingredients, and an unforgettable atmosphere"
                  className="text-2xl md:text-3xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed"
                />
              </FadeInUp>
            </div>
          </FadeInUp>
          
          <FadeInUp delay={0.6}>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16">
              <HoverScale>
                <Link 
                  to="/menu" 
                  className="group bg-primary hover:bg-orange-600 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 shadow-2xl flex items-center gap-4"
                >
                  <span>Order Now</span>
                  <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </HoverScale>
              <HoverScale>
                <Link 
                  to="/reservations" 
                  className="group bg-white text-secondary hover:bg-gray-100 px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 shadow-2xl flex items-center gap-4"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Reserve Table</span>
                </Link>
              </HoverScale>
            </div>
          </FadeInUp>

          <StaggerContainer>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl mx-auto">
              <StaggerItem>
                <HoverScale>
                  <div className="text-center interactive-hover">
                    <AnimatedCounter end={4.9} className="text-5xl font-bold mb-3" />
                    <div className="text-gray-300 text-lg">Customer Rating</div>
                  </div>
                </HoverScale>
              </StaggerItem>
              <StaggerItem>
                <HoverScale>
                  <div className="text-center interactive-hover">
                    <AnimatedCounter end={10000} className="text-5xl font-bold mb-3" />
                    <div className="text-gray-300 text-lg">Happy Customers</div>
                  </div>
                </HoverScale>
              </StaggerItem>
              <StaggerItem>
                <HoverScale>
                  <div className="text-center interactive-hover">
                    <AnimatedCounter end={50} className="text-5xl font-bold mb-3" />
                    <div className="text-gray-300 text-lg">Awards Won</div>
                  </div>
                </HoverScale>
              </StaggerItem>
              <StaggerItem>
                <HoverScale>
                  <div className="text-center interactive-hover">
                    <AnimatedCounter end={15} className="text-5xl font-bold mb-3" />
                    <div className="text-gray-300 text-lg">Expert Chefs</div>
                  </div>
                </HoverScale>
              </StaggerItem>
            </div>
          </StaggerContainer>
        </div>
        
        {/* Floating background elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary opacity-20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white opacity-10 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-primary opacity-15 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-16 w-12 h-12 bg-white opacity-20 rounded-full animate-bounce delay-700"></div>
      </section>

      {/* Featured Menu Section */}
      <section className="py-32 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <FadeInUp>
            <div className="text-center mb-20">
              <h2 className="text-7xl font-bold mb-8 text-secondary gradient-text-secondary">Our Signature Menu</h2>
              <TextReveal 
                text="Discover our carefully crafted dishes made with the finest ingredients"
                className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
              />
            </div>
          </FadeInUp>

          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
              {featuredItems.map((item, index) => (
                <StaggerItem key={item.id}>
                  <Link 
                    to={`/product/${item.backendId}`}
                    className="group block overflow-hidden"
                  >
                    <CardWithAnimation variant="default" className="group overflow-hidden">
                      <div className="relative h-80 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-6 left-6">
                          <span className="bg-primary text-white px-4 py-2 rounded-full font-semibold text-sm capitalize">
                            {item.category}
                          </span>
                        </div>
                        <div className="absolute top-6 right-6 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-2 rounded-full">
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm font-semibold text-gray-700">{item.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-8">
                        <h3 className="text-2xl font-bold mb-4 text-secondary">{item.name}</h3>
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">{item.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-4xl font-bold text-primary">${item.price.toFixed(2)}</span>
                          <div className="flex gap-3">
                            {item.vegetarian && (
                              <span className="text-xs bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
                                Vegetarian
                              </span>
                            )}
                            {item.spicy && (
                              <span className="text-xs bg-red-100 text-red-800 px-4 py-2 rounded-full font-semibold">
                                🌶️ Spicy
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardWithAnimation>
                  </Link>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          <div className="text-center">
            <Link 
              to="/menu" 
              className="inline-flex items-center gap-4 bg-secondary hover:bg-blue-800 text-white px-16 py-6 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              <span>View Complete Menu</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Reservations Section */}
      <section className="py-32 bg-gradient-to-br from-blue-50 via-white to-orange-50 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23004E89' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        {/* Floating accent elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-400/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-400/5 rounded-full blur-xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-20">
            <FadeInUp>
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/10 to-orange-500/10 rounded-full px-6 py-3 mb-8 border border-primary/20">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-semibold text-secondary">Reservations</span>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <h2 className="text-5xl md:text-6xl font-bold mb-8 text-secondary">
                Reserve Your
                <span className="block bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">Perfect Experience</span>
              </h2>
            </FadeInUp>

            <FadeInUp delay={0.4}>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Join us for an unforgettable dining experience. Our expert chefs and attentive staff
                are ready to create memorable moments for you and your loved ones.
              </p>
            </FadeInUp>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 items-start">
            {/* Benefits Cards */}
            <div className="xl:col-span-1 space-y-6">
              <StaggerContainer>
                <StaggerItem>
                  <CardWithAnimation variant="default" className="bg-white hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="p-8">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-4 text-secondary">Flexible Scheduling</h3>
                      <p className="text-gray-600 leading-relaxed">Choose your preferred time and we'll accommodate your schedule with our flexible reservation system.</p>
                    </div>
                  </CardWithAnimation>
                </StaggerItem>

                <StaggerItem>
                  <CardWithAnimation variant="default" className="bg-white hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="p-8">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-4 text-secondary">Group Reservations</h3>
                      <p className="text-gray-600 leading-relaxed">Perfect for celebrations of any size, from intimate gatherings to large corporate events.</p>
                    </div>
                  </CardWithAnimation>
                </StaggerItem>

                <StaggerItem>
                  <CardWithAnimation variant="default" className="bg-white hover:shadow-xl transition-all duration-300 border border-gray-100">
                    <div className="p-8">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold mb-4 text-secondary">Premium Service</h3>
                      <p className="text-gray-600 leading-relaxed">Experience our award-winning service and exceptional attention to every detail.</p>
                    </div>
                  </CardWithAnimation>
                </StaggerItem>
              </StaggerContainer>
            </div>

            {/* Reservation Form */}
            <div className="xl:col-span-2">
              <CardWithAnimation variant="default" className="bg-white shadow-2xl border border-gray-100">
                <div className="p-12">
                  <div className="text-center mb-10">
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 text-secondary">Make Your Reservation</h3>
                    <p className="text-lg text-gray-600">Fill out the form below and we'll confirm your booking within minutes</p>
                  </div>

                  <form className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-lg font-semibold text-secondary">Full Name</label>
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-lg transition-all duration-300 bg-gray-50 focus:bg-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-lg font-semibold text-secondary">Email Address</label>
                        <input
                          type="email"
                          placeholder="your@email.com"
                          className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-lg transition-all duration-300 bg-gray-50 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="space-y-2">
                        <label className="text-lg font-semibold text-secondary">Date</label>
                        <input
                          type="date"
                          className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-lg transition-all duration-300 bg-gray-50 focus:bg-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-lg font-semibold text-secondary">Time</label>
                        <select className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-lg transition-all duration-300 bg-gray-50 focus:bg-white">
                          <option>6:00 PM</option>
                          <option>6:30 PM</option>
                          <option>7:00 PM</option>
                          <option>7:30 PM</option>
                          <option>8:00 PM</option>
                          <option>8:30 PM</option>
                          <option>9:00 PM</option>
                          <option>9:30 PM</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-lg font-semibold text-secondary">Guests</label>
                        <select className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-lg transition-all duration-300 bg-gray-50 focus:bg-white">
                          <option>1 Guest</option>
                          <option>2 Guests</option>
                          <option>3 Guests</option>
                          <option>4 Guests</option>
                          <option>5 Guests</option>
                          <option>6+ Guests</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-lg font-semibold text-secondary">Special Requests</label>
                      <textarea
                        placeholder="Any special dietary requirements, allergies, or celebration notes..."
                        rows="4"
                        className="w-full px-6 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-lg resize-none transition-all duration-300 bg-gray-50 focus:bg-white"
                      ></textarea>
                    </div>

                    <div className="pt-6">
                      <Link
                        to="/reservations"
                        className="w-full bg-gradient-to-r from-primary to-orange-600 hover:from-primary hover:to-orange-700 text-white py-6 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-4 shadow-lg"
                      >
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Reserve Your Table</span>
                      </Link>
                    </div>
                  </form>
                </div>
              </CardWithAnimation>
            </div>
          </div>

          {/* Contact Info Cards */}
          <div className="mt-20">
            <StaggerContainer>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StaggerItem>
                  <CardWithAnimation variant="default" className="bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 text-center p-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-secondary mb-3">Opening Hours</h4>
                    <p className="text-gray-600 text-lg">Mon-Sat: 10AM - 10PM</p>
                    <p className="text-gray-500">Sun: 11AM - 9PM</p>
                  </CardWithAnimation>
                </StaggerItem>

                <StaggerItem>
                  <CardWithAnimation variant="default" className="bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 text-center p-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-secondary mb-3">Call Us</h4>
                    <p className="text-gray-600 text-lg">(555) 123-4567</p>
                    <p className="text-gray-500">24/7 Reservation Support</p>
                  </CardWithAnimation>
                </StaggerItem>

                <StaggerItem>
                  <CardWithAnimation variant="default" className="bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 text-center p-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-secondary mb-3">Visit Us</h4>
                    <p className="text-gray-600 text-lg">123 Culinary Street</p>
                    <p className="text-gray-500">Downtown District</p>
                  </CardWithAnimation>
                </StaggerItem>
              </div>
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-7xl font-bold mb-10 text-secondary">About Our Story</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                For over two decades, we've been serving the community with exceptional cuisine 
                and unforgettable dining experiences. Our commitment to quality and service has 
                made us a beloved destination for food enthusiasts.
              </p>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                From our carefully sourced ingredients to our expertly trained staff, every 
                detail is crafted to provide you with an extraordinary culinary journey.
              </p>
              
              <div className="grid grid-cols-2 gap-10">
                <div className="text-center">
                  <div className="bg-secondary bg-opacity-10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-secondary mb-3">Expert Chefs</h3>
                  <p className="text-gray-600">Award-winning culinary artists</p>
                </div>
                <div className="text-center">
                  <div className="bg-secondary bg-opacity-10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-secondary mb-3">Quality First</h3>
                  <p className="text-gray-600">Premium ingredients only</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              {galleryImages.map((item, index) => (
                <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-secondary">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-7xl font-bold mb-8 text-secondary">What Our Guests Say</h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              Real reviews from our valued customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="flex justify-center mb-8">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-primary"
                  />
                </div>
                <div className="flex justify-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-lg mb-8 italic leading-relaxed text-center">
                  "{testimonial.comment}"
                </p>
                <h3 className="text-xl font-bold text-secondary text-center">{testimonial.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 bg-gradient-to-br from-secondary to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop&crop=center')`
            }}
          ></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-7xl font-bold mb-8">Why Choose Us</h2>
            <p className="text-2xl text-blue-100 max-w-4xl mx-auto">
              Experience the difference that sets us apart
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="text-center group">
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-10 group-hover:bg-opacity-20 transition-all duration-500 border border-white border-opacity-20">
                <div className="bg-primary bg-opacity-20 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8">
                  <svg className="w-10 h-10 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Fast Delivery</h3>
                <p className="text-blue-100">Quick delivery within 30 minutes or it's free</p>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-10 group-hover:bg-opacity-20 transition-all duration-500 border border-white border-opacity-20">
                <div className="bg-primary bg-opacity-20 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8">
                  <svg className="w-10 h-10 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Easy Reservations</h3>
                <p className="text-blue-100">Book your table in seconds with our simple system</p>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-10 group-hover:bg-opacity-20 transition-all duration-500 border border-white border-opacity-20">
                <div className="bg-primary bg-opacity-20 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8">
                  <svg className="w-10 h-10 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Quality Assured</h3>
                <p className="text-blue-100">Premium ingredients guaranteed in every dish</p>
              </div>
            </div>
            <div className="text-center group">
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-10 group-hover:bg-opacity-20 transition-all duration-500 border border-white border-opacity-20">
                <div className="bg-primary bg-opacity-20 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8">
                  <svg className="w-10 h-10 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Made with Love</h3>
                <p className="text-blue-100">Every dish prepared with passion and care</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Location Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-7xl font-bold mb-8 text-secondary">Visit Us Today</h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
              Located in the heart of the city, ready to welcome you
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="bg-gradient-to-br from-primary to-orange-600 rounded-3xl p-10 text-white text-center shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="bg-white bg-opacity-20 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-6">Location</h3>
              <p className="text-orange-100 text-lg">
                123 Main Street<br />
                Downtown District<br />
                City, State 12345
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-secondary to-blue-800 rounded-3xl p-10 text-white text-center shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="bg-white bg-opacity-20 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-6">Contact</h3>
              <p className="text-blue-100 text-lg">
                Phone: (555) 123-4567<br />
                Email: info@restaurant.com<br />
                Fax: (555) 123-4568
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-10 text-white text-center shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="bg-white bg-opacity-20 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-6">Hours</h3>
              <p className="text-gray-300 text-lg">
                Mon-Sat: 10:00 AM - 10:00 PM<br />
                Sunday: 11:00 AM - 9:00 PM<br />
                Holidays: Special Hours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 bg-gradient-to-br from-primary to-orange-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop&crop=center')`
            }}
          ></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-7xl font-bold mb-10">Ready for an Unforgettable Experience?</h2>
          <p className="text-2xl text-orange-100 mb-16 leading-relaxed max-w-4xl mx-auto">
            Join thousands of satisfied customers and discover why we're the city's favorite dining destination
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Link 
              to="/menu" 
              className="inline-flex items-center gap-4 bg-white text-primary hover:bg-gray-100 px-16 py-6 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              <span>Order Now</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link 
              to="/reservations" 
              className="inline-flex items-center gap-4 bg-secondary hover:bg-blue-800 text-white px-16 py-6 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Make Reservation</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
