export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string
export const PUBLIC_APP_URL = (import.meta.env.VITE_PUBLIC_APP_URL as string) || 'http://localhost:5173'

// Distinguishes demo/development sports data from real production data.
// A match/odds row with is_demo = true must always be visibly labeled in the UI (see section 33 of the product spec).
export const IS_DEV = import.meta.env.DEV