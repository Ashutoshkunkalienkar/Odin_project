import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { Page, Product, CartItem, User, Order, Review } from './types';
import { MOCK_PRODUCTS, CATEGORIES, OCCASions, COLORS, MOCK_ORDERS } from './constants';
import * as Icons from './components/Icons';
import { Cart } from './components/Cart';
import { GeminiAssistant } from './components/GeminiAssistant';

// --- CONTEXT DEFINITIONS ---
interface AppContextType {
  currentPage: Page;
  setCurrentPage: (page: Page, product?: Product) => void;
  selectedProduct: Product | null;
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setCartOpen: (isOpen: boolean) => void;
  currentUser: User | null;
  login: (user: Omit<User, 'wishlist'>) => void;
  logout: () => void;
  toggleWishlist: (productId: number) => void;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  orders: Order[];
  addOrder: (order: Order) => void;
  reviews: Review[];
  addReview: (reviewData: Omit<Review, 'id' | 'date'>) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// --- UI HELPER COMPONENTS ---

const Button: React.FC<{
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  type?: 'button' | 'submit' | 'reset';
}> = ({ onClick, children, className = '', variant = 'primary', type = 'button' }) => {
  const baseClasses = 'px-6 py-3 rounded-full font-bold font-sans transition-transform transform hover:scale-105';
  const variants = {
    primary: 'bg-primary text-white hover:bg-accent',
    secondary: 'bg-secondary text-primary hover:bg-accent hover:text-white',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white',
  };
  return (
    <button type={type} onClick={onClick} className={`${baseClasses} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { setCurrentPage, addToCart, setCartOpen, currentUser, toggleWishlist } = useAppContext();
  const isWishlisted = currentUser?.wishlist.includes(product.id) ?? false;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentUser) {
        toggleWishlist(product.id);
    } else {
        setCurrentPage('login');
    }
  }

  return (
    <div className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-64 object-cover cursor-pointer"
          onClick={() => setCurrentPage('productDetail', product)}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
            <button
                onClick={() => setCurrentPage('productDetail', product)}
                className="text-white border-2 border-white rounded-full px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-105"
            >
                View Details
            </button>
        </div>
        <button
            onClick={handleWishlistClick}
            className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${isWishlisted ? 'text-red-500 bg-white/80' : 'text-white bg-black/40 hover:bg-black/60'}`}
            aria-label="Add to wishlist"
        >
            <Icons.HeartIcon className="w-6 h-6" filled={isWishlisted} />
        </button>
      </div>
      <div className="p-4 text-center">
        <h3 className="text-xl font-sans font-bold text-gray-800 truncate">{product.name}</h3>
        <p className="text-lg text-primary font-bold my-2">${product.price.toFixed(2)}</p>
        <Button onClick={() => { addToCart(product, 1); setCartOpen(true); }} className="w-full">Add to Cart</Button>
      </div>
    </div>
  );
};


// --- LAYOUT COMPONENTS ---

const Header: React.FC = () => {
  const { setCurrentPage, cartItems, setCartOpen, currentUser, logout } = useAppContext();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = (
    <>
      <a onClick={() => {setCurrentPage('home'); setMenuOpen(false);}} className="cursor-pointer hover:text-primary transition-colors">Home</a>
      <a onClick={() => {setCurrentPage('products'); setMenuOpen(false);}} className="cursor-pointer hover:text-primary transition-colors">All Flowers</a>
      <a onClick={() => {setCurrentPage('about'); setMenuOpen(false);}} className="cursor-pointer hover:text-primary transition-colors">About Us</a>
      <a onClick={() => {setCurrentPage('contact'); setMenuOpen(false);}} className="cursor-pointer hover:text-primary transition-colors">Contact</a>
      {currentUser && <a onClick={() => {setCurrentPage('account'); setMenuOpen(false);}} className="cursor-pointer hover:text-primary transition-colors">My Account</a>}
      {currentUser && currentUser.email === 'admin@bloom.com' && <a onClick={() => {setCurrentPage('admin'); setMenuOpen(false);}} className="cursor-pointer hover:text-primary transition-colors">Admin</a>}
    </>
  );

  return (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-30 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div onClick={() => setCurrentPage('home')} className="text-3xl font-sans font-bold text-primary cursor-pointer">
          Bloom & Blossom
        </div>
        <nav className="hidden md:flex items-center space-x-8 font-sans text-lg">
            {navLinks}
        </nav>
        <div className="flex items-center space-x-4">
            <button onClick={() => setCartOpen(true)} className="relative p-2 hover:text-primary transition-colors">
                <Icons.ShoppingCartIcon className="w-7 h-7" />
                {totalItems > 0 && <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-accent text-white text-xs flex items-center justify-center">{totalItems}</span>}
            </button>
            {currentUser ? (
              <button onClick={logout} className="p-2 hover:text-primary transition-colors" title="Logout">
                  <Icons.LogoutIcon className="w-7 h-7" />
              </button>
            ) : (
                <button onClick={() => setCurrentPage('login')} className="p-2 hover:text-primary transition-colors" title="Login">
                    <Icons.UserIcon className="w-7 h-7" />
                </button>
            )}
            <button className="md:hidden" onClick={() => setMenuOpen(!isMenuOpen)}>
                <Icons.MenuIcon className="w-7 h-7" />
            </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4">
            <nav className="flex flex-col items-center space-y-4 font-sans text-lg">
                {navLinks}
            </nav>
        </div>
      )}
    </header>
  );
};

