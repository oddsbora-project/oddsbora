import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface OddsRow {
  id: string
  bookmaker: string
  market: string
  home_odds: number | null
  draw_odds: number | null
  away_odds: number | null
  recorded_at: string
  is_demo: boolean
}

export default function AdminOdds() {
  const [rows, setRows] = useState<OddsRow[] | null>(null)

  useEffect(() => {
    supabase.from('odds').select('*').order('recorded_at', { ascending: false }).limit(50).then(({ data }) => setRows(data as OddsRow[]))
  }, [])

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Odds Data</h1>
      {rows === null && <div className="card text-white/50 text-sm">Loading…</div>}
      {rows?.length === 0 && (
        <div className="card text-white/50 text-sm">
          No odds recorded yet. This populates once the sports-data provider is connected and syncing.
        </div>
      )}
      <div className="space-y-2">
        {rows?.map((r) => (
          <div key={r.id} className="card text-xs font-mono flex justify-between">
            <span>{r.bookmaker} · {r.market}</span>
            <span>{r.home_odds ?? '—'} / {r.draw_odds ?? '—'} / {r.away_odds ?? '—'}</span>
          </div>
        ))}
      </div>
    </div>
  )
}