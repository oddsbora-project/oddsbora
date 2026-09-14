import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Match, Prediction } from '@/lib/types'
import { SIGNAL_LABELS, SIGNAL_COLORS, RISK_COLORS, CONFIDENCE_COLORS, formatPct, formatEdge } from '@/lib/signal-display'

export default function MatchDetail() {
  const { id } = useParams()
  const [match, setMatch] = useState<Match | null | undefined>(undefined)
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    let active = true

    supabase
      .from('matches')
      .select('*, home_team:teams!matches_home_team_id_fkey(*), away_team:teams!matches_away_team_id_fkey(*), league:leagues(*)')
      .eq('id', id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!active) return
        if (error) setError(error.message)
        setMatch(data as unknown as Match | null)
      })

    supabase
      .from('predictions')
      .select('*')
      .eq('match_id', id)
      .order('published_at', { ascending: false })
      .then(({ data }) => {
        if (active && data) setPredictions(data as Prediction[])
      })

    return () => { active = false }
  }, [id])

  if (error) return <div className="max-w-3xl mx-auto px-4 py-6"><div className="card text-signal-red text-sm">{error}</div></div>
  if (match === undefined) return <div className="max-w-3xl mx-auto px-4 py-6"><div className="card text-white/50 text-sm">Loading match…</div></div>
  if (match === null) return <div className="max-w-3xl mx-auto px-4 py-6"><div className="card text-white/50 text-sm">Match not found.</div></div>

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <p className="text-xs text-white/40 mb-1">{match.league?.name}</p>
      <h1 className="text-xl font-bold mb-1">{match.home_team?.name} vs {match.away_team?.name}</h1>
      <p className="text-white/50 text-sm mb-6">{new Date(match.kickoff_at).toLocaleString()} · {match.status}</p>

      <h2 className="font-semibold mb-3">Signals</h2>
      {predictions.length === 0 && (
        <div className="card text-white/50 text-sm">
          No signal published for this match. That may mean evidence doesn't yet support one (No Edge / Insufficient Data),
          not that the outcome is unknowable.
        </div>
      )}
      <div className="space-y-3">
        {predictions.map((p) => (
          <div key={p.id} className="card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-white/40 font-mono">{p.market}</span>
              <span className={`text-xs font-semibold ${SIGNAL_COLORS[p.status]}`}>{SIGNAL_LABELS[p.status]}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm font-mono mb-3">
              <div><p className="text-white/40 text-xs">Model probability</p><p className="font-bold">{formatPct(p.model_probability)}</p></div>
              <div><p className="text-white/40 text-xs">Market probability</p><p className="font-bold">{formatPct(p.market_probability)}</p></div>
              <div><p className="text-white/40 text-xs">Edge</p><p className="font-bold">{formatEdge(p.edge)}</p></div>
              <div><p className="text-white/40 text-xs">Odds at publication</p><p className="font-bold">{p.odds_at_publication ?? '—'}</p></div>
            </div>
            <div className="flex gap-4 text-xs">
              <span>Confidence: <span className={p.confidence ? CONFIDENCE_COLORS[p.confidence] : ''}>{p.confidence ?? '—'}</span></span>
              <span>Risk: <span className={p.risk ? RISK_COLORS[p.risk] : ''}>{p.risk ?? '—'}</span></span>
            </div>
            <p className="text-white/30 text-[11px] mt-3">
              Model {p.model_version} · Data as of {new Date(p.data_timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}