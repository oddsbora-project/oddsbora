export type ConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW'
export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'VERY_HIGH' | 'INSUFFICIENT_DATA'
export type SignalStatus = 'VALUE_SIGNAL' | 'NEUTRAL' | 'NO_EDGE' | 'WAIT' | 'HIGH_RISK' | 'INSUFFICIENT_DATA'
export type MatchStatus = 'SCHEDULED' | 'LIVE' | 'FINISHED' | 'POSTPONED' | 'CANCELLED'
export type MarketType = 'MATCH_WINNER' | 'OVER_UNDER_2_5' | 'BTTS' | 'DOUBLE_CHANCE' | 'DRAW_NO_BET'
export type SettlementResult = 'PENDING' | 'WON' | 'LOST' | 'VOID'

export interface Team {
  id: string
  name: string
  short_name: string | null
  logo_url: string | null
}

export interface League {
  id: string
  name: string
  country: string | null
}

export interface Match {
  id: string
  league_id: string
  home_team_id: string
  away_team_id: string
  kickoff_at: string
  status: MatchStatus
  home_score: number | null
  away_score: number | null
  is_demo: boolean
  league?: League
  home_team?: Team
  away_team?: Team
}

export interface Prediction {
  id: string
  match_id: string
  market: MarketType
  odds_at_publication: number | null
  model_probability: number
  market_probability: number | null
  edge: number | null
  confidence: ConfidenceLevel | null
  risk: RiskLevel | null
  status: SignalStatus
  model_version: string
  data_timestamp: string
  published_at: string
  settlement_result: SettlementResult
  is_demo: boolean
  match?: Match
}

export interface Profile {
  id: string
  full_name: string | null
  username: string | null
  role: 'user' | 'admin'
  country: string | null
}

export interface Subscription {
  plan: 'FREE' | 'PRO'
  status: string
  current_period_end: string | null
}

export interface NotificationRow {
  id: string
  type: string
  title: string
  body: string | null
  is_read: boolean
  created_at: string
}