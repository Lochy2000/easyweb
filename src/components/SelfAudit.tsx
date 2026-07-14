import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useBooking } from '@/lib/booking-context';

interface Pain {
  value: string;
  title: string;
  desc: string;
}

interface Target {
  value: string;
  title: string;
  desc: string;
}

interface AuditResult {
  title: string;
  desc: string;
  strategy: string;
  timeline: string;
}

const PAINS: Pain[] = [
  { value: 'spreadsheets', title: 'Spreadsheet overload', desc: 'Client records and workflows run out of manual spreadsheets.' },
  { value: 'basic-site', title: 'Outgrown website', desc: 'Our site is slow, fragile, or disconnected from our other systems.' },
  { value: 'disconnected', title: 'Disconnected tools', desc: "Booking, CRM and billing tools don't talk to each other." },
  { value: 'no-tech-lead', title: 'No technical lead', desc: 'No one in-house to safely migrate data or fix server issues.' },
];

const TARGETS: Target[] = [
  { value: 'portal', title: 'Bespoke web app / portal', desc: 'A secure environment where customers manage files, invoices, or data.' },
  { value: 'database', title: 'Database restructure', desc: 'Replace spreadsheet clutter with a relational model that supports reporting.' },
  { value: 'automation', title: 'End-to-end automation', desc: 'Route sales and operations through centralised, automatic pipelines.' },
  { value: 'ongoing', title: 'Ongoing support', desc: 'Keep architecture stable with regular monitoring and patches.' },
];

const AUDIT_RESULTS: Record<string, AuditResult> = {
  portal: {
    title: 'Bespoke client portal & database setup',
    desc: 'We replace manual updates with a secure, branded interface linked to a proper database.',
    strategy: 'Audit manual entry points, design a structure that matches how your team actually works.',
    timeline: '6 weeks, full build & handover',
  },
  database: {
    title: 'Relational database migration',
    desc: 'We move your data out of spreadsheets and into a proper database built to support reporting and growth.',
    strategy: 'Clean existing data, define schema, automate backups.',
    timeline: '4 weeks, structured migration',
  },
  automation: {
    title: 'Integration & automation pipeline',
    desc: "We connect your disconnected tools so data updates once and flows everywhere it's needed.",
    strategy: 'Map current data flows, remove manual duplication.',
    timeline: '3–5 weeks, integration launch',
  },
  ongoing: {
    title: 'Architecture audit & ongoing support',
    desc: 'We optimise what you have and provide continuous technical support.',
    strategy: 'Vulnerability audit, monitoring setup, direct support line.',
    timeline: 'Ongoing monthly engagement',
  },
};

const STEP_LABELS = ['1. Setup', '2. Desired fix', '3. Recommendation'];
const STEP_NAMES = ['Setup', 'Desired fix', 'Recommendation'];
const HERO_GIF = '/assets/images/hero-gif.gif';
const STAR_COUNT = 45;

