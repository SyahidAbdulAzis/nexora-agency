import { supabase } from './supabase'
import type { BlogPost, BlogPostFormValues } from '../types/blog.types'

export const blogService = {
  async getPosts(): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data as BlogPost[]
  },

  async getPostsForDashboard(): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data as BlogPost[]
  },

  async getPostById(id: string): Promise<BlogPost | null> {
    const { data, error } = await supabase.from('blog_posts').select('*').eq('id', id).single()
    if (error) throw error
    return data as BlogPost
  },

  async createPost(values: BlogPostFormValues, authorId: string, authorName: string) {
    const { data, error } = await supabase.from('blog_posts').insert({
      title: values.title,
      content: values.content,
      excerpt: values.excerpt,
      author_id: authorId,
      author_name: authorName,
      tags: values.tags ?? null,
      published: true,
    }).select().single()
    if (error) throw error
    return data
  },

  async updatePost(id: string, values: BlogPostFormValues) {
    const { data, error } = await supabase.from('blog_posts').update({
      title: values.title,
      content: values.content,
      excerpt: values.excerpt,
      tags: values.tags ?? null,
      updated_at: new Date().toISOString(),
    }).eq('id', id).select().single()
    if (error) throw error
    return data
  },

  async deletePost(id: string) {
    const { error } = await supabase.from('blog_posts').delete().eq('id', id)
    if (error) throw error
  },
}
