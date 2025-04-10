import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BackgroundEffects } from '@/components/BackgroundEffects';
import { Linkedin } from 'lucide-react'; // Import Linkedin icon
import { OptimizedImage } from '@/components/OptimizedImage';
// import Marquee from "react-fast-marquee"; // Placeholder for client marquee

// Actual team data
const teamMembers = [
  {
    name: "Loch",
    role: "Co-Founder / Frontend Engineer / Design & DB Management",
    linkedin: "https://www.linkedin.com/in/lochlann-ohiggins-developer/",
    image: "/assets/images/team/loch.png",
    width: 400,
    height: 400
  },
  {
    name: "Cai",
    role: "Co-Founder / Front & Backend Engineer",
    linkedin: "https://www.linkedin.com/in/cai-p-7a715327a/",
    image: "/assets/images/team/cai.png",
    width: 400,
    height: 400
  },
];

// Client data with actual information and logos
const clients = [
  { 
    name: "Santander Universities", 
    logo: "/assets/images/clients/santander.png",
    url: "https://www.santander.co.uk/universities",
    width: 180,
    height: 50
  },
  { 
    name: "St Mary's University", 
    logo: "/assets/images/clients/stmaryslogo.png",
    url: "https://www.stmarys.ac.uk/",
    width: 200,
    height: 45
  },
  { 
    name: "EatEco", 
    logo: "/assets/images/clients/eatEco.png",
    url: "https://eateco.org",
    width: 160,
    height: 45
  },
  { 
    name: "HerEdge", 
    logo: "/assets/images/clients/heredge.png",
    url: "https://heredge.club",
    width: 170,
    height: 45
  },
  { 
    name: "Global Dignity", 
    logo: "/assets/images/clients/globaldiglogo.png",
    url: "https://globaldignity.org/",
    width: 180,
    height: 45
  }
];

// Add ClientLogo component before the AboutPage component
const ClientLogo = ({ client, isDuplicate = false }: { client: typeof clients[0], isDuplicate?: boolean }) => (
  <a
    key={isDuplicate ? `dup-${client.name}` : client.name}
    href={client.url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center group min-w-[200px] h-[100px] px-4"
  >
    <div style={{ transform: `scale(${client.scale})` }} className="transition-transform duration-300">
      <OptimizedImage
        src={client.logo}
        alt={client.name}
        width={client.width}
        height={client.height}
        className="w-auto h-[60px] object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
      />
    </div>
  </a>
);

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background/50 relative isolate font-inter">
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient font-features">About EasyWeb</h1>
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
            <h2 className="text-3xl font-bold mb-6 text-center font-features">Our Journey</h2>
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
            <h2 className="text-3xl font-bold mb-12 text-center font-features">Meet the Team</h2>
            {/* Use flex for centering and gap */}
            <div className="flex flex-wrap justify-center gap-12 max-w-4xl mx-auto">
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="card relative overflow-hidden"
                >
                  <div className="relative z-10 flex flex-col items-center">
                    <OptimizedImage 
                      src={member.image} 
                      alt={`${member.name}'s profile picture`} 
                      className="card-image"
                      width={member.width}
                      height={member.height}
                    />
                    <div className="text-center mt-4">
                      <p className="heading">{member.name}</p>
                      <p className="text-sm text-foreground/70 mt-2">{member.role}</p>
                    </div>
                    <a 
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="linkedin-link mt-4"
                    >
                      <Linkedin size={16} />
                      Connect on LinkedIn
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Trusted Clients Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="py-12"
          >
            <h2 className="text-2xl font-bold mb-8 text-center text-foreground/80 font-features">Trusted By</h2>
            <div className="relative overflow-hidden bg-white/5 border-y border-white/10">
              {/* Gradient Overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-[200px] bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-[200px] bg-gradient-to-l from-background via-background/80 to-transparent z-10" />
              
              {/* Scrolling Content */}
              <div className="flex whitespace-nowrap py-8">
                <div className="animate-scroll flex items-center space-x-24">
                  {clients.map((client) => (
                    <a
                      key={client.name}
                      href={client.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-[200px] h-[60px] relative group"
                    >
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="w-full h-full object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                      />
                    </a>
                  ))}
                </div>
                {/* Duplicate for seamless loop */}
                <div className="animate-scroll flex items-center space-x-24" aria-hidden="true">
                  {clients.map((client) => (
                    <a
                      key={`dup-${client.name}`}
                      href={client.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-[200px] h-[60px] relative group"
                    >
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="w-full h-full object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage; 