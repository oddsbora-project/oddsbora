import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface AuditRow {
  id: string
  actor_id: string | null
  action: string
  entity_type: string
  entity_id: string | null
  created_at: string
}

export default function AdminAudit() {
  const [logs, setLogs] = useState<AuditRow[] | null>(null)

  useEffect(() => {
    supabase.from('audit_logs').select('*').order('created_at', { ascending: false }).limit(100).then(({ data }) => setLogs(data as AuditRow[]))
  }, [])

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Audit Logs</h1>
      {logs === null && <div className="card text-white/50 text-sm">Loading…</div>}
      {logs?.length === 0 && <div className="card text-white/50 text-sm">No audit events recorded yet.</div>}
      <div className="space-y-2">
        {logs?.map((l) => (
          <div key={l.id} className="card text-xs font-mono">
            {l.created_at} · {l.action} · {l.entity_type}
          </div>
        ))}
      </div>
    </div>
  )
}