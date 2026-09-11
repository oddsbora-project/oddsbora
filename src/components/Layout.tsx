import { Link, Outlet } from 'react-router-dom'
import { LineChart } from 'lucide-react'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-navy-950">
      <header className="border-b border-navy-700 sticky top-0 bg-navy-950/95 backdrop-blur z-40">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <LineChart className="text-signal-green" size={22} />
            OddsBora
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
            <Link to="/features" className="hover:text-white">Features</Link>
            <Link to="/how-it-works" className="hover:text-white">How It Works</Link>
            <Link to="/pricing" className="hover:text-white">Pricing</Link>
            <Link to="/login" className="hover:text-white">Log in</Link>
            <Link to="/register" className="btn-primary text-sm py-2 px-3">Get Started</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-navy-700 text-xs text-white/40 text-center py-6 px-4">
        OddsBora is a sports analytics platform, not a bookmaker. It does not guarantee outcomes or profits.
        18+ only. <Link to="/responsible-use" className="underline">Responsible use</Link>
      </footer>
    </div>
  )
}