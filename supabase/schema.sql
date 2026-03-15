-- Nexora Agency - Database Schema
-- Jalankan file ini di Supabase SQL Editor: https://app.supabase.com → SQL Editor → New Query

-- Table: blog_posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  author_id UUID REFERENCES auth.users(id),
  author_name TEXT NOT NULL,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published BOOLEAN DEFAULT true
);

-- Enable Row Level Security (RLS)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Siapa saja bisa membaca post yang published
CREATE POLICY "Public can read published posts"
  ON blog_posts FOR SELECT
  USING (published = true);

-- Policy: Hanya user terautentikasi yang bisa insert
CREATE POLICY "Authenticated users can insert"
  ON blog_posts FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Policy: User hanya bisa update post milik sendiri
CREATE POLICY "Users can update own posts"
  ON blog_posts FOR UPDATE
  USING (auth.uid() = author_id);

-- Policy: User hanya bisa delete post milik sendiri
CREATE POLICY "Users can delete own posts"
  ON blog_posts FOR DELETE
  USING (auth.uid() = author_id);
