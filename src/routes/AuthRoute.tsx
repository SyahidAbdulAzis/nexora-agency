import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

interface AuthRouteProps {
  children: React.ReactNode
}

export function AuthRoute({ children }: AuthRouteProps) {
  const { isAuthenticated, loading } = useAuthContext()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent" />
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
