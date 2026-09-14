import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/auth-context'

export default function AdminRoute() {
  const { user } = useAuth()
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

  useEffect(() => {
    if (!user) return
    supabase.from('profiles').select('role').eq('id', user.id).maybeSingle().then(({ data }) => {
      setIsAdmin(data?.role === 'admin')
    })
  }, [user])

  if (isAdmin === null) {
    return <div className="min-h-screen flex items-center justify-center text-white/50 font-mono text-sm">Checking permissions…</div>
  }
  if (!isAdmin) return <Navigate to="/dashboard" replace />
  return <Outlet />
}