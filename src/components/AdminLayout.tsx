import { Link, Outlet, useLocation } from 'react-router-dom'
import { LayoutDashboard, CalendarClock, LineChart, Target, Users, ScrollText, Lightbulb } from 'lucide-react'

const ADMIN_NAV = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
  { to: '/admin/matches', label: 'Matches', icon: CalendarClock },
  { to: '/admin/tips', label: 'Tips', icon: Lightbulb },
  { to: '/admin/odds', label: 'Odds', icon: LineChart },
  { to: '/admin/predictions', label: 'Predictions', icon: Target },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/audit', label: 'Audit Logs', icon: ScrollText },
]

export default function AdminLayout() {
  const location = useLocation()
  return (
    <div className="min-h-screen bg-navy-950">
      <div className="border-b border-navy-700 px-4 py-3">
        <p className="text-xs text-signal-yellow font-mono uppercase tracking-wide">Admin</p>
      </div>
      <div className="flex flex-col md:flex-row">
        <nav className="md:w-56 border-b md:border-b-0 md:border-r border-navy-700 flex md:flex-col overflow-x-auto">
          {ADMIN_NAV.map((item) => {
            const Icon = item.icon
            const active = item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to)
            return (
              <Link
                key={item.to} to={item.to}
                className={`flex items-center gap-2 px-4 py-3 text-sm whitespace-nowrap ${active ? 'text-signal-green bg-navy-900' : 'text-white/60 hover:text-white'}`}
              >
                <Icon size={16} /> {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
