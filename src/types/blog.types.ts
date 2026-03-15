export interface BlogPost {
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

export interface BlogPostFormValues {
  title: string
  content: string
  excerpt: string
  tags?: string[]
}
