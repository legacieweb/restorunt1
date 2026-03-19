import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  const categories = ['appetizers', 'mains', 'sides', 'desserts', 'beverages', 'breakfast', 'salads'];

  // Food images mapping for better visuals
  const foodImages = {
    'Grilled Salmon': 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop&crop=center',
    'Margherita Pizza': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&crop=center',
    'Spicy Curry': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop&crop=center',
    'Caesar Salad': 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop&crop=center',
    'Bruschetta': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center',
    'French Fries': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop&crop=center',
    'Tiramisu': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop&crop=center',
    'Iced Coffee': 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=400&h=300&fit=crop&crop=center',
    'Pancakes': 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400&h=300&fit=crop&crop=center',
    'Eggs Benedict': 'https://images.unsplash.com/photo-1543353071-087092ec393e?w=400&h=300&fit=crop&crop=center'
  };

  useEffect(() => {
    fetchMenu();
  }, [category]);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      const url = category ? `/api/menu?category=${category}` : '/api/menu';
      const response = await axios.get(url);
      setMenuItems(response.data);
    } catch (error) {
      toast.error('Failed to load menu');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-secondary to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop&crop=center')`
            }}
          ></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-7xl md:text-8xl font-bold mb-8">Our Menu</h1>
          <p className="text-2xl md:text-3xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Discover our carefully crafted dishes made with the finest ingredients
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Category Filter */}
        <div className="mb-16">
          <div className="flex flex-wrap justify-center gap-6 items-center">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <h3 className="text-2xl font-bold text-secondary">Filter by Category</h3>
            </div>
            <button
              onClick={() => setCategory('')}
              className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                !category 
                  ? 'bg-primary text-white shadow-lg transform scale-105' 
                  : 'bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white'
              }`}
            >
              All Items
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-8 py-4 rounded-2xl font-bold text-lg capitalize transition-all duration-300 ${
                  category === cat 
                    ? 'bg-primary text-white shadow-lg transform scale-105' 
                    : 'bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-32">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
            <p className="text-2xl text-gray-600 mt-6">Loading delicious dishes...</p>
          </div>
        ) : menuItems.length === 0 ? (
          <div className="text-center py-32">
            <div className="text-8xl mb-8">🍽️</div>
            <p className="text-2xl text-gray-500">No items available in this category</p>
            <button 
              onClick={() => setCategory('')}
              className="mt-8 bg-primary text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-orange-600 transition-all duration-300"
            >
              View All Items
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {menuItems.map(item => (
              <Link 
                key={item._id} 
                to={`/product/${item._id}`}
                className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 overflow-hidden"
              >
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={foodImages[item.name] || `https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center`} 
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
                      <span className="text-sm font-semibold text-gray-700">4.5</span>
                    </div>
                  </div>
                  {item.vegetarian && (
                    <div className="absolute bottom-6 left-6 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Vegetarian
                    </div>
                  )}
                  {item.spicy && (
                    <div className="absolute bottom-6 right-6 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      🌶️ Spicy
                    </div>
                  )}
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-secondary">{item.name}</h3>
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">{item.description}</p>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-4xl font-bold text-primary">${item.price.toFixed(2)}</span>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm text-gray-600">4.5 (127 reviews)</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddToCart(item);
                    }}
                    className="w-full bg-primary hover:bg-orange-600 text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5m6 0L19 13m-2-2.5l-2.5-2.5M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6" />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Call to Action */}
        {!loading && menuItems.length > 0 && (
          <div className="text-center mt-20">
            <div className="bg-gradient-to-br from-primary to-orange-600 rounded-3xl p-12 text-white">
              <h3 className="text-4xl font-bold mb-6">Can't Decide?</h3>
              <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
                Let our chef surprise you with our daily special or create a custom tasting menu for your group.
              </p>
              <button className="bg-white text-primary hover:bg-gray-100 px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105">
                Contact Chef
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
