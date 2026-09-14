export default function HowItWorks() {
  const steps = [
    { step: '1', title: 'Data', desc: 'Structured sports data: results, form, goals, league position, and more — never invented.' },
    { step: '2', title: 'Model', desc: 'A modular probability engine estimates the likelihood of match outcomes.' },
    { step: '3', title: 'Probability', desc: 'The model produces a probability, or reports that evidence is insufficient.' },
    { step: '4', title: 'Market Comparison', desc: 'Model probability is compared against the market-implied probability, adjusted for overround.' },
    { step: '5', title: 'Risk', desc: 'A separate risk assessment considers data quality, volatility, and uncertainty.' },
    { step: '6', title: 'Decision', desc: 'You see the full picture — probability, edge, confidence, and risk — and decide for yourself.' },
  ]
  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-bold mb-2">How OddsBora Works</h1>
      <p className="text-white/60 mb-8">Data → Model → Probability → Market Comparison → Risk → Decision</p>
      <div className="space-y-4">
        {steps.map((s) => (
          <div key={s.step} className="card flex gap-4">
            <div className="text-signal-green font-mono font-bold text-xl w-8">{s.step}</div>
            <div>
              <h3 className="font-semibold mb-1">{s.title}</h3>
              <p className="text-white/60 text-sm">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}