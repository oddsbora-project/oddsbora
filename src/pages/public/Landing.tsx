import { Link } from 'react-router-dom'
import { TrendingUp, Scale, ShieldCheck, BrainCircuit } from 'lucide-react'
import HeroCarousel from '@/components/HeroCarousel'

export default function Landing() {
  return (
    <div>
      <section className="max-w-5xl mx-auto px-4 pt-6 sm:pt-10">
        <HeroCarousel />
      </section>

      <section className="max-w-5xl mx-auto px-4 pt-10 pb-12 text-center">
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
          <Link to="/register" className="btn-primary">Explore Intelligence</Link>
          <Link to="/how-it-works" className="btn-secondary">See How It Works</Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="card">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h2 className="font-semibold">Live Intelligence Preview</h2>
            <span className="badge-warning">Demo data</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 font-mono text-sm">
            <div className="bg-navy-900 rounded-lg p-4 border border-navy-600">
              <p className="text-white/50 mb-1">Model probability</p>
              <p className="text-2xl text-signal-green font-bold">62%</p>
            </div>
            <div className="bg-navy-900 rounded-lg p-4 border border-navy-600">
              <p className="text-white/50 mb-1">Market-implied probability</p>
              <p className="text-2xl font-bold">54%</p>
            </div>
            <div className="bg-navy-900 rounded-lg p-4 border border-navy-600">
              <p className="text-white/50 mb-1">Estimated edge</p>
              <p className="text-2xl text-signal-green font-bold">+8 pts</p>
            </div>
            <div className="bg-navy-900 rounded-lg p-4 border border-navy-600">
              <p className="text-white/50 mb-1">Confidence · Risk</p>
              <p className="text-lg font-bold">High · Moderate</p>
            </div>
          </div>
          <p className="text-white/40 text-xs mt-4">
            An estimated edge reflects a model-vs-market probability difference. It is not a guarantee of outcome.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: BrainCircuit, title: 'Model probability', desc: 'A transparent probability estimate built from structured historical and form data.' },
          { icon: Scale, title: 'Model vs market', desc: 'See where the model and the market disagree, and by how much.' },
          { icon: ShieldCheck, title: 'Confidence & risk', desc: 'Two separate signals — how sure the model is, and how uncertain the situation is.' },
          { icon: TrendingUp, title: 'Historical performance', desc: 'Full prediction history, wins and losses included. Nothing hidden.' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="card">
            <Icon className="text-signal-green mb-3" size={22} />
            <h3 className="font-semibold mb-1">{title}</h3>
            <p className="text-white/60 text-sm">{desc}</p>
          </div>
        ))}
      </section>

      <section className="max-w-3xl mx-auto px-4 py-10 text-center">
        <p className="text-lg text-white/80 mb-2">
          "See what the model sees before you make a decision."
        </p>
        <p className="text-white/40 text-sm">
          OddsBora does not guarantee wins or profits. It is an analytics tool, not a bookmaker.
        </p>
      </section>
    </div>
  )
}