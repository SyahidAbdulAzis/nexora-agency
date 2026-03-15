import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Navbar } from '../../components/common/Navbar'
import { CTASection } from '../../components/common/CTASection'
import { Footer } from '../../components/common/Footer'
import { blogService } from '../../services/blogService'
import type { BlogPost } from '../../types/blog.types'

const fontFamily = "'PP Neue Montreal', system-ui, sans-serif"

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function estimateReadTime(content: string) {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 180))
}

/** Parse inline **bold** into React nodes. */
function parseInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, j) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={j}>{part.slice(2, -2)}</strong>
    }
    return <span key={j}>{part}</span>
  })
}

const textClass = 'text-[clamp(1rem,1.2vw+0.5rem,1.125rem)] leading-relaxed text-[#333]'

/** Render plain text content: paragraphs and lists (lines starting with "- "). */
function PostContent({ content }: { content: string }) {
  const blocks = content.split(/\n\n+/).filter(Boolean)
  const nodes: React.ReactNode[] = []
  let key = 0

  blocks.forEach((block) => {
    const lines = block.split(/\n/).map((l) => l.trim()).filter(Boolean)
    if (lines.length === 0) return

    let i = 0
    while (i < lines.length) {
      const line = lines[i]
      if (line.startsWith('- ')) {
        const listItems: string[] = []
        while (i < lines.length && lines[i].startsWith('- ')) {
          listItems.push(lines[i].slice(2).trim())
          i += 1
        }
        nodes.push(
          <ul key={key++} className={`mt-4 list-none space-y-2 border-t border-[#DDD5CC] pt-4 ${textClass}`} style={{ fontFamily }}>
            {listItems.map((item, idx) => (
              <li key={idx} className="flex items-baseline gap-3 border-b border-[#DDD5CC] pb-2 last:border-b-0">
                <span className="shrink-0 font-medium text-[#292929]" aria-hidden>•</span>
                <span className="flex-1">{parseInline(item)}</span>
              </li>
            ))}
          </ul>
        )
      } else {
        nodes.push(
          <p key={key++} className={textClass} style={{ fontFamily }}>
            {parseInline(line)}
          </p>
        )
        i += 1
      }
    }
  })

  return <div className="space-y-6">{nodes}</div>
}

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!id) {
      setNotFound(true)
      setLoading(false)
      return
    }
    let cancelled = false
    setLoading(true)
    setNotFound(false)
    blogService
      .getPostById(id)
      .then((data) => {
        if (!cancelled) setPost(data ?? null)
        if (!cancelled && !data) setNotFound(true)
      })
      .catch(() => {
        if (!cancelled) setNotFound(true)
        if (!cancelled) setPost(null)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [id])

  if (loading) {
    return (
      <main className="flex min-h-screen w-full flex-col bg-[#F5F0E8]" style={{ fontFamily }}>
        <section className="w-full px-6 pt-6 md:px-12 md:pt-8 lg:px-16">
          <div className="flex w-full flex-col pb-8">
            <Navbar />
          </div>
        </section>
        <div className="flex flex-1 items-center justify-center px-6 py-24 md:px-12 lg:px-16">
          <p className="text-[clamp(0.9375rem,1.2vw+0.5rem,1.125rem)] text-[#666]">Loading…</p>
        </div>
      </main>
    )
  }

  if (notFound || !post) {
    return (
      <main className="flex min-h-screen w-full flex-col bg-[#F5F0E8]" style={{ fontFamily }}>
        <section className="w-full px-6 pt-6 md:px-12 md:pt-8 lg:px-16">
          <div className="flex w-full flex-col pb-8">
            <Navbar />
          </div>
        </section>
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center md:px-12 lg:px-16">
          <h1 className="text-[clamp(1.75rem,3vw+1rem,2.5rem)] font-bold text-[#292929]" style={{ fontFamily }}>
            Post not found
          </h1>
          <p className="max-w-md text-[clamp(0.9375rem,1.2vw+0.5rem,1.125rem)] text-[#666]">
            The post may have been removed or the link is incorrect.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center justify-center rounded-[9999px] bg-[#6EDD80] px-6 py-3 text-[clamp(0.95rem,1.1vw+0.5rem,1.05rem)] font-bold text-[#292929] transition-opacity hover:opacity-90"
            style={{ fontFamily }}
          >
            Back to blog
          </Link>
        </div>
      </main>
    )
  }

  const readTime = estimateReadTime(post.content)

  return (
    <main className="flex min-h-screen w-full flex-col bg-[#F5F0E8]" style={{ fontFamily }}>
      <section className="w-full px-6 pt-6 md:px-12 md:pt-8 lg:px-16" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="flex w-full flex-col pb-6 md:pb-8">
          <Navbar />
        </div>
      </section>

      <article className="flex-1 px-6 pb-16 md:px-12 md:pb-20 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[clamp(0.9rem,1.1vw+0.4rem,1rem)] font-medium text-[#292929] transition-opacity hover:opacity-70"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to blog
          </Link>

          <header className="mt-8 border-b border-[#DDD5CC] pb-8">
            <h1
              className="text-[clamp(2rem,4vw+1.5rem,3.25rem)] font-bold leading-[1.08] tracking-tight"
              style={{ color: '#292929' }}
            >
              {post.title}
            </h1>
            <p className="mt-4 text-[clamp(0.9375rem,1.2vw+0.5rem,1.125rem)] leading-relaxed text-[#555]">
              {post.excerpt}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-1 text-[clamp(0.8125rem,1vw+0.35rem,1rem)] text-[#666]">
              <span>{post.author_name}</span>
              <span>{formatDate(post.created_at)}</span>
              <span>{readTime} min read</span>
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#292929]/10 px-3 py-1 text-[clamp(0.8125rem,1vw+0.35rem,1rem)] font-medium text-[#292929]"
                    style={{ fontFamily }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div className="mt-10">
            <PostContent content={post.content} />
          </div>
        </div>
      </article>

      <div className="w-full border-t border-[rgba(41,41,41,0.1)]">
        <CTASection />
      </div>
      <Footer />
    </main>
  )
}
