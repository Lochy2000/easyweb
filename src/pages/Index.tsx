
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { Code, Linkedin, Github, Globe, Sparkles, Star, Code2, CheckCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Button from '@/components/Button';
import { Link } from 'react-router-dom';

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
        
        {/* Features Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background to-transparent"></div>
          </div>
          
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0 animate-fade-in">
              <div className="inline-flex items-center gap-2 mb-4 py-1 px-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-primary font-medium text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Services We Offer</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Building Exactly What You Need
              </h2>
              <p className="text-lg text-foreground/80">
                From custom WordPress themes to React applications, we build websites that are tailored to your specific requirements and business goals.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard 
                icon={<Globe className="w-6 h-6" />}
                title="WordPress Development"
                description="Custom WordPress themes and plugins tailored to your brand identity and business workflows."
              />
              
              <ServiceCard 
                icon={<Code2 className="w-6 h-6" />}
                title="React Applications"
                description="Modern, interactive web applications built with React and other cutting-edge frontend technologies."
                highlighted={true}
              />
              
              <ServiceCard 
                icon={<CheckCircle className="w-6 h-6" />}
                title="Wix Solutions"
                description="Professional Wix websites with custom code integration for enhanced functionality."
              />
            </div>
            
            <div className="mt-16 text-center animate-on-scroll opacity-0 animate-fade-in">
              <Link to="/templates">
                <Button variant="outline" size="lg" className="backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10">
                  View All Services
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* CTA Section replacing consultation */}
        <section className="py-24 relative overflow-hidden bg-gradient-to-br from-background to-secondary/30">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
            <div className="absolute -top-80 -right-80 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px]"></div>
          </div>
          
          <div className="container-custom">
            <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl animate-on-scroll opacity-0 animate-fade-in">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    Ready to Build Your Dream Website?
                  </h2>
                  
                  <p className="text-lg text-foreground/80 mb-8">
                    Book a consultation and let's discuss how we can create a custom website tailored to your vision and goals.
                  </p>
                  
                  <div className="space-y-6">
                    <ProcessStep 
                      number="01"
                      title="Discovery Call"
                      description="We'll discuss your goals, needs, and vision for your website."
                    />
                    <ProcessStep 
                      number="02"
                      title="Custom Proposal"
                      description="Based on our conversation, we'll create a tailored plan that fits your timeline and budget."
                    />
                    <ProcessStep 
                      number="03"
                      title="Design & Development"
                      description="We'll bring your vision to life with a beautiful, functional website."
                    />
                  </div>
                  
                  <div className="mt-8">
                    <Button 
                      size="lg" 
                      className="w-full md:w-auto bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/20"
                      onClick={() => window.open('https://calendly.com/your-booking-link', '_blank')}
                      shine
                    >
                      Schedule a Free Consultation
                    </Button>
                  </div>
                </div>
                
                <div className="relative hidden md:block">
                  <img 
                    src="/lovable-uploads/11c5bd1a-be5c-460b-9dba-4a841aad0cb1.png" 
                    alt="Consultation illustration" 
                    className="w-full h-auto rounded-xl shadow-2xl border border-white/10"
                  />
                  <div className="absolute -inset-4 bg-primary/10 rounded-full filter blur-[50px] opacity-60 -z-10"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section id="about" className="section">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center animate-on-scroll opacity-0 animate-fade-in">
              <div className="inline-flex items-center gap-2 mb-4 py-1 px-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-primary font-medium text-sm">
                <Code className="w-4 h-4" />
                <span>Our Story</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Building Applications That Work
              </h2>
              
              <p className="text-lg text-foreground/80 mb-8">
                At EasyWebs, we believe every business deserves a powerful, effective website that grows with their projects. We started with a simple mission: to make professional web development accessible, scalable, and straightforward for small to medium-sized businesses.
              </p>
              
              <p className="text-lg text-foreground/80">
                Whether you're a solo entrepreneur, small team, or growing company, we're here to help you build applications that are as unique as your ideas. Our development process combines technical expertise with a client-centered approach, ensuring your website not only looks great but also drives business results.
              </p>
              
              <div className="mt-12 p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl animate-on-scroll opacity-0 animate-fade-in animate-delay-2">
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
        
        {/* Team Section */}
        <section id="team" className="section bg-secondary/20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-12 animate-on-scroll opacity-0 animate-fade-in">
              <div className="inline-flex items-center gap-2 mb-4 py-1 px-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-primary font-medium text-sm">
                <Star className="w-4 h-4" />
                <span>Our Experts</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Meet The Team
              </h2>
              
              <p className="text-lg text-foreground/80">
                Our talented developers bring your vision to life with expertise in the latest web technologies.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto animate-on-scroll opacity-0 animate-fade-in animate-delay-2">
              {/* Team Member 1 - Lochlann O'Higgins */}
              <Card className="bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden hover:shadow-lg transition-all">
                <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-background to-secondary/30">
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
                    className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10"
                    icon={<Linkedin className="w-4 h-4" />}
                  >
                    LinkedIn
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10"
                    icon={<Github className="w-4 h-4" />}
                  >
                    GitHub
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Team Member 2 - Backend Developer */}
              <Card className="bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden hover:shadow-lg transition-all">
                <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-background to-secondary/30">
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
                    className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10"
                    icon={<Linkedin className="w-4 h-4" />}
                  >
                    LinkedIn
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10"
                    icon={<Github className="w-4 h-4" />}
                  >
                    GitHub
                  </Button>
                </CardFooter>
              </Card>
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
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
      <h4 className="text-lg font-bold mb-2">{title}</h4>
      <p className="text-foreground/70">{description}</p>
    </div>
  );
};

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
}

const ProcessStep = ({ number, title, description }: ProcessStepProps) => {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary font-medium flex items-center justify-center">
        {number}
      </div>
      <div>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-foreground/70">{description}</p>
      </div>
    </div>
  );
};

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlighted?: boolean;
}

const ServiceCard = ({ icon, title, description, highlighted = false }: ServiceCardProps) => {
  return (
    <div className={`relative group overflow-hidden rounded-2xl transition-all duration-300 animate-on-scroll opacity-0 animate-fade-in ${
      highlighted ? 'border-primary/30' : 'border-white/10'
    }`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 group-hover:from-primary/10 group-hover:to-accent/5 transition-all duration-500"></div>
      
      <div className={`relative z-10 p-8 bg-white/5 backdrop-blur-sm border ${
        highlighted ? 'border-primary/30' : 'border-white/10'
      } h-full group-hover:border-primary/20 transition-all duration-300`}>
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
          highlighted ? 'bg-primary/20 text-primary' : 'bg-white/10 text-foreground'
        } group-hover:bg-primary/20 group-hover:text-primary transition-all duration-300`}>
          {icon}
        </div>
        
        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-foreground/70 mb-6">{description}</p>
        
        <div className="inline-flex items-center gap-2 text-sm font-medium bg-white/5 rounded-full py-1 px-3 group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300">
          <span>Learn more</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 3.5L11.5 8L7.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Index;
