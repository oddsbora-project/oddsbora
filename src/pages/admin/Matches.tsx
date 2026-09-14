import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Match } from '@/lib/types'

export default function AdminMatches() {
  const [matches, setMatches] = useState<Match[] | null>(null)

  useEffect(() => {
    supabase
      .from('matches')
      .select('*, home_team:teams!matches_home_team_id_fkey(*), away_team:teams!matches_away_team_id_fkey(*)')
      .order('kickoff_at', { ascending: false })
      .limit(50)
      .then(({ data }) => setMatches(data as unknown as Match[]))
  }, [])

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Match Management</h1>
      <p className="text-white/50 text-sm mb-4">
        Matches are written by admins or the sports-data sync — never directly by regular users (enforced by RLS).
      </p>
      {matches === null && <div className="card text-white/50 text-sm">Loading…</div>}
      {matches?.length === 0 && <div className="card text-white/50 text-sm">No matches in the database yet.</div>}
      <div className="space-y-2">
        {matches?.map((m) => (
          <div key={m.id} className="card flex items-center justify-between text-sm">
            <span>{m.home_team?.name} vs {m.away_team?.name}</span>
            <span className="text-white/40 text-xs font-mono">{m.status}{m.is_demo ? ' · demo' : ''}</span>
          </div>
        ))}
      </div>
    </div>
  )
}