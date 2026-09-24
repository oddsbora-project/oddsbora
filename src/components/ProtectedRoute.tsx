import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/lib/auth-context'

export default function ProtectedRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-950">
        <div className="animate-pulse text-navy-600 font-mono text-sm">Loading OddsBora…</div>
      </div>
    )
  }

  // Remember where the user was trying to go (e.g. /admin) so Login.tsx
  // can send them back there after they sign in, instead of always
  // dropping them on /dashboard.
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />
  return <Outlet />
}
