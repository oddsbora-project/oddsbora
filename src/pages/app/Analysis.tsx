import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Analysis() {
  const [matchId, setMatchId] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function runAnalysis() {
    if (!matchId) return
    setLoading(true)
    setError(null)
    setResult(null)
    const { data, error } = await supabase.functions.invoke('ai-analysis', {
      body: { match_id: matchId },
    })
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    setResult(data?.summary ?? 'No analysis returned.')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-1">Analysis Centre</h1>
      <p className="text-white/50 text-sm mb-6">Ask the AI Analyst to explain a match's data and model output in plain language.</p>

      <div className="card mb-4">
        <label className="text-sm text-white/60 block mb-2">Match ID</label>
        <input
          value={matchId} onChange={(e) => setMatchId(e.target.value)}
          placeholder="Paste a match ID from the Matches page"
          className="w-full bg-navy-900 border border-navy-600 rounded-lg px-3 py-2.5 mb-3 outline-none focus:border-signal-green text-sm font-mono"
        />
        <button onClick={runAnalysis} disabled={loading || !matchId} className="btn-primary disabled:opacity-50">
          {loading ? 'Analyzing…' : 'Run AI Analysis'}
        </button>
      </div>

      {error && (
        <div className="card text-signal-red text-sm">
          AI Analyst unavailable: {error}. This is expected until the `ai-analysis` Edge Function is deployed with an OpenAI key.
        </div>
      )}
      {result && (
        <div className="card text-sm leading-relaxed whitespace-pre-wrap">{result}</div>
      )}
    </div>
  )
}