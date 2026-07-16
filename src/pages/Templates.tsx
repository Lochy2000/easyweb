import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import TemplateGallery from '@/components/TemplateGallery';
import Footer from '@/components/Footer';
import { MarqueeText } from '@/components/MarqueeText';

const Templates = () => {
  return (
    <div className="min-h-screen bg-paper">
      <Helmet>
        <title>Website Templates | Easywebs</title>
        <meta name="description" content="Explore our collection of hand-crafted website templates designed for various needs. Each template is fully responsive and customizable to your brand." />
        <link rel="canonical" href="https://www.easywebs.uk/templates" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Website Templates | Easywebs" />
        <meta property="og:description" content="Explore our collection of hand-crafted website templates designed for various needs. Each template is fully responsive and customizable to your brand." />
        <meta property="og:url" content="https://www.easywebs.uk/templates" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.easywebs.uk/templates-og.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Website Templates | Easywebs" />
        <meta name="twitter:description" content="Explore our collection of hand-crafted website templates designed for various needs. Each template is fully responsive and customizable to your brand." />
        <meta name="twitter:image" content="https://www.easywebs.uk/templates-og.jpg" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Website Templates | Easywebs",
            "description": "Explore our collection of hand-crafted website templates designed for various needs. Each template is fully responsive and customizable to your brand.",
            "url": "https://www.easywebs.uk/templates",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": [
                {
                  "@type": "Product",
                  "name": "Portfolio Pro",
                  "description": "A professional portfolio template for creatives",
                  "offers": {
                    "@type": "Offer",
                    "availability": "https://schema.org/InStock"
                  }
                },
                {
                  "@type": "Product",
                  "name": "Business Plus",
                  "description": "A comprehensive template for businesses",
                  "offers": {
                    "@type": "Offer",
                    "availability": "https://schema.org/InStock"
                  }
                }
              ]
            }
          })}
        </script>
      </Helmet>
      
      <Header />
      <main className="pt-32">
        {/* Hero Section for Templates */}
        <section className="pt-20 pb-16 md:pt-28 md:pb-24 bg-paper">
          <div className="container-custom text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ew-accent">Templates</span>
            <h1 className="font-serif font-medium text-4xl md:text-6xl text-ink mt-3 mb-6 leading-tight tracking-[-0.01em]">
              Browse Our Templates
            </h1>
            <p className="text-lg md:text-xl text-ink-soft mb-8 max-w-2xl mx-auto">
              Explore our collection of hand-crafted templates designed for various needs.
              Each template is fully responsive and customizable to your brand.
            </p>
          </div>
        </section>
        
        <MarqueeText />
        <TemplateGallery />
      </main>
      <Footer />
    </div>
  );
};

export default Templates;
