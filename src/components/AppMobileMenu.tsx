import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  X, Home, ListChecks, Radio, FlaskConical, LineChart as LineChartIcon,
  Star, Bell, User, CreditCard, ShieldCheck, LogOut,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/auth-context'

interface AppMobileMenuProps {
  open: boolean
  onClose: () => void
}

const MENU_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: Home },
  { to: '/matches', label: 'Matches', icon: ListChecks },
  { to: '/signals', label: 'Signals', icon: Radio },
  { to: '/analysis', label: 'Analysis Centre', icon: FlaskConical },
  { to: '/performance', label: 'Performance', icon: LineChartIcon },
  { to: '/favorites', label: 'Favorites', icon: Star },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/subscription', label: 'Subscription', icon: CreditCard },
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

        {isAdmin && (
          <Link
            to="/admin" onClick={onClose}
            className="flex items-center gap-3 px-5 py-4 border-b border-navy-800 text-signal-yellow hover:bg-navy-900 text-[15px]"
          >
            <ShieldCheck size={18} />
            Admin
          </Link>
        )}
      </nav>

      <div className="border-t border-navy-700">
        <button
          onClick={() => { onClose(); signOut() }}
          className="flex items-center gap-3 px-5 py-4 text-white/70 hover:text-white hover:bg-navy-900 text-[15px] w-full text-left"
        >
          <LogOut size={18} />
          Log out
        </button>
      </div>
    </div>
  )
}