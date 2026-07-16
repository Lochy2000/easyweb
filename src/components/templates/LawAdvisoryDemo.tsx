import React, { useRef, useState } from 'react';
import {
  ArrowRight,
  Building2,
  FileText,
  Gavel,
  Home,
  Mail,
  MapPin,
  Phone,
  Scale,
} from 'lucide-react';
import { useRevealOnScroll, useScrollNav } from './shared';

const PRACTICE_AREAS = [
  { icon: Building2, name: 'Corporate Law', description: 'Formation, governance, and complex commercial transactions.' },
  { icon: Gavel, name: 'Litigation', description: 'Aggressive, disciplined representation in and out of the courtroom.' },
  { icon: Home, name: 'Real Estate', description: 'Acquisitions, financing, and disputes across commercial property.' },
  { icon: FileText, name: 'Estate Planning', description: 'Wills, trusts, and succession strategy built for the long term.' },
];

const RESULTS = [
  { value: '$240M+', label: 'recovered for clients' },
  { value: '97%', label: 'success rate' },
  { value: '35 yrs', label: 'combined experience' },
  { value: '500+', label: 'cases won' },
];

const ATTORNEYS = [
  {
    initials: 'EA',
    name: 'Eleanor Ashcroft',
    title: 'Founding Partner',
    practice: 'Corporate Law, M&A',
    education: 'J.D., Yale Law School',
  },
  {
    initials: 'RV',
    name: 'Marcus Rowe',
    title: 'Partner, Litigation',
    practice: 'Commercial Litigation',
    education: 'J.D., Columbia Law School',
  },
  {
    initials: 'SN',
    name: 'Priya Nair',
    title: 'Senior Associate',
    practice: 'Real Estate, Estate Planning',
    education: 'J.D., NYU School of Law',
  },
];

const RECOGNITION = ['Chambers USA', 'Super Lawyers', 'Best Law Firms 2024', 'Benchmark Litigation'];

