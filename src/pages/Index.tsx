
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TemplateGallery from '@/components/TemplateGallery';
import ConsultationSection from '@/components/ConsultationSection';
import Footer from '@/components/Footer';
import { Code } from 'lucide-react';

const Index = () => {
  // Add scroll reveal effect
  useEffect(() => {
    const handleScroll = () => {
      const revealElements = document.querySelectorAll('.animate-on-scroll');
      
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('opacity-100');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <TemplateGallery />
        <ConsultationSection />
        
        {/* About Section */}
        <section id="about" className="section bg-secondary/30">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center animate-on-scroll opacity-0 animate-fade-in">
              <div className="inline-flex items-center gap-2 mb-4 py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm">
                <Code className="w-4 h-4" />
                <span>Our Story</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Making Great Code <span className="text-gradient">Accessible</span>
              </h2>
              
              <p className="text-lg text-foreground/80 mb-8">
                At EasyWebs, we believe everyone deserves powerful, intelligent coding tools that grow with their projects. We started with a simple mission: to make AI-powered development accessible, scalable, and straightforward.
              </p>
              
              <p className="text-lg text-foreground/80">
                Whether you're a solo developer, small team, or growing company, we're here to help you build applications that are as unique as your ideas. Our AI combines technical expertise with a human-centered approach, ensuring your code not only works great but also drives results.
              </p>
              
              <div className="mt-12 p-8 bg-card rounded-2xl animate-on-scroll opacity-0 animate-fade-in animate-delay-2">
                <h3 className="text-xl font-bold mb-4">Our Values</h3>
                <div className="grid md:grid-cols-3 gap-6 mt-6">
                  <ValueCard 
                    title="Simplicity" 
                    description="We believe in clean, intuitive code that puts functionality first." 
                  />
                  <ValueCard 
                    title="Scalability" 
                    description="Our AI evolves with your project, adapting to your changing requirements." 
                  />
                  <ValueCard 
                    title="Personal Touch" 
                    description="We treat each project with care, ensuring your unique vision shines through." 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="section bg-background">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-12 animate-on-scroll opacity-0 animate-fade-in">
              <div className="inline-flex items-center gap-2 mb-4 py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm">
                <Code className="w-4 h-4" />
                <span>Get In Touch</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Say Hello!
              </h2>
              
              <p className="text-lg text-foreground/80">
                Have questions or want to discuss your project? We'd love to hear from you. Fill out the form below and we'll get back to you faster than you think!
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto bg-card rounded-2xl shadow-xl border border-border p-8 animate-on-scroll opacity-0 animate-fade-in animate-delay-2">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="block text-sm font-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      className="w-full px-4 py-2 border bg-secondary/50 border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="block text-sm font-medium">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      className="w-full px-4 py-2 border bg-secondary/50 border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="contact-subject" className="block text-sm font-medium">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    className="w-full px-4 py-2 border bg-secondary/50 border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="How can we help you?"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="contact-message" className="block text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    className="w-full px-4 py-2 border bg-secondary/50 border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Tell us more about what you're looking for..."
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90 transition-colors btn-shine"
                  >
                    Send Message
                  </button>
                  <p className="text-sm text-center text-foreground/60 mt-3">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

interface ValueCardProps {
  title: string;
  description: string;
}

const ValueCard = ({ title, description }: ValueCardProps) => {
  return (
    <div className="bg-background p-6 rounded-xl shadow-sm border border-border">
      <h4 className="text-lg font-bold mb-2">{title}</h4>
      <p className="text-foreground/70">{description}</p>
    </div>
  );
};

export default Index;
