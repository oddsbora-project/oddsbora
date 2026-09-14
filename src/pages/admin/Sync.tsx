import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminSync() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function runSync() {
    setLoading(true)
    setError(null)
    setResult(null)
    const { data, error } = await supabase.functions.invoke('sports-sync', { body: {} })
    setLoading(false)
    if (error) { setError(error.message); return }
    setResult(JSON.stringify(data, null, 2))
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-1">Sports Data Sync</h1>
      <p className="text-white/50 text-sm mb-4">Pulls today's fixtures and odds from the configured provider.</p>
      <button onClick={runSync} disabled={loading} className="btn-primary disabled:opacity-50 mb-4">
        {loading ? 'Syncing…' : 'Run Sync Now'}
      </button>
      {error && <div className="card text-signal-red text-sm">{error}</div>}
      {result && <pre className="card text-xs whitespace-pre-wrap">{result}</pre>}
    </div>
  )
}