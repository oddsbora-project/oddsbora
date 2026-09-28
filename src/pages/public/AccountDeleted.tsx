import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'

export default function AccountDeleted() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-signal-green/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-navy-950/5 blur-3xl" />
      </div>

      <div className="w-full max-w-sm text-center">
        <div className="w-12 h-12 rounded-2xl bg-signal-green/10 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={22} className="text-signal-green" />
        </div>
        <div className="glass-panel-light rounded-3xl shadow-sm border border-black/5 p-6">
          <h1 className="text-xl font-display font-bold text-navy-950 mb-2">Your account has been deleted</h1>
          <p className="text-slate-500 text-sm mb-6">
            Your profile and personal data have been removed. You're welcome back any time.
          </p>
          <Link to="/" className="btn-primary block w-full text-center">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
