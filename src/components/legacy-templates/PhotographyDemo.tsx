import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  Heart, 
  Share2, 
  Instagram, 
  Mail, 
  Menu,
  X,
  ArrowRight,
  Image as ImageIcon,
  Play,
  Calendar
} from 'lucide-react';

const PhotographyDemo = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    'all',
    'portrait',
    'landscape',
    'wedding',
    'street',
    'architecture'
  ];

  const portfolioImages = [
    {
      id: 1,
      category: 'portrait',
      title: 'Urban Portrait',
      description: 'Natural light portrait in urban setting',
      image: `/assets/images/demo/photography/1.png`,
      likes: 245
    },
    {
      id: 2,
      category: 'landscape',
      title: 'Mountain Sunrise',
      description: 'Dawn breaking over mountain range',
      image: `/assets/images/demo/photography/2.png`,
      likes: 189
    },
    {
      id: 3,
      category: 'wedding',
      title: 'First Dance',
      description: 'Intimate moment during first dance',
      image: `/assets/images/demo/photography/3.png`,
      likes: 312
    },
    {
      id: 4,
      category: 'street',
      title: 'City Life',
      description: 'Candid street photography',
      image: `/assets/images/demo/photography/4.png`,
      likes: 156
    },
    {
      id: 5,
      category: 'architecture',
      title: 'Modern Lines',
      description: 'Contemporary architecture study',
      image: `/assets/images/demo/photography/5.png`,
      likes: 278
    },
    {
      id: 6,
      category: 'portrait',
      title: 'Studio Light',
      description: 'Professional studio portrait',
      image: `/assets/images/demo/photography/6.png`,
      likes: 198
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center gap-2">
              <Camera className="w-8 h-8 text-gray-900" />
              <span className="text-2xl font-light tracking-wider text-gray-900">
                LENS<span className="font-bold">CRAFT</span>
              </span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {['Portfolio', 'About', 'Services', 'Contact'].map((item) => (
                <button 
                  key={item}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {item}
                </button>
              ))}
              <button className="px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors">
                Book Session
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-900" />
              ) : (
                <Menu className="w-6 h-6 text-gray-900" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex flex-col gap-4">
                {['Portfolio', 'About', 'Services', 'Contact'].map((item) => (
                  <button 
                    key={item}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </button>
                ))}
                <button className="px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors">
                  Book Session
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img
            src={`/assets/images/demo/photography/photography.gif`}
            alt="Hero"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-light tracking-wider text-white mb-6">
              Capturing Life's
              <br />
              <span className="font-bold">Perfect Moments</span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-xl">
              Professional photography services for weddings, portraits, events, 
              and commercial projects. Creating timeless memories through the lens.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors flex items-center gap-2">
                View Portfolio
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-8 py-4 bg-gray-900/20 backdrop-blur-sm text-white rounded-full hover:bg-gray-900/30 transition-colors flex items-center gap-2">
                <Play className="w-4 h-4" />
                Show Reel
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light tracking-wider text-gray-900 mb-4">
              Featured <span className="font-bold">Work</span>
            </h2>
            <p className="text-xl text-gray-600">
              A curated selection of our finest photography
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full capitalize transition-colors ${
                  activeCategory === category
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioImages
              .filter(img => activeCategory === 'all' || img.category === activeCategory)
              .map((image) => (
                <div 
                  key={image.id}
                  className="group relative aspect-[4/5] overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => setSelectedImage(image.id)}
                >
                  <img
                    src={image.image}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {image.title}
                      </h3>
                      <p className="text-white/80 mb-4">
                        {image.description}
                      </p>
                      <div className="flex items-center gap-4">
                        <button className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors">
                          <Heart className="w-5 h-5 text-white" />
                        </button>
                        <button className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors">
                          <Share2 className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light tracking-wider text-gray-900 mb-4">
              Our <span className="font-bold">Services</span>
            </h2>
            <p className="text-xl text-gray-600">
              Professional photography solutions for every occasion
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: ImageIcon,
                title: 'Portrait Sessions',
                description: 'Professional portraits that capture your authentic self',
                price: 'from $299'
              },
              {
                icon: Heart,
                title: 'Wedding Photography',
                description: 'Documenting your special day with style and emotion',
                price: 'from $1,999'
              },
              {
                icon: Camera,
                title: 'Commercial Shoots',
                description: 'High-quality imagery for your business needs',
                price: 'Custom Quote'
              }
            ].map((service, index) => {
              const Icon = service.icon;
              return (
                <div 
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Icon className="w-12 h-12 text-gray-900 mb-6" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 font-semibold">
                      {service.price}
                    </span>
                    <button className="text-gray-900 hover:text-gray-600 transition-colors flex items-center gap-2">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-light tracking-wider mb-6">
            Ready to <span className="font-bold">Create?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's work together to capture your vision and create stunning imagery
            that tells your story.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Book a Session
            </button>
            <button className="px-8 py-4 border border-white text-white rounded-full hover:bg-white/10 transition-colors flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-6">
              <h2 className="text-3xl font-light tracking-wider text-gray-900">
                Get in <span className="font-bold">Touch</span>
              </h2>
              <p className="text-gray-600">
                Have a project in mind? Let's discuss how we can bring your vision to life.
              </p>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
                <textarea
                  rows={4}
                  placeholder="Message"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Studio Location
                </h3>
                <p className="text-gray-600">
                  123 Creative Avenue
                  <br />
                  Arts District
                  <br />
                  City, ST 12345
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Contact Details
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    Email: hello@lenscraft.com
                  </p>
                  <p className="text-gray-600">
                    Phone: (555) 123-4567
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Follow Us
                </h3>
                <div className="flex gap-4">
                  <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                    <Instagram className="w-6 h-6 text-gray-900" />
                  </a>
                  <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                    <Mail className="w-6 h-6 text-gray-900" />
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Business Hours
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Saturday</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Viewer Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-4xl w-full mx-4">
            <img
              src={portfolioImages.find(img => img.id === selectedImage)?.image}
              alt="Selected work"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotographyDemo;