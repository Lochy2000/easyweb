import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Star } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Helmet } from 'react-helmet';

interface TestimonialProps {
  name: string;
  role?: string;
  company: string;
  url?: string;
  image?: string;
  content: string;
  delay?: number;
}

const TestimonialCard = ({ name, role, company, url, image, content, delay = 0 }: TestimonialProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex flex-col h-full"
  >
    <div className="flex items-center gap-4 mb-6">
      <Avatar className="w-12 h-12">
        <AvatarImage src={image} alt={`${name} from ${company} - client testimonial`} width={48} height={48} loading="lazy" />
        <AvatarFallback aria-label={`${name}'s initials`}>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
      </Avatar>
      <div>
        <h4 className="font-semibold">{name}</h4>
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-foreground/70 hover:text-primary transition-colors">
            {company} {role && `(${role})`}
          </a>
        ) : (
          <p className="text-sm text-foreground/70">{company}{role && `, ${role}`}</p>
        )}
      </div>
    </div>
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
      ))}
    </div>
    <p className="text-foreground/80 leading-relaxed flex-grow">{content}</p>
  </motion.div>
);

const allTestimonials: Omit<TestimonialProps, 'delay'>[] = [
  {
    name: "Global Dignity",
    company: "globaldignity.org",
    url: "https://globaldignity.org/",
    content: "EasyWeb transformed our online presence. The team delivered beyond our expectations.",
  },
  {
    name: "HerEdge",
    company: "heredge.club",
    url: "https://heredge.club",
    content: "Professional, creative, and incredibly responsive. They made the process seamless.",
  },
  {
    name: "Quist English Program",
    company: "quistenglishprogram.com",
    url: "https://quistenglishprogram.com/",
    content: "The website they built has doubled our class bookings. Outstanding service and results!",
  },
  {
    name: "Predictable Parenting",
    company: "mettetheilmann.com",
    url: "https://mettetheilmann.com/",
    content: "Our online reservations increased by 150% after launching our new website. Incredible ROI.",
  },
  {
    name: "Lisa Thompson",
    company: "Design Co",
    role: "Creative Director",
    content: "As a designer myself, I have high standards. EasyWeb exceeded all expectations.",
  },
];

const ITEMS_PER_PAGE = 3;

export const Testimonials = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const visibleTestimonials = allTestimonials.slice(startIndex, endIndex);

  const totalPages = Math.ceil(allTestimonials.length / ITEMS_PER_PAGE);

  const handleViewMore = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  return (
    <section className="py-24 relative">
      {/* Add structured data for testimonials */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": allTestimonials.map((testimonial, index) => ({
              "@type": "Review",
              "position": index + 1,
              "itemReviewed": {
                "@type": "WebDesignService",
                "name": "Easywebs Web Design Services"
              },
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              },
              "author": {
                "@type": "Person",
                "name": testimonial.name
              },
              "reviewBody": testimonial.content,
              "publisher": {
                "@type": "Organization",
                "name": testimonial.company
              }
            }))
          })}
        </script>
      </Helmet>
      
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {visibleTestimonials.map((testimonial, index) => (
            <TestimonialCard
              key={startIndex + index}
              {...testimonial}
              delay={(index * 0.1)}
            />
          ))}
        </div>

        {totalPages > 1 && (
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center"
           >
             <Button onClick={handleViewMore} variant="outline" size="lg">
               {currentPage < totalPages - 1 ? "View More Testimonials" : "View Previous Testimonials"}
             </Button>
           </motion.div>
        )}
      </div>
    </section>
  );
}; 