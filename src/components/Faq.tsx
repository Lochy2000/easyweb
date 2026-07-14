import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQS = [
  {
    q: 'Do you work with our existing website or tools?',
    a: 'Usually, yes. We start by reviewing what you already have — most projects extend or replace specific pieces rather than starting from zero.',
  },
  {
    q: "Who owns the code and data once you're done?",
    a: 'You do. Everything we build — code, database, documentation — is handed over and owned by you, not licensed back to us.',
  },
  {
    q: 'How is a project priced?',
    a: 'Project-based for one-off builds, or a monthly retainer for ongoing support. We scope and quote after the discovery call, once we know what\'s actually involved.',
  },
  {
    q: 'How long does a typical project take?',
    a: "Most engagements run 3–6 weeks from review to handover, depending on scope. You'll get a specific estimate as part of your recommendation.",
  },
  {
    q: 'What if we already have a developer?',
    a: "That's fine — we can work alongside an in-house developer or agency, or hand off cleanly once the build is stable.",
  },
];

export const Faq = () => {
  return (
    <section id="faq" className="py-20 md:py-28 px-5 md:px-10 bg-paper">
      <div className="max-w-[1120px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-[560px] mb-14"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ew-accent">Before you book</span>
          <h2 className="font-serif font-medium text-3xl text-ink mt-3 tracking-[-0.01em]">
            Common questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-[760px]"
        >
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((faq, i) => (
              <AccordionItem key={faq.q} value={`faq-${i}`} className="border-line">
                <AccordionTrigger className="text-left font-semibold text-ink text-[14.5px] hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-ink-soft text-[13.5px] leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
