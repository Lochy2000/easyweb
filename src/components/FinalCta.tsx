import { motion } from 'framer-motion';
import { useBooking } from '@/lib/booking-context';

const FinalCta = () => {
  const { openBooking } = useBooking();

  return (
    <section className="py-20 md:py-24 px-5 md:px-10 bg-paper">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-[640px] mx-auto text-center"
      >
        <h2 className="font-serif font-medium text-3xl text-ink mb-4 tracking-[-0.01em]">
          Ready to fix what's slowing you down?
        </h2>
        <p className="text-[15px] text-ink-soft mb-8">
          A 30-minute discovery call is the first step — no obligation, no sales pitch, just a clear
          read on what's worth fixing first.
        </p>
        <button
          onClick={() => openBooking()}
          className="rounded-full bg-ew-accent text-white font-semibold text-sm px-7 py-3.5 hover:bg-ew-accent-ink transition-colors"
        >
          Book a discovery call
        </button>
      </motion.div>
    </section>
  );
};

export default FinalCta;
