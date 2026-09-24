import { useEffect, useState, FormEvent } from 'react'
import { supabase } from '@/lib/supabase'
import { Trash2, Plus, Calendar, Clock, Lightbulb, X } from 'lucide-react'

interface Tip {
  id: string
  date_str: string
  league: string
  home_team: string
  away_team: string
  market: string
  model_prob: number
  market_prob: number
  odds: number
  confidence: 'High' | 'Moderate'
  rationale: string
  kickoff: string
  created_at: string
}

// Local calendar date (not UTC) — matches what <input type="date"> stores,
// and what the public Markets page now filters by. See Markets.tsx for why
// toISOString() here would drift a day near UTC midnight.
const toLocalDateStr = (d: Date) => {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

// <input type="datetime-local"> also expects local time, not UTC.
const toLocalDateTimeStr = (d: Date) => {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

const EMPTY_FORM = {
  date_str: toLocalDateStr(new Date()),
  league: '',
  home_team: '',
  away_team: '',
  market: '',
  model_prob: 60,
  market_prob: 50,
  odds: 1.8,
  confidence: 'High' as 'High' | 'Moderate',
  rationale: '',
  kickoff: toLocalDateTimeStr(new Date()),
}

export default function AdminTips() {
  const [tips, setTips] = useState<Tip[] | null>(null)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [formError, setFormError] = useState<string | null>(null)

  const fetchTips = () => {
    supabase
      .from('tips')
      .select('*')
      .order('date_str', { ascending: false })
      .order('kickoff', { ascending: true })
      .limit(50)
      .then(({ data }) => setTips((data as Tip[]) ?? []))
  }

  useEffect(() => {
    fetchTips()
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setFormError(null)
    setSaving(true)

    const isoKickoff = new Date(formData.kickoff).toISOString()

    const { error } = await supabase.from('tips').insert([{ ...formData, kickoff: isoKickoff }])

    setSaving(false)
    if (!error) {
      setShowForm(false)
      setFormData(EMPTY_FORM)
      fetchTips()
    } else {
      setFormError(error.message)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this tip? This cannot be undone.')) return
    setDeletingId(id)
    const { error } = await supabase.from('tips').delete().eq('id', id)
    setDeletingId(null)
    if (!error) setTips((prev) => prev?.filter((t) => t.id !== id) ?? null)
    else alert('Error deleting tip: ' + error.message)
  }

  const highConfidenceCount = tips?.filter((t) => t.confidence === 'High').length ?? 0

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Lightbulb size={20} className="text-signal-green" />
            Tips Management
          </h1>
          <p className="text-white/50 text-sm mt-1">
            These tips feed the public Markets page, grouped by <code className="text-white/70">date_str</code> and league.
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm((s) => !s)
            setFormError(null)
          }}
          className="btn-primary flex items-center gap-2"
        >
          {showForm ? (
            <>
              <X size={16} /> Cancel
            </>
          ) : (
            <>
              <Plus size={16} /> Add Tip
            </>
          )}
        </button>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <div className="card">
          <p className="text-white/50 text-xs mb-1">Total Tips</p>
          <p className="text-2xl font-bold text-white">{tips?.length ?? '—'}</p>
        </div>
        <div className="card">
          <p className="text-white/50 text-xs mb-1">High Confidence</p>
          <p className="text-2xl font-bold text-signal-green">{tips ? highConfidenceCount : '—'}</p>
        </div>
        <div className="card hidden sm:block">
          <p className="text-white/50 text-xs mb-1">Latest Kickoff Window</p>
          <p className="text-sm font-mono text-white/70">
            {tips && tips.length > 0
              ? `${tips[tips.length - 1].date_str} → ${tips[0].date_str}`
              : '—'}
          </p>
        </div>
      </div>

      {/* Add Tip Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="card mb-6 space-y-4 border border-signal-green/30">
          {formError && (
            <div className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
              {formError}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-white/60 block mb-1">Date</label>
              <input
                required
                type="date"
                value={formData.date_str}
                onChange={(e) => setFormData({ ...formData, date_str: e.target.value })}
                className="w-full bg-navy-900 border border-navy-600 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-signal-green"
              />
            </div>
            <div>
              <label className="text-xs text-white/60 block mb-1">Kickoff Time</label>
              <input
                required
                type="datetime-local"
                value={formData.kickoff}
                onChange={(e) => setFormData({ ...formData, kickoff: e.target.value })}
                className="w-full bg-navy-900 border border-navy-600 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-signal-green"
              />
            </div>
            <div>
              <label className="text-xs text-white/60 block mb-1">League</label>
              <input
                required
                placeholder="e.g. Kenyan Premier League"
                value={formData.league}
                onChange={(e) => setFormData({ ...formData, league: e.target.value })}
                className="w-full bg-navy-900 border border-navy-600 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-signal-green"
              />
            </div>
            <div>
              <label className="text-xs text-white/60 block mb-1">Market</label>
              <input
                required
                placeholder="e.g. Home Win"
                value={formData.market}
                onChange={(e) => setFormData({ ...formData, market: e.target.value })}
                className="w-full bg-navy-900 border border-navy-600 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-signal-green"
              />
            </div>
            <div>
              <label className="text-xs text-white/60 block mb-1">Home Team</label>
              <input
                required
                placeholder="e.g. Gor Mahia"
                value={formData.home_team}
                onChange={(e) => setFormData({ ...formData, home_team: e.target.value })}
                className="w-full bg-navy-900 border border-navy-600 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-signal-green"
              />
            </div>
            <div>
              <label className="text-xs text-white/60 block mb-1">Away Team</label>
              <input
                required
                placeholder="e.g. Nairobi United"
                value={formData.away_team}
                onChange={(e) => setFormData({ ...formData, away_team: e.target.value })}
                className="w-full bg-navy-900 border border-navy-600 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-signal-green"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-xs text-white/60 block mb-1">Model %</label>
                <input
                  required
                  type="number"
                  min={0}
                  max={100}
                  value={formData.model_prob}
                  onChange={(e) => setFormData({ ...formData, model_prob: Number(e.target.value) })}
                  className="w-full bg-navy-900 border border-navy-600 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-signal-green"
                />
              </div>
              <div>
                <label className="text-xs text-white/60 block mb-1">Market %</label>
                <input
                  required
                  type="number"
                  min={0}
                  max={100}
                  value={formData.market_prob}
                  onChange={(e) => setFormData({ ...formData, market_prob: Number(e.target.value) })}
                  className="w-full bg-navy-900 border border-navy-600 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-signal-green"
                />
              </div>
              <div>
                <label className="text-xs text-white/60 block mb-1">Odds</label>
                <input
                  required
                  type="number"
                  step="0.01"
                  min={1.01}
                  value={formData.odds}
                  onChange={(e) => setFormData({ ...formData, odds: Number(e.target.value) })}
                  className="w-full bg-navy-900 border border-navy-600 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-signal-green"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-white/60 block mb-1">Confidence</label>
              <select
                value={formData.confidence}
                onChange={(e) => setFormData({ ...formData, confidence: e.target.value as 'High' | 'Moderate' })}
                className="w-full bg-navy-900 border border-navy-600 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-signal-green"
              >
                <option value="High">High</option>
                <option value="Moderate">Moderate</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs text-white/60 block mb-1">Rationale (short analysis)</label>
            <textarea
              required
              rows={2}
              value={formData.rationale}
              onChange={(e) => setFormData({ ...formData, rationale: e.target.value })}
              className="w-full bg-navy-900 border border-navy-600 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-signal-green"
            />
          </div>
          <button type="submit" disabled={saving} className="btn-primary w-full disabled:opacity-50">
            {saving ? 'Saving…' : 'Save Tip to Database'}
          </button>
        </form>
      )}

      {/* List */}
      {tips === null && <div className="card text-white/50 text-sm">Loading tips…</div>}
      {tips?.length === 0 && (
        <div className="card text-white/50 text-sm text-center py-8">
          No tips found. Click "Add Tip" to publish the first one.
        </div>
      )}

      <div className="space-y-3">
        {tips?.map((tip) => (
          <div key={tip.id} className="card flex items-start justify-between gap-4 text-sm">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-bold text-white">
                  {tip.home_team} vs {tip.away_team}
                </span>
                <span className="text-signal-green text-xs font-mono bg-signal-green/10 px-2 py-0.5 rounded">
                  {tip.market}
                </span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    tip.confidence === 'High'
                      ? 'bg-signal-green/10 text-signal-green'
                      : 'bg-signal-yellow/10 text-signal-yellow'
                  }`}
                >
                  {tip.confidence}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-white/50 mb-2">
                <span className="flex items-center gap-1">
                  <Calendar size={12} /> {tip.date_str}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />{' '}
                  {new Date(tip.kickoff).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <span>{tip.league}</span>
                <span className="font-mono">
                  Model {tip.model_prob}% · Market {tip.market_prob}% · Odds {tip.odds}
                </span>
              </div>
              <p className="text-white/40 text-xs line-clamp-1">{tip.rationale}</p>
            </div>
            <button
              onClick={() => handleDelete(tip.id)}
              disabled={deletingId === tip.id}
              className="text-red-400 hover:text-red-300 p-2 shrink-0 disabled:opacity-40"
              title="Delete tip"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
