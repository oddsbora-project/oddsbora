import { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Mail, Lock, Eye, EyeOff, KeyRound, AlertCircle, CheckCircle2 } from 'lucide-react'

const MIN_PASSWORD_LENGTH = 6

export default function ForgotPassword() {
  const [step, setStep] = useState<'request' | 'reset'>('request')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const navigate = useNavigate()

  // Step 1: send a recovery code to the user's email.
  // Requires the "Reset Password" email template in Supabase to use
  // {{ .Token }} so it sends a code instead of a magic link.
  async function handleRequestCode(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    setStep('reset')
  }

  async function handleResendCode() {
    setError(null)
    setResending(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    setResending(false)
    if (error) setError(error.message)
  }

  // Step 2: verify the emailed code, then set the new password.
  async function handleResetPassword(e: FormEvent) {
    e.preventDefault()
    setError(null)

    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`)
      return
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please re-enter them.')
      return
    }

    setLoading(true)

    const { error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token: code,
      type: 'recovery',
    })
    if (verifyError) {
      setLoading(false)
      setError(verifyError.message)
      return
    }

    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword })
    setLoading(false)
    if (updateError) {
      setError(updateError.message)
      return
    }

    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-signal-green/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-navy-950/5 blur-3xl" />
      </div>

      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-signal-green/10 flex items-center justify-center mb-4">
            <KeyRound size={22} className="text-signal-green" />
          </div>
          <h1 className="text-2xl font-display font-bold text-navy-950">
            {step === 'request' ? 'Reset your password' : 'Enter your code'}
          </h1>
          <p className="text-slate-500 text-sm mt-1 text-center">
            {step === 'request'
              ? "We'll email you a verification code."
              : (
                <>
                  We sent a code to <span className="font-semibold text-navy-950">{email}</span>
                </>
              )}
          </p>
        </div>

        <div className="glass-panel-light rounded-3xl shadow-sm border border-black/5 p-6">
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm mb-4">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {step === 'request' ? (
            <form onSubmit={handleRequestCode} className="space-y-4">
              <div>
                <label htmlFor="fp-email" className="text-xs font-semibold text-slate-500 block mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="fp-email"
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
              <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50 mt-2">
                {loading ? 'Sending code…' : 'Send verification code'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label htmlFor="fp-code" className="text-xs font-semibold text-slate-500 block mb-1.5">
                  Verification code
                </label>
                <input
                  id="fp-code"
                  required
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="6-digit code"
                  className="w-full bg-white border border-black/10 rounded-xl px-3.5 py-2.5 text-sm text-navy-950 tracking-widest placeholder:text-slate-400 placeholder:tracking-normal outline-none transition-colors focus:border-signal-green focus:ring-2 focus:ring-signal-green/20"
                />
              </div>

              <div>
                <label htmlFor="fp-new-password" className="text-xs font-semibold text-slate-500 block mb-1.5">
                  New password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="fp-new-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={MIN_PASSWORD_LENGTH}
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
              </div>

              <div>
                <label htmlFor="fp-confirm-password" className="text-xs font-semibold text-slate-500 block mb-1.5">
                  Confirm new password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="fp-confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    minLength={MIN_PASSWORD_LENGTH}
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
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
                {loading ? 'Resetting…' : 'Reset password'}
              </button>

              <button
                type="button"
                onClick={handleResendCode}
                disabled={resending}
                className="w-full text-center text-xs text-slate-500 hover:text-signal-green transition-colors disabled:opacity-50"
              >
                {resending ? 'Resending…' : "Didn't get a code? Resend"}
              </button>
            </form>
          )}
        </div>

        {step === 'reset' && (
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mt-4">
            <CheckCircle2 size={14} className="text-signal-green" />
            Code sent — check your inbox and spam folder.
          </div>
        )}

        <p className="text-slate-500 text-sm text-center mt-6">
          Remembered it?{' '}
          <Link to="/login" className="text-signal-green font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
