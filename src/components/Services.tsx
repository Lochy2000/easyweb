import { motion } from "framer-motion";
import { 
  Globe, 
  Code2, 
  ShoppingBag, 
  Smartphone, 
  Palette, 
  Database 
} from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const ServiceCard = ({ icon, title, description, delay = 0 }: ServiceCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
  >
    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-foreground/70 leading-relaxed">{description}</p>
  </motion.div>
);

export const Services = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
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
          <ServiceCard
            icon={<Globe className="w-6 h-6" />}
            title="WordPress Development"
            description="Custom WordPress themes and plugins tailored to your brand identity and business workflows."
            delay={0.1}
          />
          <ServiceCard
            icon={<Code2 className="w-6 h-6" />}
            title="React Applications"
            description="Modern, interactive web applications built with React and other cutting-edge frontend technologies."
            delay={0.2}
          />
          <ServiceCard
            icon={<ShoppingBag className="w-6 h-6" />}
            title="E-commerce Solutions"
            description="Custom online stores and e-commerce platforms that drive sales and enhance customer experience."
            delay={0.3}
          />
          <ServiceCard
            icon={<Smartphone className="w-6 h-6" />}
            title="Mobile Development"
            description="Native and cross-platform mobile applications that provide seamless user experiences."
            delay={0.4}
          />
          <ServiceCard
            icon={<Palette className="w-6 h-6" />}
            title="UI/UX Design"
            description="User-centered design that creates intuitive, engaging, and visually stunning interfaces."
            delay={0.5}
          />
          <ServiceCard
            icon={<Database className="w-6 h-6" />}
            title="Backend Development"
            description="Robust, scalable backend solutions that power your applications and handle complex business logic."
            delay={0.6}
          />
        </div>
      </div>
    </section>
  );
}; 