const Footer: React.FC = () => {
  const { setCurrentPage } = useAppContext();
  return (
    <footer className="bg-secondary">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
                <h3 className="text-2xl font-sans font-bold text-primary">Bloom & Blossom Co.</h3>
                <p className="text-gray-600 mt-2">Bringing nature's beauty to your doorstep.</p>
            </div>
            <div>
                <h4 className="font-sans font-bold text-lg">Quick Links</h4>
                <ul className="mt-2 space-y-1 text-gray-600">
                    <li><a onClick={() => setCurrentPage('home')} className="cursor-pointer hover:text-primary">Home</a></li>
                    <li><a onClick={() => setCurrentPage('products')} className="cursor-pointer hover:text-primary">Shop</a></li>
                    <li><a onClick={() => setCurrentPage('about')} className="cursor-pointer hover:text-primary">About Us</a></li>
                    <li><a onClick={() => setCurrentPage('contact')} className="cursor-pointer hover:text-primary">Contact</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-sans font-bold text-lg">Contact Us</h4>
                <p className="mt-2 text-gray-600">123 Bloom St, Floral City, FL</p>
                <p className="text-gray-600">contact@bloomandblossom.co</p>
                <div className="flex justify-center md:justify-start space-x-6 mt-4">
                    <a href="#" className="text-gray-600 hover:text-primary"><Icons.HeartIcon className="w-6 h-6"/></a>
                </div>
            </div>
        </div>
        <div className="text-center text-gray-500 mt-10 border-t border-accent pt-6">
            &copy; {new Date().getFullYear()} Bloom & Blossom Co. All rights reserved.
        </div>
      </div>
    </footer>
  );
};


// --- "PAGE" COMPONENTS ---

