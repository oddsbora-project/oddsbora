import { SignalStatus, RiskLevel, ConfidenceLevel } from './types'

// Central place for how signal/risk/confidence states are labeled and colored.
// Keeping this in one module avoids inconsistent copy across pages.

export const SIGNAL_LABELS: Record<SignalStatus, string> = {
  VALUE_SIGNAL: 'Value Signal',
  NEUTRAL: 'Neutral',
  NO_EDGE: 'No Edge',
  WAIT: 'Wait',
  HIGH_RISK: 'High Risk',
  INSUFFICIENT_DATA: 'Insufficient Data',
}

export const SIGNAL_COLORS: Record<SignalStatus, string> = {
  VALUE_SIGNAL: 'text-signal-green',
  NEUTRAL: 'text-white/60',
  NO_EDGE: 'text-white/40',
  WAIT: 'text-signal-yellow',
  HIGH_RISK: 'text-signal-red',
  INSUFFICIENT_DATA: 'text-white/40',
}

export const RISK_COLORS: Record<RiskLevel, string> = {
  LOW: 'text-signal-green',
  MODERATE: 'text-signal-yellow',
  HIGH: 'text-orange-400',
  VERY_HIGH: 'text-signal-red',
  INSUFFICIENT_DATA: 'text-white/40',
}

export const CONFIDENCE_COLORS: Record<ConfidenceLevel, string> = {
  HIGH: 'text-signal-green',
  MEDIUM: 'text-signal-yellow',
  LOW: 'text-white/50',
}

export function formatPct(value: number | null): string {
  if (value === null || value === undefined) return '—'
  return `${Math.round(value * 100)}%`
}

export function formatEdge(value: number | null): string {
  if (value === null || value === undefined) return '—'
  const pts = Math.round(value * 100)
  return pts > 0 ? `+${pts} pts` : `${pts} pts`
}