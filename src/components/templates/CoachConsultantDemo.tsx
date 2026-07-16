import React, { useMemo, useRef, useState } from 'react';
import { ArrowRight, Check, Compass, Quote, Target, TrendingUp } from 'lucide-react';
import { useRevealOnScroll, useScrollNav } from './shared';

const PILLARS = [
  { icon: Compass, title: 'Clarity', description: 'We name the actual goal, not the socially acceptable version of it.' },
  { icon: Target, title: 'Accountability', description: 'Weekly check-ins that make the gap between intention and action small.' },
  { icon: TrendingUp, title: 'Momentum', description: 'Small, compounding moves — the kind that still feel like progress a year in.' },
];

const TESTIMONIALS = [
  { quote: 'Six months in and I finally left the job I\'d been complaining about for three years.', name: 'Rhea T.', role: 'Product Lead' },
  { quote: 'Naomi doesn\'t let you hide behind "busy." That was uncomfortable and exactly what I needed.', name: 'Owen M.', role: 'Founder' },
  { quote: 'The clarity from our first session alone was worth the whole engagement.', name: 'Priya S.', role: 'Marketing Director' },
  { quote: 'I\'ve worked with two other coaches. This is the first framework that actually stuck.', name: 'Devon K.', role: 'Engineering Manager' },
  { quote: 'Blunt, warm, and unreasonably good at asking the one question I was avoiding.', name: 'Lina A.', role: 'Consultant' },
  { quote: 'Structured enough to make progress, flexible enough to fit an unpredictable quarter.', name: 'Marcus B.', role: 'COO' },
];

const MONTH_LABEL = 'March 2026';
const FIRST_WEEKDAY = 6; // Sunday = 0 ... arbitrary start offset for the mock month
const DAYS_IN_MONTH = 31;
const AVAILABLE_DAYS = new Set([3, 4, 5, 10, 11, 12, 17, 18, 19, 24, 25, 26]);
const TIME_SLOTS = ['9:00 AM', '11:30 AM', '2:00 PM', '4:30 PM'];

