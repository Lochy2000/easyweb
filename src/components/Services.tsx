import { motion } from 'framer-motion';
import { useState } from 'react';
import { Globe, Database, Cloud, RefreshCw, Zap, LayoutGrid } from 'lucide-react';
import { ServiceModal } from './ServiceModal';

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
    title: 'Websites & web apps',
    quickView: 'Bespoke, fast, and built to actually serve your workflows — not a generic template.',
    details: {
      description: 'We design and build custom websites and web apps around how your business actually operates, not a one-size-fits-all theme.',
      features: ['Custom design and build, no page-builder bloat', 'Fast load times and clean, maintainable code', 'Built to connect to the systems you already run'],
    },
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: 'Databases',
    quickView: 'Replacing spreadsheets with structured, reliable databases that scale with you.',
    details: {
      description: 'We move client records and workflows out of spreadsheets and into a proper relational structure that supports reporting and growth.',
      features: ['Clean data migration with automated backups', 'Schema designed around your real workflows', 'Reporting-ready from day one'],
    },
  },
  {
    icon: <Cloud className="w-6 h-6" />,
    title: 'Cloud hosting',
    quickView: 'Secure, monitored hosting and migrations, without the downtime.',
    details: {
      description: 'We handle hosting setup, migration, and ongoing monitoring so your site stays fast and available.',
      features: ['Zero-downtime migrations', 'Security patching and uptime monitoring', 'A direct line to the engineer who set it up'],
    },
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: 'Integrations',
    quickView: 'Connecting the tools you already use so data stops being copied by hand.',
    details: {
      description: 'We connect your booking, CRM, billing and other tools so information updates once and flows everywhere it needs to.',
      features: ['Map current data flows before we touch anything', 'Remove manual double-entry', 'Works with the tools you already pay for'],
    },
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Automations',
    quickView: 'So invoices, bookings and follow-ups happen without someone re-typing them into a second system.',
    details: {
      description: 'We build automation pipelines that route sales and operations work without manual re-entry.',
      features: ['Invoice, booking and follow-up automation', 'Fewer dropped handoffs between tools', 'Built to be maintained without a developer on call'],
    },
  },
  {
    icon: <LayoutGrid className="w-6 h-6" />,
    title: 'Internal tools',
    quickView: 'Custom admin panels and dashboards built around how your team works.',
    details: {
      description: 'We build internal dashboards and admin panels shaped around your team\'s actual process, not a generic CRM.',
      features: ['Secure, role-based access', 'Built around your existing workflow', 'Handed over with documentation, not locked to us'],
    },
  },
];

interface ServiceCardProps {
  service: ServiceData;
  delay?: number;
  onOpenModal: (service: ServiceData) => void;
}

const ServiceCard = ({ service, delay = 0, onOpenModal }: ServiceCardProps) => (
  <motion.button
    type="button"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    onClick={() => onOpenModal(service)}
    className="text-left bg-paper-raised border border-line rounded-2xl p-7 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
  >
    <div className="w-[42px] h-[42px] rounded-[11px] bg-ew-accent-soft text-ew-accent flex items-center justify-center mb-5">
      {service.icon}
    </div>
    <h3 className="font-serif font-medium text-lg text-ink mb-2.5">{service.title}</h3>
    <p className="text-[13.5px] leading-relaxed text-ink-soft">{service.quickView}</p>
  </motion.button>
);

export const Services = () => {
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);

  return (
    <section id="services" className="py-20 md:py-28 px-5 md:px-10 bg-paper">
      <div className="max-w-[1120px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-[520px] mb-14"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ew-accent">What we do</span>
          <h2 className="font-serif font-medium text-3xl text-ink mt-3 tracking-[-0.01em]">
            Practical technical advice, then we build it
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              delay={index * 0.08}
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
