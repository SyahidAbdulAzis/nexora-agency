import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../../components/common/Navbar'
import { CTASection } from '../../components/common/CTASection'
import { Footer } from '../../components/common/Footer'
import { blogService } from '../../services/blogService'
import type { BlogPost } from '../../types/blog.types'

const fontFamily = "'PP Neue Montreal', system-ui, sans-serif"

const CARD_COLORS = ['#3B82F6', '#6EDD80', '#C4714F', '#8B5CF6', '#EAB308', '#292929']

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

function estimateReadTime(content: string) {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 180))
}

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    blogService
      .getPosts()
      .then((data) => {
        if (!cancelled) setPosts(data)
      })
      .catch(() => {
        if (!cancelled) setPosts([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [filterOpen, setFilterOpen] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false)
      }
    }
    if (filterOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [filterOpen])

  const allTags = Array.from(
    new Set(posts.flatMap((p) => p.tags ?? []).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b))

  const filteredPosts = selectedTag
    ? posts.filter((p) => p.tags?.includes(selectedTag))
    : posts

  const featured = filteredPosts[0] ?? null
  const rest = featured ? filteredPosts.slice(1) : filteredPosts

  return (
    <main className="flex min-h-screen w-full flex-col bg-[#F5F0E8]" style={{ fontFamily }}>
      <section className="w-full px-6 pt-6 md:px-12 md:pt-8 lg:px-16" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="flex w-full flex-col pb-8 md:pb-10">
          <Navbar />
        </div>
      </section>

      {/* Hero header — light beige, "Welcome to our blog" + wavy graphic */}
      <section
        className="relative w-full overflow-hidden px-6 pb-12 md:px-12 md:pb-16 lg:px-16"
        style={{ backgroundColor: '#F5F0E8' }}
      >
        <div className="relative z-10">
          <h1
            className="max-w-2xl text-[clamp(2.25rem,5vw+1.5rem,4rem)] font-medium leading-[1.1] tracking-tight"
            style={{ color: '#292929' }}
          >
            Welcome to our <em className="font-normal italic">blog</em>
          </h1>
          <p className="mt-4 max-w-xl text-[clamp(0.9375rem,1.2vw+0.5rem,1.125rem)] leading-relaxed text-[#444]">
            Marketing insights, brand clarity, and how we build campaigns that move the needle.
          </p>
        </div>
        <div className="pointer-events-none absolute right-0 top-0 flex h-full w-full max-w-[60%] items-center justify-end opacity-90">
          <svg
            className="h-full w-full max-w-md"
            viewBox="0 0 400 280"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M 24 200 C 72 120 120 72 176 112 C 232 152 216 216 272 208 C 328 200 344 128 376 88"
              stroke="rgba(41,41,41,0.12)"
              strokeWidth="44"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      {/* Featured + grid — dark background */}
      <section className="w-full flex-1 px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20" style={{ backgroundColor: '#292929' }}>
        <div className="w-full">
          {loading ? (
            <div className="flex min-h-[40vh] items-center justify-center">
              <p className="text-[clamp(0.9375rem,1.2vw+0.5rem,1.125rem)] text-[#F5F0E8]/70" style={{ fontFamily }}>Loading posts…</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-[clamp(1.5rem,3vw+1rem,2.25rem)] font-bold text-[#F5F0E8]" style={{ fontFamily }}>No posts yet</h2>
              <p className="max-w-md text-[clamp(0.9375rem,1.2vw+0.5rem,1.125rem)] leading-relaxed text-[#F5F0E8]/75" style={{ fontFamily }}>No posts yet. Once we publish from the dashboard, they’ll show up here.</p>
            </div>
          ) : (
            <>
              {/* Featured post — large title, carousel-style */}
              {featured && (
                <div className="mb-12 md:mb-16">
                  <Link to={`/blog/${featured.id}`} className="group block">
                    <div className="flex items-start justify-between gap-4">
                      <h2
                        className="max-w-3xl text-[clamp(2.25rem,5vw+1.5rem,4rem)] font-bold leading-[1.05] tracking-tight text-[#F5F0E8] transition-opacity group-hover:opacity-90"
                        style={{ fontFamily }}
                      >
                        {featured.title}
                      </h2>
                      <span className="flex shrink-0 text-[#F5F0E8]/50" aria-hidden>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                    <p className="mt-3 max-w-2xl text-[clamp(0.9375rem,1.2vw+0.5rem,1.125rem)] leading-relaxed text-[#F5F0E8]/80" style={{ fontFamily }}>
                      {featured.excerpt}
                    </p>
                    <p className="mt-2 text-[clamp(0.8125rem,1vw+0.35rem,1rem)] text-[#F5F0E8]/55" style={{ fontFamily }}>{formatDate(featured.created_at)} · {estimateReadTime(featured.content)} min read</p>
                  </Link>
                </div>
              )}

              {/* Filter by topic — dropdown */}
              {allTags.length > 0 && (
                <div ref={filterRef} className="relative mb-10 w-fit">
                  <button
                    type="button"
                    onClick={() => setFilterOpen((o) => !o)}
                    className="flex items-center gap-2 rounded-full border border-[#F5F0E8]/4 bg-[#F5F0E8]/15 pl-5 pr-4 py-2.5 text-[clamp(0.875rem,1vw+0.4rem,1rem)] font-medium text-[#F5F0E8] transition-colors hover:bg-[#F5F0E8]/25"
                    style={{ fontFamily }}
                    aria-expanded={filterOpen}
                    aria-haspopup="listbox"
                  >
                    <span className="uppercase tracking-wider text-[#F5F0E8]/70">Topic:</span>
                    <span>{selectedTag ?? 'All'}</span>
                    <svg className={`h-4 w-4 transition-transform ${filterOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {filterOpen && (
                    <div
                      className="absolute left-0 top-full z-10 mt-2 max-h-[min(16rem,60vh)] min-w-[12rem] overflow-y-auto rounded-xl border border-[#F5F0E8]/2 bg-[#1f1f1f] py-2 shadow-lg"
                      role="listbox"
                    >
                      <button
                        type="button"
                        role="option"
                        aria-selected={selectedTag === null}
                        onClick={() => { setSelectedTag(null); setFilterOpen(false) }}
                        className={`w-full px-5 py-2.5 text-left text-[clamp(0.875rem,1vw+0.4rem,1rem)] font-medium transition-colors ${selectedTag === null ? 'bg-[#6EDD80]/25 text-[#6EDD80]' : 'text-[#F5F0E8]/90 hover:bg-[#F5F0E8]/10'}`}
                        style={{ fontFamily }}
                      >
                        All
                      </button>
                      {allTags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          role="option"
                          aria-selected={selectedTag === tag}
                          onClick={() => { setSelectedTag(tag); setFilterOpen(false) }}
                          className={`w-full px-5 py-2.5 text-left text-[clamp(0.875rem,1vw+0.4rem,1rem)] font-medium transition-colors ${selectedTag === tag ? 'bg-[#6EDD80]/25 text-[#6EDD80]' : 'text-[#F5F0E8]/90 hover:bg-[#F5F0E8]/10'}`}
                          style={{ fontFamily }}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Main grid — 2 columns */}
              {filteredPosts.length === 0 ? (
                <p className="text-[clamp(0.9375rem,1.2vw+0.5rem,1.125rem)] text-[#F5F0E8]/70" style={{ fontFamily }}>
                  No posts in this topic yet.
                </p>
              ) : (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
                {(featured ? rest : filteredPosts).map((post, index) => (
                  <article key={post.id} className="group flex flex-col">
                    <Link to={`/blog/${post.id}`} className="flex flex-col flex-1">
                      <div
                        className="relative aspect-[3/2] w-full overflow-hidden rounded-lg"
                        style={{ backgroundColor: CARD_COLORS[index % CARD_COLORS.length] }}
                      >
                        <span className="absolute inset-0 flex items-center justify-center text-[#F5F0E8]/20 text-4xl font-medium">
                          Nexora
                        </span>
                        <span className="absolute bottom-3 left-3 right-3 text-right text-sm font-medium text-white/90">
                          {formatDate(post.created_at)}
                        </span>
                      </div>
                      <h3 className="mt-4 text-[clamp(1.5rem,3vw+1rem,2.25rem)] font-bold leading-tight tracking-tight text-[#F5F0E8] transition-opacity group-hover:opacity-90" style={{ fontFamily }}>
                        {post.title}
                      </h3>
                      <p className="mt-2 text-[clamp(0.8125rem,1vw+0.35rem,1rem)] text-[#F5F0E8]/60" style={{ fontFamily }}>{formatDate(post.created_at)} · {estimateReadTime(post.content)} min read</p>
                      <p className="mt-2 line-clamp-2 text-[clamp(0.9375rem,1.2vw+0.5rem,1.125rem)] leading-relaxed text-[#F5F0E8]/80" style={{ fontFamily }}>
                        {post.excerpt}
                      </p>
                    </Link>
                  </article>
                ))}
              </div>
              )}
            </>
          )}
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  )
}
