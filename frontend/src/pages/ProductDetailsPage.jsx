import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  FadeInUp,
  CardWithAnimation,
  ButtonWithAnimation,
  HoverScale
} from '../components/AnimationComponents';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // Food images mapping for better visuals
  const foodImages = {
    'Grilled Salmon': 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&h=600&fit=crop&crop=center',
    'Margherita Pizza': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop&crop=center',
    'Spicy Curry': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=600&fit=crop&crop=center',
    'Caesar Salad': 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&h=600&fit=crop&crop=center',
    'Bruschetta': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop&crop=center',
    'French Fries': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&h=600&fit=crop&crop=center',
    'Tiramisu': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=600&fit=crop&crop=center',
    'Iced Coffee': 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800&h=600&fit=crop&crop=center',
    'Pancakes': 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=800&h=600&fit=crop&crop=center',
    'Eggs Benedict': 'https://images.unsplash.com/photo-1543353071-087092ec393e?w=800&h=600&fit=crop&crop=center'
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
      fetchRelatedProducts();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      
      // First check if it's a static product
      const staticProduct = getStaticProduct(id);
      if (staticProduct) {
        setProduct(staticProduct);
        setLoading(false);
        return;
      }
      
      // If not static, try to fetch from backend
      const response = await axios.get(`/api/menu/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.log('Product not found in backend, staying with static or showing error');
      
      // Double check static products in case of race condition
      const staticProduct = getStaticProduct(id);
      if (staticProduct) {
        setProduct(staticProduct);
      } else {
        toast.error('Product not found');
        navigate('/menu');
      }
    } finally {
      setLoading(false);
    }
  };

  const getStaticProduct = (productId) => {
    const staticProducts = {
      "64f8a2b5c9d4e1f2a3b4c5d6": {
        _id: "64f8a2b5c9d4e1f2a3b4c5d6",
        name: "Grilled Salmon",
        description: "Fresh Atlantic salmon with herbs and lemon. Our signature dish features premium Atlantic salmon grilled to perfection with a blend of fresh herbs and a hint of lemon. Served with seasonal vegetables and your choice of side.",
        price: 28.99,
        category: "mains",
        rating: 4.8,
        vegetarian: false,
        spicy: false,
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&h=600&fit=crop&crop=center"
      },
      "64f8a2b5c9d4e1f2a3b4c5d7": {
        _id: "64f8a2b5c9d4e1f2a3b4c5d7",
        name: "Caesar Salad",
        description: "Crisp romaine lettuce with homemade Caesar dressing, parmesan cheese, and croutons. Made fresh daily with the finest ingredients and our special house-made dressing that has been perfected over the years.",
        price: 16.50,
        category: "salads",
        rating: 4.6,
        vegetarian: true,
        spicy: false,
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&h=600&fit=crop&crop=center"
      },
      "64f8a2b5c9d4e1f2a3b4c5d8": {
        _id: "64f8a2b5c9d4e1f2a3b4c5d8",
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with vanilla ice cream. A decadent dessert featuring a rich chocolate cake with a molten center, served with a scoop of premium vanilla ice cream and fresh berries.",
        price: 12.99,
        category: "desserts",
        rating: 4.9,
        vegetarian: true,
        spicy: false,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=600&fit=crop&crop=center"
      },
      "64f8a2b5c9d4e1f2a3b4c5d9": {
        _id: "64f8a2b5c9d4e1f2a3b4c5d9",
        name: "Spicy Wings",
        description: "Crispy chicken wings with buffalo sauce. Our signature wings are seasoned and fried to golden perfection, then tossed in our house-made spicy buffalo sauce. Served with celery and blue cheese dressing.",
        price: 18.75,
        category: "appetizers",
        rating: 4.7,
        vegetarian: false,
        spicy: true,
        image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800&h=600&fit=crop&crop=center"
      },
      "64f8a2b5c9d4e1f2a3b4c5da": {
        _id: "64f8a2b5c9d4e1f2a3b4c5da",
        name: "Margherita Pizza",
        description: "Fresh tomatoes, mozzarella, and basil. Our classic Margherita pizza features a thin crust topped with San Marzano tomatoes, fresh mozzarella di bufala, and aromatic basil leaves. Finished with a drizzle of extra virgin olive oil.",
        price: 22.00,
        category: "mains",
        rating: 4.5,
        vegetarian: true,
        spicy: false,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop&crop=center"
      },
      "64f8a2b5c9d4e1f2a3b4c5db": {
        _id: "64f8a2b5c9d4e1f2a3b4c5db",
        name: "Fresh Juice Blend",
        description: "Seasonal fruits blended to perfection. A refreshing blend of fresh seasonal fruits, perfect for a healthy start to your day or a nutritious pick-me-up anytime.",
        price: 8.50,
        category: "beverages",
        rating: 4.4,
        vegetarian: true,
        spicy: false,
        image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800&h=600&fit=crop&crop=center"
      }
    };
    
    return staticProducts[productId] || null;
  };

  const fetchRelatedProducts = async () => {
    try {
      const response = await axios.get('/api/menu?limit=4');
      setRelatedProducts(response.data.filter(item => item._id !== id));
    } catch (error) {
      console.error('Failed to fetch related products');
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`${quantity} x ${product.name} added to cart!`);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-primary mb-6"></div>
          <p className="text-2xl text-gray-600">Loading delicious details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-8">🍽️</div>
          <p className="text-2xl text-gray-600 mb-8">Product not found</p>
          <Link 
            to="/menu"
            className="bg-primary text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-orange-600 transition-all duration-300"
          >
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section with Product Image */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Product Image */}
            <FadeInUp>
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src={product.image || foodImages[product.name] || `https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop&crop=center`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating badges */}
                <div className="absolute top-6 left-6 flex gap-3">
                  <span className="bg-primary text-white px-4 py-2 rounded-full font-semibold text-sm capitalize">
                    {product.category}
                  </span>
                  {product.vegetarian && (
                    <span className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold text-sm">
                      Vegetarian
                    </span>
                  )}
                  {product.spicy && (
                    <span className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold text-sm">
                      🌶️ Spicy
                    </span>
                  )}
                </div>
                <div className="absolute top-6 right-6 bg-white bg-opacity-90 backdrop-blur-sm px-4 py-2 rounded-full">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-semibold text-gray-700">4.8</span>
                    <span className="text-sm text-gray-600">(127 reviews)</span>
                  </div>
                </div>
              </div>
            </FadeInUp>

            {/* Product Details */}
            <FadeInUp delay={0.2}>
              <div className="space-y-8">
                <div>
                  <Link 
                    to="/menu"
                    className="inline-flex items-center gap-2 text-primary hover:text-orange-600 transition-colors mb-6"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Menu
                  </Link>
                  
                  <h1 className="text-5xl md:text-6xl font-bold text-secondary mb-6 leading-tight">
                    {product.name}
                  </h1>
                  
                  <p className="text-xl text-gray-600 leading-relaxed mb-8">
                    {product.description}
                  </p>
                </div>

                {/* Price and Rating */}
                <div className="flex items-center justify-between">
                  <div className="text-6xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <div className="text-gray-600">
                      <div className="font-semibold">4.8/5</div>
                      <div className="text-sm">127 reviews</div>
                    </div>
                  </div>
                </div>

                {/* Quantity and Add to Cart */}
                <CardWithAnimation variant="default" className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-secondary">Quantity</h3>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="text-2xl font-bold text-secondary w-12 text-center">{quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <ButtonWithAnimation
                    onClick={handleAddToCart}
                    className="w-full bg-primary hover:bg-orange-600 text-white py-6 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5m6 0L19 13m-2-2.5l-2.5-2.5M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6" />
                    </svg>
                    Add {quantity} to Cart - ${(product.price * quantity).toFixed(2)}
                  </ButtonWithAnimation>
                </CardWithAnimation>

                {/* Product Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-secondary mb-2">Fresh Ingredients</h4>
                    <p className="text-gray-600 text-sm">Made with the finest, freshest ingredients</p>
                  </div>
                  
                  <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-secondary mb-2">Quick Service</h4>
                    <p className="text-gray-600 text-sm">Prepared and served fresh to order</p>
                  </div>
                  
                  <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                    <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-secondary mb-2">Made with Love</h4>
                    <p className="text-gray-600 text-sm">Crafted with passion by our expert chefs</p>
                  </div>
                </div>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <FadeInUp>
              <div className="text-center mb-16">
                <h2 className="text-5xl font-bold mb-6 text-secondary">You Might Also Like</h2>
                <p className="text-xl text-gray-600">Discover more delicious options from our menu</p>
              </div>
            </FadeInUp>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct, index) => (
                <FadeInUp key={relatedProduct._id} delay={index * 0.1}>
                  <HoverScale>
                    <Link 
                      to={`/product/${relatedProduct._id}`}
                      className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={foodImages[relatedProduct.name] || `https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center`}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-primary text-white px-3 py-1 rounded-full font-semibold text-xs capitalize">
                            {relatedProduct.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold mb-2 text-secondary">{relatedProduct.name}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{relatedProduct.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-primary">${relatedProduct.price.toFixed(2)}</span>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm text-gray-600">4.5</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </HoverScale>
                </FadeInUp>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}