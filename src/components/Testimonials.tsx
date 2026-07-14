import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Star } from "lucide-react";
import { useState } from "react";
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
    className="bg-paper-raised border border-line rounded-2xl p-6 flex flex-col h-full transition-shadow duration-300 hover:shadow-lg"
  >
    <div className="flex items-center gap-4 mb-5">
      <Avatar className="w-12 h-12">
        <AvatarImage src={image} alt={`${name} from ${company} - client testimonial`} width={48} height={48} loading="lazy" />
        <AvatarFallback aria-label={`${name}'s initials`} className="bg-ew-accent-soft text-ew-accent">{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
      </Avatar>
      <div>
        <h4 className="font-semibold text-ink">{name}</h4>
        {url ? (
          <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-ink-faint hover:text-ew-accent transition-colors">
            {company} {role && `(${role})`}
          </a>
        ) : (
          <p className="text-sm text-ink-faint">{company}{role && `, ${role}`}</p>
        )}
      </div>
    </div>
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-ew-accent text-ew-accent" />
      ))}
    </div>
    <p className="text-ink-soft leading-relaxed flex-grow">{content}</p>
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
    <section id="proof" className="relative py-20 md:py-28 px-5 md:px-10 bg-paper overflow-hidden">
      {/* Subtle recolored floating accents — the one deliberate animated touch
          back here, so the page doesn't go flat after the self-audit section. */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-10 left-[8%] w-64 h-64 rounded-full bg-ew-accent/5 blur-3xl animate-ew-glow-drift" />
        <div className="absolute bottom-0 right-[10%] w-72 h-72 rounded-full bg-ew-accent/[0.04] blur-3xl animate-ew-glow-drift" style={{ animationDelay: '2s' }} />
      </div>

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

      <div className="relative max-w-[1120px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-[560px] mb-14"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ew-accent">Recent work</span>
          <h2 className="font-serif font-medium text-3xl text-ink mt-3 tracking-[-0.01em]">
            What our clients say
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
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
           >
             <button
               onClick={handleViewMore}
               className="rounded-full border border-line text-ink font-semibold text-[13.5px] px-6 py-3 hover:border-ew-accent hover:text-ew-accent transition-colors"
             >
               {currentPage < totalPages - 1 ? "View more testimonials" : "View previous testimonials"}
             </button>
           </motion.div>
        )}
      </div>
    </section>
  );
};
