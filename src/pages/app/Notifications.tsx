import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/auth-context'
import { NotificationRow } from '@/lib/types'

export default function Notifications() {
  const { user } = useAuth()
  const [items, setItems] = useState<NotificationRow[] | null>(null)

  useEffect(() => {
    if (!user) return
    let active = true
    supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => { if (active) setItems(data as NotificationRow[]) })
    return () => { active = false }
  }, [user])

  async function markRead(id: string) {
    await supabase.from('notifications').update({ is_read: true }).eq('id', id)
    setItems((prev) => prev?.map((n) => (n.id === id ? { ...n, is_read: true } : n)) ?? null)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      {items === null && <div className="card text-white/50 text-sm">Loading…</div>}
      {items?.length === 0 && <div className="card text-white/50 text-sm">No notifications yet.</div>}
      <div className="space-y-2">
        {items?.map((n) => (
          <button
            key={n.id} onClick={() => markRead(n.id)}
            className={`card w-full text-left ${n.is_read ? 'opacity-50' : ''}`}
          >
            <p className="font-medium text-sm">{n.title}</p>
            {n.body && <p className="text-white/60 text-xs mt-1">{n.body}</p>}
            <p className="text-white/30 text-[11px] mt-2">{new Date(n.created_at).toLocaleString()}</p>
          </button>
        ))}
      </div>
    </div>
  )
}