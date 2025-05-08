import React, { useState, useEffect } from 'react';
import { 
  // Tool, 
  Clock, 
  Star, 
  Phone, 
  Calendar, 
  Shield, 
  CheckCircle,
  ArrowRight,
  MessageSquare,
  MapPin,
  Users,
  Wrench,
  Zap,
  Droplet
} from 'lucide-react';

const TradeDemo = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showEmergency, setShowEmergency] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      id: 'electrical',
      icon: Zap,
      title: 'Electrical Services',
      description: 'Complete electrical solutions for residential and commercial properties',
      features: [
        'Electrical repairs and installations',
        'Safety inspections and testing',
        'Emergency electrical services',
        'Smart home wiring'
      ],
      image: `${process.env.PUBLIC_URL}/assets/images/demo/trade/1.png`
    },
    {
      id: 'plumbing',
      icon: Droplet,
      title: 'Plumbing Services',
      description: 'Expert plumbing services for all your needs',
      features: [
        'Pipe repairs and replacement',
        'Water heater services',
        'Drain cleaning',
        'Bathroom renovations'
      ],
      image: `${process.env.PUBLIC_URL}/assets/images/demo/trade/2.png`
    },
    {
      id: 'maintenance',
      icon: Wrench,
      title: 'General Maintenance',
      description: 'Comprehensive property maintenance solutions',
      features: [
        'Property repairs',
        'Preventive maintenance',
        'Safety upgrades',
        'Equipment installation'
      ],
      image: `${process.env.PUBLIC_URL}/assets/images/demo/trade/3.png`
    }
  ];

  const reviews = [
    {
      name: "Sarah Johnson",
      service: "Electrical Installation",
      rating: 5,
      comment: "Exceptional service! The team was professional, punctual, and completed the work perfectly.",
      date: "2 days ago"
    },
    {
      name: "Mike Thompson",
      service: "Emergency Plumbing",
      rating: 5,
      comment: "Responded to our emergency call within 30 minutes. Fixed the issue efficiently. Highly recommend!",
      date: "1 week ago"
    },
    {
      name: "Lisa Chen",
      service: "General Maintenance",
      rating: 5,
      comment: "Regular maintenance has kept our property in perfect condition. Great attention to detail.",
      date: "2 weeks ago"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Emergency Banner */}
      {showEmergency && (
        <div className="bg-red-500 text-white py-2 px-4 text-center relative">
          <div className="flex items-center justify-center gap-2">
            <Phone className="w-4 h-4 animate-pulse" />
            <span className="font-semibold">24/7 Emergency Service Available: Call (555) 123-4567</span>
          </div>
          <button 
            onClick={() => setShowEmergency(false)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* <Tool className="w-8 h-8 text-blue-600" /> */}
              <span className="text-2xl font-bold text-gray-900">
                ProTrade
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <div className="flex gap-6">
                {['Services', 'About', 'Reviews', 'Contact'].map((item) => (
                  <button 
                    key={item}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>

              <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                <Phone className="w-4 h-4" />
                (555) 123-4567
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-gray-900">
        <div className="absolute inset-0">
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/demo/trade/hero.avif`}
            alt="Professional tradesperson"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full text-blue-100 text-sm mb-6">
              <Shield className="w-4 h-4 mr-2" />
              Licensed & Insured Professional Services
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Expert Trade Services
              <br />
              You Can Trust
            </h1>

            <p className="text-xl text-blue-100 mb-8">
              Professional, reliable, and efficient trade services for your home or business. 
              Available 24/7 for emergencies.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center gap-2">
                Book a Service
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-8 py-4 bg-white text-blue-600 rounded-full hover:bg-gray-100 transition-colors flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Schedule Quote
              </button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6">
              {[
                { icon: Clock, label: "Fast Response" },
                { icon: Shield, label: "Licensed & Insured" },
                { icon: Star, label: "5-Star Service" }
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-white">
                  <Icon className="w-5 h-5 text-blue-400" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive solutions for all your trade service needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div 
                  key={service.id}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Icon className="absolute bottom-4 left-4 w-8 h-8 text-white" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {service.description}
                    </p>
                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center text-gray-700">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600">
              Experience the difference of working with true professionals
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Licensed & Insured",
                description: "Full coverage for your peace of mind"
              },
              {
                icon: Clock,
                title: "24/7 Service",
                description: "Available whenever you need us"
              },
              {
                icon: Users,
                title: "Expert Team",
                description: "Skilled and certified professionals"
              },
              {
                icon: Star,
                title: "Quality Work",
                description: "Satisfaction guaranteed on every job"
              }
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={feature.title}
                  className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-xl mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Customer Reviews
            </h2>
            <p className="text-xl text-gray-600">
              See what our satisfied customers have to say
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div 
                key={review.name}
                className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{review.comment}"</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <p className="text-sm text-gray-600">{review.service}</p>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact us today for a free quote or emergency service
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-colors flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Call Now
            </button>
            <button className="px-8 py-4 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Request Quote
            </button>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Get a Free Quote
              </h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Needed
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Select a service</option>
                    <option>Electrical Services</option>
                    <option>Plumbing Services</option>
                    <option>General Maintenance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe your needs"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Request
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <p className="text-gray-600">(555) 123-4567</p>
                      <p className="text-sm text-gray-500">Available 24/7 for emergencies</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Location</p>
                      <p className="text-gray-600">123 Trade Street</p>
                      <p className="text-gray-600">Business District, ST 12345</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Areas */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Service Areas
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    'Downtown',
                    'North Side',
                    'South Side',
                    'East End',
                    'West End',
                    'Suburbs'
                  ].map((area) => (
                    <div 
                      key={area}
                      className="flex items-center gap-2 text-gray-600"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      {area}
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Business Hours
                </h3>
                <div className="space-y-2">
                  {[
                    { days: 'Monday - Friday', hours: '7:00 AM - 6:00 PM' },
                    { days: 'Saturday', hours: '8:00 AM - 4:00 PM' },
                    { days: 'Sunday', hours: 'Emergency Service Only' }
                  ].map((schedule) => (
                    <div 
                      key={schedule.days}
                      className="flex justify-between text-gray-600"
                    >
                      <span>{schedule.days}</span>
                      <span>{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TradeDemo;