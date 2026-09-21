import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import MobileMenu from './MobileMenu'
import PublicBottomNav from './PublicBottomNav'
import KenyaFlagBadge from './KenyaFlagBadge'
import OddsBoraLogo from './OddsBoraLogo' // Import the new component

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-white pb-16 md:pb-0">
      <header className="sticky top-0 z-40 pt-3 px-3">
        <div className="nav-pill-light header-logo-in">
          <Link to="/" className="flex items-center">
            {/* New borderless logo */}
            <OddsBoraLogo variant="light" />
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-navy-950/70">
            <Link to="/features" className="hover:text-navy-950 transition">Features</Link>
            <Link to="/how-it-works" className="hover:text-navy-950 transition">How It Works</Link>
            <Link to="/markets" className="hover:text-navy-950 transition">Markets</Link>
            <Link to="/pricing" className="hover:text-navy-950 transition">Pricing</Link>
            <Link to="/login" className="hover:text-navy-950 transition">Log in</Link>
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

      <footer className="hidden md:block border-t border-black/10 text-xs text-navy-950/50 text-center py-6 px-4">
        OddsBora is a sports analytics platform, not a bookmaker. It does not guarantee outcomes or profits.
        18+ only. <Link to="/responsible-use" className="underline hover:text-navy-950 transition">Responsible use</Link>
      </footer>

      <PublicBottomNav onMenuClick={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  )
}