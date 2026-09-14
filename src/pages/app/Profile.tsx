import { useEffect, useState, FormEvent } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/auth-context'
import { Profile as ProfileType } from '@/lib/types'

export default function Profile() {
  const { user, signOut } = useAuth()
  const [profile, setProfile] = useState<ProfileType | null>(null)
  const [fullName, setFullName] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    supabase.from('profiles').select('*').eq('id', user.id).maybeSingle().then(({ data }) => {
      if (data) {
        setProfile(data as ProfileType)
        setFullName(data.full_name ?? '')
      }
    })
  }, [user])

  async function handleSave(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage(null)
    const { error } = await supabase.from('profiles').update({ full_name: fullName }).eq('id', user!.id)
    setSaving(false)
    setMessage(error ? error.message : 'Saved.')
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="text-sm text-white/60 block mb-1">Email</label>
          <input disabled value={user?.email ?? ''} className="w-full bg-navy-900/50 border border-navy-600 rounded-lg px-3 py-2.5 text-white/50 text-sm" />
        </div>
        <div>
          <label className="text-sm text-white/60 block mb-1">Full name</label>
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-navy-900 border border-navy-600 rounded-lg px-3 py-2.5 outline-none focus:border-signal-green text-sm" />
        </div>
        <div>
          <label className="text-sm text-white/60 block mb-1">Role</label>
          <input disabled value={profile?.role ?? 'user'} className="w-full bg-navy-900/50 border border-navy-600 rounded-lg px-3 py-2.5 text-white/50 text-sm" />
        </div>
        {message && <p className="text-signal-green text-sm">{message}</p>}
        <button type="submit" disabled={saving} className="btn-primary w-full disabled:opacity-50">
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </form>
      <button onClick={signOut} className="btn-secondary w-full mt-4">Log out</button>
    </div>
  )
}