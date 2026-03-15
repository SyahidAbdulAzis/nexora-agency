import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Link } from 'react-router-dom'
import { Navbar } from '../../components/common/Navbar'
import { Footer } from '../../components/common/Footer'
import { useAuthContext } from '../../context/AuthContext'
import { blogService } from '../../services/blogService'
import { blogValidationSchema } from '../../validations/blogValidation'
import type { BlogPostFormValues } from '../../types/blog.types'

const fontFamily = "'PP Neue Montreal', system-ui, sans-serif"

const initialValues: BlogPostFormValues = {
  title: '',
  content: '',
  excerpt: '',
  tags: [],
}

function parseTagsInput(value: string): string[] {
  if (!value.trim()) return []
  return value.split(',').map((s) => s.trim()).filter(Boolean)
}

export default function CreateBlog() {
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const authorName = user?.user_metadata?.full_name ?? user?.email ?? 'Author'
  const authorId = user?.id ?? ''

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
            Create post
          </h1>
          <p className="mt-2 text-[clamp(0.9375rem,1.2vw+0.5rem,1.125rem)] text-[#666]">
            Add a new blog post. It will be published immediately.
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={blogValidationSchema}
            onSubmit={async (values, { setStatus, setSubmitting }) => {
              setStatus(null)
              setSubmitting(true)
              try {
                const payload: BlogPostFormValues = {
                  title: values.title,
                  content: values.content,
                  excerpt: values.excerpt,
                  tags: Array.isArray(values.tags) ? values.tags : parseTagsInput(String(values.tags ?? '')),
                }
                const created = await blogService.createPost(payload, authorId, authorName)
                navigate(`/blog/${created.id}`)
              } catch (err: unknown) {
                const message = err instanceof Error ? err.message : 'Failed to create post.'
                setStatus(message)
                setSubmitting(false)
              }
            }}
          >
            {({ isSubmitting, status, setFieldValue, values }) => (
              <Form className="mt-10 flex flex-col gap-6">
                <div>
                  <label htmlFor="create-title" className="mb-2 block text-[clamp(0.8125rem,1vw+0.35rem,1rem)] font-medium uppercase tracking-wider text-[#292929]">
                    Title
                  </label>
                  <Field
                    id="create-title"
                    name="title"
                    type="text"
                    placeholder="e.g. 5 SEO Trends Dominating 2026"
                    className="w-full rounded-lg border-2 border-[#DDD5CC] bg-white px-4 py-3.5 text-[clamp(0.9375rem,1.2vw+0.5rem,1.125rem)] outline-none transition-colors focus:border-[#292929] focus:ring-0"
                    style={{ fontFamily, color: '#292929' }}
                  />
                  <ErrorMessage name="title" component="p" className="mt-1.5 text-[clamp(0.875rem,1vw+0.4rem,1rem)] text-red-600" />
                </div>

                <div>
                  <label htmlFor="create-excerpt" className="mb-2 block text-[clamp(0.8125rem,1vw+0.35rem,1rem)] font-medium uppercase tracking-wider text-[#292929]">
                    Excerpt
                  </label>
                  <Field
                    id="create-excerpt"
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
                  <label htmlFor="create-content" className="mb-2 block text-[clamp(0.8125rem,1vw+0.35rem,1rem)] font-medium uppercase tracking-wider text-[#292929]">
                    Content
                  </label>
                  <Field
                    id="create-content"
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
                  <label htmlFor="create-tags" className="mb-2 block text-[clamp(0.8125rem,1vw+0.35rem,1rem)] font-medium uppercase tracking-wider text-[#292929]">
                    Tags (optional)
                  </label>
                  <Field
                    id="create-tags"
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
                    {isSubmitting ? 'Publishing…' : 'Publish post'}
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
