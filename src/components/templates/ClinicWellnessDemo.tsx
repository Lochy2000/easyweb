import React, { useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Baby,
  CalendarCheck,
  Check,
  ChevronDown,
  Clock,
  HeartPulse,
  MapPin,
  PhoneCall,
  Smile,
  Stethoscope,
} from 'lucide-react';
import { useRevealOnScroll, useScrollNav } from './shared';

const SERVICES = [
  { icon: Stethoscope, name: 'General Checkup', duration: '30 min', price: '$60' },
  { icon: Smile, name: 'Dental Care', duration: '45 min', price: '$85' },
  { icon: HeartPulse, name: 'Physiotherapy', duration: '50 min', price: '$70' },
  { icon: Baby, name: 'Pediatrics', duration: '30 min', price: '$55' },
];

const TEAM = [
  { initials: 'MR', name: 'Dr. Maya Reyes', role: 'Family Medicine', color: 'bg-teal-600' },
  { initials: 'JK', name: 'Dr. Jonah Kim', role: 'Physiotherapy', color: 'bg-sky-600' },
  { initials: 'AS', name: 'Dr. Amara Singh', role: 'Pediatrics', color: 'bg-emerald-600' },
];

const FAQS = [
  { q: 'Do you accept walk-ins?', a: "Yes — we hold same-day slots each morning, though booking ahead guarantees your preferred time." },
  { q: 'Is my insurance accepted?', a: 'We work with most major providers. Bring your card to your first visit and our front desk will confirm coverage.' },
  { q: "What's your cancellation policy?", a: 'Free cancellation up to 24 hours before your appointment. Later cancellations may incur a small fee.' },
  { q: 'Can I request a specific doctor?', a: 'Absolutely — pick a provider during booking, or leave it open and we\'ll match you with the next available.' },
];

function nextDays(count: number) {
  const days = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
}

const TIME_SLOTS = ['9:00 AM', '10:30 AM', '12:00 PM', '1:30 PM', '3:00 PM', '4:30 PM'];

