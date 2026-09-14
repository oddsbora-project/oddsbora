import { Link, Outlet, useLocation } from 'react-router-dom'
import { LineChart, Home, ListChecks, Radio, User } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: Home },
  { to: '/matches', label: 'Matches', icon: ListChecks },
  { to: '/signals', label: 'Signals', icon: Radio },
  { to: '/profile', label: 'Profile', icon: User },
]

export default function AppLayout() {
  const { signOut } = useAuth()
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-navy-950 pb-16 md:pb-0">
      <header className="border-b border-navy-700 sticky top-0 bg-navy-950/95 backdrop-blur z-40">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 font-bold text-lg">
            <LineChart className="text-signal-green" size={22} />
            OddsBora
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
            {NAV_ITEMS.map((item) => (
              <Link key={item.to} to={item.to} className="hover:text-white">{item.label}</Link>
            ))}
            <Link to="/notifications" className="hover:text-white">Notifications</Link>
            <button onClick={signOut} className="text-white/50 hover:text-white">Log out</button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-navy-900 border-t border-navy-700 flex justify-around py-2 z-40">
        {NAV_ITEMS.map((item) => {
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
      </nav>
    </div>
  )
}