import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Match } from '@/lib/types'

export default function Matches() {
  const [matches, setMatches] = useState<Match[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    let active = true
    supabase
      .from('matches')
      .select('*, home_team:teams!matches_home_team_id_fkey(*), away_team:teams!matches_away_team_id_fkey(*), league:leagues(*)')
      .order('kickoff_at', { ascending: true })
      .limit(50)
      .then(({ data, error }) => {
        if (!active) return
        if (error) setError(error.message)
        else setMatches(data as unknown as Match[])
      })
    return () => { active = false }
  }, [])

  const filtered = matches?.filter((m) => {
    if (!search) return true
    const q = search.toLowerCase()
    return m.home_team?.name.toLowerCase().includes(q) || m.away_team?.name.toLowerCase().includes(q)
  })

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Matches</h1>
      <input
        placeholder="Search by team…" value={search} onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-navy-900 border border-navy-600 rounded-lg px-3 py-2.5 mb-4 outline-none focus:border-signal-green text-sm"
      />

      {error && <div className="card text-signal-red text-sm">Could not load matches: {error}</div>}
      {matches === null && !error && <div className="card text-white/50 text-sm">Loading matches…</div>}
      {matches?.length === 0 && (
        <div className="card text-white/50 text-sm">
          No matches available yet. This appears once a sports-data provider is connected and synced.
        </div>
      )}

      <div className="space-y-3">
        {filtered?.map((m) => (
          <Link key={m.id} to={`/matches/${m.id}`} className="card flex items-center justify-between hover:border-signal-green/50 transition">
            <div>
              <p className="text-xs text-white/40 mb-1">{m.league?.name ?? 'Unknown league'}</p>
              <p className="font-medium text-sm">{m.home_team?.name} vs {m.away_team?.name}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/50">{new Date(m.kickoff_at).toLocaleString()}</p>
              {m.is_demo && <span className="badge-warning">Demo</span>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}