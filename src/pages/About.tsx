import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { Linkedin } from 'lucide-react'; // Import Linkedin icon
// import Marquee from "react-fast-marquee"; // Placeholder for client marquee

// Actual team data
const teamMembers = [
  {
    name: "Loch",
    role: "Co-Founder / Frontend Engineer / Design & DB Management",
    linkedin: "https://www.linkedin.com/in/lochlann-ohiggins-developer/",
    image: "/assets/images/team/loch.png" // Changed from .jpg to .png
  },
  {
    name: "Cai",
    role: "Co-Founder / Front & Backend Engineer",
    linkedin: "https://www.linkedin.com/in/cai-p-7a715327a/",
    image: "/assets/images/team/cai.png" // Changed from .jpg to .png
  },
];

// Placeholder data - Replace with actual client info
const clients = [
  { name: "Global Dignity", logo: "/client-logo-placeholder.png", url: "https://globaldignity.org/" },
  { name: "HerEdge", logo: "/client-logo-placeholder.png", url: "https://heredge.club" },
  { name: "Quist English Program", logo: "/client-logo-placeholder.png", url: "https://quistenglishprogram.com/" },
  { name: "Predictable Parenting", logo: "/client-logo-placeholder.png", url: "https://mettetheilmann.com/" },
  { name: "Design Co", logo: "/client-logo-placeholder.png" },
  // Add more clients...
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background/50 relative isolate">
      <BackgroundEffects />
      <Header />
      <main className="relative pt-24 pb-16">
        <div className="container mx-auto px-4">
          
          {/* Page Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">About EasyWeb</h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
              Building digital experiences that empower businesses and connect communities.
            </p>
          </motion.div>

          {/* Our Story Section */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-20 bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">Our Journey</h2>
            <p className="text-foreground/80 leading-relaxed text-center max-w-2xl mx-auto">
              EasyWeb began as a university start-up, born from a passion for making web technology accessible and effective. We gained early recognition by winning the Santander Universities Enterprise Competition, which fueled our mission to provide high-quality, easy-to-manage web solutions for businesses of all sizes. 
              {/* Add more details here if desired */}
            </p>
          </motion.section>

          {/* Team Section - Updated with new card style */} 
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-12 text-center">Meet the Team</h2>
            {/* Use flex for centering and gap */}
            <div className="flex flex-wrap justify-center gap-12 max-w-4xl mx-auto">
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  className="card relative"
                >
                  <img 
                    src={member.image} 
                    alt={`${member.name}'s profile picture`} 
                    className="card-image" 
                  /> 
                  <p className="heading">{member.name}</p>
                  <p>{member.role}</p>
                  <a 
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin-link inline-flex items-center gap-1.5"
                  >
                    <Linkedin size={16} />
                    LinkedIn
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Trusted Clients Marquee Section - Placeholder */}
          <motion.section
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5, delay: 0.6 }}
             className="py-12"
          >
            <h2 className="text-2xl font-bold mb-8 text-center text-foreground/80">Trusted By Clients Like</h2>
             <div className="relative flex overflow-x-hidden bg-white/5 py-4 border-y border-white/10">
                <p className="text-center text-foreground/60 py-8"> 
                  [Client Marquee Component will go here. Need to install react-fast-marquee or build custom.]
                </p>
                {/* 
                <Marquee gradient={false} speed={50} pauseOnHover>
                  {clients.concat(clients).map((client, index) => ( // Duplicate for seamless loop
                    <div key={index} className="mx-8 flex items-center justify-center h-12">
                      {client.logo ? (
                        <a href={client.url} target="_blank" rel="noopener noreferrer" title={client.name}>
                          <img src={client.logo} alt={client.name} className="max-h-8 max-w-[150px] object-contain filter grayscale hover:filter-none transition-all duration-300 opacity-70 hover:opacity-100" />
                        </a>
                      ) : (
                        <a href={client.url} target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors">
                          {client.name}
                        </a>
                      )}
                    </div>
                  ))}
                </Marquee>
                */}
             </div>
           </motion.section>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage; 