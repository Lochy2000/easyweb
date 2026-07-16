import React, { useEffect, useRef, useState } from 'react';
import { Headphones, Mic2, Pause, Play, Radio, Rss, Youtube } from 'lucide-react';
import { useRevealOnScroll, useScrollNav } from './shared';

const EPISODES = [
  { number: '048', title: 'Building in public without burning out', guest: 'Dana Ferro', duration: '52:10' },
  { number: '047', title: 'What ten years of freelancing actually taught me', guest: 'Miles Okafor', duration: '41:34' },
  { number: '046', title: 'The economics of a one-person media company', guest: 'Renata Silva', duration: '58:02' },
  { number: '045', title: 'Design systems for teams that hate design systems', guest: 'Theo Bergman', duration: '46:48' },
  { number: '044', title: 'Why most rebrands fail in the first year', guest: 'Ines Callahan', duration: '39:57' },
];

const GUESTS = [
  { initials: 'DF', name: 'Dana Ferro', role: 'Founder, Northlight Studio' },
  { initials: 'MO', name: 'Miles Okafor', role: 'Independent Product Designer' },
  { initials: 'RS', name: 'Renata Silva', role: 'CEO, Marrow Media' },
];

const PLATFORMS = [
  { icon: Headphones, label: 'Spotify' },
  { icon: Mic2, label: 'Apple Podcasts' },
  { icon: Youtube, label: 'YouTube' },
  { icon: Rss, label: 'RSS Feed' },
];

const WAVEFORM = Array.from({ length: 44 }, (_, i) => 20 + Math.round(Math.abs(Math.sin(i * 0.7)) * 70));
const DURATION_SECONDS = 52 * 60 + 10;

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

const PodcastMediaDemo = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrolled = useScrollNav(scrollRef);
  const guests = useRevealOnScroll<HTMLElement>();

  const [nowPlaying, setNowPlaying] = useState(EPISODES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(134);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setElapsed((prev) => (prev + 1 >= DURATION_SECONDS ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const playEpisode = (episode: (typeof EPISODES)[number]) => {
    setNowPlaying(episode);
    setElapsed(0);
    setIsPlaying(true);
  };

  const progressPct = Math.min(100, (elapsed / DURATION_SECONDS) * 100);

  return (
    <div ref={scrollRef} className="h-full overflow-y-auto bg-[#0a0908] text-neutral-100">
      <style>{`
        @keyframes wf-pulse {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
      `}</style>

      {/* Nav */}
      <nav
        className={`sticky top-0 z-30 transition-all duration-300 ${
          isScrolled ? 'bg-[#0a0908]/95 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center">
              <Radio className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Wavelength</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-neutral-400">
            {['Episodes', 'Guests', 'About'].map((link) => (
              <button key={link} className="hover:text-white transition-colors">
                {link}
              </button>
            ))}
          </div>
          <button className="px-5 py-2.5 rounded-full bg-orange-600 text-white text-sm font-medium hover:bg-orange-700 transition-colors">
            Subscribe
          </button>
        </div>
      </nav>

      {/* Hero + now playing */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-14 text-center">
        <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-orange-400 mb-6">
          New episode every Thursday
        </span>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">Conversations worth your commute</h1>
        <p className="text-neutral-400 text-lg max-w-lg mx-auto mb-12">
          Long-form interviews with builders, designers, and founders about the work behind the work.
        </p>

        {/* Fake audio player — the interactive centerpiece */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8 text-left">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shrink-0">
              <Mic2 className="w-7 h-7 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-orange-400 mb-1">Episode {nowPlaying.number}</p>
              <h3 className="font-medium truncate">{nowPlaying.title}</h3>
              <p className="text-sm text-neutral-500 truncate">with {nowPlaying.guest}</p>
            </div>
          </div>

          {/* Waveform */}
          <div className="flex items-end gap-[3px] h-16 mb-4">
            {WAVEFORM.map((h, i) => {
              const played = (i / WAVEFORM.length) * 100 < progressPct;
              return (
                <div
                  key={i}
                  className={`flex-1 rounded-full ${played ? 'bg-orange-500' : 'bg-white/15'}`}
                  style={{
                    height: `${h}%`,
                    animation: isPlaying ? `wf-pulse ${0.6 + (i % 5) * 0.15}s ease-in-out infinite` : 'none',
                    animationDelay: `${(i % 7) * 0.08}s`,
                  }}
                />
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause episode' : 'Play episode'}
              className="w-11 h-11 rounded-full bg-white text-[#0a0908] flex items-center justify-center hover:bg-neutral-200 transition-colors shrink-0"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-orange-500 transition-all duration-1000 ease-linear" style={{ width: `${progressPct}%` }} />
            </div>
            <span className="text-xs text-neutral-500 tabular-nums w-24 text-right">
              {formatTime(elapsed)} / {formatTime(DURATION_SECONDS)}
            </span>
          </div>
        </div>
      </section>

      {/* Episode list */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold mb-8">Recent episodes</h2>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {EPISODES.map((episode) => {
            const active = episode.number === nowPlaying.number;
            return (
              <button
                key={episode.number}
                onClick={() => playEpisode(episode)}
                className="w-full flex items-center gap-5 py-5 text-left group"
              >
                <span className={`text-sm w-10 shrink-0 ${active ? 'text-orange-500' : 'text-neutral-600'}`}>{episode.number}</span>
                <div className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center shrink-0 group-hover:border-orange-500 transition-colors">
                  {active && isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`font-medium truncate ${active ? 'text-orange-400' : ''}`}>{episode.title}</p>
                  <p className="text-sm text-neutral-500 truncate">with {episode.guest}</p>
                </div>
                <span className="text-sm text-neutral-500 shrink-0">{episode.duration}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Guest highlights */}
      <section ref={guests.ref} className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold mb-10 text-center">Recent guests</h2>
        <div
          className={`grid sm:grid-cols-3 gap-6 transition-all duration-700 ${
            guests.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {GUESTS.map((guest) => (
            <div key={guest.name} className="text-center p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-red-600 text-white flex items-center justify-center text-sm font-semibold mx-auto mb-4">
                {guest.initials}
              </div>
              <h3 className="font-medium">{guest.name}</h3>
              <p className="text-sm text-neutral-500">{guest.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Subscribe platforms */}
      <section className="border-y border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-wrap items-center justify-center gap-4">
          {PLATFORMS.map((platform) => (
            <button
              key={platform.label}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-sm text-neutral-300 hover:border-orange-500 hover:text-white transition-colors"
            >
              <platform.icon className="w-4 h-4" />
              {platform.label}
            </button>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-orange-600 flex items-center justify-center">
              <Radio className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold">Wavelength</span>
          </div>
          <p className="text-sm text-neutral-500">© {new Date().getFullYear()} Wavelength Media. New episodes every Thursday.</p>
        </div>
      </footer>
    </div>
  );
};

export default PodcastMediaDemo;
