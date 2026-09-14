import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Prediction } from '@/lib/types'
import { SIGNAL_LABELS } from '@/lib/signal-display'

export default function AdminPredictions() {
  const [predictions, setPredictions] = useState<Prediction[] | null>(null)

  useEffect(() => {
    supabase.from('predictions').select('*').order('published_at', { ascending: false }).limit(50).then(({ data }) => setPredictions(data as Prediction[]))
  }, [])

  return (
    <div>
      <h1 className="text-xl font-bold mb-1">Prediction Management</h1>
      <p className="text-white/50 text-sm mb-4">
        Published predictions are immutable. Corrections go through <code className="text-white/70">prediction_corrections</code>, never a silent edit.
      </p>
      {predictions === null && <div className="card text-white/50 text-sm">Loading…</div>}
      {predictions?.length === 0 && <div className="card text-white/50 text-sm">No predictions published yet.</div>}
      <div className="space-y-2">
        {predictions?.map((p) => (
          <div key={p.id} className="card flex justify-between text-sm">
            <span className="font-mono text-xs">{p.market} · {p.model_version}</span>
            <span>{SIGNAL_LABELS[p.status]}</span>
            <span className="text-white/40 text-xs">{p.settlement_result}</span>
          </div>
        ))}
      </div>
    </div>
  )
}