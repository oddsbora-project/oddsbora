import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/auth-context'
import { Subscription as SubscriptionType } from '@/lib/types'

export default function Subscription() {
  const { user } = useAuth()
  const [sub, setSub] = useState<SubscriptionType | null>(null)

  useEffect(() => {
    if (!user) return
    supabase.from('subscriptions').select('*').eq('user_id', user.id).maybeSingle().then(({ data }) => {
      if (data) setSub(data as SubscriptionType)
    })
  }, [user])

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Subscription</h1>
      <div className="card mb-4">
        <p className="text-white/50 text-xs mb-1">Current plan</p>
        <p className="text-2xl font-bold">{sub?.plan ?? 'FREE'}</p>
        <p className="text-white/40 text-xs mt-1">Status: {sub?.status ?? 'ACTIVE'}</p>
      </div>
      <div className="card text-white/50 text-sm">
        Pro billing is not yet active — payment integration is planned but not connected.
        Upgrading here won't charge you anything yet.
      </div>
    </div>
  )
}