import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import MobileMenu from './MobileMenu'
import PublicBottomNav from './PublicBottomNav'
import KenyaFlagBadge from './KenyaFlagBadge'

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-navy-950 pb-16 md:pb-0">
      <header className="sticky top-0 z-40 pt-3 px-3">
        <div className="nav-pill header-logo-in">
          <Link to="/" className="flex items-center">
            <img src="/oddsbora-logo.png" alt="OddsBora" className="h-9 w-auto object-contain" />
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
            <Link to="/features" className="hover:text-white">Features</Link>
            <Link to="/how-it-works" className="hover:text-white">How It Works</Link>
            <Link to="/markets" className="hover:text-white">Markets</Link>
            <Link to="/pricing" className="hover:text-white">Pricing</Link>
            <Link to="/login" className="hover:text-white">Log in</Link>
            <Link to="/register" className="btn-primary text-sm py-2 px-4">Get Started</Link>
          </nav>

          <div className="md:hidden">
            <KenyaFlagBadge />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="hidden md:block border-t border-white/10 text-xs text-white/40 text-center py-6 px-4">
        OddsBora is a sports analytics platform, not a bookmaker. It does not guarantee outcomes or profits.
        18+ only. <Link to="/responsible-use" className="underline">Responsible use</Link>
      </footer>

      <PublicBottomNav onMenuClick={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  )
}