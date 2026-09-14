import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/auth-context'
import { Prediction } from '@/lib/types'
import { SIGNAL_LABELS, SIGNAL_COLORS, formatPct, formatEdge } from '@/lib/signal-display'

export default function Dashboard() {
  const { user } = useAuth()
  const [predictions, setPredictions] = useState<Prediction[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    supabase
      .from('predictions')
      .select('*, match:matches(*, home_team:teams!matches_home_team_id_fkey(*), away_team:teams!matches_away_team_id_fkey(*), league:leagues(*))')
      .order('published_at', { ascending: false })
      .limit(10)
      .then(({ data, error }) => {
        if (!active) return
        if (error) setError(error.message)
        else setPredictions(data as unknown as Prediction[])
      })
    return () => { active = false }
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
      <p className="text-white/50 text-sm mb-6">
        Welcome back{user?.email ? `, ${user.email}` : ''}. Here's today's intelligence.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div className="card">
          <p className="text-white/50 text-xs mb-1">Today's matches</p>
          <p className="text-2xl font-bold">{predictions === null ? '—' : new Set(predictions.map(p => p.match_id)).size}</p>
        </div>
        <div className="card">
          <p className="text-white/50 text-xs mb-1">Active signals</p>
          <p className="text-2xl font-bold">{predictions?.filter(p => p.status === 'VALUE_SIGNAL').length ?? '—'}</p>
        </div>
        <div className="card">
          <p className="text-white/50 text-xs mb-1">Model version</p>
          <p className="text-2xl font-bold font-mono">{predictions?.[0]?.model_version ?? '—'}</p>
        </div>
      </div>

      <h2 className="font-semibold mb-3">Recent intelligence</h2>

      {error && <div className="card text-signal-red text-sm">Could not load intelligence: {error}</div>}

      {predictions === null && !error && (
        <div className="card text-white/50 text-sm">Loading intelligence…</div>
      )}

      {predictions?.length === 0 && (
        <div className="card text-white/50 text-sm">
          No signals yet. OddsBora publishes a signal only when there's enough evidence to support one —
          check back once a sports-data provider is connected and matches are synced.
        </div>
      )}

      <div className="space-y-3">
        {predictions?.map((p) => (
          <Link key={p.id} to={`/matches/${p.match_id}`} className="card block hover:border-signal-green/50 transition">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium text-sm">
                {p.match?.home_team?.name ?? 'Home'} vs {p.match?.away_team?.name ?? 'Away'}
                {p.is_demo && <span className="badge-warning ml-2">Demo</span>}
              </p>
              <span className={`text-xs font-semibold ${SIGNAL_COLORS[p.status]}`}>{SIGNAL_LABELS[p.status]}</span>
            </div>
            <div className="flex gap-4 text-xs text-white/50 font-mono">
              <span>Model {formatPct(p.model_probability)}</span>
              <span>Market {formatPct(p.market_probability)}</span>
              <span>Edge {formatEdge(p.edge)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}