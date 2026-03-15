import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Navbar } from '../../components/common/Navbar'
import { Footer } from '../../components/common/Footer'
import { blogService } from '../../services/blogService'
import { blogValidationSchema } from '../../validations/blogValidation'
import type { BlogPost, BlogPostFormValues } from '../../types/blog.types'

const fontFamily = "'PP Neue Montreal', system-ui, sans-serif"

function parseTagsInput(value: string): string[] {
  if (!value.trim()) return []
  return value.split(',').map((s) => s.trim()).filter(Boolean)
}

function postToFormValues(post: BlogPost): BlogPostFormValues {
  return {
    title: post.title,
    content: post.content,
    excerpt: post.excerpt,
    tags: post.tags ?? [],
  }
}

export default function EditBlog() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
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
            to="/dashboard"
            className="inline-flex items-center justify-center rounded-[9999px] bg-[#6EDD80] px-6 py-3 text-[clamp(0.95rem,1.1vw+0.5rem,1.05rem)] font-bold text-[#292929] transition-opacity hover:opacity-90"
            style={{ fontFamily }}
          >
            Back to dashboard
          </Link>
        </div>
      </main>
    )
  }

  const initialValues = postToFormValues(post)

  return (
    <main className="flex min-h-screen w-full flex-col bg-[#F5F0E8]" style={{ fontFamily }}>
      <section className="w-full px-6 pt-6 md:px-12 md:pt-8 lg:px-16" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="flex w-full flex-col pb-6 md:pb-8">
          <Navbar />
        </div>
      </section>

      <div className="flex-1 px-6 pb-16 md:px-12 md:pb-20 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-[clamp(0.9rem,1.1vw+0.4rem,1rem)] font-medium text-[#292929] transition-opacity hover:opacity-70"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to dashboard
          </Link>

          <h1
            className="mt-8 text-[clamp(2rem,4vw+1.5rem,3.25rem)] font-bold leading-tight tracking-tight"
            style={{ color: '#292929' }}
          >
            Edit post
          </h1>
          <p className="mt-2 text-[clamp(0.9375rem,1.2vw+0.5rem,1.125rem)] text-[#666]">
            Update the post below. Changes are saved when you click Save changes.
          </p>

          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={blogValidationSchema}
            onSubmit={async (values, { setStatus, setSubmitting }) => {
              if (!id) return
              setStatus(null)
              setSubmitting(true)
              try {
                const payload: BlogPostFormValues = {
                  title: values.title,
                  content: values.content,
                  excerpt: values.excerpt,
                  tags: Array.isArray(values.tags) ? values.tags : parseTagsInput(String(values.tags ?? '')),
                }
                await blogService.updatePost(id, payload)
                navigate(`/blog/${id}`)
              } catch (err: unknown) {
                const message = err instanceof Error ? err.message : 'Failed to update post.'
                setStatus(message)
                setSubmitting(false)
              }
            }}
          >
            {({ isSubmitting, status, setFieldValue, values }) => (
              <Form className="mt-10 flex flex-col gap-6">
                <div>
                  <label htmlFor="edit-title" className="mb-2 block text-[clamp(0.8125rem,1vw+0.35rem,1rem)] font-medium uppercase tracking-wider text-[#292929]">
                    Title
                  </label>
                  <Field
                    id="edit-title"
                    name="title"
                    type="text"
                    placeholder="e.g. 5 SEO Trends Dominating 2026"
                    className="w-full rounded-lg border-2 border-[#DDD5CC] bg-white px-4 py-3.5 text-[clamp(0.9375rem,1.2vw+0.5rem,1.125rem)] outline-none transition-colors focus:border-[#292929] focus:ring-0"
                    style={{ fontFamily, color: '#292929' }}
                  />
                  <ErrorMessage name="title" component="p" className="mt-1.5 text-[clamp(0.875rem,1vw+0.4rem,1rem)] text-red-600" />
                </div>

                <div>
                  <label htmlFor="edit-excerpt" className="mb-2 block text-[clamp(0.8125rem,1vw+0.35rem,1rem)] font-medium uppercase tracking-wider text-[#292929]">
                    Excerpt
                  </label>
                  <Field
                    id="edit-excerpt"
                    name="excerpt"
                    as="textarea"
                    rows={3}
                    placeholder="Short summary for the blog list (max 300 characters)"
                    className="w-full resize-y rounded-lg border-2 border-[#DDD5CC] bg-white px-4 py-3.5 text-[clamp(0.9375rem,1.2vw+0.5rem,1.125rem)] outline-none transition-colors focus:border-[#292929] focus:ring-0"
                    style={{ fontFamily, color: '#292929' }}
                  />
                  <ErrorMessage name="excerpt" component="p" className="mt-1.5 text-[clamp(0.875rem,1vw+0.4rem,1rem)] text-red-600" />
                </div>

                <div>
                  <label htmlFor="edit-content" className="mb-2 block text-[clamp(0.8125rem,1vw+0.35rem,1rem)] font-medium uppercase tracking-wider text-[#292929]">
                    Content
                  </label>
                  <Field
                    id="edit-content"
                    name="content"
                    as="textarea"
                    rows={14}
                    placeholder="Full post content. You can use plain text or simple HTML."
                    className="w-full resize-y rounded-lg border-2 border-[#DDD5CC] bg-white px-4 py-3.5 text-[clamp(0.9375rem,1.2vw+0.5rem,1.125rem)] leading-relaxed outline-none transition-colors focus:border-[#292929] focus:ring-0"
                    style={{ fontFamily, color: '#292929' }}
                  />
                  <ErrorMessage name="content" component="p" className="mt-1.5 text-[clamp(0.875rem,1vw+0.4rem,1rem)] text-red-600" />
                </div>

                <div>
                  <label htmlFor="edit-tags" className="mb-2 block text-[clamp(0.8125rem,1vw+0.35rem,1rem)] font-medium uppercase tracking-wider text-[#292929]">
                    Tags (optional)
                  </label>
                  <Field
                    id="edit-tags"
                    name="tags"
                    type="text"
                    placeholder="e.g. SEO, brand, landing page"
                    className="w-full rounded-lg border-2 border-[#DDD5CC] bg-white px-4 py-3.5 text-[clamp(0.9375rem,1.2vw+0.5rem,1.125rem)] outline-none transition-colors focus:border-[#292929] focus:ring-0"
                    style={{ fontFamily, color: '#292929' }}
                    value={Array.isArray(values.tags) ? values.tags.join(', ') : (values.tags != null ? String(values.tags) : '')}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('tags', parseTagsInput(e.target.value))}
                  />
                  <p className="mt-1.5 text-[clamp(0.8125rem,1vw+0.35rem,1rem)] text-[#888]">Comma-separated.</p>
                </div>

                {status && (
                  <p className="text-[clamp(0.875rem,1vw+0.4rem,1rem)] font-medium text-red-600">{status}</p>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center rounded-[9999px] bg-[#6EDD80] px-6 py-3 text-[clamp(0.95rem,1.1vw+0.5rem,1.05rem)] font-bold text-[#292929] transition-opacity hover:opacity-90 disabled:opacity-60"
                    style={{ fontFamily }}
                  >
                    {isSubmitting ? 'Saving…' : 'Save changes'}
                  </button>
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center justify-center rounded-[9999px] border-2 border-[#292929] bg-transparent px-6 py-3 text-[clamp(0.95rem,1.1vw+0.5rem,1.05rem)] font-bold text-[#292929] transition-opacity hover:opacity-80"
                    style={{ fontFamily }}
                  >
                    Cancel
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <Footer />
    </main>
  )
}
