import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'

export default function Pricing() {
  const plans = [
    { name: 'Free', price: '$0', features: ['Limited daily intelligence', 'Basic match analysis', 'Basic probability'] },
    { name: 'Pro', price: 'TBD', features: ['Expanded intelligence', 'Advanced analysis', 'Historical performance', 'Advanced AI explanations', 'More markets & alerts'] },
  ]
  return (
    <div className="max-w-4xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-bold mb-2">Pricing</h1>
      <p className="text-white/60 mb-8">
        Pro pricing and billing are not yet active. Plan structure is shown for transparency.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {plans.map((p) => (
          <div key={p.name} className="card">
            <h3 className="font-semibold text-lg mb-1">{p.name}</h3>
            <p className="text-2xl font-bold mb-4">{p.price}</p>
            <ul className="space-y-2 mb-6">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                  <Check size={16} className="text-signal-green shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <Link to="/register" className="btn-secondary w-full text-center block">Get started</Link>
          </div>
        ))}
      </div>
      <p className="text-white/40 text-xs mt-6">
        Pro subscribers are not guaranteed better betting outcomes. Pricing does not affect model accuracy claims.
      </p>
    </div>
  )
}