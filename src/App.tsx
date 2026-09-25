import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/lib/auth-context'
import Layout from '@/components/Layout'
import AppLayout from '@/components/AppLayout'
import ProtectedRoute from '@/components/ProtectedRoute'
import AdminRoute from '@/components/AdminRoute'
import AdminLayout from '@/components/AdminLayout'
import CookieConsentBanner from '@/components/CookieConsentBanner'

import Landing from '@/pages/public/Landing'
import Features from '@/pages/public/Features'
import HowItWorks from '@/pages/public/HowItWorks'
import Markets from '@/pages/public/Markets'
import News from '@/pages/public/News'
import NewsDetail from '@/pages/public/NewsDetail'
import About from '@/pages/public/About'
import ResponsibleUse from '@/pages/public/ResponsibleUse'
import Login from '@/pages/public/Login'
import Register from '@/pages/public/Register'
import ForgotPassword from '@/pages/public/ForgotPassword'
import PrivacyPolicy from '@/pages/public/PrivacyPolicy'
import TermsOfService from '@/pages/public/TermsOfService'
import CookiePolicy from '@/pages/public/CookiePolicy'

import Dashboard from '@/pages/app/Dashboard'
import Matches from '@/pages/app/Matches'
import MatchDetail from '@/pages/app/MatchDetail'
import Signals from '@/pages/app/Signals'
import Analysis from '@/pages/app/Analysis'
import Performance from '@/pages/app/Performance'
import Favorites from '@/pages/app/Favorites'
import Notifications from '@/pages/app/Notifications'
import Profile from '@/pages/app/Profile'
import Subscription from '@/pages/app/Subscription'

import AdminOverview from '@/pages/admin/Overview'
import AdminMatches from '@/pages/admin/Matches'
import AdminTips from '@/pages/admin/Tips'
import AdminOdds from '@/pages/admin/Odds'
import AdminPredictions from '@/pages/admin/Predictions'
import AdminUsers from '@/pages/admin/Users'
import AdminAudit from '@/pages/admin/Audit'

export default function App() {
  return (
    <AuthProvider>
      <CookieConsentBanner />
      <Routes>
        {/* Public Routes */}
        <Route element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="features" element={<Features />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="markets" element={<Markets />} />
          <Route path="news" element={<News />} />
          <Route path="news/:id" element={<NewsDetail />} />
          <Route path="about" element={<About />} />
          <Route path="responsible-use" element={<ResponsibleUse />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
          <Route path="cookie-policy" element={<CookiePolicy />} />
        </Route>

        {/* Protected App Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="matches" element={<Matches />} />
            <Route path="matches/:id" element={<MatchDetail />} />
            <Route path="signals" element={<Signals />} />
            <Route path="analysis" element={<Analysis />} />
            <Route path="performance" element={<Performance />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<Profile />} />
            <Route path="subscription" element={<Subscription />} />
          </Route>

          {/* Protected Admin Routes */}
          <Route element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="admin" element={<AdminOverview />} />
              <Route path="admin/matches" element={<AdminMatches />} />
              <Route path="admin/tips" element={<AdminTips />} />
              <Route path="admin/odds" element={<AdminOdds />} />
              <Route path="admin/predictions" element={<AdminPredictions />} />
              <Route path="admin/users" element={<AdminUsers />} />
              <Route path="admin/audit" element={<AdminAudit />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  )
}
