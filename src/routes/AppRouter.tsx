import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { AuthRoute } from './AuthRoute'
import HomePage from '../pages/Home'
import AboutUsPage from '../pages/AboutUs'
import ServicesPage from '../pages/Services'
import TeamsPage from '../pages/Teams'
import BlogList from '../pages/Blog/BlogList'
import BlogDetail from '../pages/Blog/BlogDetail'
import CreateBlog from '../pages/Blog/CreateBlog'
import EditBlog from '../pages/Blog/EditBlog'
import DashboardPage from '../pages/Dashboard'
import LoginPage from '../pages/Login'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/login" element={<AuthRoute><LoginPage /></AuthRoute>} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/blog/create" element={<ProtectedRoute><CreateBlog /></ProtectedRoute>} />
        <Route path="/blog/edit/:id" element={<ProtectedRoute><EditBlog /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
