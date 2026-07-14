import { motion } from 'framer-motion';

const PROCESS_STEPS = [
  { n: 1, title: 'Review', desc: 'We audit your current websites, databases, hosting and workflows.' },
  { n: 2, title: 'Recommend', desc: 'You get a clear, practical plan for what to fix and build.' },
  { n: 3, title: 'Implement', desc: "We build it — the same person who did the review, not a handoff to someone new." },
  { n: 4, title: 'Support', desc: 'Ongoing monitoring, updates and a direct line to your engineer.' },
];

export const ProcessSteps = () => {
  return (
    <section id="process" className="py-20 md:py-28 px-5 md:px-10 bg-paper">
      <div className="max-w-[1120px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-[560px] mb-14"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-ew-accent">How it runs</span>
          <h2 className="font-serif font-medium text-3xl text-ink mt-3 tracking-[-0.01em]">
            Four steps. No handover to a different team halfway through.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-paper-raised border border-line rounded-2xl p-6"
            >
              <div className="w-7 h-7 rounded-full bg-ew-accent-soft text-ew-accent text-xs font-bold flex items-center justify-center mb-5">
                {step.n}
              </div>
              <h3 className="font-serif font-medium text-base text-ink mb-2.5">{step.title}</h3>
              <p className="text-[12.5px] leading-relaxed text-ink-soft">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
