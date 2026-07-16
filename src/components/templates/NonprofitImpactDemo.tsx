import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Droplets,
  GraduationCap,
  Heart,
  HeartHandshake,
  LifeBuoy,
  Quote,
  Users,
} from 'lucide-react';
import { useRevealOnScroll, useScrollNav } from './shared';

const CAUSES = [
  {
    icon: Droplets,
    title: 'Clean Water',
    description: 'Wells and filtration systems bringing safe drinking water to rural communities.',
    color: 'text-sky-600 bg-sky-50',
  },
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'Scholarships, school supplies, and teacher training for children who need it most.',
    color: 'text-amber-600 bg-amber-50',
  },
  {
    icon: LifeBuoy,
    title: 'Emergency Relief',
    description: 'Rapid-response aid — food, shelter, and medical care — when disaster strikes.',
    color: 'text-rose-600 bg-rose-50',
  },
];

const STATS = [
  { target: 214, suffix: '', label: 'wells built' },
  { target: 48200, suffix: '+', label: 'meals served' },
  { target: 3600, suffix: '+', label: 'children educated' },
  { target: 92, suffix: '', label: 'communities reached' },
];

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    let raf: number;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setValue(Math.round(progress * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return value;
}

const StatCounter = ({ target, suffix, label, active }: { target: number; suffix: string; label: string; active: boolean }) => {
  const value = useCountUp(target, active);
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-serif text-stone-900 mb-2">
        {value.toLocaleString()}
        {suffix}
      </div>
      <div className="text-sm text-stone-500 uppercase tracking-[0.15em]">{label}</div>
    </div>
  );
};

const NonprofitImpactDemo = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrolled = useScrollNav(scrollRef);
  const stats = useRevealOnScroll<HTMLElement>();
  const progress = useRevealOnScroll<HTMLDivElement>();

  const goalRaised = 68;

  return (
    <div ref={scrollRef} className="h-full overflow-y-auto bg-[#fbf7ef] text-stone-900">
      {/* Nav */}
      <nav
        className={`sticky top-0 z-30 transition-all duration-300 ${
          isScrolled ? 'bg-[#fbf7ef]/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" fill="currentColor" />
            </div>
            <span className="text-lg font-serif">Rootline Foundation</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-stone-600">
            {['Our Work', 'Stories', 'Get Involved'].map((link) => (
              <button key={link} className="hover:text-stone-900 transition-colors">
                {link}
              </button>
            ))}
          </div>
          <button className="px-5 py-2.5 rounded-full bg-amber-600 text-white text-sm font-medium hover:bg-amber-700 transition-colors">
            Donate Now
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-20 md:pb-28 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium mb-6">
            94% of every dollar reaches the field
          </span>
          <h1 className="text-4xl md:text-5xl font-serif leading-[1.15] mb-6">
            Every dollar plants something that grows
          </h1>
          <p className="text-stone-600 text-lg mb-8 max-w-md">
            Rootline partners with local communities to build wells, fund classrooms, and respond
            when disaster strikes — for the long haul, not just the headline.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors">
              Donate Now
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-stone-300 text-stone-700 hover:bg-stone-100 transition-colors">
              See Our Impact
            </button>
          </div>
        </div>

        {/* Abstract "community" motif — icons, no photography */}
        <div className="relative h-72 md:h-80">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-emerald-100 via-amber-50 to-rose-50" />
          <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-emerald-600/90 flex items-center justify-center shadow-lg">
            <Users className="w-10 h-10 text-white" />
          </div>
          <div className="absolute bottom-14 left-24 w-20 h-20 rounded-full bg-amber-500/90 flex items-center justify-center shadow-lg">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <div className="absolute top-24 right-14 w-28 h-28 rounded-full bg-rose-400/90 flex items-center justify-center shadow-lg">
            <HeartHandshake className="w-11 h-11 text-white" />
          </div>
          <div className="absolute bottom-8 right-8 w-16 h-16 rounded-full bg-sky-500/90 flex items-center justify-center shadow-lg">
            <Droplets className="w-6 h-6 text-white" />
          </div>
        </div>
      </section>

      {/* Causes */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Where your support goes</h2>
          <p className="text-stone-600">Three programs, one goal — communities that can stand on their own.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {CAUSES.map((cause) => (
            <div key={cause.title} className="p-8 rounded-2xl bg-white border border-stone-200/70 hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${cause.color}`}>
                <cause.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif mb-3">{cause.title}</h3>
              <p className="text-stone-600 text-sm leading-relaxed mb-4">{cause.description}</p>
              <button className="text-sm font-medium text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1">
                Learn more
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Impact stats — count up on scroll into view */}
      <section ref={stats.ref} className="bg-emerald-800 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <StatCounter key={stat.label} {...stat} active={stats.isVisible} />
          ))}
        </div>
      </section>

      {/* Campaign progress */}
      <section ref={progress.ref} className="max-w-3xl mx-auto px-6 py-20">
        <div className="rounded-2xl border border-stone-200 bg-white p-8 md:p-10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-serif">This month: Clean water for Lira district</h3>
            <span className="text-sm text-stone-500">${(goalRaised * 420).toLocaleString()} / $42,000</span>
          </div>
          <div className="h-3 rounded-full bg-stone-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-emerald-600 transition-all duration-1000 ease-out"
              style={{ width: progress.isVisible ? `${goalRaised}%` : '0%' }}
            />
          </div>
          <p className="text-sm text-stone-500 mt-3">{goalRaised}% funded — 12 days left</p>
        </div>
      </section>

      {/* Story / pull quote */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <Quote className="w-10 h-10 text-amber-500 mx-auto mb-6" />
        <p className="text-2xl md:text-3xl font-serif leading-snug text-stone-800 mb-6">
          "The well changed everything. My daughters used to walk three hours for water — now they
          walk three minutes, and spend the rest of the day in school."
        </p>
        <p className="text-stone-500">Amara, community leader — Lira district</p>
      </section>

      {/* Get involved CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-amber-600 text-white p-10">
            <h3 className="text-2xl font-serif mb-3">Give monthly</h3>
            <p className="text-amber-50 mb-6">Steady support lets us plan further ahead and respond faster in a crisis.</p>
            <button className="px-6 py-3 rounded-full bg-white text-amber-700 font-medium hover:bg-amber-50 transition-colors">
              Become a monthly donor
            </button>
          </div>
          <div className="rounded-2xl bg-stone-900 text-white p-10">
            <h3 className="text-2xl font-serif mb-3">Volunteer with us</h3>
            <p className="text-stone-300 mb-6">From field work to remote skills-based support — there's a role for you.</p>
            <button className="px-6 py-3 rounded-full bg-white text-stone-900 font-medium hover:bg-stone-100 transition-colors">
              See open roles
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-emerald-700 flex items-center justify-center">
              <Heart className="w-3 h-3 text-white" fill="currentColor" />
            </div>
            <span className="font-serif">Rootline Foundation</span>
          </div>
          <p className="text-sm text-stone-500">© {new Date().getFullYear()} Rootline Foundation. A registered nonprofit.</p>
        </div>
      </footer>
    </div>
  );
};

export default NonprofitImpactDemo;
