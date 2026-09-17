import { Link } from 'react-router-dom'
import { TrendingUp, Scale, ShieldCheck, BrainCircuit, ArrowRight } from 'lucide-react'
import HeroCarousel from '@/components/HeroCarousel'

// Tailwind safelist: bg-signal-green/10 border-signal-green/25 text-signal-green bg-sky-500/10 border-sky-500/25 text-sky-500 bg-signal-yellow/10 border-signal-yellow/25 text-signal-yellow bg-violet-500/10 border-violet-500/25 text-violet-500

const FEATURES = [
  { icon: BrainCircuit, title: 'Model probability', desc: 'A transparent probability estimate built from structured historical and form data.', accent: 'signal-green' },
  { icon: Scale, title: 'Model vs market', desc: 'See where the model and the market disagree, and by how much.', accent: 'sky-500' },
  { icon: ShieldCheck, title: 'Confidence & risk', desc: 'Two separate signals — how sure the model is, and how uncertain the situation is.', accent: 'signal-yellow' },
  { icon: TrendingUp, title: 'Historical performance', desc: 'Full prediction history, wins and losses included. Nothing hidden.', accent: 'violet-500' },
]

const QUICK_LINKS = [
  { icon: BrainCircuit, title: 'Signal Engine', subtitle: 'Model vs Market Analysis' },
  { icon: ShieldCheck, title: 'AI Analyst', subtitle: 'Plain-Language Explanations' },
  { icon: TrendingUp, title: 'Performance', subtitle: 'Full History, Wins & Losses' },
  { icon: Scale, title: 'Risk & Confidence', subtitle: 'Two Separate Signals' },
]

export default function Landing() {
  return (
    <div className="bg-white text-navy-950">
      {/* Intro band \u2014 dark, VTEC-style: eyebrow pill, stat bar, bold two-tone tagline, quick links */}
      <section className="bg-navy-950 text-white px-4 pt-10 pb-12 fade-up">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-signal-green font-mono text-[11px] tracking-[0.2em] uppercase mb-6 border border-signal-green/30 bg-signal-green/5 rounded-full px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-signal-green" />
            AI-Powered · Nairobi, Kenya
          </span>

          <div className="flex items-center justify-center gap-4 sm:gap-8 mb-8 font-mono">
            <div>
              <p className="text-signal-green text-2xl sm:text-3xl font-bold">5+</p>
              <p className="text-white/50 text-[10px] sm:text-xs uppercase tracking-wide">Sports Covered</p>
            </div>
            <div className="w-px h-8 bg-white/15" />
            <div>
              <p className="text-signal-green text-2xl sm:text-3xl font-bold">100%</p>
              <p className="text-white/50 text-[10px] sm:text-xs uppercase tracking-wide">Transparent Method</p>
            </div>
            <div className="w-px h-8 bg-white/15" />
            <div>
              <p className="text-signal-green text-2xl sm:text-3xl font-bold">2030</p>
              <p className="text-white/50 text-[10px] sm:text-xs uppercase tracking-wide">Vision Target</p>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-4">
            Clearer Insights.
            <br />
            <span className="text-signal-green">One Match At A Time.</span>
          </h1>

          <p className="text-white/70 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed mb-8">
            OddsBora is an AI-powered sports intelligence platform delivering transparent probability
            models, honest risk assessment, and model-vs-market analysis across the sports Kenya
            follows most. Built on real data, driven by integrity, designed for clearer decisions —
            never guaranteed outcomes.
          </p>

          <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto mb-8">
            {QUICK_LINKS.map(({ icon: Icon, title, subtitle }) => (
              <div
                key={title}
                className="flex items-start gap-3 text-left border border-signal-green/25 bg-signal-green/5 rounded-lg px-4 py-3"
              >
                <Icon className="text-signal-green shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="font-semibold text-sm">{title}</p>
                  <p className="text-white/50 text-xs">{subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/register" className="btn-primary inline-flex items-center justify-center gap-2">
              Explore Intelligence <ArrowRight size={16} />
            </Link>
            <Link
              to="/about"
              className="rounded-lg px-4 py-2.5 border border-white/20 text-white font-medium hover:bg-white/5 transition"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pt-10 pb-2">
        <HeroCarousel />
      </section>

      <section className="max-w-5xl mx-auto px-4 pt-12 pb-10 text-center fade-up">
        <p className="text-signal-green font-mono text-sm tracking-widest uppercase mb-3">
          AI-Powered Sports Intelligence
        </p>
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 font-display">
          OddsBora
        </h2>
        <p className="text-xl text-slate-700 mb-2">Read the odds. Know the risk.</p>
        <p className="text-slate-500 max-w-xl mx-auto mb-8">
          Turn sports data and market information into clearer probabilities, signals, and risk-aware decisions.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/register" className="btn-primary inline-flex items-center justify-center gap-2">
            Explore Intelligence <ArrowRight size={16} />
          </Link>
          <Link
            to="/how-it-works"
            className="rounded-lg px-4 py-2.5 border border-black/15 text-navy-950 font-medium hover:bg-black/5 transition"
          >
            See How It Works
          </Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-6">
        <div className="glass-panel-light p-5 sm:p-7">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
            <h2 className="font-semibold text-lg">Live Intelligence Preview</h2>
            <span className="badge-warning">Demo data</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 font-mono text-sm">
            <div className="glass-stat-light">
              <p className="text-slate-500 mb-1">Model probability</p>
              <p className="text-3xl text-signal-green font-bold">62%</p>
            </div>
            <div className="glass-stat-light">
              <p className="text-slate-500 mb-1">Market-implied probability</p>
              <p className="text-3xl font-bold">54%</p>
            </div>
            <div className="glass-stat-light">
              <p className="text-slate-500 mb-1">Estimated edge</p>
              <p className="text-3xl text-signal-green font-bold">+8 pts</p>
            </div>
            <div className="glass-stat-light">
              <p className="text-slate-500 mb-1">Confidence · Risk</p>
              <p className="text-xl font-bold">High · Moderate</p>
            </div>
          </div>
          <p className="text-slate-400 text-xs mt-5">
            An estimated edge reflects a model-vs-market probability difference. It is not a guarantee of outcome.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Built for analytical clarity</h2>
          <p className="text-slate-500 text-sm">Four principles, applied to every signal OddsBora publishes.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map(({ icon: Icon, title, desc, accent }, i) => (
            <div
              key={title}
              className="glass-card-light feature-card-in"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className={`feature-icon-wrap w-10 h-10 rounded-lg bg-${accent}/10 border border-${accent}/25 flex items-center justify-center mb-3`}>
                <Icon className={`text-${accent}`} size={20} />
              </div>
              <h3 className="font-semibold mb-1 text-navy-950">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="glass-panel-light p-8 text-center">
          <p className="text-xl md:text-2xl text-navy-950 mb-3 italic">
            "See what the model sees before you make a decision."
          </p>
          <div className="border-t border-black/10 w-16 mx-auto my-4" />
          <p className="text-slate-400 text-sm">
            OddsBora does not guarantee wins or profits. It is an analytics tool, not a bookmaker.
          </p>
        </div>
      </section>
    </div>
  )
}