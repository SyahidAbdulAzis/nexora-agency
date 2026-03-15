import type { AuthResponse, Session } from '@supabase/supabase-js'
import { supabase } from './supabase'

export const authService = {
  async signIn(email: string, password: string): Promise<NonNullable<AuthResponse['data']>> {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data!
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  getSession() {
    return supabase.auth.getSession()
  },

  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback)
  },
}