const ClinicWellnessDemo = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrolled = useScrollNav(scrollRef);
  const services = useRevealOnScroll<HTMLElement>();
  const bookingRef = useRef<HTMLDivElement>(null);

  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const days = useMemo(() => nextDays(7), []);

  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const canAdvance = step === 0 ? !!selectedService : step === 1 ? !!selectedSlot : true;

  const goNext = () => {
    if (step < 2) setStep(step + 1);
    else setConfirmed(true);
  };

  const resetBooking = () => {
    setStep(0);
    setSelectedService(null);
    setSelectedDay(0);
    setSelectedSlot(null);
    setConfirmed(false);
  };

  return (
    <div ref={scrollRef} className="h-full overflow-y-auto bg-[#f6fbfa] text-slate-800">
      {/* Nav */}
      <nav
        className={`sticky top-0 z-30 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
              <HeartPulse className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold">Everwell Clinic</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-600">
            {['Services', 'Our Team', 'FAQ'].map((link) => (
              <button key={link} className="hover:text-slate-900 transition-colors">
                {link}
              </button>
            ))}
          </div>
          <button
            onClick={scrollToBooking}
            className="px-5 py-2.5 rounded-full bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors"
          >
            Book Appointment
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-20 md:pb-24 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-medium mb-6">
            Same-day slots available
          </span>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] mb-6">
            Care that fits your life
          </h1>
          <p className="text-slate-600 text-lg mb-8 max-w-md">
            Family medicine, dental, physiotherapy, and pediatrics — under one calm, unhurried roof.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToBooking}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-teal-600 text-white font-medium hover:bg-teal-700 transition-colors"
            >
              Book an Appointment
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-300 text-slate-700 hover:bg-white transition-colors">
              Meet Our Team
            </button>
          </div>
        </div>

        {/* Next-available preview card — no photography */}
        <div className="rounded-2xl border border-teal-100 bg-white shadow-lg shadow-teal-900/5 p-6">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
            <CalendarCheck className="w-4 h-4 text-teal-600" />
            Next available appointment
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-teal-50 mb-3">
            <div>
              <div className="font-medium">Today, 3:00 PM</div>
              <div className="text-sm text-slate-500">Dr. Maya Reyes — General Checkup</div>
            </div>
            <button onClick={scrollToBooking} className="text-sm font-medium text-teal-700 hover:text-teal-800">
              Select
            </button>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
            <div>
              <div className="font-medium">Tomorrow, 10:30 AM</div>
              <div className="text-sm text-slate-500">Dr. Jonah Kim — Physiotherapy</div>
            </div>
            <button onClick={scrollToBooking} className="text-sm font-medium text-teal-700 hover:text-teal-800">
              Select
            </button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section ref={services.ref} className="max-w-6xl mx-auto px-6 py-16">
        <div
          className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-5 transition-all duration-700 ${
            services.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {SERVICES.map((s) => (
            <div key={s.name} className="p-6 rounded-2xl bg-white border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center mb-4">
                <s.icon className="w-5 h-5 text-teal-700" />
              </div>
              <h3 className="font-semibold mb-1">{s.name}</h3>
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {s.duration}
                </span>
                <span className="font-medium text-slate-700">{s.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-center">Our providers</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {TEAM.map((member) => (
            <div key={member.name} className="text-center p-6 rounded-2xl bg-white border border-slate-100">
              <div className={`w-16 h-16 rounded-full ${member.color} text-white flex items-center justify-center text-lg font-semibold mx-auto mb-4`}>
                {member.initials}
              </div>
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-slate-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Booking widget — the interactive centerpiece */}
      <section ref={bookingRef} className="max-w-2xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">Book an appointment</h2>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-8">
            {['Service', 'Time', 'Confirm'].map((label, i) => (
              <React.Fragment key={label}>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${
                      confirmed || i < step
                        ? 'bg-teal-600 text-white'
                        : i === step
                        ? 'bg-teal-100 text-teal-700 border-2 border-teal-600'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {confirmed || i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
                  </div>
                  <span className={`text-xs ${i === step && !confirmed ? 'text-slate-900 font-medium' : 'text-slate-400'}`}>{label}</span>
                </div>
                {i < 2 && <div className="flex-1 h-px bg-slate-200" />}
              </React.Fragment>
            ))}
          </div>

          {confirmed ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4">
                <Check className="w-7 h-7 text-teal-700" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Appointment requested</h3>
              <p className="text-sm text-slate-500 mb-6">
                {selectedService} · {days[selectedDay].toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })} at {selectedSlot}
              </p>
              <button onClick={resetBooking} className="text-sm font-medium text-teal-700 hover:text-teal-800">
                Book another appointment
              </button>
            </div>
          ) : (
            <>
              {step === 0 && (
                <div className="grid sm:grid-cols-2 gap-3">
                  {SERVICES.map((s) => (
                    <button
                      key={s.name}
                      onClick={() => setSelectedService(s.name)}
                      className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-colors ${
                        selectedService === s.name ? 'border-teal-600 bg-teal-50' : 'border-slate-200 hover:border-teal-300'
                      }`}
                    >
                      <s.icon className="w-5 h-5 text-teal-700 shrink-0" />
                      <div>
                        <div className="text-sm font-medium">{s.name}</div>
                        <div className="text-xs text-slate-500">{s.duration} · {s.price}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {step === 1 && (
                <div>
                  <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
                    {days.map((d, i) => (
                      <button
                        key={d.toISOString()}
                        onClick={() => {
                          setSelectedDay(i);
                          setSelectedSlot(null);
                        }}
                        className={`shrink-0 w-16 py-3 rounded-xl border text-center transition-colors ${
                          selectedDay === i ? 'border-teal-600 bg-teal-50' : 'border-slate-200 hover:border-teal-300'
                        }`}
                      >
                        <div className="text-[11px] text-slate-500">{d.toLocaleDateString(undefined, { weekday: 'short' })}</div>
                        <div className="text-sm font-medium">{d.getDate()}</div>
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2.5 rounded-lg border text-sm transition-colors ${
                          selectedSlot === slot ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-200 hover:border-teal-300'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-3">
                  <div className="flex justify-between p-3 rounded-lg bg-slate-50 text-sm">
                    <span className="text-slate-500">Service</span>
                    <span className="font-medium">{selectedService}</span>
                  </div>
                  <div className="flex justify-between p-3 rounded-lg bg-slate-50 text-sm">
                    <span className="text-slate-500">Date</span>
                    <span className="font-medium">
                      {days[selectedDay].toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex justify-between p-3 rounded-lg bg-slate-50 text-sm">
                    <span className="text-slate-500">Time</span>
                    <span className="font-medium">{selectedSlot}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mt-8">
                <button
                  onClick={() => setStep(Math.max(0, step - 1))}
                  disabled={step === 0}
                  className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 disabled:opacity-0 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  onClick={goNext}
                  disabled={!canAdvance}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 disabled:opacity-40 disabled:hover:bg-teal-600 transition-colors"
                >
                  {step === 2 ? 'Confirm Booking' : 'Continue'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">Frequently asked questions</h2>
        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const open = openFaq === i;
            return (
              <div key={faq.q} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                <button
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-medium text-sm">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
                </button>
                {open && <p className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">{faq.a}</p>}
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-teal-600 flex items-center justify-center">
              <HeartPulse className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold">Everwell Clinic</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5" />
              (555) 013-2947
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              412 Willow St, Maple Ridge
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ClinicWellnessDemo;