const HomePage: React.FC = () => {
    const { setCurrentPage, products } = useAppContext();
    const featuredProducts = products.slice(0, 4);
    const categories = [
        { name: 'Bouquets', imageUrl: 'https://images.unsplash.com/photo-1579610520498-8178b271d3e1?q=80&w=800&auto=format&fit=crop', description: 'Hand-tied expressions of love and celebration.' },
        { name: 'Arrangements', imageUrl: 'https://images.unsplash.com/photo-1560790671-616935706243?q=80&w=800&auto=format&fit=crop', description: 'Artfully designed for centerpieces and decor.' },
        { name: 'Potted Plants', imageUrl: 'https://images.unsplash.com/photo-1592150621744-aca64f9de8a6?q=80&w=800&auto=format&fit=crop', description: 'Long-lasting green gifts that purify the air.' },
    ];

    return (
        <div className="animate-fade-in">
            {/* Hero Section */}
            <section className="relative h-[60vh] bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1463100099107-d03d1b066da5?q=80&w=1600&auto=format&fit=crop')` }}>
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="relative container mx-auto px-6 h-full flex flex-col justify-center items-center text-center text-white">
                    <h1 className="text-5xl md:text-7xl font-sans font-bold">Fresh Flowers, Fresh Moments</h1>
                    <p className="text-xl md:text-2xl mt-4 max-w-2xl font-body">Exquisite bouquets and arrangements for every occasion, delivered with care.</p>
                    <Button onClick={() => setCurrentPage('products')} className="mt-8" variant="secondary">Shop All Flowers</Button>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-20 bg-neutral">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-sans font-bold text-center mb-12">Featured Bouquets</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map(p => <ProductCard key={p.id} product={p} />)}
                    </div>
                </div>
            </section>
            
            {/* Why Choose Us Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-sans font-bold mb-12">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="flex flex-col items-center">
                            <div className="bg-secondary p-5 rounded-full mb-4">
                                <Icons.LeafIcon className="w-10 h-10 text-primary"/>
                            </div>
                            <h3 className="text-2xl font-sans font-bold mt-2">Farm Fresh Quality</h3>
                            <p className="text-gray-600 mt-2 max-w-xs">We source the freshest blooms from local and sustainable farms for long-lasting beauty.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="bg-secondary p-5 rounded-full mb-4">
                                <Icons.PaintBrushIcon className="w-10 h-10 text-primary"/>
                            </div>
                            <h3 className="text-2xl font-sans font-bold mt-2">Artisan Designs</h3>
                            <p className="text-gray-600 mt-2 max-w-xs">Our expert florists create unique, handcrafted arrangements for any occasion.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="bg-secondary p-5 rounded-full mb-4">
                                <Icons.TruckIcon className="w-10 h-10 text-primary"/>
                            </div>
                            <h3 className="text-2xl font-sans font-bold mt-2">Reliable Delivery</h3>
                            <p className="text-gray-600 mt-2 max-w-xs">Enjoy timely and careful delivery, ensuring your flowers arrive in perfect condition.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Shop By Category Section */}
            <section className="py-20 bg-neutral">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-sans font-bold text-center mb-12">Shop Our Collections</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {categories.map(category => (
                            <div key={category.name} className="relative rounded-lg overflow-hidden shadow-lg group h-96 cursor-pointer" onClick={() => setCurrentPage('products')}>
                                <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white p-4 text-center">
                                    <h3 className="text-3xl font-sans font-bold">{category.name}</h3>
                                    <p className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{category.description}</p>
                                    <div className="mt-4 border-2 border-white rounded-full px-6 py-2 font-bold transition-colors group-hover:bg-white group-hover:text-primary">Shop Now</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Seasonal Offers */}
            <section className="py-20">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/2">
                        <img src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=800&auto=format&fit=crop" alt="Seasonal Offer" className="rounded-lg shadow-lg"/>
                    </div>
                    <div className="md:w-1/2 text-center md:text-left">
                        <h2 className="text-4xl font-sans font-bold">Seasonal Sensation</h2>
                        <p className="text-accent text-xl font-bold mt-2">20% OFF ALL TULIP ARRANGEMENTS</p>
                        <p className="mt-4 text-gray-600">Embrace the season with our vibrant collection of fresh tulips. Perfect for brightening up any space. Use code <span className="font-bold">SPRING20</span> at checkout.</p>
                        <Button onClick={() => setCurrentPage('products')} className="mt-6">Shop Seasonal</Button>
                    </div>
                </div>
            </section>
            
            {/* Testimonials Section */}
            <section className="py-20 bg-neutral">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-sans font-bold mb-12">What Our Customers Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <Icons.QuoteIcon className="w-10 h-10 text-secondary mx-auto mb-4" />
                            <p className="text-gray-600 italic">"The most beautiful bouquet I've ever received! The flowers were so fresh and the arrangement was stunning. Will definitely order again."</p>
                            <div className="flex items-center justify-center mt-6">
                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" alt="Customer Sarah L." className="w-12 h-12 rounded-full object-cover mr-4" />
                                <div>
                                    <p className="font-bold text-lg">Sarah L.</p>
                                    <p className="text-sm text-gray-500">Anniversary Bouquet</p>
                                </div>
                            </div>
                        </div>
                        {/* Testimonial 2 */}
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <Icons.QuoteIcon className="w-10 h-10 text-secondary mx-auto mb-4" />
                            <p className="text-gray-600 italic">"Excellent service and fast delivery. The flowers for my mom's birthday were perfect and she was so happy. The AI assistant was a fun touch!"</p>
                            <div className="flex items-center justify-center mt-6">
                                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop" alt="Customer Mike R." className="w-12 h-12 rounded-full object-cover mr-4" />
                                <div>
                                    <p className="font-bold text-lg">Mike R.</p>
                                    <p className="text-sm text-gray-500">Birthday Arrangement</p>
                                </div>
                            </div>
                        </div>
                        {/* Testimonial 3 */}
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                             <Icons.QuoteIcon className="w-10 h-10 text-secondary mx-auto mb-4" />
                            <p className="text-gray-600 italic">"I use Bloom & Blossom for all my corporate events. They are reliable, creative, and always exceed my expectations. Highly recommended."</p>
                            <div className="flex items-center justify-center mt-6">
                                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop" alt="Customer Emily C." className="w-12 h-12 rounded-full object-cover mr-4" />
                                <div>
                                    <p className="font-bold text-lg">Emily C.</p>
                                    <p className="text-sm text-gray-500">Event Coordinator</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};


