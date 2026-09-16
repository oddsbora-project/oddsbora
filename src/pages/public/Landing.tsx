import { Link } from 'react-router-dom'
import { TrendingUp, Scale, ShieldCheck, BrainCircuit, ArrowRight } from 'lucide-react'
import HeroCarousel from '@/components/HeroCarousel'

export default function Landing() {
  return (
    <div>
      <section className="max-w-5xl mx-auto px-4 pt-6 sm:pt-10">
        <HeroCarousel />
      </section>

      <section className="max-w-5xl mx-auto px-4 pt-12 pb-10 text-center fade-up">
        <p className="text-signal-green font-mono text-sm tracking-widest uppercase mb-3">
          AI-Powered Sports Intelligence
        </p>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
          OddsBora
        </h1>
        <p className="text-xl text-white/80 mb-2">Read the odds. Know the risk.</p>
        <p className="text-white/60 max-w-xl mx-auto mb-8">
          Turn sports data and market information into clearer probabilities, signals, and risk-aware decisions.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/register" className="btn-primary inline-flex items-center justify-center gap-2">
            Explore Intelligence <ArrowRight size={16} />
          </Link>
          <Link to="/how-it-works" className="btn-secondary">See How It Works</Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-6">
        <div className="glass-panel p-5 sm:p-7">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
            <h2 className="font-semibold text-lg">Live Intelligence Preview</h2>
            <span className="badge-warning">Demo data</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 font-mono text-sm">
            <div className="glass-stat">
              <p className="text-white/50 mb-1">Model probability</p>
              <p className="text-3xl text-signal-green font-bold">62%</p>
            </div>
            <div className="glass-stat">
              <p className="text-white/50 mb-1">Market-implied probability</p>
              <p className="text-3xl font-bold">54%</p>
            </div>
            <div className="glass-stat">
              <p className="text-white/50 mb-1">Estimated edge</p>
              <p className="text-3xl text-signal-green font-bold">+8 pts</p>
            </div>
            <div className="glass-stat">
              <p className="text-white/50 mb-1">Confidence · Risk</p>
              <p className="text-xl font-bold">High · Moderate</p>
            </div>
          </div>
          <p className="text-white/40 text-xs mt-5">
            An estimated edge reflects a model-vs-market probability difference. It is not a guarantee of outcome.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Built for analytical clarity</h2>
          <p className="text-white/50 text-sm">Four principles, applied to every signal OddsBora publishes.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: BrainCircuit, title: 'Model probability', desc: 'A transparent probability estimate built from structured historical and form data.' },
            { icon: Scale, title: 'Model vs market', desc: 'See where the model and the market disagree, and by how much.' },
            { icon: ShieldCheck, title: 'Confidence & risk', desc: 'Two separate signals — how sure the model is, and how uncertain the situation is.' },
            { icon: TrendingUp, title: 'Historical performance', desc: 'Full prediction history, wins and losses included. Nothing hidden.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass-card">
              <div className="w-10 h-10 rounded-lg bg-signal-green/10 border border-signal-green/20 flex items-center justify-center mb-3">
                <Icon className="text-signal-green" size={20} />
              </div>
              <h3 className="font-semibold mb-1">{title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="glass-panel p-8 text-center">
          <p className="text-xl md:text-2xl text-white/90 mb-3 italic">
            "See what the model sees before you make a decision."
          </p>
          <div className="glass-divider w-16 mx-auto my-4" />
          <p className="text-white/40 text-sm">
            OddsBora does not guarantee wins or profits. It is an analytics tool, not a bookmaker.
          </p>
        </div>
      </section>
    </div>
  )
}