const SelfAudit = () => {
  const [step, setStep] = useState(1);
  const [pains, setPains] = useState<string[]>([]);
  const [target, setTarget] = useState('portal');
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

  const togglePain = (value: string) => {
    setPains((prev) => (prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value]));
  };

  const result = AUDIT_RESULTS[target];

  const handleBook = () => {
    const painTitles = PAINS.filter((p) => pains.includes(p.value)).map((p) => p.title).join(', ') || 'not specified';
    openBooking({
      notes: `Ran the self-audit — reported: ${painTitles}. Looking for: ${result.title}.`,
    });
  };

  return (
    <section
      id="audit"
      className="relative w-full min-h-screen -mt-px overflow-hidden bg-[#0a0b28] flex items-center py-16 px-5 md:py-[110px] md:px-10"
    >
      {/* Bleed of the hero-gif behind the frame, dimmed slightly so it reads as one continuous scene with the hero above */}
      <img
        src={HERO_GIF}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.85) saturate(0.95)' }}
      />
      {/* Long, soft taper (aurora-like) instead of a hard-edged fade — avoids a
          visible seam where the hero's gradient sky meets this section's photo. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg,#9d6fd8 0%,rgba(157,111,216,0.88) 8%,rgba(157,111,216,0.6) 20%,rgba(157,111,216,0.32) 38%,rgba(157,111,216,0.14) 58%,rgba(157,111,216,0.04) 78%,transparent 92%)',
        }}
      />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-ew-star-pulse"
            style={{ left: star.left, top: star.top, width: star.size, height: star.size, opacity: star.opacity, animationDelay: star.delay }}
          />
        ))}
      </div>

      {/* Device frame: a white-bordered window onto a crisp copy of the same gif */}
      <div className="relative w-full max-w-[1080px] mx-auto min-h-[480px] rounded-[28px] border-[10px] border-white shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col items-center justify-center p-6 md:p-10">
        <img src={HERO_GIF} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[rgba(10,11,40,0.08)]" />

        <div className="relative text-center max-w-[560px] mx-auto mb-5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#c7cef2]">Self-audit</span>
          <h2 className="font-serif font-medium text-[28px] text-white mt-2.5 mb-2.5 tracking-[-0.01em]">
            Run a quick system review
          </h2>
          <p className="text-[13.5px] text-white/85">
            Tell us what's broken and what you want fixed — we'll recommend a starting point.
          </p>
        </div>

        <div className="relative w-full max-w-[740px] self-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-paper-raised rounded-2xl p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
          >
            {/* Desktop/tablet: full 3-label row */}
            <div className="hidden sm:flex justify-between border-b border-line pb-4 mb-5 text-[10.5px] font-semibold uppercase tracking-[0.03em]">
              {STEP_LABELS.map((label, i) => (
                <span
                  key={label}
                  className={`pb-2 border-b-2 ${
                    step === i + 1 ? 'border-ew-accent text-ew-accent' : 'border-transparent text-ink-faint'
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Mobile: current step only, plus a progress bar */}
            <div className="sm:hidden border-b border-line pb-3 mb-5">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.03em] text-ew-accent mb-2">
                Step {step} of {STEP_NAMES.length} — {STEP_NAMES[step - 1]}
              </p>
              <div className="flex gap-1.5">
                {STEP_NAMES.map((name, i) => (
                  <span
                    key={name}
                    className={`h-1 flex-1 rounded-full ${i < step ? 'bg-ew-accent' : 'bg-line'}`}
                  />
                ))}
              </div>
            </div>

            {step === 1 && (
              <div>
                <h4 className="font-serif font-medium text-base text-ink mb-3.5">Where are things currently broken?</h4>
                <div className="grid gap-2.5">
                  {PAINS.map((pain) => (
                    <label
                      key={pain.value}
                      className="flex items-start gap-2.5 p-3.5 rounded-xl bg-paper-raised border border-line cursor-pointer transition-colors has-[:checked]:bg-ew-accent-soft has-[:checked]:border-[#c7cef2] hover:border-[#c7cef2]"
                    >
                      <input
                        type="checkbox"
                        className="mt-0.5 w-4 h-4 accent-ew-accent shrink-0"
                        checked={pains.includes(pain.value)}
                        onChange={() => togglePain(pain.value)}
                      />
                      <div>
                        <p className="text-[13px] font-semibold text-ink mb-0.5">{pain.title}</p>
                        <p className="text-xs text-ink-soft leading-snug">{pain.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="flex justify-end mt-5">
                  <button
                    onClick={() => setStep(2)}
                    className="rounded-full bg-ew-accent text-white text-[13px] font-semibold px-6 py-2.5 hover:bg-ew-accent-ink transition-colors"
                  >
                    Next: desired fix →
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h4 className="font-serif font-medium text-base text-ink mb-3.5">What should we build or fix for you?</h4>
                <div className="grid gap-2.5">
                  {TARGETS.map((t) => (
                    <label
                      key={t.value}
                      className="flex items-start gap-2.5 p-3.5 rounded-xl bg-paper-raised border border-line cursor-pointer transition-colors has-[:checked]:bg-ew-accent-soft has-[:checked]:border-[#c7cef2] hover:border-[#c7cef2]"
                    >
                      <input
                        type="radio"
                        name="ew-target"
                        className="mt-0.5 w-4 h-4 accent-ew-accent shrink-0"
                        checked={target === t.value}
                        onChange={() => setTarget(t.value)}
                      />
                      <div>
                        <p className="text-[13px] font-semibold text-ink mb-0.5">{t.title}</p>
                        <p className="text-xs text-ink-soft leading-snug">{t.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-3 mt-5">
                  <button onClick={() => setStep(1)} className="text-ink-soft font-semibold text-[13px] hover:text-ink">
                    ← Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="w-full sm:w-auto rounded-full bg-ew-accent text-white text-[13px] font-semibold px-6 py-2.5 hover:bg-ew-accent-ink transition-colors"
                  >
                    Get recommendation →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <div className="bg-ew-accent-soft border border-[#d8ddf5] rounded-2xl p-5 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.05em] text-ew-accent">
                    Recommended starting point
                  </span>
                  <h5 className="font-serif font-medium text-lg text-ink mt-2.5 mb-2">{result.title}</h5>
                  <p className="text-[13px] leading-relaxed text-ink-soft mb-3.5">{result.desc}</p>
                  <div className="grid gap-2.5 border-t border-[#d8ddf5] pt-3 text-xs">
                    <div>
                      <p className="text-ink-faint uppercase text-[10px] tracking-[0.04em] font-semibold mb-1">
                        Review strategy
                      </p>
                      <p className="text-ink">{result.strategy}</p>
                    </div>
                    <div>
                      <p className="text-ink-faint uppercase text-[10px] tracking-[0.04em] font-semibold mb-1">
                        Typical timeline
                      </p>
                      <p className="text-ink">{result.timeline}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-3">
                  <button onClick={() => setStep(2)} className="text-ink-soft font-semibold text-[13px] hover:text-ink">
                    ← Reset selection
                  </button>
                  <button
                    onClick={handleBook}
                    className="w-full sm:w-auto rounded-full bg-ew-accent text-white text-[13px] font-semibold px-6 py-3 hover:bg-ew-accent-ink transition-colors"
                  >
                    Book discovery call with these details
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade: blends this section's dark bleed image into the paper background below */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg,transparent 72%,rgba(251,250,247,0.75) 90%,#fbfaf7 100%)' }}
      />
    </section>
  );
};

export default SelfAudit;
