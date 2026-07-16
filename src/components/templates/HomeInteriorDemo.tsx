import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  GripVertical,
  Lightbulb,
  Palette,
  Ruler,
  Sofa,
  X,
} from 'lucide-react';
import { useRevealOnScroll, useScrollNav } from './shared';

const SERVICES = [
  { icon: Sofa, name: 'Full Renovation', description: 'Structural changes through to final styling, managed end to end.' },
  { icon: Palette, name: 'Furniture Curation', description: 'Sourced pieces that fit your space, budget, and how you actually live.' },
  { icon: Lightbulb, name: 'Color & Lighting', description: 'Palettes and fixtures that change how a room feels, not just looks.' },
  { icon: Ruler, name: 'Space Planning', description: 'Layouts that solve the awkward corners nobody else wants to touch.' },
];

const PROCESS = [
  { step: '01', title: 'Consultation', description: 'A walkthrough of your space, your habits, and what isn\'t working yet.' },
  { step: '02', title: 'Concept', description: 'Mood boards and a floor plan you can actually picture living in.' },
  { step: '03', title: 'Sourcing', description: 'Furniture, materials, and trades — vetted and scheduled.' },
  { step: '04', title: 'Install', description: 'We handle delivery day so the reveal is the only surprise.' },
];

const PROJECTS = [
  { title: 'Minimalist Loft', location: 'Brooklyn, NY', palette: ['#eae4d8', '#8a7968', '#2f2b26'], description: 'An open-plan conversion favoring raw materials and negative space.' },
  { title: 'Coastal Kitchen', location: 'Newport, RI', palette: ['#eef4f2', '#9cc7bd', '#2c4a45'], description: 'A full kitchen rebuild around natural light and sea-glass tones.' },
  { title: 'Warm Scandinavian', location: 'Portland, OR', palette: ['#f4ede3', '#d99a72', '#4a3b32'], description: 'Pale oak and warm terracotta, built for long grey winters.' },
  { title: 'Downtown Studio', location: 'Austin, TX', palette: ['#f2f0ea', '#c96f4a', '#26221e'], description: 'A 480 sq ft studio reworked with multi-use, fold-away furniture.' },
  { title: 'Garden Bungalow', location: 'Asheville, NC', palette: ['#eef2e6', '#7c9473', '#33362c'], description: 'Indoor-outdoor flow with a reading nook built into the bay window.' },
  { title: 'Hillside Retreat', location: 'Sonoma, CA', palette: ['#f1ece4', '#b08a63', '#3a332b'], description: 'Vaulted ceilings and a material palette pulled from the surrounding hills.' },
];

const RoomBefore = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    <rect width="400" height="300" fill="#e7e2d8" />
    <rect width="400" height="190" fill="#d8d2c4" />
    <rect y="190" width="400" height="110" fill="#c9c2b2" />
    <rect x="240" y="40" width="90" height="80" fill="#f1ede4" stroke="#b7ae9c" strokeWidth="4" />
    <rect x="30" y="200" width="120" height="60" fill="#9c9280" />
    <rect x="170" y="220" width="70" height="40" fill="#8a8270" />
    <rect x="260" y="210" width="50" height="50" fill="#a89f8c" />
    <rect x="330" y="230" width="40" height="30" fill="#8a8270" />
  </svg>
);

const RoomAfter = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    <rect width="400" height="300" fill="#fbf8f3" />
    <rect width="400" height="190" fill="#f4ede3" />
    <rect y="190" width="400" height="110" fill="#e6d9c8" />
    <rect x="240" y="40" width="90" height="80" fill="#ffffff" stroke="#d99a72" strokeWidth="4" />
    <rect x="30" y="215" width="130" height="45" rx="10" fill="#c96f4a" />
    <circle cx="200" cy="250" r="22" fill="#7c9473" />
    <rect x="255" y="220" width="60" height="40" rx="8" fill="#4a3b32" />
    <rect x="330" y="235" width="35" height="25" rx="6" fill="#d99a72" />
    <circle cx="90" cy="205" r="8" fill="#4a3b32" />
  </svg>
);

