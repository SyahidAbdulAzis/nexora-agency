export interface User {
  id: string
  email?: string
  user_metadata?: {
    full_name?: string
  }
}

export interface AuthState {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
}
