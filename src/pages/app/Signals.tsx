import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Prediction, SignalStatus } from '@/lib/types'
import { SIGNAL_LABELS, SIGNAL_COLORS, formatPct, formatEdge } from '@/lib/signal-display'

const FILTERS: (SignalStatus | 'ALL')[] = ['ALL', 'VALUE_SIGNAL', 'NEUTRAL', 'NO_EDGE', 'WAIT', 'HIGH_RISK']

export default function Signals() {
  const [predictions, setPredictions] = useState<Prediction[] | null>(null)
  const [filter, setFilter] = useState<SignalStatus | 'ALL'>('ALL')

  useEffect(() => {
    let active = true
    supabase
      .from('predictions')
      .select('*, match:matches(*, home_team:teams!matches_home_team_id_fkey(*), away_team:teams!matches_away_team_id_fkey(*))')
      .order('published_at', { ascending: false })
      .then(({ data }) => { if (active) setPredictions(data as unknown as Prediction[]) })
    return () => { active = false }
  }, [])

  const filtered = predictions?.filter((p) => filter === 'ALL' || p.status === filter)

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Signals</h1>
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {FILTERS.map((f) => (
          <button
            key={f} onClick={() => setFilter(f)}
            className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap border ${filter === f ? 'bg-signal-green text-navy-950 border-signal-green' : 'border-navy-600 text-white/60'}`}
          >
            {f === 'ALL' ? 'All' : SIGNAL_LABELS[f]}
          </button>
        ))}
      </div>

      {predictions === null && <div className="card text-white/50 text-sm">Loading signals…</div>}
      {predictions?.length === 0 && <div className="card text-white/50 text-sm">No signals published yet.</div>}
      {filtered?.length === 0 && predictions && predictions.length > 0 && (
        <div className="card text-white/50 text-sm">No signals match this filter.</div>
      )}

      <div className="space-y-3">
        {filtered?.map((p) => (
          <Link key={p.id} to={`/matches/${p.match_id}`} className="card block hover:border-signal-green/50 transition">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">{p.match?.home_team?.name} vs {p.match?.away_team?.name}</p>
              <span className={`text-xs font-semibold ${SIGNAL_COLORS[p.status]}`}>{SIGNAL_LABELS[p.status]}</span>
            </div>
            <div className="flex gap-4 text-xs text-white/50 font-mono">
              <span>Model {formatPct(p.model_probability)}</span>
              <span>Edge {formatEdge(p.edge)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}