import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Home, ListChecks, Radio, User, Menu as MenuIcon } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import AppMobileMenu from './AppMobileMenu'
import KenyaFlagBadge from './KenyaFlagBadge'

const BOTTOM_TABS = [
  { to: '/dashboard', label: 'Dashboard', icon: Home },
  { to: '/matches', label: 'Matches', icon: ListChecks },
  { to: '/signals', label: 'Signals', icon: Radio },
  { to: '/profile', label: 'Profile', icon: User },
]

const DESKTOP_NAV = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/matches', label: 'Matches' },
  { to: '/signals', label: 'Signals' },
  { to: '/analysis', label: 'Analysis' },
  { to: '/performance', label: 'Performance' },
]

export default function AppLayout() {
  const { signOut } = useAuth()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-navy-950 pb-16 md:pb-0">
      <header className="sticky top-0 z-40 pt-3 px-3">
        <div className="nav-pill header-logo-in">
          <Link to="/dashboard" className="flex items-center">
            <img src="/oddsbora-logo.png" alt="OddsBora" className="h-9 w-auto object-contain" />
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
            {DESKTOP_NAV.map((item) => (
              <Link key={item.to} to={item.to} className="hover:text-white">{item.label}</Link>
            ))}
            <Link to="/notifications" className="hover:text-white">Notifications</Link>
            <button onClick={signOut} className="text-white/50 hover:text-white">Log out</button>
          </nav>

          <div className="md:hidden">
            <KenyaFlagBadge />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-navy-900 border-t border-white/10 flex justify-around py-2 z-40">
        {BOTTOM_TABS.map((item) => {
          const Icon = item.icon
          const active = location.pathname.startsWith(item.to)
          return (
            <Link
              key={item.to} to={item.to}
              className={`flex flex-col items-center gap-0.5 text-[11px] px-3 py-1 ${active ? 'text-signal-green' : 'text-white/50'}`}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          )
        })}
        <button onClick={() => setMenuOpen(true)} className="flex flex-col items-center gap-0.5 text-[11px] px-3 py-1 text-white/50">
          <MenuIcon size={20} />
          Menu
        </button>
      </nav>

      <AppMobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  )
}
