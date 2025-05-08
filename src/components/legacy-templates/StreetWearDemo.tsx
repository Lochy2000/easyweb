import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Search, 
  Heart,
  ArrowRight,
  Star,
  Plus,
  Instagram,
  Twitter,
  Youtube,
  ChevronRight
} from 'lucide-react';

const StreetWearDemo = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('new');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products = [
    {
      id: 1,
      name: "Urban Tech Hoodie",
      price: 129.99,
      category: "hoodies",
      images: [
        `/assets/images/demo/streetwear/1.png`,
        `/assets/images/demo/streetwear/streetfashion2/1.png`
      ],
      isNew: true,
      tags: ['Bestseller', 'New Drop'],
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 2,
      name: "Cargo Tech Pants",
      price: 149.99,
      category: "pants",
      images: [
        `/assets/images/demo/streetwear/2.png`,
        `/assets/images/demo/streetwear/streetfashion2/2.png`
      ],
      isNew: true,
      tags: ['Limited Edition'],
      sizes: ['28', '30', '32', '34']
    },
    {
      id: 3,
      name: "Graphic Urban Tee",
      price: 49.99,
      category: "tees",
      images: [
        `/assets/images/demo/streetwear/3.png`,
        `/assets/images/demo/streetwear/streetfashion2/3.png`
      ],
      isNew: false,
      tags: ['Bestseller'],
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 4,
      name: "Street Bomber Jacket",
      price: 199.99,
      category: "jackets",
      images: [
        `/assets/images/demo/streetwear/4.png`,
        `/assets/images/demo/streetwear/streetfashion2/4.png`
      ],
      isNew: true,
      tags: ['New Collection'],
      sizes: ['S', 'M', 'L', 'XL']
    }
  ];

  const cartItems = [
    {
      id: 1,
      name: "Urban Tech Hoodie",
      price: 129.99,
      size: "L",
      quantity: 1,
      image: `/assets/images/demo/streetwear/streettech/1.png`
    },
    {
      id: 2,
      name: "Cargo Tech Pants",
      price: 149.99,
      size: "32",
      quantity: 1,
      image: `/assets/images/demo/streetwear/streettech/2.png`
    }
  ];

  const categories = ['new', 'trending', 'bestsellers', 'collections'];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrollPosition > 50 ? 'bg-black/95 backdrop-blur-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <button 
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>

              <a href="#" className="text-2xl font-bold tracking-wider">
                URBAN<span className="text-red-600">EDGE</span>
              </a>

              <div className="hidden md:flex items-center gap-6">
                {categories.map((category) => (
                  <button 
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`uppercase text-sm tracking-wider transition-colors ${
                      activeCategory === category
                        ? 'text-white'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={() => setIsSearchOpen(!isSearchOpen)}>
                <Search className="w-6 h-6" />
              </button>
              <button className="hidden md:block">
                <Heart className="w-6 h-6" />
              </button>
              <button onClick={() => setIsCartOpen(true)}>
                <ShoppingBag className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="absolute inset-x-0 top-full bg-black/95 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-white/10 px-4 py-3 rounded-none border-b-2 border-red-600 focus:outline-none"
                autoFocus
              />
              {/* Quick Links */}
              <div className="mt-4 pb-4">
                <h4 className="text-sm text-white/60 mb-2">Popular Searches:</h4>
                <div className="flex gap-2">
                  {['Hoodies', 'Tech Wear', 'New Arrivals'].map((term) => (
                    <button
                      key={term}
                      className="px-3 py-1 bg-white/10 text-sm hover:bg-white/20 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10" />
          <img
            src='/assets/images/demo/streetwear/streetwear.gif'
            alt="Luxury home"
            className="w-full h-full object-cover opacity-90"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 py-20">
          <div className="max-w-xl">
            <div className="inline-flex items-center px-4 py-2 bg-red-600 mb-6">
              <span className="text-sm uppercase tracking-wider">New Collection</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-none">
              FUTURE
              <br />
              <span className="text-red-600">STREET</span>
              <br />
              CULTURE
            </h1>
            
            <p className="text-xl text-white/80 mb-8">
              Pushing boundaries with innovative streetwear designs. 
              Where urban style meets future tech.
            </p>

            <button className="group px-8 py-4 bg-red-600 hover:bg-red-700 transition-colors flex items-center gap-2">
              SHOP NEW DROPS
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">NEW DROPS</h2>
            <div className="flex gap-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`uppercase text-sm tracking-wider transition-colors ${
                    activeCategory === category
                      ? 'text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div 
                key={product.id}
                className="group relative"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={hoveredProduct === product.id ? product.images[1] : product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Product Tags */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 bg-red-600 text-white text-xs uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Quick Add UI */}
                  <div className="absolute inset-x-4 bottom-4 transition-all duration-300 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="bg-white text-black p-4">
                      <div className="flex gap-2 mb-4">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            className="w-10 h-10 flex items-center justify-center border border-black hover:bg-black hover:text-white transition-colors"
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                      <button className="w-full py-3 bg-black text-white hover:bg-gray-900 transition-colors uppercase tracking-wider text-sm">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-1">
                  <h3 className="text-lg font-medium">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">${product.price}</span>
                    <button className="text-white/60 hover:text-white transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "STREET TECH",
                description: "Future-ready urban essentials",
                image: '/assets/images/demo/streetwear/streetfashion2/streettech/2.png',
                color: "from-red-600"
              },
              {
                title: "URBAN UTILITY",
                description: "Function meets street style",
                image: '/assets/images/demo/streetwear/streetfashion2/streettech/1.png',
                color: "from-blue-600"
              }
            ].map((collection, index) => (
              <div 
                key={collection.title}
                className="group relative aspect-[4/5] overflow-hidden"
              >
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${collection.color} to-transparent opacity-50`} />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-3xl font-bold mb-2">{collection.title}</h3>
                  <p className="text-white/80 mb-4">{collection.description}</p>
                  <button className="self-start px-6 py-3 bg-white text-black hover:bg-gray-100 transition-colors flex items-center gap-2 group">
                    Shop Collection
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Drawer */}
      <div className={`fixed inset-y-0 right-0 w-full max-w-md bg-black transform transition-transform duration-300 ease-in-out z-50 ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-lg font-bold">Shopping Cart</h3>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item.id} className="p-4 border-b border-white/10">
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-white/60">Size: {item.size}</p>
                      </div>
                      <span className="font-medium">${item.price}</span>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center border border-white/20">
                        <button className="px-3 py-1 hover:bg-white/10 transition-colors">-</button>
                        <span className="px-3 py-1 border-x border-white/20">{item.quantity}</span>
                        <button className="px-3 py-1 hover:bg-white/10 transition-colors">+</button>
                      </div>
                      <button className="text-white/60 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-white/10">
            <div className="mb-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-white/60">Subtotal</span>
                <span className="font-medium">$279.98</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-white/10">
                <span>Total</span>
                <span>$279.98</span>
              </div>
            </div>
            <button className="w-full py-3 bg-red-600 text-white hover:bg-red-700 transition-colors uppercase tracking-wider">
              Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <section className="py-20 bg-red-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">JOIN THE MOVEMENT</h2>
          <p className="text-xl text-white/80 mb-8 max-w-xl mx-auto">
            Subscribe to get exclusive access to drops, discounts, and updates
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 focus:outline-none focus:border-white/40"
              />
              <button className="px-6 py-3 bg-black text-white uppercase tracking-wider hover:bg-gray-900 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">
                URBAN<span className="text-red-600">EDGE</span>
              </h3>
              <p className="text-white/60 mb-6">
                Redefining streetwear culture with innovative designs and premium quality.
              </p>
              <div className="flex gap-4">
                {[Instagram, Twitter, Youtube].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>

            {[
              {
                title: "Shop",
                links: ["New Arrivals", "Best Sellers", "Men", "Women", "Accessories"]
              },
              {
                title: "Help",
                links: ["Shipping", "Returns", "Size Guide", "Contact Us", "FAQs"]
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Privacy Policy", "Terms of Service"]
              }
            ].map((section) => (
              <div key={section.title}>
                <h4 className="text-lg font-bold mb-6">{section.title}</h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-white/60 hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/60">
                © {new Date().getFullYear()} URBANEDGE. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <img
                  src='/assets/images/demo/payment-methods.png'
                  alt="Payment methods"
                  className="h-8"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StreetWearDemo;