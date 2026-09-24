import { useState, FormEvent } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    // If the user was redirected here from a specific page (e.g. /admin),
    // ProtectedRoute should pass it via location.state.from — send them back
    // there instead of always dropping them on /dashboard.
    const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname
    navigate(from ?? '/dashboard', { replace: true })
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-6">Log in</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-white/60 block mb-1">Email</label>
          <input
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-navy-900 border border-navy-600 rounded-lg px-3 py-2.5 outline-none focus:border-signal-green"
          />
        </div>
        <div>
          <label className="text-sm text-white/60 block mb-1">Password</label>
          <input
            type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-navy-900 border border-navy-600 rounded-lg px-3 py-2.5 outline-none focus:border-signal-green"
          />
        </div>
        {error && <p className="text-signal-red text-sm">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
          {loading ? 'Logging in…' : 'Log in'}
        </button>
      </form>
      <p className="text-white/50 text-sm mt-4">
        No account? <Link to="/register" className="text-signal-green">Create one</Link>
      </p>
    </div>
  )
}
