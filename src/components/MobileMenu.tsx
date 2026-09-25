import { Link } from 'react-router-dom'
import { X, Home, Sparkles, Compass, BarChart3, Newspaper, Info, ShieldCheck, LogIn, UserPlus, ChevronRight } from 'lucide-react'
import OddsBoraLogo from './OddsBoraLogo' // Import the new logo component

const LEGAL_LINKS = [
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/terms-of-service', label: 'Terms of Service' },
  { to: '/cookie-policy', label: 'Cookie Policy' },
]

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

const MENU_ITEMS = [
  { to: '/', label: 'Home', icon: Home, bg: 'bg-signal-green/10', fg: 'text-signal-green' },
  { to: '/features', label: 'Features', icon: Sparkles, bg: 'bg-sky-500/10', fg: 'text-sky-500' },
  { to: '/how-it-works', label: 'How It Works', icon: Compass, bg: 'bg-signal-yellow/10', fg: 'text-signal-yellow' },
  { to: '/markets', label: 'Markets', icon: BarChart3, bg: 'bg-violet-500/10', fg: 'text-violet-500' },
  { to: '/news', label: 'Sports News', icon: Newspaper, bg: 'bg-sky-500/10', fg: 'text-sky-500' }, // Updated from Pricing
  { to: '/about', label: 'About', icon: Info, bg: 'bg-sky-500/10', fg: 'text-sky-500' },
  { to: '/responsible-use', label: 'Responsible Use', icon: ShieldCheck, bg: 'bg-signal-yellow/10', fg: 'text-signal-yellow' },
]

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  if (!open) return null

  return (
    <div className="md:hidden">
      <div className="menu-backdrop backdrop-fade-in" onClick={onClose} />
      <div className="menu-panel-light panel-slide-in">
        <div className="menu-blob bg-signal-green/15 -bottom-10 -right-10" />

        <div className="flex items-center justify-between px-5 h-16 border-b border-black/10 relative">
          <OddsBoraLogo variant="light" />
          
          <button onClick={onClose} aria-label="Close menu" className="text-navy-950/60 hover:text-navy-950 p-1">
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto relative">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.to} to={item.to} onClick={onClose} className="menu-item-light border-b border-black/5">
                <span className="flex items-center gap-3">
                  <span className={`menu-icon-chip ${item.bg}`}>
                    <Icon size={18} className={item.fg} />
                  </span>
                  {item.label}
                </span>
                <ChevronRight size={16} className="text-navy-950/25" />
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-black/10 relative bg-white">
          <Link to="/login" onClick={onClose} className="menu-item-light">
            <span className="flex items-center gap-3">
              <span className="menu-icon-chip bg-black/5">
                <LogIn size={18} className="text-navy-950/50" />
              </span>
              Log in
            </span>
            <ChevronRight size={16} className="text-navy-950/25" />
          </Link>
          <Link to="/register" onClick={onClose} className="menu-item-light">
            <span className="flex items-center gap-3">
              <span className="menu-icon-chip bg-black/5">
                <UserPlus size={18} className="text-navy-950/50" />
              </span>
              Create account
            </span>
            <ChevronRight size={16} className="text-navy-950/25" />
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-5 py-4 text-xs text-navy-950/40">
            {LEGAL_LINKS.map((link, i) => (
              <span key={link.to} className="flex items-center gap-3">
                {i > 0 && <span className="text-navy-950/20">·</span>}
                <Link to={link.to} onClick={onClose} className="hover:text-navy-950/70 transition-colors">
                  {link.label}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}