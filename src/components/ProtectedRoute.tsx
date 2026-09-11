import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/lib/auth-context'

export default function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-950">
        <div className="animate-pulse text-navy-600 font-mono text-sm">Loading OddsBora…</div>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />
  return <Outlet />
}