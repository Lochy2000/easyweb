import React, { useRef, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronRight,
  Play,
  PlugZap,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useRevealOnScroll, useScrollNav } from './shared';

const NAV_LINKS = ['Product', 'Pricing', 'Docs', 'Changelog'];

const FEATURE_TABS = [
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    title: 'Real-time analytics, zero setup',
    description:
      'Every event, funnel, and cohort tracked automatically the moment you install the SDK — no config files, no waiting on data engineering.',
    bars: [72, 45, 88, 60, 93, 38, 66],
  },
  {
    id: 'automation',
    label: 'Automation',
    icon: Zap,
    title: 'Workflows that run themselves',
    description:
      'Trigger onboarding sequences, alerts, and follow-ups from any event in your product — build once, and let Flowbase handle the rest.',
    bars: [30, 82, 55, 70, 40, 95, 62],
  },
  {
    id: 'integrations',
    label: 'Integrations',
    icon: PlugZap,
    title: 'Plays well with your stack',
    description:
      'Native two-way sync with the tools your team already lives in, plus a REST and GraphQL API for everything else.',
    bars: [58, 64, 77, 41, 85, 52, 90],
  },
  {
    id: 'security',
    label: 'Security',
    icon: ShieldCheck,
    title: 'SOC 2 Type II, built in',
    description:
      'Enterprise-grade encryption, granular role-based access, and audit logs on every plan — security is not an add-on here.',
    bars: [95, 88, 91, 97, 85, 93, 99],
  },
];

const LOGOS = ['Northwind', 'Vertex', 'Loopline', 'Halcyon', 'Ferrous', 'Quilt', 'Beacon', 'Marrow'];

const PLANS = [
  {
    name: 'Starter',
    monthly: 0,
    blurb: 'For solo builders kicking the tires.',
    features: ['Up to 3 team members', '10k tracked events / mo', 'Community support', '7-day data history'],
  },
  {
    name: 'Growth',
    monthly: 49,
    blurb: 'For teams shipping every week.',
    features: [
      'Up to 20 team members',
      '500k tracked events / mo',
      'Priority support',
      '1-year data history',
      'Workflow automations',
    ],
    highlight: true,
  },
  {
    name: 'Scale',
    monthly: 149,
    blurb: 'For orgs running on Flowbase.',
    features: [
      'Unlimited team members',
      'Unlimited tracked events',
      'Dedicated Slack channel',
      'Unlimited data history',
      'SSO & audit logs',
    ],
  },
];

const STATS = [
  { value: '12,400+', label: 'teams onboard' },
  { value: '99.98%', label: 'uptime last 12mo' },
  { value: '4.9/5', label: 'average review' },
  { value: '38%', label: 'faster releases' },
];

