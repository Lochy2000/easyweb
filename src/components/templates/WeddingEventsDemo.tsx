import React, { useRef, useState } from 'react';
import {
  CalendarHeart,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Flower2,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Users,
} from 'lucide-react';
import { useRevealOnScroll, useScrollNav } from './shared';

const SERVICES = [
  { name: 'Full Wedding Planning', description: 'From save-the-dates to send-off, we hold every detail.' },
  { name: 'Day-Of Coordination', description: 'You planned it — we make sure the day runs exactly as dreamed.' },
  { name: 'Corporate Events', description: 'Launches, galas, and offsites with the same care as a wedding.' },
  { name: 'Private Celebrations', description: 'Milestone birthdays, anniversaries, and intimate gatherings.' },
];

const SCHEDULE = [
  { time: '9:00 AM', title: 'Getting Ready', detail: 'Hair, makeup, and quiet moments with the wedding party.' },
  { time: '4:00 PM', title: 'Ceremony', detail: 'Garden ceremony under the arbor, 80 guests seated by 3:45.' },
  { time: '5:00 PM', title: 'Cocktail Hour', detail: 'String trio, passed hors d’oeuvres, and the signature cocktail bar.' },
  { time: '6:00 PM', title: 'Reception', detail: 'Dinner service, toasts, and first dance under string lighting.' },
  { time: '10:00 PM', title: 'Send-Off', detail: 'Sparkler exit and the last song of the night.' },
];

const TESTIMONIALS = [
  { quote: 'They caught things we never would have thought of — twice. Our day felt effortless.', name: 'Maren & Colin' },
  { quote: 'Every vendor showed up early because they knew Willow & Vine ran a tight, kind ship.', name: 'Priya & Dev' },
  { quote: 'We got to actually be present. That was the whole point, and they delivered it.', name: 'Sofia & Jamie' },
];

const MOODBOARD = [
  { label: 'Blush & Sage', className: 'bg-gradient-to-br from-rose-200 to-emerald-100' },
  { label: 'Garden Ceremony', className: 'bg-gradient-to-br from-emerald-100 to-amber-50' },
  { label: 'Candlelit Reception', className: 'bg-gradient-to-br from-amber-100 to-rose-100' },
  { label: 'Coastal Elopement', className: 'bg-gradient-to-br from-sky-100 to-rose-50' },
];

