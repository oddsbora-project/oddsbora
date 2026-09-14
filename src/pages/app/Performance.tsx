import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Prediction } from '@/lib/types'

export default function Performance() {
  const [predictions, setPredictions] = useState<Prediction[] | null>(null)

  useEffect(() => {
    let active = true
    supabase.from('predictions').select('*').then(({ data }) => { if (active) setPredictions(data as Prediction[]) })
    return () => { active = false }
  }, [])

  const settled = predictions?.filter((p) => p.settlement_result !== 'PENDING') ?? []
  const won = settled.filter((p) => p.settlement_result === 'WON').length
  const hitRate = settled.length > 0 ? Math.round((won / settled.length) * 100) : null

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-1">Model Performance</h1>
      <p className="text-white/50 text-sm mb-6">
        Full, unfiltered history. Losses are shown alongside wins — nothing is hidden.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="card"><p className="text-white/50 text-xs mb-1">Analyzed matches</p><p className="text-2xl font-bold">{predictions ? new Set(predictions.map(p => p.match_id)).size : '—'}</p></div>
        <div className="card"><p className="text-white/50 text-xs mb-1">Signals generated</p><p className="text-2xl font-bold">{predictions?.length ?? '—'}</p></div>
        <div className="card"><p className="text-white/50 text-xs mb-1">Signals settled</p><p className="text-2xl font-bold">{settled.length}</p></div>
        <div className="card"><p className="text-white/50 text-xs mb-1">Hit rate</p><p className="text-2xl font-bold">{hitRate !== null ? `${hitRate}%` : '—'}</p></div>
      </div>

      {predictions === null && <div className="card text-white/50 text-sm">Loading performance data…</div>}
      {predictions?.length === 0 && (
        <div className="card text-white/50 text-sm">
          No prediction history yet. Hit rate and calibration statistics require a meaningful settled sample size
          and will only be shown once that exists — not estimated in the meantime.
        </div>
      )}
      {settled.length > 0 && settled.length < 20 && (
        <div className="card text-signal-yellow text-xs">
          Sample size is small ({settled.length} settled signals). Treat hit rate as low-confidence until more data accumulates.
        </div>
      )}
    </div>
  )
}