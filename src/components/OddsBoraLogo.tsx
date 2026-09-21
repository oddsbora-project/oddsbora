import { Activity } from 'lucide-react'

interface OddsBoraLogoProps {
  variant?: 'light' | 'dark'
}

export default function OddsBoraLogo({ variant = 'light' }: OddsBoraLogoProps) {
  const isLight = variant === 'light'

  return (
    <div className="flex items-center gap-2.5">
      {/* Modern Vector Icon */}
      <div className={`p-1.5 rounded-xl flex items-center justify-center ${isLight ? 'bg-signal-green/10' : 'bg-signal-green/20'}`}>
        <Activity className="text-signal-green" size={22} strokeWidth={2.5} />
      </div>
      
      {/* Modern Typography */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-baseline gap-1">
          <span className={`font-display font-bold text-xl tracking-tight ${isLight ? 'text-navy-950' : 'text-white'}`}>
            Odds
          </span>
          <span className="font-display font-bold text-xl tracking-tight text-signal-green">
            Bora
          </span>
        </div>
        <span className={`text-[9px] font-mono uppercase tracking-widest mt-1 ${isLight ? 'text-navy-950/50' : 'text-white/50'}`}>
          AI Sports Intelligence
        </span>
      </div>
    </div>
  )
}