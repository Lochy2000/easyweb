import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Globe, 
  Code2, 
  ShoppingBag, 
  Smartphone, 
  Palette, 
  Database,
  ArrowRight
} from "lucide-react";
import { ServiceModal } from "./ServiceModal";

interface ServiceData {
  icon: React.ReactNode;
  title: string;
  quickView: string;
  details: {
    description: string;
    features: string[];
  };
}

const servicesData: ServiceData[] = [
  {
    icon: <Globe className="w-6 h-6" />,
    title: "WordPress Development",
    quickView: "Beautiful WordPress websites tailored to your brand, with all the flexibility you need.",
    details: {
      description: "We build custom WordPress websites from scratch — no bloated themes, just clean code and intuitive design. Whether it's a blog, portfolio, or e-commerce, we craft it to fit your vision.",
      features: [
        "Custom plugins or integrations (if needed)",
        "Easy-to-use admin panel",
        "Fast load times + SEO basics baked in"
      ]
    }
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "React Applications",
    quickView: "Fast, modern apps built using React — perfect for interactive websites and platforms.",
    details: {
      description: "We use React to build dynamic frontends for web platforms, dashboards, and tools. Think: booking systems, portals, custom interfaces.",
      features: [
        "Snappy performance",
        "Fully responsive design",
        "Future-proof, scalable code"
      ]
    }
  },
  {
    icon: <ShoppingBag className="w-6 h-6" />,
    title: "E-commerce Solutions",
    quickView: "Online stores that don't just look good — they convert visitors into loyal customers.",
    details: {
      description: "From product pages to payment systems, we create end-to-end e-commerce setups that fit your business.",
      features: [
        "WooCommerce integration",
        "Shopify development",
        "Custom stores built from scratch",
        "Smooth checkout experience",
        "Performance optimization"
      ]
    }
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Mobile Development",
    quickView: "Mobile apps that feel native — whether Android, iOS, or cross-platform.",
    details: {
      description: "We build apps using tools like React Native or Flutter, tailored to your product and user needs.",
      features: [
        "Sleek UI/UX design",
        "Fast, native performance",
        "API connections to your backend",
        "Cross-platform compatibility"
      ]
    }
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: "UI/UX Design",
    quickView: "Design that's easy to use, nice to look at, and focused on your users.",
    details: {
      description: "We believe design is about function first. We start from your user's perspective and design around it.",
      features: [
        "Wireframing & prototyping",
        "Figma mockups",
        "Accessibility-conscious layouts",
        "User testing & iteration"
      ]
    }
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Backend Development",
    quickView: "Scalable backend systems that power your platform behind the scenes.",
    details: {
      description: "Whether it's APIs, databases, or secure admin panels — we build solid backend systems using Node.js, Django, or PHP.",
      features: [
        "Clean and scalable logic",
        "Secure user authentication",
        "Database design + integration",
        "API development",
        "Performance optimization"
      ]
    }
  }
];

interface ServiceCardProps {
  service: ServiceData;
  delay?: number;
  onOpenModal: (service: ServiceData) => void;
}

const ServiceCard = ({ service, delay = 0, onOpenModal }: ServiceCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="group flex relative h-full cursor-pointer"
    onClick={() => onOpenModal(service)}
  >
    <div className="relative w-full p-[1px] rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-blue-500 to-primary opacity-0 sm:group-hover:opacity-100 group-hover:animate-rotation rounded-2xl sm:opacity-0 active:opacity-100"></div>
      <div className="absolute inset-[1px] bg-black rounded-xl"></div>
      <div className="relative z-10 h-full p-4 sm:p-6 bg-[#0f0f12] rounded-xl">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-6 text-primary group-hover:scale-110 transition-transform">
          {service.icon}
        </div>
        <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{service.title}</h3>
        <p className="text-sm sm:text-base text-foreground/70 leading-relaxed mb-3 sm:mb-4">{service.quickView}</p>
        <div className="flex items-center text-primary sm:opacity-0 sm:group-hover:opacity-100 transition-opacity opacity-70">
          <span className="text-sm font-medium">Learn more</span>
          <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  </motion.div>
);

export const Services = () => {
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);

  return (
    <section id="services" className="py-16 sm:py-24 relative">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 py-1 px-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-primary font-medium text-sm">
            Our Services
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            From Concept to Completion:<br />
            Our Full-Stack Expertise
          </h2>
          <p className="text-lg text-foreground/80">
            We offer comprehensive web development solutions tailored to your specific needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              delay={index * 0.1}
              onOpenModal={setSelectedService}
            />
          ))}
        </div>
      </div>

      {selectedService && (
        <ServiceModal
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          title={selectedService.title}
          quickView={selectedService.quickView}
          details={selectedService.details}
        />
      )}
    </section>
  );
}; 