const ProductsPage: React.FC = () => {
    const { products } = useAppContext();
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState<{ category: string; occasion: string; color: string; price: number }>({
        category: 'all',
        occasion: 'all',
        color: 'all',
        price: 200,
    });

    useEffect(() => {
        let tempProducts = [...products];
        
        // Search
        if (searchTerm) {
            tempProducts = tempProducts.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        // Filters
        if (filters.category !== 'all') {
            tempProducts = tempProducts.filter(p => p.category === filters.category);
        }
        if (filters.occasion !== 'all') {
            tempProducts = tempProducts.filter(p => p.occasion.includes(filters.occasion));
        }
        if (filters.color !== 'all') {
            tempProducts = tempProducts.filter(p => p.color.includes(filters.color));
        }
        tempProducts = tempProducts.filter(p => p.price <= filters.price);
        
        setFilteredProducts(tempProducts);
    }, [searchTerm, filters, products]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
    };

    return (
        <div className="container mx-auto px-6 py-12 animate-fade-in">
            <h1 className="text-4xl font-sans font-bold text-center mb-10">Our Flowers</h1>
            <div className="flex flex-col md:flex-row gap-8">
                {/* Filters */}
                <aside className="md:w-1/4">
                    <div className="bg-neutral p-6 rounded-lg shadow-sm space-y-6">
                        <h3 className="text-2xl font-sans font-bold">Filter By</h3>
                        
                        {/* Search */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search flowers..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-accent"
                            />
                            <Icons.SearchIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                        </div>
                        
                        {/* Category */}
                        <div>
                            <label className="font-bold">Category</label>
                            <select name="category" value={filters.category} onChange={handleFilterChange} className="w-full mt-2 p-2 border rounded-lg">
                                <option value="all">All</option>
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        
                        {/* Occasion */}
                        <div>
                            <label className="font-bold">Occasion</label>
                            <select name="occasion" value={filters.occasion} onChange={handleFilterChange} className="w-full mt-2 p-2 border rounded-lg">
                                <option value="all">All</option>
                                {OCCASions.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                        </div>

                        {/* Color */}
                        <div>
                            <label className="font-bold">Color</label>
                            <select name="color" value={filters.color} onChange={handleFilterChange} className="w-full mt-2 p-2 border rounded-lg">
                                <option value="all">All</option>
                                {COLORS.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        
                        {/* Price */}
                        <div>
                            <label className="font-bold">Max Price: ${filters.price}</label>
                            <input
                                type="range"
                                name="price"
                                min="10"
                                max="200"
                                value={filters.price}
                                onChange={handleFilterChange}
                                className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                        </div>
                    </div>
                </aside>

                {/* Products Grid */}
                <main className="md:w-3/4">
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <h3 className="text-2xl font-sans font-bold">No Flowers Found</h3>
                            <p className="text-gray-600 mt-2">Try adjusting your filters to find the perfect bouquet.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

// --- REVIEW COMPONENTS ---

const StarRating: React.FC<{ rating: number; className?: string }> = ({ rating, className = 'w-5 h-5' }) => (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Icons.StarIcon key={i} className={`${className} ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} filled={i < rating} />
      ))}
    </div>
);
  
const ReviewList: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
    return (
        <div>
            <h2 className="text-3xl font-sans font-bold mb-6">Customer Reviews</h2>
            {reviews.length === 0 ? (
                <p className="text-gray-600 bg-neutral p-6 rounded-lg">No reviews yet. Be the first to share your thoughts!</p>
            ) : (
                <div className="space-y-6">
                    {reviews.map(review => (
                        <div key={review.id} className="bg-white p-6 rounded-lg shadow-sm border">
                            <div className="flex items-center justify-between">
                                <h4 className="font-bold text-lg">{review.userName}</h4>
                                <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                            </div>
                            <StarRating rating={review.rating} className="my-2 w-5 h-5"/>
                            <p className="text-gray-700">{review.comment}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
  
const ReviewForm: React.FC<{ productId: number }> = ({ productId }) => {
    const { addReview, currentUser } = useAppContext();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [hoverRating, setHoverRating] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (rating > 0 && comment.trim() && currentUser) {
            addReview({
                productId,
                userId: currentUser.id,
                userName: currentUser.name,
                rating,
                comment,
            });
            setRating(0);
            setComment('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-neutral p-6 rounded-lg mt-8">
            <h3 className="text-xl font-sans font-bold mb-4">Leave a Review</h3>
            <div className="mb-4">
                <p className="font-bold mb-2">Your Rating</p>
                <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                        <button
                            type="button"
                            key={i}
                            aria-label={`Rate ${i + 1} stars`}
                            onMouseEnter={() => setHoverRating(i + 1)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(i + 1)}
                        >
                            <Icons.StarIcon
                                className={`w-7 h-7 cursor-pointer transition-colors ${
                                    (hoverRating || rating) > i ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                                filled
                            />
                        </button>
                    ))}
                </div>
            </div>
            <div className="mb-4">
                <label className="font-bold mb-2 block" htmlFor={`comment-${productId}`}>Your Comment</label>
                <textarea
                    id={`comment-${productId}`}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    rows={4}
                    placeholder="Share your thoughts about this product..."
                    required
                />
            </div>
            <Button type="submit">Submit Review</Button>
        </form>
    );
};

const ProductDetailPage: React.FC = () => {
    const { selectedProduct, addToCart, setCartOpen, reviews, currentUser, setCurrentPage, toggleWishlist } = useAppContext();
    const [quantity, setQuantity] = useState(1);
    if (!selectedProduct) return <div className="text-center py-20">Product not found.</div>;

    const productReviews = reviews.filter(r => r.productId === selectedProduct.id);
    const isWishlisted = currentUser?.wishlist.includes(selectedProduct.id) ?? false;

    const handleWishlistClick = () => {
        if (currentUser) {
            toggleWishlist(selectedProduct.id);
        } else {
            setCurrentPage('login');
        }
    }

    return (
        <div className="container mx-auto px-6 py-12 animate-fade-in">
            <div className="flex flex-col lg:flex-row gap-12">
                <div className="lg:w-1/2">
                    <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-lg"/>
                </div>
                <div className="lg:w-1/2">
                    <h1 className="text-4xl lg:text-5xl font-sans font-bold text-primary">{selectedProduct.name}</h1>
                    <p className="text-3xl text-gray-800 font-bold my-4">${selectedProduct.price.toFixed(2)}</p>
                    <p className="text-gray-600 text-lg leading-relaxed">{selectedProduct.description}</p>
                    <div className="mt-8 flex items-center space-x-4">
                        <label className="font-bold">Quantity:</label>
                        <div className="flex items-center border rounded-full">
                            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3"><Icons.MinusIcon className="w-5 h-5"/></button>
                            <span className="px-4 text-xl font-bold">{quantity}</span>
                            <button onClick={() => setQuantity(q => q + 1)} className="p-3"><Icons.PlusIcon className="w-5 h-5"/></button>
                        </div>
                    </div>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <Button onClick={() => { addToCart(selectedProduct, quantity); setCartOpen(true); }} className="w-full sm:w-auto text-lg">
                            Add to Cart
                        </Button>
                        <button
                            onClick={handleWishlistClick}
                            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold font-sans transition-transform transform hover:scale-105 bg-transparent border-2 border-secondary text-secondary-dark hover:border-accent hover:text-accent"
                        >
                            <Icons.HeartIcon className={`w-6 h-6 ${isWishlisted ? 'text-red-500' : ''}`} filled={isWishlisted} />
                            {isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}
                        </button>
                    </div>
                </div>
            </div>
            
            <hr className="my-16" />

            {/* Reviews Section */}
            <div>
                <ReviewList reviews={productReviews} />
                {currentUser ? (
                    <ReviewForm productId={selectedProduct.id} />
                ) : (
                    <div className="mt-8 text-center bg-neutral p-6 rounded-lg">
                        <p className="text-lg">You must be logged in to leave a review.</p>
                        <Button onClick={() => setCurrentPage('login')} className="mt-4" variant="secondary">
                            Login to Review
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

const CheckoutPage: React.FC = () => {
    const { cartItems, clearCart, setCurrentPage, addOrder, currentUser } = useAppContext();
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.07;
    const total = subtotal + tax;
    const [step, setStep] = useState(1);
    const [formState, setFormState] = useState({
        name: '', address: '', city: '', zip: '',
        date: '', time: '',
        cardName: '', cardNumber: '', expiry: '', cvv: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormState({...formState, [e.target.name]: e.target.value});
    };
    
    const handleSubmitOrder = () => {
        if (!currentUser) {
            alert("Please login to place an order.");
            setCurrentPage('login');
            return;
        }
        const newOrder: Order = {
            id: `ORD-${Date.now()}`,
            userId: currentUser.id,
            items: cartItems,
            total: total,
            deliveryAddress: `${formState.address}, ${formState.city}, ${formState.zip}`,
            deliveryDate: formState.date,
            deliveryTime: formState.time,
            status: 'Pending',
            orderDate: new Date(),
        };
        addOrder(newOrder);
        clearCart();
        setCurrentPage('orderConfirmation');
    }

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-20 animate-fade-in">
                <h1 className="text-3xl font-sans">Your cart is empty.</h1>
                <Button onClick={() => setCurrentPage('products')} className="mt-6">Shop for flowers</Button>
            </div>
        );
    }
    
    return (
        <div className="container mx-auto px-6 py-12 animate-fade-in">
            <h1 className="text-4xl font-sans font-bold text-center mb-10">Checkout</h1>
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Form Section */}
                <div className="lg:w-2/3">
                    {/* Step 1: Delivery */}
                    <div className={`${step === 1 ? 'block' : 'hidden'}`}>
                        <h2 className="text-2xl font-sans font-bold mb-4">Delivery Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input name="name" placeholder="Full Name" onChange={handleInputChange} className="p-3 border rounded-lg col-span-2"/>
                            <input name="address" placeholder="Address" onChange={handleInputChange} className="p-3 border rounded-lg col-span-2"/>
                            <input name="city" placeholder="City" onChange={handleInputChange} className="p-3 border rounded-lg"/>
                            <input name="zip" placeholder="ZIP Code" onChange={handleInputChange} className="p-3 border rounded-lg"/>
                        </div>
                        <h2 className="text-2xl font-sans font-bold mt-8 mb-4">Delivery Schedule</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input name="date" type="date" onChange={handleInputChange} className="p-3 border rounded-lg"/>
                            <select name="time" onChange={handleInputChange} className="p-3 border rounded-lg">
                                <option>Select a time slot</option>
                                <option>09:00 - 12:00</option>
                                <option>12:00 - 15:00</option>
                                <option>15:00 - 18:00</option>
                            </select>
                        </div>
                        <Button onClick={() => setStep(2)} className="mt-8">Continue to Payment</Button>
                    </div>

                    {/* Step 2: Payment */}
                    <div className={`${step === 2 ? 'block' : 'hidden'}`}>
                        <h2 className="text-2xl font-sans font-bold mb-4">Payment Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <input name="cardName" placeholder="Name on Card" onChange={handleInputChange} className="p-3 border rounded-lg col-span-2"/>
                           <input name="cardNumber" placeholder="Card Number" onChange={handleInputChange} className="p-3 border rounded-lg col-span-2"/>
                           <input name="expiry" placeholder="MM/YY" onChange={handleInputChange} className="p-3 border rounded-lg"/>
                           <input name="cvv" placeholder="CVV" onChange={handleInputChange} className="p-3 border rounded-lg"/>
                        </div>
                        <div className="flex space-x-4 mt-8">
                            <Button onClick={() => setStep(1)} variant="outline">Back to Delivery</Button>
                            <Button onClick={handleSubmitOrder}>Place Order</Button>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:w-1/3">
                    <div className="bg-neutral p-6 rounded-lg shadow-sm">
                        <h2 className="text-2xl font-sans font-bold mb-4">Order Summary</h2>
                        <div className="space-y-3">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex justify-between">
                                    <span>{item.name} x {item.quantity}</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <hr className="my-4"/>
                        <div className="space-y-2">
                            <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                            <div className="flex justify-between"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
                            <div className="flex justify-between font-bold text-lg"><span>Total</span><span>${total.toFixed(2)}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const OrderConfirmationPage: React.FC = () => {
    const { setCurrentPage, orders } = useAppContext();
    const latestOrder = orders[orders.length - 1];
    
    return (
        <div className="container mx-auto px-6 py-20 text-center animate-fade-in">
            <h1 className="text-4xl font-sans font-bold text-primary">Thank You For Your Order!</h1>
            <p className="text-lg text-gray-600 mt-4">Your order has been placed successfully.</p>
            {latestOrder && <p className="mt-2">Your order number is <span className="font-bold">{latestOrder.id}</span>.</p>}
            <Button onClick={() => setCurrentPage('home')} className="mt-8">Continue Shopping</Button>
        </div>
    );
};

const LoginPage: React.FC = () => {
    const { login, setCurrentPage } = useAppContext();
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login
        const email = (e.target as HTMLFormElement).email.value;
        if(email === 'admin@bloom.com') {
          login({ id: 'admin1', name: 'Admin User', email });
        } else {
          login({ id: 'user1', name: 'Jane Doe', email });
        }
        setCurrentPage('home');
    };
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-neutral animate-fade-in">
            <div className="container mx-auto p-4">
                <div className="flex flex-col lg:flex-row w-full lg:w-4/5 xl:w-3/4 mx-auto shadow-2xl rounded-xl overflow-hidden">
                    {/* Image Panel */}
                    <div 
                        className="w-full lg:w-1/2 bg-cover bg-center p-12 min-h-[300px] lg:min-h-0 flex flex-col justify-center" 
                        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1567696153729-1229f34a702a?q=80&w=800&auto=format&fit=crop')` }}
                    >
                        <h1 className="text-white text-4xl font-sans font-bold mix-blend-overlay">Welcome Back</h1>
                        <p className="text-white mt-4 mix-blend-overlay">Sign in to continue to your floral paradise.</p>
                    </div>

                    {/* Form Panel */}
                    <div className="w-full lg:w-1/2 bg-white py-12 px-8 md:px-12">
                        <h2 className="text-3xl font-sans font-bold text-primary mb-6">Login to your Account</h2>
                        <form onSubmit={handleLogin}>
                             <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                                <input name="email" type="email" defaultValue="user@bloom.com" className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-accent focus:outline-none" required />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                                <input name="password" type="password" defaultValue="password" className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-accent focus:outline-none" required />
                            </div>
                            <p className="text-xs text-center text-gray-500 mb-4">Use `admin@bloom.com` to access the Admin panel.</p>
                            <Button type="submit" className="w-full">Login</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AccountPage: React.FC = () => {
    const { currentUser, orders, products, toggleWishlist, setCurrentPage } = useAppContext();
    if (!currentUser) return null;
    
    const userOrders = orders.filter(o => o.userId === currentUser.id);
    const wishlistProducts = products.filter(p => currentUser.wishlist.includes(p.id));
    
    return (
        <div className="container mx-auto px-6 py-12 animate-fade-in">
            <h1 className="text-4xl font-sans font-bold mb-8">My Account</h1>
            <div className="bg-neutral p-8 rounded-lg shadow-sm mb-10">
                <h2 className="text-2xl font-bold">Welcome, {currentUser.name}!</h2>
                <p className="text-gray-600">{currentUser.email}</p>
            </div>
            
            {/* Wishlist Section */}
            <div className="mb-12">
                <h2 className="text-3xl font-sans font-bold mb-6">My Wishlist</h2>
                {wishlistProducts.length > 0 ? (
                    <div className="space-y-4">
                        {wishlistProducts.map(product => (
                            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <img src={product.imageUrl} alt={product.name} className="w-20 h-20 object-cover rounded-md"/>
                                    <div>
                                        <h3 className="font-bold text-lg">{product.name}</h3>
                                        <p className="text-primary font-semibold">${product.price.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                     <Button onClick={() => setCurrentPage('productDetail', product)} variant="outline" className="px-4 py-2 text-sm">View</Button>
                                    <button onClick={() => toggleWishlist(product.id)} className="text-gray-400 hover:text-red-500 p-2" aria-label="Remove from wishlist">
                                        <Icons.TrashIcon className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="bg-white p-6 rounded-lg shadow-sm text-gray-600">Your wishlist is empty. Start exploring to add your favorites!</p>
                )}
            </div>

            {/* Order History Section */}
            <div>
                <h2 className="text-3xl font-sans font-bold mb-6">Order History</h2>
                {userOrders.length > 0 ? (
                    <div className="space-y-6">
                        {userOrders.map(order => (
                            <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold">Order #{order.id}</h3>
                                        <p className="text-gray-500">Date: {order.orderDate.toLocaleDateString()}</p>
                                    </div>
                                    <span className={`px-3 py-1 text-sm font-bold rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{order.status}</span>
                                </div>
                                <hr className="my-4"/>
                                <div className="space-y-2">
                                    {order.items.map(item => <p key={item.id}>{item.name} x {item.quantity}</p>)}
                                </div>
                                <p className="text-right font-bold mt-4">Total: ${order.total.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                ) : <p className="bg-white p-6 rounded-lg shadow-sm text-gray-600">You have no past orders.</p>}
            </div>
        </div>
    );
};

const AdminPage: React.FC = () => {
    const { products, setProducts, orders, currentUser } = useAppContext();
    const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', category: CATEGORIES[0], imageUrl: ''});
    
    if(currentUser?.email !== 'admin@bloom.com') {
      return <div className="container mx-auto py-20 text-center"><h1 className="text-3xl font-bold text-red-600">Access Denied</h1></div>;
    }

    const handleAddProduct = (e: React.FormEvent) => {
      e.preventDefault();
      const newProd: Product = {
        id: Date.now(),
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        description: newProduct.description,
        imageUrl: newProduct.imageUrl,
        category: newProduct.category,
        occasion: [],
        color: [],
        stock: 100
      };
      setProducts(prev => [newProd, ...prev]);
      setNewProduct({ name: '', price: '', description: '', category: CATEGORIES[0], imageUrl: ''});
    }

    return (
        <div className="container mx-auto px-6 py-12 animate-fade-in">
            <h1 className="text-4xl font-sans font-bold mb-8">Admin Panel</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Add Product */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
                    <form onSubmit={handleAddProduct} className="bg-white p-6 rounded-lg shadow-md space-y-4">
                        <input value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} placeholder="Product Name" className="p-2 border w-full rounded" required/>
                        <input value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} type="number" placeholder="Price" className="p-2 border w-full rounded" required step="0.01"/>
                        <textarea value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} placeholder="Description" className="p-2 border w-full rounded" required/>
                        <input value={newProduct.imageUrl} onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})} placeholder="Image URL" className="p-2 border w-full rounded" required/>
                        <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="p-2 border w-full rounded">
                          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <Button type="submit">Add Product</Button>
                    </form>
                </div>
                {/* View Orders */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">All Orders</h2>
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                        {orders.map(order => (
                            <div key={order.id} className="bg-white p-4 rounded-lg shadow-md">
                                <p className="font-bold">Order #{order.id} - ${order.total.toFixed(2)}</p>
                                <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
                                <p className="text-sm font-semibold">{order.status}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const AboutPage: React.FC = () => {
    const { setCurrentPage } = useAppContext();
    return (
        <div className="animate-fade-in">
            <section className="relative h-[40vh] bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1526047926937-29de3e47a650?q=80&w=1600&auto=format&fit=crop')` }}>
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative container mx-auto px-6 h-full flex flex-col justify-center items-center text-center text-white">
                    <h1 className="text-5xl md:text-6xl font-sans font-bold">Our Story: A Passion for Petals</h1>
                </div>
            </section>
            
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-lg text-gray-700 space-y-6 text-center">
                        <p className="text-xl leading-relaxed">Founded in 2024, Bloom & Blossom Co. was born from a simple idea: to share the joy and beauty of fresh flowers with our community. What started as a small stall at the local farmers' market has blossomed into a full-service floral design studio, but our core values remain the same.</p>
                        <p className="text-xl leading-relaxed">We believe that flowers are more than just decorations; they are a way to express emotions, celebrate milestones, and connect with the people we love.</p>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-neutral">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <h2 className="text-4xl font-sans font-bold text-primary mb-4">Our Philosophy</h2>
                            <div className="text-lg text-gray-700 space-y-4 text-left">
                                <p>At the heart of our shop is a deep respect for nature. We are committed to sourcing the freshest, highest-quality blooms from local growers and sustainable farms whenever possible.</p>
                                <p>Our talented florists pour their creativity and expertise into every arrangement, treating each bouquet as a unique work of art. We don't just sell flowers—we craft experiences.</p>
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <img src="https://images.unsplash.com/photo-1572454332363-ac38b892a2b7?q=80&w=800&auto=format=crop" alt="Florist arranging flowers" className="rounded-lg shadow-xl w-full h-auto"/>
                        </div>
                    </div>
                </div>
            </section>

             <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h2 className="text-4xl font-sans font-bold text-primary mb-4">Commitment to You</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">Our customers are our community. We are dedicated to providing not only beautiful floral products but also exceptional service. Whether you're planning a grand wedding, sending a thoughtful sympathy arrangement, or simply brightening your own home, our team is here to help you find the perfect flowers for any moment.</p>
                    <div className="text-center mt-12">
                        <Button onClick={() => setCurrentPage('products')}>Explore Our Collections</Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

const ContactPage: React.FC = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormSubmitted(true);
        setTimeout(() => setFormSubmitted(false), 5000); // Hide message after 5 seconds
        (e.target as HTMLFormElement).reset();
    };

    return (
        <div className="container mx-auto px-6 py-12 animate-fade-in">
            <h1 className="text-4xl font-sans font-bold text-center mb-10">Get in Touch</h1>
            <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="lg:w-1/2 p-8 md:p-12">
                    <h2 className="text-2xl font-sans font-bold mb-4">Contact Information</h2>
                    <div className="space-y-4 text-gray-700">
                        <p><strong>Address:</strong> 123 Bloom St, Floral City, FL 12345</p>
                        <p><strong>Phone:</strong> (555) 123-4567</p>
                        <p><strong>Email:</strong> contact@bloomandblossom.co</p>
                        <p><strong>Hours:</strong> Mon - Sat, 9:00 AM - 6:00 PM</p>
                    </div>
                    <h2 className="text-2xl font-sans font-bold mt-10 mb-4">Send Us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block font-bold mb-1">Full Name</label>
                            <input type="text" id="name" name="name" className="w-full p-3 border rounded-lg" required/>
                        </div>
                        <div>
                            <label htmlFor="email" className="block font-bold mb-1">Email Address</label>
                            <input type="email" id="email" name="email" className="w-full p-3 border rounded-lg" required/>
                        </div>
                        <div>
                            <label htmlFor="message" className="block font-bold mb-1">Message</label>
                            <textarea id="message" name="message" rows={5} className="w-full p-3 border rounded-lg" required></textarea>
                        </div>
                        <Button type="submit">Send Message</Button>
                        {formSubmitted && <p className="mt-4 text-green-600 font-bold">Thank you! Your message has been sent.</p>}
                    </form>
                </div>
                <div className="lg:w-1/2 bg-cover bg-center min-h-[400px]" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1587595431693-86349d9753e9?q=80&w=800&auto=format&fit=crop')` }}>
                </div>
            </div>
        </div>
    );
};


// --- MAIN APP COMPONENT ---
export default function App() {
  const [currentPage, _setCurrentPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [reviews, setReviews] = useState<Review[]>([]);

  // Load reviews from local storage on initial render
  useEffect(() => {
    try {
        const savedReviews = localStorage.getItem('bloom_reviews');
        if (savedReviews) {
            setReviews(JSON.parse(savedReviews));
        }
    } catch (error) {
        console.error("Failed to load reviews from local storage", error);
    }
  }, []);

  // Save reviews to local storage whenever they change
  useEffect(() => {
    try {
        localStorage.setItem('bloom_reviews', JSON.stringify(reviews));
    } catch (error) {
        console.error("Failed to save reviews to local storage", error);
    }
  }, [reviews]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);
  
  const setCurrentPage = (page: Page, product?: Product) => {
    _setCurrentPage(page);
    if (product) {
      setSelectedProduct(product);
    } else {
        if(page !== 'productDetail') setSelectedProduct(null);
    }
  };

  const addToCart = (product: Product, quantity: number) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity } 
          : item
        );
      }
      return [...prevItems, { id: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl, quantity }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
    } else {
      setCartItems(prevItems => prevItems.map(item => item.id === id ? { ...item, quantity } : item));
    }
  };
  
  const clearCart = () => setCartItems([]);
  
  const login = (user: Omit<User, 'wishlist'>) => {
    setCurrentUser({ ...user, wishlist: [] });
  };
  const logout = () => setCurrentUser(null);
  
  const toggleWishlist = (productId: number) => {
    if (!currentUser) {
      setCurrentPage('login');
      return;
    }
    setCurrentUser(prevUser => {
        if (!prevUser) return null;
        const wishlist = prevUser.wishlist;
        const isInWishlist = wishlist.includes(productId);
        const newWishlist = isInWishlist
            ? wishlist.filter(id => id !== productId)
            : [...wishlist, productId];
        return { ...prevUser, wishlist: newWishlist };
    });
  };

  const addOrder = (order: Order) => setOrders(prev => [...prev, order]);

  const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
        ...reviewData,
        id: `rev-${Date.now()}`,
        date: new Date().toISOString(),
    };
    setReviews(prev => [newReview, ...prev]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'products': return <ProductsPage />;
      case 'productDetail': return <ProductDetailPage />;
      case 'checkout': return <CheckoutPage />;
      case 'orderConfirmation': return <OrderConfirmationPage />;
      case 'login': return <LoginPage />;
      case 'account': return currentUser ? <AccountPage /> : <LoginPage />;
      case 'admin': return currentUser ? <AdminPage /> : <LoginPage />;
      case 'about': return <AboutPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage />;
    }
  };

  return (
    <AppContext.Provider value={{
      currentPage, setCurrentPage, selectedProduct, cartItems, addToCart, removeFromCart,
      updateQuantity, clearCart, isCartOpen, setCartOpen, currentUser, login, logout,
      toggleWishlist, products, setProducts, orders, addOrder, reviews, addReview
    }}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {renderPage()}
        </main>
        <Footer />
        <Cart
          isOpen={isCartOpen}
          onClose={() => setCartOpen(false)}
          onCheckout={() => { setCartOpen(false); setCurrentPage('checkout'); }}
          cartItems={cartItems}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
        />
        <GeminiAssistant 
          products={products}
          onProductSelect={(product) => setCurrentPage('productDetail', product)}
        />
      </div>
    </AppContext.Provider>
  );
}