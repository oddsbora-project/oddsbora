import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Profile } from '@/lib/types'

export default function AdminUsers() {
  const [users, setUsers] = useState<Profile[] | null>(null)

  useEffect(() => {
    supabase.from('profiles').select('*').order('created_at', { ascending: false }).limit(100).then(({ data }) => setUsers(data as Profile[]))
  }, [])

  async function toggleRole(id: string, current: 'user' | 'admin') {
    const next = current === 'admin' ? 'user' : 'admin'
    const { error } = await supabase.from('profiles').update({ role: next }).eq('id', id)
    if (!error) setUsers((prev) => prev?.map((u) => (u.id === id ? { ...u, role: next } : u)) ?? null)
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">User Management</h1>
      {users === null && <div className="card text-white/50 text-sm">Loading…</div>}
      <div className="space-y-2">
        {users?.map((u) => (
          <div key={u.id} className="card flex items-center justify-between text-sm">
            <div>
              <p>{u.full_name || u.username || u.id.slice(0, 8)}</p>
              <p className="text-white/40 text-xs">{u.role}</p>
            </div>
            <button onClick={() => toggleRole(u.id, u.role)} className="btn-secondary text-xs py-1.5 px-3">
              {u.role === 'admin' ? 'Revoke admin' : 'Make admin'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}