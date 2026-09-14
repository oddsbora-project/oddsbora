import { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'

export default function Register() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
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
      <div className="max-w-sm mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-3">Check your email</h1>
        <p className="text-white/60 text-sm">We sent a confirmation link to {email}.</p>
      </div>
    )
  }

  return (
    <div className="max-w-sm mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-2">Create account</h1>
      <p className="text-white/50 text-xs mb-6">You must be 18 or older to use OddsBora.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-white/60 block mb-1">Full name</label>
          <input
            required value={fullName} onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-navy-900 border border-navy-600 rounded-lg px-3 py-2.5 outline-none focus:border-signal-green"
          />
        </div>
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
            type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-navy-900 border border-navy-600 rounded-lg px-3 py-2.5 outline-none focus:border-signal-green"
          />
        </div>
        {error && <p className="text-signal-red text-sm">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>
      <p className="text-white/50 text-sm mt-4">
        Already have an account? <Link to="/login" className="text-signal-green">Log in</Link>
      </p>
    </div>
  )
}