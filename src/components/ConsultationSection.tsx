import React from 'react';
import Button from './Button';

const ConsultationSection = () => {
  // Mock testimonials data
  const testimonials = [
    {
      id: 1,
      quote: "EasyWebs transformed my online presence with a beautiful, functional website that perfectly represents my brand.",
      author: "Sarah J.",
      role: "Photographer & Content Creator"
    },
    {
      id: 2,
      quote: "The consultation process was incredibly helpful. They understood exactly what my business needed and delivered beyond my expectations.",
      author: "Michael T.",
      role: "Small Business Owner"
    },
    {
      id: 3,
      quote: "Working with EasyWebs was a breeze. Their attention to detail and quick turnaround time made the entire process enjoyable.",
      author: "Lia M.",
      role: "Startup Founder"
    }
  ];

  return (
    <section id="consultation" className="section">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Consultation Info */}
          <div>
            <div className="inline-block mb-4 py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm opacity-0 animate-fade-in">
              Personalized Service
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 opacity-0 animate-fade-in animate-delay-1">
              Let's Build Something <span className="text-gradient">Easy Together</span>
            </h2>
            
            <p className="text-lg text-foreground/80 mb-8 opacity-0 animate-fade-in animate-delay-2">
              Not finding what you need in our templates? Book a free consultation and let's discuss how we can create a custom website tailored precisely to your vision and goals.
            </p>
            
            <div className="space-y-6 mb-8 opacity-0 animate-fade-in animate-delay-3">
              <ProcessStep 
                number="01"
                title="Discovery Call"
                description="We'll discuss your goals, needs, and vision for your website in a friendly, no-pressure environment."
              />
              <ProcessStep 
                number="02"
                title="Custom Proposal"
                description="Based on our conversation, we'll create a tailored plan that fits your timeline and budget."
              />
              <ProcessStep 
                number="03"
                title="Design & Development"
                description="We'll bring your vision to life with a beautiful, functional website that grows with your business."
              />
            </div>
            
            {/* Testimonials */}
            <div className="mt-12 space-y-6 opacity-0 animate-fade-in animate-delay-4">
              <h3 className="text-xl font-bold mb-4">What Our Clients Say</h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {testimonials.slice(0, 2).map((testimonial, index) => (
                  <div 
                    key={testimonial.id}
                    className="bg-white p-5 rounded-lg shadow border border-border"
                  >
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                    <p className="text-foreground/80 mb-3 text-sm">{`"${testimonial.quote}"`}</p>
                    <div>
                      <p className="font-bold">{testimonial.author}</p>
                      <p className="text-sm text-foreground/60">{testimonial.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column - Booking Form */}
          <div className="lg:pl-8 opacity-0 animate-fade-in animate-delay-5">
            <div className="bg-white rounded-2xl shadow-xl border border-border p-8">
              <h3 className="text-2xl font-bold mb-6">Book Your Free Consultation</h3>
              
              <form className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="project" className="block text-sm font-medium">
                    Project Type
                  </label>
                  <select
                    id="project"
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="">Select project type</option>
                    <option value="portfolio">Portfolio Website</option>
                    <option value="business">Business Website</option>
                    <option value="ecommerce">E-commerce Store</option>
                    <option value="blog">Blog</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Tell us a bit about your project and goals..."
                  ></textarea>
                </div>
                
                <div>
                  <Button className="w-full" size="lg" variant="gradient">
                    Schedule Consultation
                  </Button>
                  <p className="text-sm text-center text-foreground/60 mt-3">
                    We'll get back to you within 24 hours to schedule.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
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

export default ConsultationSection;
