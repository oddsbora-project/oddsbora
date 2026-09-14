import { Link, useLocation } from 'react-router-dom'
import { Home, BarChart3, Tag, Menu as MenuIcon, User } from 'lucide-react'

interface PublicBottomNavProps {
  onMenuClick: () => void
}

const TABS = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/markets', label: 'Markets', icon: BarChart3 },
  { to: '/pricing', label: 'Pricing', icon: Tag },
]

export default function PublicBottomNav({ onMenuClick }: PublicBottomNavProps) {
  const location = useLocation()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-navy-900 border-t border-navy-700 flex justify-around py-2 z-40">
      {TABS.map((tab) => {
        const Icon = tab.icon
        const active = location.pathname === tab.to
        return (
          <Link
            key={tab.to} to={tab.to}
            className={`flex flex-col items-center gap-0.5 text-[11px] px-3 py-1 ${active ? 'text-signal-green' : 'text-white/50'}`}
          >
            <Icon size={20} />
            {tab.label}
          </Link>
        )
      })}
      {/* Account is one equal-weight tab among others \u2014 not a forced flow */}
      <Link to="/login" className="flex flex-col items-center gap-0.5 text-[11px] px-3 py-1 text-white/50">
        <User size={20} />
        Account
      </Link>
      <button onClick={onMenuClick} className="flex flex-col items-center gap-0.5 text-[11px] px-3 py-1 text-white/50">
        <MenuIcon size={20} />
        Menu
      </button>
    </nav>
  )
}