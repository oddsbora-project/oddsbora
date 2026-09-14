export default function Features() {
  const features = [
    { title: 'Signal Engine', desc: 'Every signal shows match, market, odds, model vs market probability, edge, confidence, risk, and data freshness.' },
    { title: 'NO EDGE Logic', desc: 'The model is allowed to say "no reliable signal" — it never fabricates a prediction when evidence is weak.' },
    { title: 'AI Analyst', desc: 'Plain-language explanations of the data and model, including what information is missing.' },
    { title: 'Performance Tracking', desc: 'Immutable, auditable prediction history — including losses.' },
    { title: 'Risk vs Confidence', desc: 'Two distinct, independently calculated dimensions — never conflated.' },
    { title: 'Data Transparency', desc: 'Model version and data freshness are shown on every signal.' },
  ]
  return (
    <div className="max-w-5xl mx-auto px-4 py-14">
      <h1 className="text-3xl font-bold mb-8">Features</h1>
      <div className="grid sm:grid-cols-2 gap-4">
        {features.map((f) => (
          <div key={f.title} className="card">
            <h3 className="font-semibold mb-1">{f.title}</h3>
            <p className="text-white/60 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}