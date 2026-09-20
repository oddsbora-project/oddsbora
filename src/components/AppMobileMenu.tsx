import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  X, Home, ListChecks, Radio, FlaskConical, LineChart as LineChartIcon,
  Star, Bell, User, CreditCard, ShieldCheck, LogOut, Info, ShieldQuestion, ChevronRight,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/auth-context'

interface AppMobileMenuProps {
  open: boolean
  onClose: () => void
}

const MENU_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: Home, bg: 'bg-signal-green/10', fg: 'text-signal-green' },
  { to: '/matches', label: 'Matches', icon: ListChecks, bg: 'bg-sky-500/10', fg: 'text-sky-500' },
  { to: '/signals', label: 'Signals', icon: Radio, bg: 'bg-signal-yellow/10', fg: 'text-signal-yellow' },
  { to: '/analysis', label: 'Analysis Centre', icon: FlaskConical, bg: 'bg-violet-500/10', fg: 'text-violet-500' },
  { to: '/performance', label: 'Performance', icon: LineChartIcon, bg: 'bg-signal-green/10', fg: 'text-signal-green' },
  { to: '/favorites', label: 'Favorites', icon: Star, bg: 'bg-signal-yellow/10', fg: 'text-signal-yellow' },
  { to: '/notifications', label: 'Notifications', icon: Bell, bg: 'bg-sky-500/10', fg: 'text-sky-500' },
  { to: '/profile', label: 'Profile', icon: User, bg: 'bg-violet-500/10', fg: 'text-violet-500' },
  { to: '/subscription', label: 'Subscription', icon: CreditCard, bg: 'bg-signal-green/10', fg: 'text-signal-green' },
]

const INFO_ITEMS = [
  { to: '/about', label: 'About OddsBora', icon: Info },
  { to: '/responsible-use', label: 'Responsible Use', icon: ShieldQuestion },
]

export default function AppMobileMenu({ open, onClose }: AppMobileMenuProps) {
  const { user, signOut } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (!user) return
    supabase.from('profiles').select('role').eq('id', user.id).maybeSingle().then(({ data }) => {
      setIsAdmin(data?.role === 'admin')
    })
  }, [user])

  if (!open) return null

  return (
    <div className="md:hidden">
      <div className="menu-backdrop backdrop-fade-in" onClick={onClose} />
      <div className="menu-panel-dark panel-slide-in">
        <div className="menu-blob bg-signal-green/10 -top-10 -right-10" />

        <div className="flex items-center justify-between px-5 h-16 border-b border-white/10 relative">
          <img src="/oddsbora-logo.png" alt="OddsBora" className="h-8 w-auto object-contain" />
          <button onClick={onClose} aria-label="Close menu" className="text-white/70 hover:text-white p-1">
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto relative">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.to} to={item.to} onClick={onClose} className="menu-item-dark border-b border-white/5">
                <span className="flex items-center gap-3">
                  <span className={`menu-icon-chip ${item.bg}`}>
                    <Icon size={18} className={item.fg} />
                  </span>
                  {item.label}
                </span>
                <ChevronRight size={16} className="text-white/25" />
              </Link>
            )
          })}

          {isAdmin && (
            <Link to="/admin" onClick={onClose} className="menu-item-dark text-signal-yellow border-b border-white/5">
              <span className="flex items-center gap-3">
                <span className="menu-icon-chip bg-signal-yellow/10">
                  <ShieldCheck size={18} className="text-signal-yellow" />
                </span>
                Admin
              </span>
              <ChevronRight size={16} className="text-signal-yellow/40" />
            </Link>
          )}

          <p className="px-5 pt-5 pb-2 text-white/30 text-[11px] uppercase tracking-wide font-mono">About OddsBora</p>
          {INFO_ITEMS.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.to} to={item.to} onClick={onClose} className="menu-item-dark text-white/70 border-b border-white/5">
                <span className="flex items-center gap-3">
                  <span className="menu-icon-chip bg-white/5">
                    <Icon size={18} className="text-white/40" />
                  </span>
                  {item.label}
                </span>
                <ChevronRight size={16} className="text-white/20" />
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-white/10 relative bg-navy-900">
          <button onClick={() => { onClose(); signOut() }} className="menu-item-dark w-full text-left">
            <span className="flex items-center gap-3">
              <span className="menu-icon-chip bg-white/5">
                <LogOut size={18} />
              </span>
              Log out
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}