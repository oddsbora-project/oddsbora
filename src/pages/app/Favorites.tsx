import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/auth-context'
import { Match, Team } from '@/lib/types'

interface FavoriteRow {
  id: string
  match: Match | null
  team: Team | null
}

export default function Favorites() {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState<FavoriteRow[] | null>(null)

  useEffect(() => {
    if (!user) return
    let active = true
    supabase
      .from('favorites')
      .select('id, match:matches(*), team:teams(*)')
      .eq('user_id', user.id)
      .then(({ data }) => { if (active) setFavorites(data as unknown as FavoriteRow[]) })
    return () => { active = false }
  }, [user])

  async function remove(id: string) {
    await supabase.from('favorites').delete().eq('id', id)
    setFavorites((prev) => prev?.filter((f) => f.id !== id) ?? null)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Favorites</h1>
      {favorites === null && <div className="card text-white/50 text-sm">Loading favorites…</div>}
      {favorites?.length === 0 && (
        <div className="card text-white/50 text-sm">
          No favorites yet. Star a match or team from the Matches page to track it here.
        </div>
      )}
      <div className="space-y-3">
        {favorites?.map((f) => (
          <div key={f.id} className="card flex items-center justify-between">
            <p className="text-sm">
              {f.match ? `${f.match.home_team_id} vs ${f.match.away_team_id}` : f.team?.name}
            </p>
            <button onClick={() => remove(f.id)} className="text-white/40 text-xs hover:text-signal-red">Remove</button>
          </div>
        ))}
      </div>
    </div>
  )
}