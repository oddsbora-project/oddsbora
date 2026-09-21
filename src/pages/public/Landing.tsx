import { Link } from 'react-router-dom'
import { TrendingUp, Scale, ShieldCheck, BrainCircuit, ArrowRight } from 'lucide-react'
import HeroCarousel from '@/components/HeroCarousel'

const FEATURES = [
  { 
    icon: BrainCircuit, 
    title: 'Model probability', 
    desc: 'A transparent probability estimate built from structured historical and form data.', 
    iconBg: 'bg-signal-green/10 border-signal-green/20',
    iconText: 'text-signal-green',
    glowBg: 'from-signal-green/10',
    lineBg: 'bg-signal-green'
  },
  { 
    icon: Scale, 
    title: 'Model vs market', 
    desc: 'See where the model and the market disagree, and by how much.', 
    iconBg: 'bg-sky-500/10 border-sky-500/20',
    iconText: 'text-sky-500',
    glowBg: 'from-sky-500/10',
    lineBg: 'bg-sky-500'
  },
  { 
    icon: ShieldCheck, 
    title: 'Confidence & risk', 
    desc: 'Two separate signals — how sure the model is, and how uncertain the situation is.', 
    iconBg: 'bg-signal-yellow/10 border-signal-yellow/20',
    iconText: 'text-signal-yellow',
    glowBg: 'from-signal-yellow/10',
    lineBg: 'bg-signal-yellow'
  },
  { 
    icon: TrendingUp, 
    title: 'Historical performance', 
    desc: 'Full prediction history, wins and losses included. Nothing hidden.', 
    iconBg: 'bg-violet-500/10 border-violet-500/20',
    iconText: 'text-violet-500',
    glowBg: 'from-violet-500/10',
    lineBg: 'bg-violet-500'
  },
]

export default function Landing() {
  return (
    <div className="bg-white text-navy-950">
      {/* Intro text */}
      <section className="bg-white text-navy-950 px-4 pt-10 pb-8 fade-up">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-4 text-navy-950">
            Clearer Insights.
            <br />
            <span className="text-signal-green">One Match At A Time.</span>
          </h1>

          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            OddsBora is an AI-powered sports intelligence platform delivering transparent probability
            models, honest risk assessment, and model-vs-market analysis across the sports Kenya
            follows most. Built on real data, driven by integrity, designed for clearer decisions —
            never guaranteed outcomes.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pt-6 pb-2">
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

      {/* Modernized Feature Cards Section */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 font-display text-navy-950">Built for analytical clarity</h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto">Four principles, applied to every signal OddsBora publishes.</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map(({ icon: Icon, title, desc, iconBg, iconText, glowBg, lineBg }, i) => (
            <div
              key={title}
              className="group relative flex flex-col p-6 rounded-2xl bg-white border border-black/5 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] overflow-hidden"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {/* Spotlight Hover Overlay */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br ${glowBg} to-transparent pointer-events-none`} />
              
              {/* Icon Container with 3D Tilt */}
              <div className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${iconBg} transition-transform duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) group-hover:scale-110 group-hover:-rotate-6`}>
                <Icon className={`${iconText}`} size={22} strokeWidth={2.5} />
              </div>
              
              {/* Text Content */}
              <h3 className="relative z-10 text-lg font-bold text-navy-950 mb-2 tracking-tight group-hover:text-navy-900 transition-colors duration-300">
                {title}
              </h3>
              <p className="relative z-10 text-slate-500 leading-relaxed text-sm group-hover:text-slate-600 transition-colors duration-300">
                {desc}
              </p>

              {/* Expanding Bottom Accent Line */}
              <div className={`absolute bottom-0 left-0 h-[3px] w-0 transition-all duration-500 ease-out group-hover:w-full ${lineBg}`} />
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