const LawAdvisoryDemo = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrolled = useScrollNav(scrollRef);
  const results = useRevealOnScroll<HTMLElement>();
  const [practiceArea, setPracticeArea] = useState(PRACTICE_AREAS[0].name);

  return (
    <div ref={scrollRef} className="h-full overflow-y-auto bg-[#faf8f4] text-stone-900 font-serif">
      {/* Nav */}
      <nav
        className={`sticky top-0 z-30 transition-all duration-300 ${
          isScrolled ? 'bg-[#faf8f4]/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <span className="text-sm md:text-base tracking-[0.2em] uppercase">Ashcroft &amp; Rowe</span>
          <div className="hidden md:flex items-center gap-8 text-sm font-sans text-stone-600">
            {['Practice Areas', 'Our Attorneys', 'Results'].map((link) => (
              <button key={link} className="hover:text-stone-900 transition-colors">
                {link}
              </button>
            ))}
          </div>
          <button className="px-5 py-2.5 text-sm font-sans tracking-wide border border-stone-900 hover:bg-stone-900 hover:text-white transition-colors">
            Schedule Consultation
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Scale className="absolute -right-16 -top-10 w-[420px] h-[420px] text-stone-900/[0.04] rotate-[8deg]" strokeWidth={0.75} />
        <div className="relative max-w-4xl mx-auto px-6 pt-24 pb-28 md:pt-32 md:pb-36 text-center">
          <span className="inline-block font-sans text-xs tracking-[0.25em] uppercase text-amber-700 mb-8">
            Est. 1994 — New York, NY
          </span>
          <h1 className="text-4xl md:text-6xl leading-[1.1] mb-8">
            Counsel that stands behind every decision
          </h1>
          <p className="font-sans text-stone-600 text-lg max-w-xl mx-auto mb-10">
            For three decades, Ashcroft &amp; Rowe has guided founders, families, and institutions
            through their most consequential legal moments.
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-3.5 font-sans text-sm tracking-wide bg-stone-900 text-white hover:bg-stone-800 transition-colors">
            Schedule a Consultation
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Practice areas */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-stone-200">
        <h2 className="text-3xl md:text-4xl text-center mb-14">Practice Areas</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-stone-200">
          {PRACTICE_AREAS.map((area) => (
            <button
              key={area.name}
              onMouseEnter={() => setPracticeArea(area.name)}
              className={`text-left bg-[#faf8f4] p-8 transition-colors ${practiceArea === area.name ? 'bg-white' : ''}`}
            >
              <area.icon className={`w-6 h-6 mb-5 transition-colors ${practiceArea === area.name ? 'text-amber-700' : 'text-stone-400'}`} />
              <h3 className="text-lg mb-2">{area.name}</h3>
              <p className="font-sans text-sm text-stone-500 leading-relaxed">{area.description}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Results strip */}
      <section ref={results.ref} className="bg-stone-900 text-white">
        <div
          className={`max-w-6xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-700 ${
            results.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {RESULTS.map((r) => (
            <div key={r.label} className="text-center">
              <div className="text-3xl md:text-4xl mb-2">{r.value}</div>
              <div className="font-sans text-xs uppercase tracking-[0.15em] text-stone-400">{r.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Attorneys — hover reveal, no JS state needed */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl text-center mb-14">Our Attorneys</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {ATTORNEYS.map((attorney) => (
            <div key={attorney.name} className="group relative h-80 overflow-hidden border border-stone-200 bg-white">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center transition-transform duration-500 group-hover:-translate-y-3">
                <div className="w-16 h-16 rounded-full bg-stone-900 text-white flex items-center justify-center text-lg mb-4">
                  {attorney.initials}
                </div>
                <h3 className="text-xl">{attorney.name}</h3>
                <p className="font-sans text-sm text-stone-500 mt-1">{attorney.title}</p>
              </div>
              <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-stone-900 text-white p-6">
                <p className="font-sans text-xs uppercase tracking-[0.15em] text-amber-500 mb-1">Practice</p>
                <p className="font-sans text-sm mb-3">{attorney.practice}</p>
                <p className="font-sans text-xs uppercase tracking-[0.15em] text-amber-500 mb-1">Education</p>
                <p className="font-sans text-sm">{attorney.education}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recognition */}
      <section className="border-y border-stone-200 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {RECOGNITION.map((name) => (
            <span key={name} className="italic text-stone-400 text-sm md:text-base">
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-14">
        <div>
          <h2 className="text-3xl md:text-4xl mb-6">Request a confidential consultation</h2>
          <p className="font-sans text-stone-600 mb-8 max-w-sm">
            Every engagement begins with a conversation. Tell us briefly about your matter and an
            attorney will follow up within one business day.
          </p>
          <div className="space-y-3 font-sans text-sm text-stone-600">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-700" />
              (212) 555-0148
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-700" />
              intake@ashcroftrowe.com
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-700" />
              425 Park Avenue, New York, NY
            </div>
          </div>
        </div>

        <form className="font-sans space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Full name"
            className="w-full px-4 py-3 border border-stone-300 bg-white text-sm focus:outline-none focus:border-stone-900"
          />
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 border border-stone-300 bg-white text-sm focus:outline-none focus:border-stone-900"
          />
          <select className="w-full px-4 py-3 border border-stone-300 bg-white text-sm focus:outline-none focus:border-stone-900">
            {PRACTICE_AREAS.map((area) => (
              <option key={area.name}>{area.name}</option>
            ))}
          </select>
          <textarea
            placeholder="Briefly describe your matter"
            rows={4}
            className="w-full px-4 py-3 border border-stone-300 bg-white text-sm focus:outline-none focus:border-stone-900"
          />
          <button className="w-full py-3.5 bg-stone-900 text-white text-sm tracking-wide hover:bg-stone-800 transition-colors">
            Submit Inquiry
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm tracking-[0.2em] uppercase">Ashcroft &amp; Rowe</span>
          <p className="font-sans text-xs text-stone-400 max-w-lg text-center md:text-right">
            Attorney advertising. Prior results do not guarantee a similar outcome. © {new Date().getFullYear()} Ashcroft &amp; Rowe LLP.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LawAdvisoryDemo;
