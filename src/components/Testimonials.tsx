import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Star } from "lucide-react";

interface TestimonialProps {
  name: string;
  role: string;
  company: string;
  image?: string;
  content: string;
  delay?: number;
}

const TestimonialCard = ({ name, role, company, image, content, delay = 0 }: TestimonialProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
  >
    <div className="flex items-center gap-4 mb-6">
      <Avatar className="w-12 h-12">
        <AvatarImage src={image} alt={name} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-sm text-foreground/70">{role} at {company}</p>
      </div>
    </div>
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
      ))}
    </div>
    <p className="text-foreground/80 leading-relaxed">{content}</p>
  </motion.div>
);

export const Testimonials = () => {
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
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            What Our Clients Say About Us
          </h2>
          <p className="text-lg text-foreground/80">
            Don't just take our word for it - hear from some of our satisfied clients
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TestimonialCard
            name="John Smith"
            role="CEO"
            company="TechCorp"
            content="Working with EasyWebs was a fantastic experience. They delivered our project on time and exceeded our expectations."
            delay={0.1}
          />
          <TestimonialCard
            name="Sarah Johnson"
            role="Marketing Director"
            company="GrowthCo"
            content="The team at EasyWebs transformed our online presence. Their attention to detail and technical expertise is unmatched."
            delay={0.2}
          />
          <TestimonialCard
            name="Michael Brown"
            role="Founder"
            company="StartupX"
            content="EasyWebs helped us launch our MVP in record time. Their agile approach and technical knowledge made all the difference."
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}; 