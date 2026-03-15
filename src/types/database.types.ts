/**
 * Supabase Database types
 * Run `npx supabase gen types typescript` to regenerate from your Supabase project
 */
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string
          title: string
          content: string
          excerpt: string
          author_id: string
          author_name: string
          tags: string[] | null
          created_at: string
          updated_at: string
          published: boolean
        }
        Insert: {
          id?: string
          title: string
          content: string
          excerpt: string
          author_id: string
          author_name: string
          tags?: string[] | null
          created_at?: string
          updated_at?: string
          published?: boolean
        }
        Update: {
          id?: string
          title?: string
          content?: string
          excerpt?: string
          author_id?: string
          author_name?: string
          tags?: string[] | null
          created_at?: string
          updated_at?: string
          published?: boolean
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
