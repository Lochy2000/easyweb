import { motion, useScroll, useTransform } from 'framer-motion';
import { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { useBooking } from '@/lib/booking-context';

const STAR_COUNT = 45;

const Hero = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const { openBooking } = useBooking();

  const stars = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }).map((_, i) => ({
        left: `${(i * 37) % 100}%`,
        top: `${(i * 53) % 70}%`,
        size: 1 + ((i * 7) % 3),
        opacity: 0.3 + ((i * 13) % 60) / 100,
        delay: `${i % 5}s`,
      })),
    []
  );

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden flex flex-col"
      style={{
        background: 'linear-gradient(180deg, #2c3ed6 0%, #4a56e4 38%, #7660e2 68%, #9d6fd8 100%)',
      }}
    >
      {/* Starfield — subtle, pauses under prefers-reduced-motion */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-ew-star-pulse"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Single soft ambient glow behind the headline — lamp-inspired, recolored */}
      <motion.div
        className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] rounded-full bg-white/20 blur-[110px] animate-ew-glow-drift pointer-events-none"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      <motion.div
        style={{ opacity }}
        className="relative flex-1 flex flex-col items-center justify-center text-center px-6 pt-24"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 py-[7px] px-3.5 rounded-full bg-white/10 border border-white/25 text-[11px] font-semibold uppercase tracking-[0.04em] text-white mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
          Now booking discovery calls
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="font-serif font-medium text-white max-w-3xl mx-auto mb-5 leading-[1.12] tracking-[-0.01em]"
          style={{ fontSize: 'clamp(32px, 5vw, 58px)' }}
        >
          We fix messy digital setups —<br />
          <span className="italic">so your business runs on systems, not spreadsheets.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-[17px] leading-relaxed text-white/85 max-w-xl mx-auto mb-8"
        >
          EasyWebs reviews your websites, databases, hosting and workflows — then designs and builds
          the fix. Consultancy plus implementation, from one technical partner.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex flex-wrap gap-3.5 justify-center"
        >
          <button
            onClick={() => openBooking()}
            className="inline-flex items-center gap-2 rounded-full bg-white text-ew-accent font-semibold text-sm px-6 py-3.5 hover:bg-paper transition-colors"
          >
            Book a discovery call
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="#services"
            className="rounded-full border border-white/40 text-white font-semibold text-sm px-6 py-3.5 hover:bg-white/10 transition-colors"
          >
            Explore our services
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="relative flex justify-center pb-6"
      >
        <div className="flex flex-col items-center gap-1.5 text-[11px] tracking-[0.04em] text-white/70">
          <span>Scroll to see how we work</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            ↓
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