const SaaSLaunchpadDemo = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrolled = useScrollNav(scrollRef);
  const [activeTab, setActiveTab] = useState(FEATURE_TABS[0].id);
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const stats = useRevealOnScroll<HTMLElement>();
  const pricing = useRevealOnScroll<HTMLElement>();

  const activeFeature = FEATURE_TABS.find((tab) => tab.id === activeTab) ?? FEATURE_TABS[0];

  return (
    <div ref={scrollRef} className="h-full overflow-y-auto bg-[#0b0d17] text-slate-100">
      <style>{`
        @keyframes flowbase-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      {/* Nav */}
      <nav
        className={`sticky top-0 z-30 transition-all duration-300 ${
          isScrolled ? 'bg-[#0b0d17]/90 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-400 to-fuchsia-500" />
            <span className="text-lg font-semibold tracking-tight">Flowbase</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-300">
            {NAV_LINKS.map((link) => (
              <button key={link} className="hover:text-white transition-colors">
                {link}
              </button>
            ))}
          </div>
          <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#0b0d17] text-sm font-medium hover:bg-slate-200 transition-colors">
            Start Free
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 -left-20 w-[420px] h-[420px] rounded-full bg-violet-600/30 blur-[110px]" />
          <div className="absolute top-10 right-0 w-[380px] h-[380px] rounded-full bg-fuchsia-500/20 blur-[110px]" />
        </div>

        <div className="max-w-6xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-violet-300 mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Now with autonomous workflows
            </span>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] mb-6">
              The product analytics stack that ships with you
            </h1>
            <p className="text-slate-400 text-lg mb-8 max-w-md">
              Track, automate, and understand every part of your product — without stitching together six
              different tools.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium hover:opacity-90 transition-opacity">
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-slate-200 hover:bg-white/5 transition-colors">
                <Play className="w-4 h-4" />
                Watch Demo
              </button>
            </div>
          </div>

          {/* Fake product mockup — no imagery needed */}
          <div className="relative">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-3 w-24 rounded bg-white/10" />
                  <div className="h-6 w-16 rounded-full bg-violet-500/20 border border-violet-400/30" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="rounded-lg bg-white/[0.04] border border-white/10 p-3">
                      <div className="h-2 w-10 rounded bg-white/10 mb-2" />
                      <div className="h-4 w-14 rounded bg-white/20" />
                    </div>
                  ))}
                </div>
                <div className="rounded-lg bg-white/[0.04] border border-white/10 p-4 flex items-end gap-2 h-32">
                  {[40, 65, 30, 80, 55, 90, 45, 70].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-gradient-to-t from-violet-500/70 to-fuchsia-400/70"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos marquee — pure CSS keyframe, no animation library */}
      <section className="border-y border-white/10 py-8 overflow-hidden">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-slate-500 mb-6">Trusted by teams at</p>
        <div className="overflow-hidden">
          <div
            className="flex gap-16 whitespace-nowrap w-max"
            style={{ animation: 'flowbase-marquee 28s linear infinite' }}
          >
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <span key={`${logo}-${i}`} className="text-xl font-semibold text-slate-600">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Feature tabs */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">One platform, every workflow</h2>
          <p className="text-slate-400">Swap between the tools your team actually needs — everything lives in the same place.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FEATURE_TABS.map((tab) => {
            const Icon = tab.icon;
            const active = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                  active ? 'bg-white text-[#0b0d17]' : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-12">
          <div>
            <h3 className="text-2xl font-semibold mb-4">{activeFeature.title}</h3>
            <p className="text-slate-400 leading-relaxed">{activeFeature.description}</p>
          </div>
          <div className="rounded-xl bg-white/[0.04] border border-white/10 p-6 flex items-end gap-3 h-48">
            {activeFeature.bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-gradient-to-t from-violet-500 to-fuchsia-400 transition-all duration-500"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={stats.ref} className="border-y border-white/10 bg-white/[0.02]">
        <div
          className={`max-w-6xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-700 ${
            stats.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-semibold mb-1">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section ref={pricing.ref} className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">Simple pricing that scales with you</h2>
          <p className="text-slate-400">No seat traps, no usage surprises.</p>
        </div>

        <div className="flex items-center justify-center gap-3 mb-14">
          <span className={`text-sm ${billing === 'monthly' ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
          <button
            onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')}
            className="relative w-12 h-6 rounded-full bg-white/10 border border-white/15"
            aria-label="Toggle billing period"
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500 transition-transform duration-300 ${
                billing === 'yearly' ? 'translate-x-6' : ''
              }`}
            />
          </button>
          <span className={`text-sm ${billing === 'yearly' ? 'text-white' : 'text-slate-500'}`}>Yearly</span>
          <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
            2 months free
          </span>
        </div>

        <div
          className={`grid md:grid-cols-3 gap-6 transition-all duration-700 ${
            pricing.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {PLANS.map((plan) => {
            const price =
              plan.monthly === 0 ? 0 : billing === 'yearly' ? Math.round((plan.monthly * 10) / 12) : plan.monthly;
            return (
              <div
                key={plan.name}
                className={`rounded-2xl p-7 border ${
                  plan.highlight ? 'border-violet-400/40 bg-gradient-to-b from-violet-500/10 to-transparent' : 'border-white/10 bg-white/[0.02]'
                }`}
              >
                {plan.highlight && (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-400/30">
                    Most popular
                  </span>
                )}
                <h3 className="text-xl font-semibold mt-3">{plan.name}</h3>
                <p className="text-sm text-slate-500 mb-5">{plan.blurb}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-semibold">${price}</span>
                  <span className="text-slate-500 text-sm">/mo</span>
                </div>
                <ul className="space-y-2.5 mb-7">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-2.5 rounded-full text-sm font-medium transition-colors ${
                    plan.highlight ? 'bg-white text-[#0b0d17] hover:bg-slate-200' : 'bg-white/5 border border-white/15 text-white hover:bg-white/10'
                  }`}
                >
                  Get started
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-24 text-center">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 px-8 py-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">Ready to see it in your product?</h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">Set up takes about four minutes. No credit card required to start.</p>
          <button className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-[#0b0d17] font-medium hover:bg-slate-200 transition-colors mx-auto">
            Start Free Trial
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-400 to-fuchsia-500" />
            <span className="font-semibold">Flowbase</span>
          </div>
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} Flowbase, Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SaaSLaunchpadDemo;