const WeddingEventsDemo = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrolled = useScrollNav(scrollRef);
  const moodboard = useRevealOnScroll<HTMLElement>();
  const [openStop, setOpenStop] = useState(1);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const prevTestimonial = () => setTestimonialIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const nextTestimonial = () => setTestimonialIndex((i) => (i + 1) % TESTIMONIALS.length);

  return (
    <div ref={scrollRef} className="h-full overflow-y-auto bg-[#fdf6f3] text-stone-800">
      {/* Nav */}
      <nav
        className={`sticky top-0 z-30 transition-all duration-300 ${
          isScrolled ? 'bg-[#fdf6f3]/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <span className="text-xl font-serif italic">Willow &amp; Vine</span>
          <div className="hidden md:flex items-center gap-8 text-sm text-stone-600">
            {['Our Work', 'Services', 'Timeline'].map((link) => (
              <button key={link} className="hover:text-stone-900 transition-colors">
                {link}
              </button>
            ))}
          </div>
          <button className="px-5 py-2.5 rounded-full bg-rose-800 text-white text-sm font-medium hover:bg-rose-900 transition-colors">
            Check Availability
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Flower2 className="absolute -left-10 top-8 w-40 h-40 text-rose-300/40" strokeWidth={0.75} />
        <Flower2 className="absolute right-0 bottom-0 w-56 h-56 text-emerald-300/30 rotate-45" strokeWidth={0.75} />

        <div className="relative max-w-3xl mx-auto px-6 pt-24 pb-24 text-center">
          <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-rose-700 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Full-service planning &amp; design
          </span>
          <h1 className="text-4xl md:text-6xl font-serif leading-[1.1] mb-6">Your story, beautifully staged</h1>
          <p className="text-stone-600 text-lg mb-10 max-w-lg mx-auto">
            Willow &amp; Vine designs weddings and celebrations that feel entirely, unmistakably yours —
            down to the last candle.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-800 text-white font-medium hover:bg-rose-900 transition-colors">
              <CalendarHeart className="w-4 h-4" />
              Start Planning
            </button>
            <button className="px-6 py-3 rounded-full border border-rose-800/30 text-rose-900 hover:bg-rose-50 transition-colors">
              View Real Weddings
            </button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 gap-5">
          {SERVICES.map((service) => (
            <div key={service.name} className="p-7 rounded-2xl bg-white border border-rose-100">
              <h3 className="font-serif text-xl mb-2">{service.name}</h3>
              <p className="text-sm text-stone-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Day-of timeline — expandable stops */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-serif text-center mb-12">A day, held together</h2>
        <div className="relative pl-8">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-rose-200" />
          <div className="space-y-3">
            {SCHEDULE.map((stop, i) => {
              const open = openStop === i;
              return (
                <div key={stop.title} className="relative">
                  <span
                    className={`absolute -left-8 top-3 w-3.5 h-3.5 rounded-full border-2 ${
                      open ? 'bg-rose-800 border-rose-800' : 'bg-white border-rose-300'
                    }`}
                  />
                  <button
                    onClick={() => setOpenStop(open ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 text-left p-4 rounded-xl hover:bg-white transition-colors"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="text-sm text-rose-700 w-20 shrink-0">{stop.time}</span>
                      <span className="font-serif text-lg">{stop.title}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-stone-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
                  </button>
                  {open && <p className="pl-24 pr-4 pb-4 text-sm text-stone-600 leading-relaxed">{stop.detail}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Moodboard — styled color swatches instead of stock photography */}
      <section ref={moodboard.ref} className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-serif text-center mb-12">Palettes we love</h2>
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-700 ${
            moodboard.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {MOODBOARD.map((board) => (
            <div key={board.label} className={`h-40 rounded-2xl ${board.className} flex items-end p-4`}>
              <span className="text-sm font-medium text-stone-700/80">{board.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial slider */}
      <section className="bg-rose-900 text-rose-50">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <p className="font-serif text-2xl md:text-3xl leading-snug mb-6">"{TESTIMONIALS[testimonialIndex].quote}"</p>
          <p className="text-rose-300 mb-8">{TESTIMONIALS[testimonialIndex].name}</p>
          <div className="flex items-center justify-center gap-4">
            <button onClick={prevTestimonial} aria-label="Previous testimonial" className="p-2 rounded-full border border-rose-700 hover:bg-rose-800 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => setTestimonialIndex(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${i === testimonialIndex ? 'bg-rose-50' : 'bg-rose-700'}`}
                />
              ))}
            </div>
            <button onClick={nextTestimonial} aria-label="Next testimonial" className="p-2 rounded-full border border-rose-700 hover:bg-rose-800 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Inquiry CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="rounded-3xl bg-white border border-rose-100 p-8 md:p-10 text-center">
          <h2 className="text-3xl font-serif mb-4">Ready to start planning?</h2>
          <p className="text-stone-600 mb-8">Tell us a little about your celebration and we'll follow up within two days.</p>
          <form className="grid sm:grid-cols-2 gap-3 text-left" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Your name" className="px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:border-rose-400" />
            <input type="date" className="px-4 py-3 rounded-lg border border-stone-200 text-sm text-stone-500 focus:outline-none focus:border-rose-400" />
            <select className="px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:border-rose-400">
              <option>Wedding</option>
              <option>Corporate Event</option>
              <option>Private Celebration</option>
            </select>
            <div className="flex items-center gap-2 px-4 py-3 rounded-lg border border-stone-200 text-sm text-stone-500">
              <Users className="w-4 h-4" />
              Estimated guest count
            </div>
            <button className="sm:col-span-2 py-3.5 rounded-full bg-rose-800 text-white font-medium hover:bg-rose-900 transition-colors">
              Send Inquiry
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-rose-100">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-serif italic text-lg">Willow &amp; Vine</span>
          <div className="flex items-center gap-6 text-sm text-stone-500">
            <span className="inline-flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              (415) 555-0117
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              hello@willowandvine.co
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Sonoma, CA
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WeddingEventsDemo;
