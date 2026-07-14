import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { Services } from '@/components/Services';
import { ProcessSteps } from '@/components/ProcessSteps';
import { Testimonials } from '@/components/Testimonials';
import { Faq } from '@/components/Faq';
import SelfAudit from '@/components/SelfAudit';
import FinalCta from '@/components/FinalCta';

import { getOrganizationSchema, getWebsiteSchema } from '@/lib/schema';

const Index = () => {
  // Combine multiple schema objects for the homepage
  const combinedSchema = [
    getOrganizationSchema(),
    getWebsiteSchema()
  ];

  return (
    <div className="min-h-screen bg-paper relative isolate">
      <Helmet>
        <title>EasyWebs — Website Audits, Rebuilds & Business Systems for Growing Teams</title>
        <meta name="description" content="EasyWebs audits and rebuilds business websites, databases, hosting and workflows — then builds the fix. Book a free technical discovery call." />
        <link rel="canonical" href="https://www.easywebs.uk" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="EasyWebs — We fix messy digital setups" />
        <meta property="og:description" content="EasyWebs audits and rebuilds business websites, databases, hosting and workflows — then builds the fix." />
        <meta property="og:url" content="https://www.easywebs.uk" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.easywebs.uk/og-image.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="EasyWebs — We fix messy digital setups" />
        <meta name="twitter:description" content="EasyWebs audits and rebuilds business websites, databases, hosting and workflows — then builds the fix." />
        <meta name="twitter:image" content="https://www.easywebs.uk/og-image.jpg" />

        {/* Keywords */}
        <meta name="keywords" content="website audit, business website rebuild, custom web apps, database migration, cloud hosting, workflow automation" />

        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify(combinedSchema)}
        </script>
      </Helmet>

      <Header transparentOnHero />
      <main className="relative">
        <Hero />
        <SelfAudit />
        <Services />
        <ProcessSteps />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
