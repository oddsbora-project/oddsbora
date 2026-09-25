import { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { User, Mail, Lock, Eye, EyeOff, ShieldCheck, AlertCircle, MailCheck } from 'lucide-react'

const MIN_PASSWORD_LENGTH = 6

export default function Register() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`)
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter them.')
      return
    }

    setLoading(true)
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    })
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    if (data.session) {
      navigate('/dashboard')
    } else {
      setDone(true)
    }
  }

  if (done) {
    return (
      <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-signal-green/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-navy-950/5 blur-3xl" />
        </div>
        <div className="w-full max-w-sm text-center">
          <div className="w-12 h-12 rounded-2xl bg-signal-green/10 flex items-center justify-center mx-auto mb-4">
            <MailCheck size={22} className="text-signal-green" />
          </div>
          <div className="glass-panel-light rounded-3xl shadow-sm border border-black/5 p-6">
            <h1 className="text-xl font-display font-bold text-navy-950 mb-2">Check your email</h1>
            <p className="text-slate-500 text-sm">
              We sent a confirmation link to <span className="font-semibold text-navy-950">{email}</span>. Open it to activate your account.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-signal-green/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-navy-950/5 blur-3xl" />
      </div>

      <div className="w-full max-w-sm">
        {/* Brand mark — security/account-creation themed */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-signal-green/10 flex items-center justify-center mb-4">
            <ShieldCheck size={22} className="text-signal-green" />
          </div>
          <h1 className="text-2xl font-display font-bold text-navy-950">Create your account</h1>
          <p className="text-slate-500 text-sm mt-1">Free to join. You must be 18 or older to use OddsBora.</p>
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
              <label htmlFor="register-name" className="text-xs font-semibold text-slate-500 block mb-1.5">
                Full name
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="register-name"
                  required
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-white border border-black/10 rounded-xl pl-10 pr-3 py-2.5 text-sm text-navy-950 placeholder:text-slate-400 outline-none transition-colors focus:border-signal-green focus:ring-2 focus:ring-signal-green/20"
                />
              </div>
            </div>

            <div>
              <label htmlFor="register-email" className="text-xs font-semibold text-slate-500 block mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="register-email"
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
              <label htmlFor="register-password" className="text-xs font-semibold text-slate-500 block mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={MIN_PASSWORD_LENGTH}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
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
              <p className="text-xs text-slate-400 mt-1.5">
                6+ characters — letters, numbers, and symbols are all fine.
              </p>
            </div>

            <div>
              <label htmlFor="register-confirm-password" className="text-xs font-semibold text-slate-500 block mb-1.5">
                Confirm password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="register-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  minLength={MIN_PASSWORD_LENGTH}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className="w-full bg-white border border-black/10 rounded-xl pl-10 pr-11 py-2.5 text-sm text-navy-950 placeholder:text-slate-400 outline-none transition-colors focus:border-signal-green focus:ring-2 focus:ring-signal-green/20"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((s) => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy-950 transition-colors"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50 mt-2">
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>
        </div>

        <p className="text-slate-500 text-sm text-center mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-signal-green font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
