import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar } from '../../components/common/Navbar'
import { Footer } from '../../components/common/Footer'
import { ConfirmDeleteModal } from '../../components/common/ConfirmDeleteModal'
import { blogService } from '../../services/blogService'
import { useAuthContext } from '../../context/AuthContext'
import type { BlogPost } from '../../types/blog.types'

const fontFamily = "'PP Neue Montreal', system-ui, sans-serif"

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function DashboardPage() {
  const { logout } = useAuthContext()
  const navigate = useNavigate()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deleteModal, setDeleteModal] = useState<{ id: string; title: string } | null>(null)

  const loadPosts = () => {
    setLoading(true)
    blogService
      .getPostsForDashboard()
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadPosts()
  }, [])

  const handleDeleteClick = (id: string, title: string) => {
    setDeleteModal({ id, title })
  }

  const handleDeleteConfirm = async () => {
    if (!deleteModal) return
    const { id } = deleteModal
    setDeletingId(id)
    try {
      await blogService.deletePost(id)
      setPosts((prev) => prev.filter((p) => p.id !== id))
      setDeleteModal(null)
    } catch {
      setDeletingId(null)
    } finally {
      setDeletingId(null)
    }
  }

  const handleLogout = async () => {
    navigate('/')
    await logout()
  }

  return (
    <main className="flex min-h-screen w-full flex-col bg-[#F5F0E8]" style={{ fontFamily }}>
      <section className="w-full px-6 pt-6 md:px-12 md:pt-8 lg:px-16" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="flex w-full flex-col pb-6 md:pb-8">
          <Navbar />
        </div>
      </section>

      <div className="flex-1 px-6 pb-16 md:px-12 md:pb-20 lg:px-16">
        <div className="flex flex-col gap-10 md:gap-12">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1
                className="text-[clamp(2.25rem,5vw+1.5rem,4rem)] font-bold leading-[1.05] tracking-tight"
                style={{ color: '#292929' }}
              >
                Dashboard
              </h1>
              <p className="mt-2 text-[clamp(0.9375rem,1.2vw+0.5rem,1.125rem)] text-[#444]">
                Manage your blog posts.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/blog/create"
                className="inline-flex items-center justify-center rounded-[9999px] bg-[#6EDD80] px-6 py-3 text-[clamp(0.95rem,1.1vw+0.5rem,1.05rem)] font-bold leading-snug text-[#292929] transition-opacity hover:opacity-90"
                style={{ fontFamily }}
              >
                Create post
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center justify-center rounded-[9999px] border-2 border-[#292929] bg-transparent px-6 py-3 text-[clamp(0.95rem,1.1vw+0.5rem,1.05rem)] font-bold leading-snug text-[#292929] transition-opacity hover:opacity-80"
                style={{ fontFamily }}
              >
                Log out
              </button>
            </div>
          </div>

          {/* Post list */}
          {loading ? (
            <p className="text-[clamp(0.9375rem,1.2vw+0.5rem,1.125rem)] text-[#666]">Loading posts…</p>
          ) : posts.length === 0 ? (
            <div className="rounded-xl border-2 border-dashed border-[#DDD5CC] bg-white/50 px-8 py-16 text-center">
              <p className="text-[clamp(1rem,1.2vw+0.6rem,1.2rem)] font-medium text-[#292929]">No posts yet</p>
              <p className="mt-2 text-[clamp(0.9375rem,1.2vw+0.5rem,1.125rem)] text-[#666]">Create your first post to get started.</p>
              <Link
                to="/blog/create"
                className="mt-6 inline-flex items-center justify-center rounded-[9999px] bg-[#6EDD80] px-6 py-3 text-[clamp(0.95rem,1.1vw+0.5rem,1.05rem)] font-bold text-[#292929] transition-opacity hover:opacity-90"
                style={{ fontFamily }}
              >
                Create post
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {posts.map((post) => (
                <li
                  key={post.id}
                  className="flex flex-col gap-3 rounded-xl border border-[#DDD5CC] bg-white p-6 transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-[clamp(1.25rem,1.8vw+0.7rem,1.5rem)] font-bold leading-tight text-[#292929]" style={{ fontFamily }}>
                      {post.title}
                    </h2>
                    <p className="mt-1 line-clamp-2 text-[clamp(0.875rem,1.1vw+0.4rem,1rem)] text-[#666]">
                      {post.excerpt}
                    </p>
                    <p className="mt-2 text-[clamp(0.8125rem,1vw+0.35rem,1rem)] text-[#888]">
                      {formatDate(post.created_at)} · {post.author_name}
                      {!post.published && (
                        <span className="ml-2 rounded bg-amber-100 px-2 py-0.5 text-amber-800 text-xs font-medium">Draft</span>
                      )}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
                    <Link
                      to={`/blog/${post.id}`}
                      className="inline-flex items-center justify-center rounded-lg border border-[#292929] bg-transparent px-4 py-2 text-[clamp(0.8125rem,1vw+0.35rem,1rem)] font-medium text-[#292929] transition-opacity hover:opacity-80"
                      style={{ fontFamily }}
                    >
                      View
                    </Link>
                    <Link
                      to={`/blog/edit/${post.id}`}
                      className="inline-flex items-center justify-center rounded-lg bg-[#292929] px-4 py-2 text-[clamp(0.8125rem,1vw+0.35rem,1rem)] font-medium text-[#F5F0E8] transition-opacity hover:opacity-90"
                      style={{ fontFamily }}
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDeleteClick(post.id, post.title)}
                      disabled={deletingId === post.id}
                      className="inline-flex items-center justify-center rounded-lg border border-red-300 bg-transparent px-4 py-2 text-[clamp(0.8125rem,1vw+0.35rem,1rem)] font-medium text-red-600 transition-opacity hover:opacity-80 disabled:opacity-50"
                      style={{ fontFamily }}
                    >
                      {deletingId === post.id ? 'Deleting…' : 'Delete'}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={deleteModal !== null}
        title={deleteModal?.title ?? ''}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModal(null)}
        isLoading={deletingId !== null}
      />
      <Footer />
    </main>
  )
}
