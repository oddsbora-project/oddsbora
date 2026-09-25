import { useEffect, useState } from 'react'
import { Cookie, X } from 'lucide-react'

const STORAGE_KEY = 'oddsbora-cookie-consent'
const REOPEN_EVENT = 'oddsbora:open-cookie-settings'

interface ConsentState {
  necessary: true // always on — required for login/session to function
  functional: boolean
  analytics: boolean
  marketing: boolean
  decidedAt: string
}

const DEFAULT_PREFS: Omit<ConsentState, 'decidedAt'> = {
  necessary: true,
  functional: true,
  analytics: false,
  marketing: false,
}

/**
 * Reads the visitor's saved cookie choice. Returns null if they haven't
 * decided yet. Any code that loads an analytics or marketing script
 * should check `getCookieConsent()?.analytics` (or `.marketing`) before
 * injecting that script — this banner does not remove cookies already
 * set, it only gates what gets loaded going forward.
 */
export function getCookieConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ConsentState) : null
  } catch {
    return null
  }
}

/** Call this from a "Cookie Settings" link/button anywhere in the app to reopen the banner. */
export function openCookieSettings() {
  window.dispatchEvent(new Event(REOPEN_EVENT))
}

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [prefs, setPrefs] = useState(DEFAULT_PREFS)

  useEffect(() => {
    const existing = getCookieConsent()
    if (existing) {
      setPrefs(existing)
    } else {
      setVisible(true)
    }

    const reopen = () => {
      const current = getCookieConsent()
      if (current) setPrefs(current)
      setExpanded(true)
      setVisible(true)
    }
    window.addEventListener(REOPEN_EVENT, reopen)
    return () => window.removeEventListener(REOPEN_EVENT, reopen)
  }, [])

  function save(next: Omit<ConsentState, 'decidedAt'>) {
    const state: ConsentState = { ...next, decidedAt: new Date().toISOString() }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // localStorage unavailable (e.g. private browsing) — consent still
      // applies for this session via component state.
    }
    setPrefs(state)
    setVisible(false)
    setExpanded(false)
  }

  function acceptAll() {
    save({ necessary: true, functional: true, analytics: true, marketing: true })
  }

  function declineNonEssential() {
    save({ necessary: true, functional: false, analytics: false, marketing: false })
  }

  function savePreferences() {
    save(prefs)
  }

  if (!visible) return null

  return (
    <div className="fixed z-50 bottom-4 right-4 left-4 sm:left-auto sm:bottom-5 sm:right-5">
      <div className="w-full sm:w-80 rounded-xl border border-black/10 bg-white shadow-xl shadow-black/10 overflow-hidden">
        <div className="p-4">
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-signal-green/10 flex items-center justify-center shrink-0">
              <Cookie size={16} className="text-signal-green" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-bold text-navy-950 mb-1">We use cookies</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Necessary cookies keep you signed in; optional ones help us improve the Service. See our{' '}
                <a href="/cookie-policy" className="text-signal-green font-semibold hover:underline">
                  Cookie Policy
                </a>
                .
              </p>
            </div>
            <button
              onClick={declineNonEssential}
              className="text-slate-400 hover:text-navy-950 transition-colors shrink-0"
              aria-label="Dismiss and decline non-essential cookies"
            >
              <X size={16} />
            </button>
          </div>

          {expanded && (
            <div className="mt-3 space-y-3 border-t border-black/5 pt-3 max-h-64 overflow-y-auto">
              <PreferenceRow
                label="Strictly necessary"
                description="Required for login and core functionality. Cannot be turned off."
                checked
                disabled
              />
              <PreferenceRow
                label="Functional"
                description="Remembers preferences like your selected date on Markets."
                checked={prefs.functional}
                onChange={(v) => setPrefs((p) => ({ ...p, functional: v }))}
              />
              <PreferenceRow
                label="Analytics"
                description="Helps us understand aggregate usage so we can improve the Service."
                checked={prefs.analytics}
                onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))}
              />
              <PreferenceRow
                label="Marketing"
                description="Used to measure the effectiveness of any promotional content."
                checked={prefs.marketing}
                onChange={(v) => setPrefs((p) => ({ ...p, marketing: v }))}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1.5 px-4 pb-4">
          {expanded ? (
            <>
              <button onClick={savePreferences} className="btn-primary w-full text-sm py-2">
                Save preferences
              </button>
              <button
                onClick={() => setExpanded(false)}
                className="w-full rounded-full border border-black/10 text-navy-950 text-xs font-semibold py-2 hover:bg-black/5 transition-colors"
              >
                Back
              </button>
            </>
          ) : (
            <>
              <button onClick={acceptAll} className="btn-primary w-full text-sm py-2">
                Accept all
              </button>
              <div className="flex gap-1.5">
                <button
                  onClick={declineNonEssential}
                  className="flex-1 rounded-full border border-black/10 text-navy-950 text-xs font-semibold py-2 hover:bg-black/5 transition-colors"
                >
                  Decline
                </button>
                <button
                  onClick={() => setExpanded(true)}
                  className="flex-1 text-xs font-semibold text-slate-500 hover:text-navy-950 transition-colors py-2"
                >
                  Manage
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function PreferenceRow({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string
  description: string
  checked: boolean
  disabled?: boolean
  onChange?: (v: boolean) => void
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-navy-950">{label}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={`relative shrink-0 w-10 h-6 rounded-full transition-colors ${
          checked ? 'bg-signal-green' : 'bg-black/15'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  )
}