const HomeInteriorDemo = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrolled = useScrollNav(scrollRef);
  const gallery = useRevealOnScroll<HTMLElement>();

  // Before/after slider — hand-built with pointer events, no library
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const [sliderPos, setSliderPos] = useState(50);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = sliderContainerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    (e.target as Element).setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    draggingRef.current = false;
  };

  // Gallery lightbox — state-controlled, no library
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i === null ? i : (i + 1) % PROJECTS.length));
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i === null ? i : (i - 1 + PROJECTS.length) % PROJECTS.length));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex]);

  const activeProject = lightboxIndex !== null ? PROJECTS[lightboxIndex] : null;

  return (
    <div ref={scrollRef} className="h-full overflow-y-auto bg-[#fbf8f3] text-stone-900 relative">
      {/* Nav */}
      <nav
        className={`sticky top-0 z-30 transition-all duration-300 ${
          isScrolled ? 'bg-[#fbf8f3]/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <span className="text-lg font-semibold tracking-tight">Norr Studio</span>
          <div className="hidden md:flex items-center gap-8 text-sm text-stone-600">
            {['Projects', 'Services', 'Process'].map((link) => (
              <button key={link} className="hover:text-stone-900 transition-colors">
                {link}
              </button>
            ))}
          </div>
          <button className="px-5 py-2.5 rounded-full bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition-colors">
            Book a Consultation
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-16 pb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] mb-6">
          Spaces that finally feel finished
        </h1>
        <p className="text-stone-600 text-lg max-w-lg mx-auto mb-8">
          Norr Studio designs homes that hold up after the photos are taken — livable, considered,
          and unmistakably yours.
        </p>
        <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 text-white font-medium hover:bg-stone-800 transition-colors mx-auto">
          Book a Consultation
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* Before / after slider */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <p className="text-center text-sm text-stone-500 mb-4">Drag to see the transformation</p>
        <div
          ref={sliderContainerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          className="relative aspect-[4/3] rounded-2xl overflow-hidden select-none touch-none border border-stone-200 shadow-sm cursor-ew-resize"
        >
          <div className="absolute inset-0">
            <RoomAfter />
          </div>
          <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
            <RoomBefore />
          </div>

          <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 text-white text-xs">Before</span>
          <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 text-white text-xs">After</span>

          <div className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.1)]" style={{ left: `${sliderPos}%` }}>
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center">
              <GripVertical className="w-4 h-4 text-stone-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-stone-200">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((service) => (
            <div key={service.name} className="p-6 rounded-2xl bg-white border border-stone-200">
              <div className="w-11 h-11 rounded-xl bg-stone-100 flex items-center justify-center mb-4">
                <service.icon className="w-5 h-5 text-stone-700" />
              </div>
              <h3 className="font-semibold mb-1">{service.name}</h3>
              <p className="text-sm text-stone-500 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Project gallery with lightbox */}
      <section ref={gallery.ref} className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-center">Recent projects</h2>
        <div
          className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-700 ${
            gallery.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {PROJECTS.map((project, i) => (
            <button
              key={project.title}
              onClick={() => setLightboxIndex(i)}
              className="text-left rounded-2xl overflow-hidden border border-stone-200 bg-white hover:shadow-md transition-shadow group"
            >
              <div className="flex h-32">
                {project.palette.map((color, ci) => (
                  <div key={ci} className="flex-1 transition-transform duration-500 group-hover:scale-105" style={{ backgroundColor: color }} />
                ))}
              </div>
              <div className="p-4">
                <h3 className="font-medium">{project.title}</h3>
                <p className="text-sm text-stone-500">{project.location}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-stone-200">
        <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-center">How it works</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS.map((p) => (
            <div key={p.step}>
              <div className="text-sm text-stone-400 mb-2">{p.step}</div>
              <h3 className="font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-stone-600 leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-stone-200">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-semibold">Norr Studio</span>
          <p className="text-sm text-stone-500">© {new Date().getFullYear()} Norr Studio Interiors.</p>
        </div>
      </footer>

      {/* Lightbox */}
      {activeProject && (
        <div
          className="absolute inset-0 z-40 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            aria-label="Close"
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => (i === null ? i : (i - 1 + PROJECTS.length) % PROJECTS.length));
            }}
            aria-label="Previous project"
            className="absolute left-4 md:left-8 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="max-w-lg w-full rounded-2xl overflow-hidden bg-white" onClick={(e) => e.stopPropagation()}>
            <div className="flex h-56">
              {activeProject.palette.map((color, ci) => (
                <div key={ci} className="flex-1" style={{ backgroundColor: color }} />
              ))}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-1">{activeProject.title}</h3>
              <p className="text-sm text-stone-500 mb-3">{activeProject.location}</p>
              <p className="text-sm text-stone-600 leading-relaxed">{activeProject.description}</p>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => (i === null ? i : (i + 1) % PROJECTS.length));
            }}
            aria-label="Next project"
            className="absolute right-4 md:right-8 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeInteriorDemo;
