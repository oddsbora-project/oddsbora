import { useState } from 'react'
// Removed unused imports: ChevronLeft, ChevronRight
import { TrendingUp, Target, ShieldCheck, Clock, BarChart3, Info, Calendar as CalendarIcon } from 'lucide-react'

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

// --- MOCK DATA: Replace with data from your Supabase 'tips' table ---
// Dates are set to the current week for demo purposes
const MOCK_TIPS = [
  {
    id: 1,
    dateStr: '2026-09-25', // Today
    league: 'Kenyan Premier League',
    homeTeam: 'Gor Mahia',
    awayTeam: 'Nairobi United',
    market: 'Home Win',
    modelProb: 68,
    marketProb: 54,
    odds: 1.85,
    confidence: 'High',
    rationale: 'Gor Mahia have won 4 of their last 5 home games, scoring an average of 2.2 goals. Nairobi United have failed to keep a clean sheet in their last 6 away matches.',
    kickoff: '2026-09-25T15:00:00'
  },
  {
    id: 2,
    dateStr: '2026-09-26', // Tomorrow
    league: 'English Premier League',
    homeTeam: 'Arsenal',
    awayTeam: 'Brighton',
    market: 'Over 2.5 Goals',
    modelProb: 72,
    marketProb: 61,
    odds: 1.75,
    confidence: 'High',
    rationale: 'Arsenal are averaging 2.8 goals per game at home. Brighton have scored in 8 of their last 9 matches. Both teams have a high xG (expected goals) per game.',
    kickoff: '2026-09-26T17:30:00'
  },
  {
    id: 3,
    dateStr: '2026-09-27', 
    league: 'Spanish La Liga',
    homeTeam: 'Real Madrid',
    awayTeam: 'Sevilla',
    market: 'Both Teams to Score',
    modelProb: 65,
    marketProb: 52,
    odds: 1.90,
    confidence: 'Moderate',
    rationale: 'Sevilla have scored in 5 of their last 6 away games, while Real Madrid have conceded in 3 of their last 4 home league matches, suggesting a defensive vulnerability.',
    kickoff: '2026-09-27T21:00:00'
  },
  {
    id: 4,
    dateStr: '2026-09-28',
    league: 'UEFA Champions League',
    homeTeam: 'Bayern Munich',
    awayTeam: 'PSG',
    market: 'Home Win & Over 2.5',
    modelProb: 58,
    marketProb: 45,
    odds: 2.10,
    confidence: 'Moderate',
    rationale: 'Bayern are dominant at home in the UCL. PSG have a poor away record in knockout stages. The model suggests a high-scoring game with Bayern edging it.',
    kickoff: '2026-09-28T20:00:00'
  },
  {
    id: 5,
    dateStr: '2026-09-29',
    league: 'Nigerian Professional League',
    homeTeam: 'Enyimba',
    awayTeam: 'Kano Pillars',
    market: 'Under 2.5 Goals',
    modelProb: 70,
    marketProb: 58,
    odds: 1.60,
    confidence: 'High',
    rationale: 'Enyimba has seen under 2.5 goals in 6 of their last 7 home games. Kano Pillars are a defensive side on the road. This is a low-scoring matchup based on historical data.',
    kickoff: '2026-09-29T16:00:00'
  },
  {
    id: 6,
    dateStr: '2026-09-29',
    league: 'English Premier League',
    homeTeam: 'Liverpool',
    awayTeam: 'Chelsea',
    market: 'Both Teams to Score',
    modelProb: 74,
    marketProb: 62,
    odds: 1.80,
    confidence: 'High',
    rationale: 'Both teams have scored in the last 5 head-to-head meetings. Liverpool have a strong home attack, but Chelsea have been dangerous on the counter-attack this season.',
    kickoff: '2026-09-29T19:45:00'
  },
]

const DAYS = getNext10Days()

export default function Markets() {
  const [selectedDate, setSelectedDate] = useState<string>(
    DAYS[0].toISOString().split('T')[0]
  )

  // Filter tips based on the selected date
  const filteredTips = MOCK_TIPS.filter(tip => tip.dateStr === selectedDate)

  // Group filtered tips by league
  const groupedTips = filteredTips.reduce((acc, tip) => {
    if (!acc[tip.league]) acc[tip.league] = []
    acc[tip.league].push(tip)
    return acc
  }, {} as Record<string, typeof MOCK_TIPS>)

  const stats = {
    weekWinRate: 73.5,
    totalTips: 48,
    highConfidencePicks: 12,
    roi: 15.2
  }

  const formatDateLabel = (date: Date) => {
    const dayName = date.toLocaleDateString('en-KE', { weekday: 'short' })
    const dayNum = date.getDate()
    return { dayName, dayNum }
  }

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
          {/* Removed the unused 'i' parameter */}
          {DAYS.map((date) => {
            const dateStr = date.toISOString().split('T')[0]
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
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-green mt-1" />
                )}
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
          <p className="text-2xl font-bold text-navy-950">{stats.totalTips}</p>
        </div>
        <div className="glass-panel-light p-4 rounded-2xl">
          <div className="flex items-center gap-2 text-signal-yellow mb-1">
            <ShieldCheck size={16} />
            <span className="text-xs font-mono uppercase tracking-wider">High Confidence</span>
          </div>
          <p className="text-2xl font-bold text-navy-950">{stats.highConfidencePicks}</p>
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
        {Object.keys(groupedTips).length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-black/5 shadow-sm">
            <CalendarIcon size={40} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-navy-950">No Tips Available</h3>
            <p className="text-slate-500 text-sm">We are still analyzing matches for this date. Please check back later.</p>
          </div>
        ) : (
          Object.entries(groupedTips).map(([league, tips]) => (
            <div key={league}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 bg-black/5 px-3 py-1 rounded-full">
                  {league}
                </span>
                <span className="text-xs text-slate-400">({tips.length} tips)</span>
              </div>
              
              <div className="space-y-4">
                {tips.map((tip) => (
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