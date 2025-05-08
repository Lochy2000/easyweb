import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, ChefHat, ArrowRight } from 'lucide-react';

const RestaurantDemo = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuCategories = [
    {
      name: "Starters",
      items: [
        { name: "Truffle Arancini", price: "16", description: "Wild mushroom risotto balls, truffle aioli" },
        { name: "Tuna Tartare", price: "19", description: "Fresh tuna, avocado, citrus ponzu" }
      ]
    },
    {
      name: "Main Courses",
      items: [
        { name: "Wagyu Ribeye", price: "48", description: "300g grass-fed wagyu, herb butter, roasted vegetables" },
        { name: "Sea Bass", price: "34", description: "Pan-seared sea bass, saffron risotto, salsa verde" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="text-2xl font-serif">
            <span className={isScrolled ? 'text-gray-900' : 'text-white'}>
              saveur
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {['Menu', 'Reservations', 'About', 'Contact'].map((item) => (
              <button 
                key={item}
                className={`${
                  isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/80 hover:text-white'
                } transition-colors`}
              >
                {item}
              </button>
            ))}
          </div>

          <button className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors">
            Book Table
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 bg-black">
          <img
            src="/assets/images/demo/food.avif"
            alt="Restaurant ambiance"
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
            Fine Dining
            <br />
            Redefined
          </h1>
          <p className="text-xl text-white/90 max-w-xl mb-8">
            Experience contemporary cuisine in an elegant setting. 
            Every dish tells a story of tradition and innovation.
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors">
              Reserve Table
            </button>
            <button className="px-8 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors">
              View Menu
            </button>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Clock, label: "Open Hours", value: "Tue-Sun: 5pm - 11pm" },
              { icon: Users, label: "Group Dining", value: "Special menus available" },
              { icon: ChefHat, label: "Chef's Table", value: "Intimate dining experience" }
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-4">
                <Icon className="w-8 h-8 text-orange-500" />
                <div>
                  <h3 className="font-semibold text-gray-900">{label}</h3>
                  <p className="text-gray-600">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Preview */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <h2 className="text-4xl font-serif text-gray-900 mb-16 text-center">
            Current Menu
          </h2>

          <div className="grid gap-16">
            {menuCategories.map((category) => (
              <div key={category.name}>
                <h3 className="text-2xl font-serif text-gray-900 mb-8">
                  {category.name}
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  {category.items.map((item) => (
                    <div 
                      key={item.name}
                      className="p-6 bg-white rounded-lg hover:shadow-lg transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-xl font-medium text-gray-900">
                          {item.name}
                        </h4>
                        <span className="text-orange-500">${item.price}</span>
                      </div>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button className="px-8 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors inline-flex items-center gap-2">
              View Full Menu
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RestaurantDemo;