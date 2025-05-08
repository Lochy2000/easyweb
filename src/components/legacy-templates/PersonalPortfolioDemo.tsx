import React, { useState, useEffect } from 'react';
import { 
  Code, 
  Palette, 
  Camera, 
  Laptop,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Mail,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const PersonalPortfolioDemo = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll and mouse effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const projects = [
    {
      title: "AI-Powered Analytics",
      description: "Machine learning dashboard for real-time data analysis",
      tags: ["React", "Python", "TensorFlow"],
      image: `/assets/images/demo/personalportfolio/1.png`,
      color: "from-blue-500 to-purple-500"
    },
    {
      title: "Eco Commerce Platform",
      description: "Sustainable product marketplace with carbon footprint tracking",
      tags: ["Next.js", "Node.js", "MongoDB"],
      image: `/assets/images/demo/personalportfolio/2.png`,
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Creative Portfolio",
      description: "Interactive 3D portfolio for digital artists",
      tags: ["Three.js", "WebGL", "GSAP"],
      image: `/assets/images/demo/personalportfolio/3.png`,
      color: "from-pink-500 to-rose-500"
    }
  ];

  const skills = [
    { icon: Code, label: "Full Stack Development", level: 90 },
    { icon: Palette, label: "UI/UX Design", level: 85 },
    { icon: Camera, label: "3D Modeling", level: 75 },
    { icon: Laptop, label: "Mobile Development", level: 80 }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-sm py-4' : 'py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            alex.dev
          </span>
          
          <div className="hidden md:flex items-center gap-8">
            {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
              <button 
                key={item}
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setActiveSection(item.toLowerCase())}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          {/* Dynamic gradient background that follows mouse movement */}
          <div 
            className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 transition-transform duration-300"
            style={{ 
              transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
            }}
          />
          
          {/* Decorative grid */}
          <div className="absolute inset-0" 
            style={{ 
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Available for freelance work
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Hi, I'm Alex
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Full Stack Developer
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              I build exceptional digital experiences that combine cutting-edge technology 
              with intuitive design. Let's create something amazing together.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full hover:opacity-90 transition-opacity">
                View Projects
              </button>
              <button className="px-8 py-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                Contact Me
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="group relative bg-gray-800 rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-video overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button className="mt-6 flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                    View Project <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Skills & Expertise
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div 
                key={index}
                className="p-6 bg-gray-800 rounded-xl hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-4 mb-4">
                  <skill.icon className="w-8 h-8 text-blue-400" />
                  <h3 className="text-xl font-semibold">{skill.label}</h3>
                </div>
                
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let's Work Together
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can bring your ideas to life.
          </p>
          
          <div className="flex justify-center gap-6 mb-12">
            {[
              { icon: Github, href: '#' },
              { icon: Linkedin, href: '#' },
              { icon: Twitter, href: '#' },
              { icon: Mail, href: '#' }
            ].map(({ icon: Icon, href }, index) => (
              <a
                key={index}
                href={href}
                className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
              >
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>

          <button className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full hover:opacity-90 transition-opacity">
            Start a Conversation
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default PersonalPortfolioDemo;