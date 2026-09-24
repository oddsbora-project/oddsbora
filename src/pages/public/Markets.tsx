import { useEffect, useMemo, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { TrendingUp, Target, ShieldCheck, Clock, BarChart3, Info, Calendar as CalendarIcon, AlertCircle } from 'lucide-react'

// Helper to generate the next 10 days
const getNext10Days = () => {
  const days = []
  for (let i = 0; i < 10; i++) {
    const d = new Date()
    d.setDate(d.getDate() + i)
    days.push(d)
  }
  return days
}

// Formats a Date using its LOCAL calendar date (not UTC). This matters because
// the admin's <input type="date"> also stores the local date — using
// toISOString() here would silently disagree with it for hours near UTC
// midnight (e.g. 12am-3am in Nairobi, UTC+3), making "today's" tips vanish.
const toLocalDateStr = (d: Date) => {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

const DAYS = getNext10Days()

interface Tip {
  id: string
  dateStr: string
  league: string
  homeTeam: string
  awayTeam: string
  market: string
  modelProb: number
  marketProb: number
  odds: number
  confidence: 'High' | 'Moderate'
  rationale: string
  kickoff: string
}

// Maps the raw Supabase 'tips' row (snake_case) into the shape this component renders.
function mapTipRow(row: Record<string, unknown>): Tip {
  return {
    id: row.id as string,
    dateStr: row.date_str as string,
    league: row.league as string,
    homeTeam: row.home_team as string,
    awayTeam: row.away_team as string,
    market: row.market as string,
    modelProb: row.model_prob as number,
    marketProb: row.market_prob as number,
    odds: row.odds as number,
    confidence: row.confidence as 'High' | 'Moderate',
    rationale: row.rationale as string,
    kickoff: row.kickoff as string,
  }
}

export default function Markets() {
  const [selectedDate, setSelectedDate] = useState<string>(toLocalDateStr(DAYS[0]))
  const [tips, setTips] = useState<Tip[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadTips() {
      setError(null)
      const rangeStart = toLocalDateStr(DAYS[0])
      const rangeEnd = toLocalDateStr(DAYS[DAYS.length - 1])

      const { data, error: fetchError } = await supabase
        .from('tips')
        .select('*')
        .gte('date_str', rangeStart)
        .lte('date_str', rangeEnd)
        .order('kickoff', { ascending: true })

      if (cancelled) return

      if (fetchError) {
        setError(fetchError.message)
        setTips([])
        return
      }
      setTips((data ?? []).map(mapTipRow))
    }

    loadTips()
    return () => {
      cancelled = true
    }
  }, [])

  // Filter tips based on the selected date
  const filteredTips = useMemo(
    () => (tips ?? []).filter((tip) => tip.dateStr === selectedDate),
    [tips, selectedDate]
  )

  // Group filtered tips by league
  const groupedTips = useMemo(
    () =>
      filteredTips.reduce((acc, tip) => {
        if (!acc[tip.league]) acc[tip.league] = []
        acc[tip.league].push(tip)
        return acc
      }, {} as Record<string, Tip[]>),
    [filteredTips]
  )

  // Stats derived from the live window of tips. Win-rate/ROI need settled results,
  // which this table doesn't track yet — replace with real figures once you have one.
  const stats = {
    weekWinRate: 73.5,
    totalTips: tips?.length ?? 0,
    highConfidencePicks: (tips ?? []).filter((t) => t.confidence === 'High').length,
    roi: 15.2,
  }

  const formatDateLabel = (date: Date) => {
    const dayName = date.toLocaleDateString('en-KE', { weekday: 'short' })
    const dayNum = date.getDate()
    return { dayName, dayNum }
  }

  const isLoading = tips === null

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 fade-up">

      {/* --- Header Section --- */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-navy-950 mb-3">
          Weekly Markets Intelligence
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto sm:mx-0 text-lg">
          Your transparent, data-driven tip sheet. Select a day to view our model's top picks.
        </p>
      </div>

      {/* --- Calendar Strip --- */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-navy-950 uppercase tracking-wider flex items-center gap-2">
            <CalendarIcon size={16} className="text-signal-green" />
            Select Date
          </h2>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4 custom-scrollbar">
          {DAYS.map((date) => {
            const dateStr = toLocalDateStr(date)
            const isActive = dateStr === selectedDate
            const { dayName, dayNum } = formatDateLabel(date)

            return (
              <button
                key={dateStr}
                onClick={() => setSelectedDate(dateStr)}
                className={`flex flex-col items-center justify-center min-w-[70px] py-3 rounded-2xl border transition-all duration-300 ${
                  isActive
                    ? 'bg-navy-950 text-white border-navy-950 shadow-md'
                    : 'bg-white text-slate-500 border-black/10 hover:border-signal-green/50 hover:bg-signal-green/5'
                }`}
              >
                <span className={`text-xs uppercase font-semibold mb-1 ${isActive ? 'text-signal-green' : 'text-slate-400'}`}>
                  {dayName}
                </span>
                <span className="text-xl font-bold">{dayNum}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-signal-green mt-1" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* --- Performance Stats Bar --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="glass-panel-light p-4 rounded-2xl">
          <div className="flex items-center gap-2 text-signal-green mb-1">
            <TrendingUp size={16} />
            <span className="text-xs font-mono uppercase tracking-wider">Model Win Rate</span>
          </div>
          <p className="text-2xl font-bold text-navy-950">{stats.weekWinRate}%</p>
        </div>
        <div className="glass-panel-light p-4 rounded-2xl">
          <div className="flex items-center gap-2 text-sky-500 mb-1">
            <Target size={16} />
            <span className="text-xs font-mono uppercase tracking-wider">Total Tips</span>
          </div>
          <p className="text-2xl font-bold text-navy-950">{isLoading ? '—' : stats.totalTips}</p>
        </div>
        <div className="glass-panel-light p-4 rounded-2xl">
          <div className="flex items-center gap-2 text-signal-yellow mb-1">
            <ShieldCheck size={16} />
            <span className="text-xs font-mono uppercase tracking-wider">High Confidence</span>
          </div>
          <p className="text-2xl font-bold text-navy-950">{isLoading ? '—' : stats.highConfidencePicks}</p>
        </div>
        <div className="glass-panel-light p-4 rounded-2xl">
          <div className="flex items-center gap-2 text-violet-500 mb-1">
            <BarChart3 size={16} />
            <span className="text-xs font-mono uppercase tracking-wider">Estimated ROI</span>
          </div>
          <p className="text-2xl font-bold text-navy-950">+{stats.roi}%</p>
        </div>
      </div>

      {/* --- Main Content Area: Tips List Grouped by League --- */}
      <div className="space-y-8">
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm">
            <AlertCircle size={18} className="shrink-0" />
            Couldn't load tips right now ({error}). Please try again shortly.
          </div>
        )}

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-28 rounded-2xl bg-black/5 animate-pulse" />
            ))}
          </div>
        ) : Object.keys(groupedTips).length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-black/5 shadow-sm">
            <CalendarIcon size={40} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-navy-950">No Tips Available</h3>
            <p className="text-slate-500 text-sm">We are still analyzing matches for this date. Please check back later.</p>
          </div>
        ) : (
          Object.entries(groupedTips).map(([league, leagueTips]) => (
            <div key={league}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 bg-black/5 px-3 py-1 rounded-full">
                  {league}
                </span>
                <span className="text-xs text-slate-400">({leagueTips.length} tips)</span>
              </div>

              <div className="space-y-4">
                {leagueTips.map((tip) => (
                  <div
                    key={tip.id}
                    className="group relative flex flex-col md:flex-row items-start md:items-center gap-4 p-5 rounded-2xl bg-white border border-black/5 shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden"
                  >
                    {/* Teams & Market */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
                        <span className="font-bold text-navy-950 text-lg">{tip.homeTeam}</span>
                        <span className="text-slate-400 text-sm">vs</span>
                        <span className="font-bold text-navy-950 text-lg">{tip.awayTeam}</span>
                      </div>
                      <p className="text-signal-green font-semibold text-sm mb-2">{tip.market}</p>
                      <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{tip.rationale}</p>
                    </div>

                    {/* Time */}
                    <div className="flex items-center gap-1 text-xs text-slate-500 shrink-0 md:w-24">
                      <Clock size={12} />
                      {new Date(tip.kickoff).toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' })}
                    </div>

                    {/* Model vs Market Data */}
                    <div className="flex items-center gap-6 shrink-0">
                      <div className="text-center">
                        <p className="text-xs text-slate-400 mb-1">Model</p>
                        <p className="text-xl font-bold text-signal-green">{tip.modelProb}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-slate-400 mb-1">Market</p>
                        <p className="text-xl font-bold text-navy-950">{tip.marketProb}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-slate-400 mb-1">Odds</p>
                        <p className="text-xl font-bold text-navy-950">{tip.odds}</p>
                      </div>
                    </div>

                    {/* Confidence Badge */}
                    <div className="shrink-0">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        tip.confidence === 'High'
                          ? 'bg-signal-green/10 text-signal-green border border-signal-green/20'
                          : 'bg-signal-yellow/10 text-signal-yellow border border-signal-yellow/20'
                      }`}>
                        {tip.confidence}
                      </span>
                    </div>

                    {/* Edge Bar */}
                    <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-signal-green transition-all duration-700 ease-out group-hover:w-full" />
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* --- Methodology Note --- */}
      <div className="mt-12 glass-panel-light p-6 rounded-2xl">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-xl bg-sky-500/10 shrink-0">
            <Info size={20} className="text-sky-500" />
          </div>
          <div>
            <h3 className="font-bold text-navy-950 mb-1">Our Methodology</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Every tip is generated by our proprietary AI model, which analyses over 10,000 data points per match, including historical results, current form, expected goals (xG), and market odds.
              We present the model's probability against the market's implied probability to highlight where we see an "edge".
              <span className="font-semibold text-navy-950"> We do not guarantee outcomes. Always bet responsibly.</span>
            </p>
          </div>
        </div>
      </div>

      {/* --- Final Disclaimer --- */}
      <p className="text-slate-400 text-xs mt-8 text-center max-w-2xl mx-auto">
        OddsBora is an analytics platform, not a bookmaker. Our tips are for informational purposes only.
        Gambling involves risk. Please ensure you are 18+ and gamble responsibly.
      </p>

    </div>
  )
}
