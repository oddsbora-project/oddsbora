import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminOverview() {
  const [counts, setCounts] = useState<Record<string, number | null>>({})

  useEffect(() => {
    const tables = ['matches', 'predictions', 'profiles', 'ai_analyses'] as const
    tables.forEach((t) => {
      supabase.from(t).select('*', { count: 'exact', head: true }).then(({ count }) => {
        setCounts((prev) => ({ ...prev, [t]: count ?? 0 }))
      })
    })
  }, [])

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Admin Overview</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="card"><p className="text-white/50 text-xs mb-1">Matches</p><p className="text-2xl font-bold">{counts.matches ?? '—'}</p></div>
        <div className="card"><p className="text-white/50 text-xs mb-1">Predictions</p><p className="text-2xl font-bold">{counts.predictions ?? '—'}</p></div>
        <div className="card"><p className="text-white/50 text-xs mb-1">Users</p><p className="text-2xl font-bold">{counts.profiles ?? '—'}</p></div>
        <div className="card"><p className="text-white/50 text-xs mb-1">AI analyses run</p><p className="text-2xl font-bold">{counts.ai_analyses ?? '—'}</p></div>
      </div>
    </div>
  )
}