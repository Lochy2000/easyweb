import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Zap, 
  Palette, 
  Globe, 
  MessageCircle, 
  ArrowRight,
  Play
} from 'lucide-react';

const CreativeAgencyDemo = () => {
    const [activeWork, setActiveWork] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const portfolioWork = [
    {
      id: 1,
      title: "Neon Dreams",
      client: "TechStart Studios",
      category: "Branding",
      image: `/assets/images/demo/neon.avif`,
      color: "from-pink-500 to-purple-500"
    },
    {
      id: 2,
      title: "Urban Flow",
      client: "City Wear Co",
      category: "Web Design",
      image: `/assets/images/demo/urbanflow.avif`,
      color: "from-blue-500 to-teal-500"
    },
    {
      id: 3,
      title: "Natural Harmony",
      client: "Eco Products",
      category: "Brand Strategy",
      image: `/assets/images/demo/natural.avif`,
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/30 to-green-500/30 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-8">
            <Sparkles className="w-4 h-4 mr-2" />
            Award-winning creative agency
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            We Create
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Digital Magic
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-xl mb-12">
            Transforming brands through innovative design, strategic thinking, 
            and cutting-edge technology.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-white text-black rounded-full hover:bg-gray-100 transition-colors flex items-center gap-2">
              View Our Work
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-8 py-4 border border-white/20 rounded-full hover:bg-white/10 transition-colors flex items-center gap-2">
              <Play className="w-4 h-4" />
              Showreel
            </button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            Our Expertise
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Palette,
                title: "Brand Design",
                description: "Creating memorable brand identities that resonate with your audience"
              },
              {
                icon: Globe,
                title: "Digital Experience",
                description: "Crafting immersive websites and digital platforms"
              },
              {
                icon: Zap,
                title: "Strategy",
                description: "Developing effective strategies to achieve your business goals"
              }
            ].map((service, index) => (
              <div 
                key={index}
                className="group p-8 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors relative overflow-hidden"
              >
                {/* Service card background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative">
                  <service.icon className="w-12 h-12 mb-6 text-purple-400" />
                  <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            Selected Work
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioWork.map((work) => (
              <div 
                key={work.id}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
                onMouseEnter={() => setActiveWork(work.id)}
                onMouseLeave={() => setActiveWork(null)}
              >
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${work.color} transition-opacity duration-300 ${
                  activeWork === work.id ? 'opacity-90' : 'opacity-0'
                }`}>
                  <div className="absolute bottom-0 left-0 p-8">
                    <h3 className="text-2xl font-bold mb-2">{work.title}</h3>
                    <p className="text-white/80 mb-4">{work.client}</p>
                    <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm">
                      {work.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Let's Create Something Amazing
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Ready to transform your brand? Let's discuss your next project.
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:opacity-90 transition-opacity">
            <MessageCircle className="w-5 h-5" />
            Start a Project
          </button>
        </div>
      </section>
    </div>
  );
};

export default CreativeAgencyDemo;