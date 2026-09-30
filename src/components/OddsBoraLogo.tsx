import { Activity } from 'lucide-react'

interface OddsBoraLogoProps {
  variant?: 'light' | 'dark'
}

export default function OddsBoraLogo({ variant = 'light' }: OddsBoraLogoProps) {
  const isLight = variant === 'light'

  return (
    <div className="flex items-center gap-2.5">
      <style>{`
        @keyframes ob-logo-pulse-ring {
          0% { transform: scale(1); opacity: 0.35; }
          100% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>

      {/* Icon badge with a live "signal" pulse behind it */}
      <div className="relative flex items-center justify-center">
        <span
          className="absolute inset-0 rounded-xl bg-signal-green"
          style={{ animation: 'ob-logo-pulse-ring 2.4s ease-out infinite' }}
        />
        <div className={`relative p-1.5 rounded-xl flex items-center justify-center ${isLight ? 'bg-signal-green/10' : 'bg-signal-green/20'}`}>
          <Activity className="text-signal-green" size={22} strokeWidth={2.5} />
        </div>
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
        <span
          className={`text-[9px] font-display font-semibold uppercase tracking-[0.15em] mt-1 bg-clip-text text-transparent ${
            isLight ? 'bg-gradient-to-r from-emerald-600 to-sky-600' : 'bg-gradient-to-r from-emerald-400 to-sky-400'
          }`}
        >
          AI Sports Intelligence
        </span>
      </div>
    </div>
  )
}