const CoachConsultantDemo = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrolled = useScrollNav(scrollRef);
  const wall = useRevealOnScroll<HTMLElement>();

  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const calendarCells = useMemo(() => {
    const cells: (number | null)[] = Array.from({ length: FIRST_WEEKDAY }, () => null);
    for (let d = 1; d <= DAYS_IN_MONTH; d++) cells.push(d);
    return cells;
  }, []);

  const pickDay = (day: number) => {
    if (!AVAILABLE_DAYS.has(day)) return;
    setSelectedDay(day);
    setSelectedSlot(null);
    setConfirmed(false);
  };

  return (
    <div ref={scrollRef} className="h-full overflow-y-auto bg-[#fbf6f4] text-stone-900">
      {/* Nav */}
      <nav
        className={`sticky top-0 z-30 transition-all duration-300 ${
          isScrolled ? 'bg-[#fbf6f4]/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div>
            <span className="text-lg font-semibold tracking-tight block leading-tight">Ascent Coaching</span>
            <span className="text-xs text-stone-500">with Naomi Reyes</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-stone-600">
            {['Approach', 'Testimonials', 'Book a Call'].map((link) => (
              <button key={link} className="hover:text-stone-900 transition-colors">
                {link}
              </button>
            ))}
          </div>
          <button className="px-5 py-2.5 rounded-full bg-[#7c2d4a] text-white text-sm font-medium hover:bg-[#66223c] transition-colors">
            Book Free Call
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid md:grid-cols-[auto,1fr] gap-10 md:gap-14 items-center">
        <div className="relative w-40 h-40 md:w-52 md:h-52 mx-auto md:mx-0 shrink-0">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#7c2d4a] to-[#c96f4a]" />
          <div className="absolute inset-2 rounded-full bg-[#fbf6f4] flex items-center justify-center text-4xl md:text-5xl font-semibold text-[#7c2d4a]">
            NR
          </div>
        </div>
        <div className="text-center md:text-left">
          <span className="inline-block px-3 py-1 rounded-full bg-[#7c2d4a]/10 text-[#7c2d4a] text-xs font-medium mb-5">
            Executive &amp; career coaching
          </span>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] mb-5">
            Hi, I'm Naomi — let's get honest about what's next
          </h1>
          <p className="text-stone-600 text-lg max-w-xl mb-8">
            Twelve years coaching founders and executives through the decisions that actually
            matter. No frameworks for their own sake — just clarity, and a plan you'll keep.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#7c2d4a] text-white font-medium hover:bg-[#66223c] transition-colors">
              Book a Free Call
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-6 py-3 rounded-full border border-stone-300 text-stone-700 hover:bg-white transition-colors">
              My Approach
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-4xl mx-auto px-6 pb-16 grid grid-cols-3 gap-6 text-center">
        {[
          { value: '12 yrs', label: 'coaching' },
          { value: '340+', label: 'clients coached' },
          { value: '4.9/5', label: 'average rating' },
        ].map((stat) => (
          <div key={stat.label}>
            <div className="text-2xl md:text-3xl font-semibold">{stat.value}</div>
            <div className="text-sm text-stone-500">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Pillars */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-stone-200">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12">How we'll work together</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {PILLARS.map((pillar) => (
            <div key={pillar.title} className="p-7 rounded-2xl bg-white border border-stone-200">
              <div className="w-11 h-11 rounded-xl bg-[#7c2d4a]/10 flex items-center justify-center mb-4">
                <pillar.icon className="w-5 h-5 text-[#7c2d4a]" />
              </div>
              <h3 className="font-semibold mb-2">{pillar.title}</h3>
              <p className="text-sm text-stone-600 leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial quote wall — CSS columns masonry, no library */}
      <section ref={wall.ref} className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12">What clients say</h2>
        <div
          className={`columns-1 sm:columns-2 lg:columns-3 gap-5 transition-all duration-700 ${
            wall.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="break-inside-avoid mb-5 p-6 rounded-2xl bg-white border border-stone-200">
              <Quote className="w-5 h-5 text-[#7c2d4a] mb-3" />
              <p className="text-sm text-stone-700 leading-relaxed mb-4">"{t.quote}"</p>
              <p className="text-sm font-medium">{t.name}</p>
              <p className="text-xs text-stone-500">{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Booking calendar mock */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-stone-200">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-3">Book a free intro call</h2>
        <p className="text-center text-stone-500 text-sm mb-10">30 minutes, no obligation — pick whatever works.</p>

        <div className="rounded-2xl border border-stone-200 bg-white p-6 md:p-8">
          <p className="text-sm font-medium text-stone-500 mb-4">{MONTH_LABEL}</p>
          <div className="grid grid-cols-7 gap-1.5 text-center text-xs text-stone-400 mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              <div key={`${d}-${i}`}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1.5 mb-6">
            {calendarCells.map((day, i) => {
              if (day === null) return <div key={`empty-${i}`} />;
              const available = AVAILABLE_DAYS.has(day);
              const active = selectedDay === day;
              return (
                <button
                  key={day}
                  onClick={() => pickDay(day)}
                  disabled={!available}
                  className={`aspect-square rounded-lg text-sm transition-colors ${
                    active
                      ? 'bg-[#7c2d4a] text-white'
                      : available
                      ? 'bg-[#7c2d4a]/10 text-[#7c2d4a] hover:bg-[#7c2d4a]/20'
                      : 'text-stone-300'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {selectedDay && !confirmed && (
            <div>
              <p className="text-sm font-medium mb-3">Available times, March {selectedDay}</p>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2.5 rounded-lg border text-sm transition-colors ${
                      selectedSlot === slot ? 'border-[#7c2d4a] bg-[#7c2d4a] text-white' : 'border-stone-200 hover:border-[#7c2d4a]/50'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setConfirmed(true)}
                disabled={!selectedSlot}
                className="w-full py-3 rounded-full bg-[#7c2d4a] text-white text-sm font-medium hover:bg-[#66223c] disabled:opacity-40 disabled:hover:bg-[#7c2d4a] transition-colors"
              >
                Confirm {selectedSlot ? `${selectedSlot}, March ${selectedDay}` : 'a time'}
              </button>
            </div>
          )}

          {confirmed && (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full bg-[#7c2d4a]/10 flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-[#7c2d4a]" />
              </div>
              <p className="font-medium mb-1">You're booked for March {selectedDay}, {selectedSlot}</p>
              <p className="text-sm text-stone-500">A confirmation would land in your inbox here.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-semibold">Ascent Coaching</span>
          <p className="text-sm text-stone-500">© {new Date().getFullYear()} Naomi Reyes Coaching.</p>
        </div>
      </footer>
    </div>
  );
};

export default CoachConsultantDemo;
