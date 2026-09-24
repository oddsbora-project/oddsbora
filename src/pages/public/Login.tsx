import { useState, FormEvent } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Mail, Lock, Eye, EyeOff, Activity, AlertCircle } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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
    // ProtectedRoute passes it via location.state.from — send them back
    // there instead of always dropping them on /dashboard.
    const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname
    navigate(from ?? '/dashboard', { replace: true })
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-signal-green/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-navy-950/5 blur-3xl" />
      </div>

      <div className="w-full max-w-sm">
        {/* Brand mark */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-signal-green/10 flex items-center justify-center mb-4">
            <Activity size={22} className="text-signal-green" />
          </div>
          <h1 className="text-2xl font-display font-bold text-navy-950">Welcome back</h1>
          <p className="text-slate-500 text-sm mt-1">Log in to see today's picks</p>
        </div>

        {/* Card */}
        <div className="glass-panel-light rounded-3xl shadow-sm border border-black/5 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                <AlertCircle size={16} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="login-email" className="text-xs font-semibold text-slate-500 block mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="login-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-white border border-black/10 rounded-xl pl-10 pr-3 py-2.5 text-sm text-navy-950 placeholder:text-slate-400 outline-none transition-colors focus:border-signal-green focus:ring-2 focus:ring-signal-green/20"
                />
              </div>
            </div>

            <div>
              <label htmlFor="login-password" className="text-xs font-semibold text-slate-500 block mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border border-black/10 rounded-xl pl-10 pr-11 py-2.5 text-sm text-navy-950 placeholder:text-slate-400 outline-none transition-colors focus:border-signal-green focus:ring-2 focus:ring-signal-green/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy-950 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50 mt-2">
              {loading ? 'Logging in…' : 'Log in'}
            </button>
          </form>
        </div>

        <p className="text-slate-500 text-sm text-center mt-6">
          No account?{' '}
          <Link to="/register" className="text-signal-green font-semibold hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}
