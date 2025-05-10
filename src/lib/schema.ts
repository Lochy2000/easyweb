/**
 * Schema.org structured data utilities
 * This file provides functions for generating JSON-LD schema data for different page types
 */

// Base organization schema for Easywebs
export const getOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebDesignCompany',
    name: 'Easywebs',
    url: 'https://www.easywebs.uk',
    logo: 'https://www.easywebs.uk/logo.png',
    description: 'A modern web design and development studio based in Richmond, UK, specializing in high-performance websites for creators, small businesses, and startups.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '18 Petersham Road',
      addressLocality: 'Richmond',
      addressRegion: 'London',
      postalCode: 'TW10 6UW',
      addressCountry: 'GB'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '07469 707973',
      contactType: 'customer service'
    },
    sameAs: [
      'https://www.linkedin.com/company/easywebsuk'
      // Add other social profile URLs here
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday'
      ],
      opens: '09:00',
      closes: '17:00'
    }
  };
};

// Blog post schema
export const getBlogPostSchema = (post: {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  author?: string;
  category?: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.imageUrl,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author || 'EasyWeb Team'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Easywebs',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.easywebs.uk/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.easywebs.uk/blog/${post.id}`
    },
    keywords: post.category || 'Web Design',
  };
};

// Service schema for service pages
export const getServiceSchema = (service: {
  name: string;
  description: string;
  url: string;
  image?: string;
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: getOrganizationSchema(),
    url: service.url,
    image: service.image || 'https://www.easywebs.uk/images/services-default.jpg'
  };
};

// Breadcrumb schema
export const getBreadcrumbSchema = (breadcrumbs: Array<{name: string, url: string}>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  };
};

// Website schema (for homepage)
export const getWebsiteSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Easywebs',
    url: 'https://www.easywebs.uk',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.easywebs.uk/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };
};

// FAQ schema (for FAQ sections)
export const getFAQSchema = (faqs: Array<{question: string, answer: string}>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
};