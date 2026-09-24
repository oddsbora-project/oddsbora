import { useEffect, useState, FormEvent } from 'react'
import { supabase } from '@/lib/supabase'
import { Trash2, Plus, Calendar, Clock } from 'lucide-react'

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
  confidence: string
  rationale: string
  kickoff: string
}

export default function AdminTips() {
  const [tips, setTips] = useState<Tip[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    date_str: new Date().toISOString().split('T')[0],
    league: '',
    home_team: '',
    away_team: '',
    market: '',
    model_prob: 60,
    market_prob: 50,
    odds: 1.8,
    confidence: 'High',
    rationale: '',
    kickoff: new Date().toISOString().slice(0, 16), // YYYY-MM-DDTHH:mm
  })

  const fetchTips = () => {
    supabase
      .from('tips')
      .select('*')
      .order('date_str', { ascending: false })
      .order('kickoff', { ascending: true })
      .limit(50)
      .then(({ data }) => setTips(data as Tip[]))
  }

  useEffect(() => {
    fetchTips()
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Convert kickoff string to proper ISO format
    const isoKickoff = new Date(formData.kickoff).toISOString()
    
    const { error } = await supabase.from('tips').insert([
      { ...formData, kickoff: isoKickoff }
    ])

    setLoading(false)
    if (!error) {
      setShowForm(false)
      fetchTips() // Refresh the list
      // Reset form
      setFormData({
        date_str: new Date().toISOString().split('T')[0],
        league: '',
        home_team: '',
        away_team: '',
        market: '',
        model_prob: 60,
        market_prob: 50,
        odds: 1.8,
        confidence: 'High',
        rationale: '',
        kickoff: new Date().toISOString().slice(0, 16),
      })
    } else {
      alert('Error adding tip: ' + error.message)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tip?')) return
    const { error } = await supabase.from('tips').delete().eq('id', id)
    if (!error) fetchTips()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold mb-1">Tips Management</h1>
          <p className="text-white/50 text-sm">Add, edit, or remove weekly market tips.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="btn-primary flex items-center gap-2"
        >
          {showForm ? 'Cancel' : <><Plus size={16} /> Add Tip</>}
        </button>
      </div>

      {/* Add Tip Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="card mb-6 space-y-4 border-signal-green/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-white/60 block mb-1">Date (YYYY-MM-DD)</label>
              <input required type="date" value={formData.date_str} onChange={e => setFormData({...formData, date_str: e.target.value})} className="w-full bg-navy-900 border border-navy-600 rounded-lg px-3 py-2 text-sm outline-none focus:border-signal-green" />
            </div>
            <div>
              <label className="text-xs text-white/60 block mb-1">Kickoff Time</label>
              <input required type="datetime-local" value={formData.kickoff} onChange={e => setFormData({...formData, kickoff: e.target.value})} className="w-full bg-navy-900 border border-navy-600 rounded-lg px-3 py-2 text-sm outline-none focus:border-signal-green" />
            </div>
            <div>
              <label className="text-xs text-white/60 block mb-1">League</label>
              <input required placeholder="e.g. Kenyan Premier League" value={formData.league} onChange={e => setFormData({...formData, league: e.target.value})} className="w-full bg-navy-900 border border-navy-600 rounded-lg px-3 py-2 text-sm outline-none focus:border-signal-green" />
            </div>
            <div>
              <label className="text-xs text-white/60 block mb-1">Market</label>
              <input required placeholder="e.g. Home Win" value={formData.market} onChange={e => setFormData({...formData, market: e.target.value})} className="w-full bg-navy-900 border border-navy-600 rounded-lg px-3 py-2 text-sm outline-none focus:border-signal-green" />
            </div>
            <div>
              <label className="text-xs text-white/60 block mb-1">Home Team</label>
              <input required placeholder="e.g. Gor Mahia" value={formData.home_team} onChange={e => setFormData({...formData, home_team: e.target.value})} className="w-full bg-navy-900 border border-navy-600 rounded-lg px-3 py-2 text-sm outline-none focus:border-signal-green" />
            </div>
            <div>
              <label className="text-xs text-white/60 block mb-1">Away Team</label>
              <input required placeholder="e.g. Nairobi United" value={formData.away_team} onChange={e => setFormData({...formData, away_team: e.target.value})} className="w-full bg-navy-900 border border-navy-600 rounded-lg px-3 py-2 text-sm outline-none focus:border-signal-green" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-xs text-white/60 block mb-1">Model %</label>
                <input required type="number" value={formData.model_prob} onChange={e => setFormData({...formData, model_prob: Number(e.target.value)})} className="w-full bg-navy-900 border border-navy-600 rounded-lg px-3 py-2 text-sm outline-none focus:border-signal-green" />
              </div>
              <div>
                <label className="text-xs text-white/60 block mb-1">Market %</label>
                <input required type="number" value={formData.market_prob} onChange={e => setFormData({...formData, market_prob: Number(e.target.value)})} className="w-full bg-navy-900 border border-navy-600 rounded-lg px-3 py-2 text-sm outline-none focus:border-signal-green" />
              </div>
              <div>
                <label className="text-xs text-white/60 block mb-1">Odds</label>
                <input required type="number" step="0.01" value={formData.odds} onChange={e => setFormData({...formData, odds: Number(e.target.value)})} className="w-full bg-navy-900 border border-navy-600 rounded-lg px-3 py-2 text-sm outline-none focus:border-signal-green" />
              </div>
            </div>
            <div>
              <label className="text-xs text-white/60 block mb-1">Confidence</label>
              <select value={formData.confidence} onChange={e => setFormData({...formData, confidence: e.target.value})} className="w-full bg-navy-900 border border-navy-600 rounded-lg px-3 py-2 text-sm outline-none focus:border-signal-green">
                <option value="High">High</option>
                <option value="Moderate">Moderate</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs text-white/60 block mb-1">Rationale (Short analysis)</label>
            <textarea required rows={2} value={formData.rationale} onChange={e => setFormData({...formData, rationale: e.target.value})} className="w-full bg-navy-900 border border-navy-600 rounded-lg px-3 py-2 text-sm outline-none focus:border-signal-green" />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? 'Saving...' : 'Save Tip to Database'}
          </button>
        </form>
      )}

      {tips === null && <div className="card text-white/50 text-sm">Loading tips...</div>}
      {tips?.length === 0 && <div className="card text-white/50 text-sm">No tips found. Add one above.</div>}

      <div className="space-y-3">
        {tips?.map((tip) => (
          <div key={tip.id} className="card flex items-start justify-between text-sm">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-white">{tip.home_team} vs {tip.away_team}</span>
                <span className="text-signal-green text-xs font-mono bg-signal-green/10 px-2 py-0.5 rounded">{tip.market}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-white/50 mb-2">
                <span className="flex items-center gap-1"><Calendar size={12}/> {tip.date_str}</span>
                <span className="flex items-center gap-1"><Clock size={12}/> {new Date(tip.kickoff).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                <span>{tip.league}</span>
              </div>
              <p className="text-white/40 text-xs line-clamp-1">{tip.rationale}</p>
            </div>
            <button onClick={() => handleDelete(tip.id)} className="text-red-400 hover:text-red-300 p-2">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}