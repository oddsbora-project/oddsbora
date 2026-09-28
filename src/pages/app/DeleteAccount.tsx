import { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FunctionsHttpError } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/auth-context'
import { UserX, KeyRound, X, AlertCircle } from 'lucide-react'

type Step = 'review' | 'verify'

const REMOVED_ITEMS = [
  'Your profile and login',
  'Your favorites, notifications, and preferences',
  'Your subscription record',
]

export default function DeleteAccount() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('review')
  const [understood, setUnderstood] = useState(false)
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Emails a one-time code to the user's own address.
  // shouldCreateUser: false guarantees this can never create an account.
  async function sendCode() {
    if (!user?.email) return
    setError(null)
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({
      email: user.email,
      options: { shouldCreateUser: false },
    })
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    setStep('verify')
  }

  // The code is verified on the server by the delete-account function.
  async function handleDelete(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.functions.invoke('delete-account', { body: { code: code.trim() } })

    if (error) {
      let message = 'We could not delete your account. Please try again.'
      if (error instanceof FunctionsHttpError) {
        try {
          const body = await error.context.json()
          if (body?.error) message = body.error
        } catch {
          // keep the generic message
        }
      }
      setLoading(false)
      setError(message)
      return
    }

    // Go to the public confirmation page first, then clear the local session,
    // so the protected-route guard can't bounce us to /login mid-way.
    navigate('/account-deleted', { replace: true })
    await supabase.auth.signOut({ scope: 'local' })
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-red-500/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-navy-950/5 blur-3xl" />
      </div>

      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center mb-4">
            <UserX size={22} className="text-red-500" />
          </div>
          <h1 className="text-2xl font-display font-bold text-navy-950">Delete your account</h1>
          <p className="text-slate-500 text-sm mt-1 text-center">
            {step === 'review' ? (
              'This permanently removes your OddsBora account.'
            ) : (
              <>
                Enter the code we sent to <span className="font-semibold text-navy-950">{user?.email}</span>
              </>
            )}
          </p>
        </div>

        {/* Card */}
        <div className="glass-panel-light rounded-3xl shadow-sm border border-black/5 p-6">
          <p className="text-xs font-semibold text-slate-400 mb-4">Step {step === 'review' ? 1 : 2} of 2</p>

          {error && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm mb-4">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {step === 'review' ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-navy-950 mb-2">This will permanently remove:</p>
                <ul className="space-y-2">
                  {REMOVED_ITEMS.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <X size={14} className="text-red-500 shrink-0 mt-1" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-signal-yellow/30 bg-signal-yellow/5 p-3">
                <p className="text-xs text-navy-950 leading-relaxed">
                  Any paid time still remaining on your plan is not refunded. See our{' '}
                  <Link
                    to="/terms-of-service"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-signal-green font-semibold hover:underline"
                  >
                    Terms of Service
                  </Link>
                  .
                </p>
              </div>

              <label className="flex items-start gap-2.5 text-sm text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={understood}
                  onChange={(e) => setUnderstood(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-black/20 text-red-500 focus:ring-red-500/30 shrink-0"
                />
                <span>I understand this is permanent and cannot be undone.</span>
              </label>

              <button
                onClick={sendCode}
                disabled={!understood || loading}
                className="w-full rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Sending code…' : 'Send verification code'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleDelete} className="space-y-4">
              <div>
                <label htmlFor="delete-code" className="text-xs font-semibold text-slate-500 block mb-1.5">
                  Verification code
                </label>
                <div className="relative">
                  <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="delete-code"
                    required
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="6-digit code"
                    className="w-full bg-white border border-black/10 rounded-xl pl-10 pr-3 py-2.5 text-sm text-navy-950 tracking-widest placeholder:tracking-normal placeholder:text-slate-400 outline-none transition-colors focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || code.trim().length < 6}
                className="w-full rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Deleting…' : 'Permanently delete my account'}
              </button>

              <div className="flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setStep('review')
                    setCode('')
                    setError(null)
                  }}
                  className="text-slate-500 hover:text-navy-950 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={sendCode}
                  disabled={loading}
                  className="text-slate-500 hover:text-signal-green transition-colors disabled:opacity-50"
                >
                  Didn't get a code? Resend
                </button>
              </div>
            </form>
          )}
        </div>

        <p className="text-slate-500 text-sm text-center mt-6">
          Changed your mind?{' '}
          <Link to="/profile" className="text-signal-green font-semibold hover:underline">
            Keep my account
          </Link>
        </p>
      </div>
    </div>
  )
}
