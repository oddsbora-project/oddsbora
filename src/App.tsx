import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/lib/auth-context'
import Layout from '@/components/Layout'
import ProtectedRoute from '@/components/ProtectedRoute'

import Landing from '@/pages/public/Landing'
import Features from '@/pages/public/Features'
import HowItWorks from '@/pages/public/HowItWorks'
import Markets from '@/pages/public/Markets'
import Pricing from '@/pages/public/Pricing'
import About from '@/pages/public/About'
import ResponsibleUse from '@/pages/public/ResponsibleUse'
import Login from '@/pages/public/Login'
import Register from '@/pages/public/Register'

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

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="features" element={<Features />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="markets" element={<Markets />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="about" element={<About />} />
          <Route path="responsible-use" element={<ResponsibleUse />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
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
        </Route>
      </Routes>
    </AuthProvider>
  )
}