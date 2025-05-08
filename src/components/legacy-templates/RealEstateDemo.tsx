import React, { useState } from 'react';
import { Search, Home, Map, Bed, Bath, Square, Heart, ArrowRight, Phone, Grid, List } from 'lucide-react';

interface Property {
  id: number;
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  sqft: string;
  type: string;
  image: string;
  status: string;
}

const RealEstateDemo: React.FC = () => {
  const [activeView, setActiveView] = useState<'grid' | 'list'>('grid');
  const [favoriteProperties, setFavoriteProperties] = useState<number[]>([]);

  const properties: Property[] = [
    {
      id: 1,
      title: "Modern Waterfront Villa",
      price: "2,450,000",
      location: "Miami Beach, FL",
      beds: 4,
      baths: 3.5,
      sqft: "3,200",
      type: "House",
      image:  `/assets/images/demo/Modern_villa.avif`,
      status: "For Sale"
    },
    {
      id: 2,
      title: "Downtown Luxury Penthouse",
      price: "1,850,000",
      location: "Miami, FL",
      beds: 3,
      baths: 2,
      sqft: "2,100",
      type: "Condo",
      image: `/assets/images/demo/Downtown_pent.avif`,
      status: "For Sale"
    },
    {
      id: 3,
      title: "Coastal Modern Home",
      price: "1,275,000",
      location: "Fort Lauderdale, FL",
      beds: 3,
      baths: 2.5,
      sqft: "2,400",
      type: "House",
      image:  `/assets/images/demo/Coastal_home.avif`,
      status: "For Sale"
    }
  ];

  const toggleFavorite = (propertyId: number) => {
    setFavoriteProperties(prev => 
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Search Section */}
      <section className="relative h-[70vh] bg-gray-900">
        <div className="absolute inset-0">
          <img
            src={`/assets/images/demo/miami.avif`}
            alt="Luxury home"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/60" />
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-2xl">
            Find Your Dream Home in Miami
          </h1>
          
          <div className="max-w-3xl bg-white rounded-lg shadow-xl p-2">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full px-4 py-3 rounded-md border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <Map className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              
              <div className="relative">
                <select className="w-full px-4 py-3 rounded-md border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option>Property Type</option>
                  <option>House</option>
                  <option>Condo</option>
                  <option>Townhouse</option>
                </select>
              </div>
              
              <div className="relative">
                <select className="w-full px-4 py-3 rounded-md border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                  <option>Price Range</option>
                  <option>$500k - $1M</option>
                  <option>$1M - $2M</option>
                  <option>$2M+</option>
                </select>
              </div>
              
              <button className="bg-blue-500 text-white rounded-md px-6 py-3 hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                <Search className="w-5 h-5" />
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Featured Properties
              </h2>
              <p className="text-gray-600">
                Discover our hand-picked luxury properties
              </p>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveView('grid')}
                className={`p-2 rounded-md ${
                  activeView === 'grid' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setActiveView('list')}
                className={`p-2 rounded-md ${
                  activeView === 'list' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className={`grid gap-8 ${
            activeView === 'grid' ? 'md:grid-cols-3' : 'md:grid-cols-1'
          }`}>
            {properties.map((property) => (
              <div 
                key={property.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={() => toggleFavorite(property.id)}
                    className={`absolute top-4 right-4 p-2 rounded-full ${
                      favoriteProperties.includes(property.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white text-gray-600'
                    } hover:scale-110 transition-transform`}
                  >
                    <Heart className="w-5 h-5" fill={favoriteProperties.includes(property.id) ? "currentColor" : "none"} />
                  </button>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm">
                      {property.status}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {property.title}
                      </h3>
                      <p className="text-gray-600">{property.location}</p>
                    </div>
                    <p className="text-xl font-bold text-blue-500">
                      ${property.price}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Bed className="w-5 h-5" />
                      {property.beds} Beds
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Bath className="w-5 h-5" />
                      {property.baths} Baths
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Square className="w-5 h-5" />
                      {property.sqft} sqft
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                      View Details
                    </button>
                    <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors">
                      <Phone className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
              View All Properties
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-500 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Connect with our expert real estate agents to start your journey
          </p>
          <button className="px-8 py-3 bg-white text-blue-500 rounded-lg hover:bg-blue-50 transition-colors">
            Schedule a Consultation
          </button>
        </div>
      </section>
    </div>
  );
};

export default RealEstateDemo;