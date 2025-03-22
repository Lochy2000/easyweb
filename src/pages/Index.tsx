
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TemplateGallery from '@/components/TemplateGallery';
import ConsultationSection from '@/components/ConsultationSection';
import Footer from '@/components/Footer';
import { Code, Linkedin, Github } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Button from '@/components/Button';

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
                Building <span className="text-gradient">Applications</span> That Work
              </h2>
              
              <p className="text-lg text-foreground/80 mb-8">
                At EasyWebs, we believe every business deserves a powerful, effective website that grows with their projects. We started with a simple mission: to make professional web development accessible, scalable, and straightforward for small to medium-sized businesses.
              </p>
              
              <p className="text-lg text-foreground/80">
                Whether you're a solo entrepreneur, small team, or growing company, we're here to help you build applications that are as unique as your ideas. Our development process combines technical expertise with a client-centered approach, ensuring your website not only looks great but also drives business results.
              </p>
              
              <div className="mt-12 p-8 bg-card rounded-2xl animate-on-scroll opacity-0 animate-fade-in animate-delay-2">
                <h3 className="text-xl font-bold mb-4">Our Values</h3>
                <div className="grid md:grid-cols-3 gap-6 mt-6">
                  <ValueCard 
                    title="Simplicity" 
                    description="We believe in clean, intuitive interfaces that put user experience first." 
                  />
                  <ValueCard 
                    title="Scalability" 
                    description="Our solutions evolve with your business, adapting to your changing requirements." 
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
        
        {/* Team Section - replacing Contact Section */}
        <section id="team" className="section bg-background">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-12 animate-on-scroll opacity-0 animate-fade-in">
              <div className="inline-flex items-center gap-2 mb-4 py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm">
                <Code className="w-4 h-4" />
                <span>Our Experts</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Meet The Team
              </h2>
              
              <p className="text-lg text-foreground/80">
                Our talented developers bring your vision to life with expertise in the latest web technologies.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto animate-on-scroll opacity-0 animate-fade-in animate-delay-2">
              {/* Team Member 1 - Lochlann O'Higgins */}
              <Card className="bg-card border border-border overflow-hidden hover:shadow-lg transition-all">
                <div className="aspect-square relative overflow-hidden bg-secondary/30">
                  <img 
                    src="/lovable-uploads/ad6e657a-bf63-4bcf-aeca-e6669eae1a8a.png" 
                    alt="Lochlann O'Higgins" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>Lochlann O'Higgins</CardTitle>
                  <CardDescription>Full Stack Developer</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/80">
                    Specializes in React, TypeScript, and modern frontend frameworks with a passion for creating responsive, accessible user interfaces.
                  </p>
                </CardContent>
                <CardFooter className="flex gap-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1"
                    icon={<Linkedin className="w-4 h-4" />}
                  >
                    LinkedIn
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1"
                    icon={<Github className="w-4 h-4" />}
                  >
                    GitHub
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Team Member 2 - Backend Developer */}
              <Card className="bg-card border border-border overflow-hidden hover:shadow-lg transition-all">
                <div className="aspect-square relative overflow-hidden bg-secondary/30">
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/30">
                    <Avatar className="w-32 h-32 border-4 border-primary/20">
                      <AvatarFallback className="text-4xl font-bold bg-secondary text-foreground">JS</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>Jane Smith</CardTitle>
                  <CardDescription>Backend Developer</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/80">
                    Expert in Node.js, databases, and API development with experience building scalable server architectures and cloud solutions.
                  </p>
                </CardContent>
                <CardFooter className="flex gap-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1"
                    icon={<Linkedin className="w-4 h-4" />}
                  >
                    LinkedIn
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1"
                    icon={<Github className="w-4 h-4" />}
                  >
                    GitHub
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Contact Form - Kept beneath the team section with background color fix */}
            <div className="max-w-2xl mx-auto mt-24 bg-card rounded-2xl shadow-xl border border-border p-8 animate-on-scroll opacity-0 animate-fade-in animate-delay-3">
              <h3 className="text-2xl font-bold mb-6 text-center">Get In Touch</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="block text-sm font-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      className="w-full px-4 py-2 border bg-secondary/50 border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
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
                      className="w-full px-4 py-2 border bg-secondary/50 border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
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
                    className="w-full px-4 py-2 border bg-secondary/50 border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
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
                    className="w-full px-4 py-2 border bg-secondary/50 border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
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
