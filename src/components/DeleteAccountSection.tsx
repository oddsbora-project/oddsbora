import { useEffect, useRef, useState, FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FunctionsHttpError } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/auth-context'
import { AlertTriangle, AlertCircle, Trash2 } from 'lucide-react'

type Step = 'idle' | 'confirm' | 'code'

export default function DeleteAccountSection() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { hash } = useLocation()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState<Step>('idle')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)

  // Lets a link like /profile#delete-account jump straight to this section.
  useEffect(() => {
    if (hash === '#delete-account') {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [hash])

  function reset() {
    setStep('idle')
    setCode('')
    setError(null)
    setInfo(null)
  }

  // Sends a one-time code to the user's own email address.
  // shouldCreateUser: false makes sure this can never create a new account.
  async function sendCode() {
    if (!user?.email) return
    setError(null)
    setInfo(null)
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
    setInfo(`We sent a code to ${user.email}.`)
    setStep('code')
  }

  // The code is checked on the server by the delete-account function.
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

    // Account is gone on the server. Clear the local session and leave.
    await supabase.auth.signOut({ scope: 'local' })
    navigate('/', { replace: true })
  }

  return (
    <div id="delete-account" ref={sectionRef} className="mt-10 rounded-xl border border-red-500/30 bg-red-500/5 p-4">
      <div className="flex items-center gap-2 mb-1">
        <AlertTriangle size={16} className="text-red-400" />
        <h2 className="text-sm font-bold text-red-400">Delete account</h2>
      </div>

      {step === 'idle' && (
        <>
          <p className="text-sm text-white/60 mb-4">
            Permanently delete your OddsBora account and personal data. This cannot be undone.
          </p>
          <button
            onClick={() => setStep('confirm')}
            className="w-full rounded-full border border-red-500/40 text-red-400 text-sm font-semibold py-2.5 hover:bg-red-500/10 transition-colors"
          >
            Delete my account
          </button>
        </>
      )}

      {step === 'confirm' && (
        <div className="space-y-4">
          <p className="text-sm text-white/60">Deleting your account will permanently remove:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-white/60">
            <li>Your profile and login</li>
            <li>Your favorites, notifications, and preferences</li>
            <li>Your subscription record</li>
          </ul>
          <p className="text-sm text-white/60">
            Any paid subscription period still remaining is not refunded, as set out in our Terms of Service.
          </p>
          <p className="text-sm text-white/60">
            To confirm it's you, we'll email a verification code to <span className="text-white">{user?.email}</span>.
          </p>
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          <div className="flex gap-2">
            <button onClick={reset} className="btn-secondary flex-1">
              Cancel
            </button>
            <button
              onClick={sendCode}
              disabled={loading}
              className="flex-1 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2.5 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Sending…' : 'Send code'}
            </button>
          </div>
        </div>
      )}

      {step === 'code' && (
        <form onSubmit={handleDelete} className="space-y-4">
          {info && <p className="text-sm text-white/60">{info} Enter it below to permanently delete your account.</p>}
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          <div>
            <label htmlFor="delete-code" className="text-sm text-white/60 block mb-1">
              Verification code
            </label>
            <input
              id="delete-code"
              required
              inputMode="numeric"
              autoComplete="one-time-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="6-digit code"
              className="w-full bg-navy-900 border border-navy-600 rounded-lg px-3 py-2.5 text-sm tracking-widest placeholder:tracking-normal outline-none focus:border-red-400"
            />
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={reset} className="btn-secondary flex-1">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || code.trim().length < 6}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2.5 disabled:opacity-50 transition-colors"
            >
              <Trash2 size={14} />
              {loading ? 'Deleting…' : 'Delete permanently'}
            </button>
          </div>
          <button
            type="button"
            onClick={sendCode}
            disabled={loading}
            className="w-full text-center text-xs text-white/40 hover:text-white/70 transition-colors disabled:opacity-50"
          >
            Didn't get a code? Resend
          </button>
        </form>
      )}
    </div>
  )
}
