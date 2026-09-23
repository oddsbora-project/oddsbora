import { useState, useEffect } from 'react'
import { Activity, TrendingUp, ShieldCheck, AlertTriangle } from 'lucide-react'

export default function LiveIntelligencePreview() {
  const [data, setData] = useState({
    modelProb: 62,
    marketProb: 54,
    edge: 8,
    confidence: 'High',
    risk: 'Moderate',
  })

  const [isUpdating, setIsUpdating] = useState(false)

  // Simulate real-time AI data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true)
      
      setTimeout(() => {
        setData((prev) => {
          // Generate slight variations to simulate live market/model movement
          const newModel = Math.min(95, Math.max(5, prev.modelProb + (Math.random() * 4 - 2)))
          const newMarket = Math.min(95, Math.max(5, prev.marketProb + (Math.random() * 4 - 2)))
          const newEdge = Math.round(newModel - newMarket)
          
          return {
            modelProb: Math.round(newModel),
            marketProb: Math.round(newMarket),
            edge: newEdge,
            confidence: newModel > 65 ? 'High' : 'Moderate',
            risk: Math.abs(newEdge) > 10 ? 'Moderate' : 'High',
          }
        })
        setIsUpdating(false)
      }, 500) // 500ms visual delay to show the "updating" pulse
    }, 4500) // Updates every 4.5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <div className="relative rounded-3xl overflow-hidden bg-navy-950 text-white shadow-2xl border border-white/10">
        
        {/* Animated Background Glows */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-signal-green/20 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-sky-500/20 rounded-full blur-[80px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="relative z-10 p-6 sm:p-10">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-signal-green/20 border border-signal-green/30">
                <Activity className="text-signal-green" size={20} />
              </div>
              <h2 className="font-display font-bold text-xl sm:text-2xl tracking-tight">Live Intelligence Feed</h2>
            </div>
            
            {/* Pulsing Live Badge */}
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-signal-green"></span>
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-signal-green">Live Model</span>
            </div>
          </div>

          {/* Main Probability Comparison */}
          <div className="space-y-6 mb-10">
            
            {/* Model Probability */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-medium text-white/70">Model Probability</span>
                <span className={`text-3xl font-display font-bold transition-all duration-300 ${isUpdating ? 'text-white/50 scale-95' : 'text-signal-green scale-100'}`}>
                  {data.modelProb}%
                </span>
              </div>
              <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-signal-green rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${data.modelProb}%` }}
                />
              </div>
            </div>

            {/* Market Implied Probability */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-medium text-white/70">Market-Implied Probability</span>
                <span className={`text-3xl font-display font-bold transition-all duration-300 ${isUpdating ? 'text-white/50 scale-95' : 'text-white scale-100'}`}>
                  {data.marketProb}%
                </span>
              </div>
              <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-sky-400 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${data.marketProb}%` }}
                />
              </div>
            </div>

          </div>

          {/* Secondary Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 transition-colors hover:bg-white/10">
              <div className="flex items-center gap-2 text-white/50 mb-2">
                <TrendingUp size={16} />
                <span className="text-xs font-mono uppercase tracking-wider">Estimated Edge</span>
              </div>
              <p className={`text-2xl font-bold transition-colors duration-300 ${data.edge > 0 ? 'text-signal-green' : 'text-red-400'}`}>
                {data.edge > 0 ? '+' : ''}{data.edge} pts
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 transition-colors hover:bg-white/10">
              <div className="flex items-center gap-2 text-white/50 mb-2">
                <ShieldCheck size={16} />
                <span className="text-xs font-mono uppercase tracking-wider">Confidence</span>
              </div>
              <p className="text-2xl font-bold text-white">
                {data.confidence}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 transition-colors hover:bg-white/10">
              <div className="flex items-center gap-2 text-white/50 mb-2">
                <AlertTriangle size={16} />
                <span className="text-xs font-mono uppercase tracking-wider">Risk Level</span>
              </div>
              <p className="text-2xl font-bold text-white">
                {data.risk}
              </p>
            </div>

          </div>

          {/* Disclaimer */}
          <p className="text-white/40 text-xs mt-8 text-center max-w-lg mx-auto">
            An estimated edge reflects a model-vs-market probability difference. It is not a guarantee of outcome.
          </p>
        </div>
      </div>
    </section>
  )
}