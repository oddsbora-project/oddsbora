import { Link } from 'react-router-dom'
import { X, Home, Sparkles, Compass, BarChart3, Tag, Info, ShieldCheck, LogIn, UserPlus } from 'lucide-react'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

const MENU_ITEMS = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/features', label: 'Features', icon: Sparkles },
  { to: '/how-it-works', label: 'How It Works', icon: Compass },
  { to: '/markets', label: 'Markets', icon: BarChart3 },
  { to: '/pricing', label: 'Pricing', icon: Tag },
  { to: '/about', label: 'About', icon: Info },
  { to: '/responsible-use', label: 'Responsible Use', icon: ShieldCheck },
]

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-navy-950 flex flex-col md:hidden">
      <div className="flex items-center justify-between px-4 h-16 border-b border-navy-700">
        <img src="/oddsbora-logo.png" alt="OddsBora" className="h-9 w-auto object-contain" />
        <button onClick={onClose} aria-label="Close menu" className="text-white/70 hover:text-white p-1">
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.to} to={item.to} onClick={onClose}
              className="flex items-center gap-3 px-5 py-4 border-b border-navy-800 text-white/85 hover:text-white hover:bg-navy-900 text-[15px]"
            >
              <Icon size={18} className="text-signal-green" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-navy-700">
        <Link to="/login" onClick={onClose} className="flex items-center gap-3 px-5 py-4 text-white/85 hover:text-white hover:bg-navy-900 text-[15px]">
          <LogIn size={18} className="text-white/50" /> Log in
        </Link>
        <Link to="/register" onClick={onClose} className="flex items-center gap-3 px-5 py-4 text-white/85 hover:text-white hover:bg-navy-900 text-[15px]">
          <UserPlus size={18} className="text-white/50" /> Create account
        </Link>
      </div>
    </div>
  )
}