import { Link } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useAuthContext } from '../../context/AuthContext'
import { loginValidationSchema } from '../../validations/loginValidation'

const fontFamily = "'PP Neue Montreal', system-ui, sans-serif"
const bgDark = '#292929'
const bgLight = '#F5F0E8'
const textLight = '#F5F0E8'
const textMuted = 'rgba(245, 240, 232, 0.75)'
const accent = '#6EDD80'

const inputClass =
  'w-full rounded-lg border-2 border-[#DDD5CC] bg-white px-4 py-3.5 text-[clamp(0.9375rem,1.2vw+0.5rem,1.125rem)] outline-none transition-colors focus:border-[#292929] focus:ring-0'

export default function LoginPage() {
  const { login } = useAuthContext()

  return (
    <main
      className="flex min-h-screen w-full flex-col md:flex-row"
      style={{ fontFamily, backgroundColor: bgLight }}
    >
      {/* Left: dark panel — headline + decorative */}
      <div
        className="relative flex min-h-[40vh] w-full flex-col justify-between overflow-hidden px-6 py-12 md:min-h-screen md:w-[48%] md:px-12 md:py-16 lg:px-16"
        style={{ backgroundColor: bgDark }}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[clamp(0.9rem,1.1vw+0.4rem,1rem)] font-medium transition-opacity hover:opacity-80"
          style={{ color: textMuted }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to home
        </Link>
        <div className="mt-10 md:mt-0">
          <h1
            className="text-[clamp(2.25rem,5vw+1.5rem,4rem)] font-bold leading-[1.05] tracking-tight"
            style={{ color: textLight }}
          >
            Sign in
          </h1>
          <p className="mt-3 max-w-sm text-[clamp(0.9375rem,1.2vw+0.5rem,1.125rem)] leading-relaxed" style={{ color: textMuted }}>
            Agency dashboard — create and manage blog posts.
          </p>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex w-full flex-1 flex-col justify-center px-6 py-12 md:w-[52%] md:px-12 md:py-16 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginValidationSchema}
            onSubmit={async (values, { setStatus, setSubmitting }) => {
              setStatus(null)
              setSubmitting(true)
              try {
                await login(values.email, values.password)
              } catch (err: unknown) {
                const message = err instanceof Error ? err.message : 'Sign in failed. Check your email and password.'
                setStatus(message)
                setSubmitting(false)
              }
            }}
          >
            {({ isSubmitting, status }) => (
              <Form className="flex flex-col gap-6">
                <div>
                  <label htmlFor="login-email" className="mb-2 block text-[clamp(0.8125rem,1vw+0.35rem,1rem)] font-medium uppercase tracking-wider" style={{ color: '#292929' }}>
                    Email
                  </label>
                  <Field
                    id="login-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@agency.com"
                    className={inputClass}
                    style={{ fontFamily, color: '#292929' }}
                  />
                  <ErrorMessage name="email" component="p" className="mt-1.5 text-[clamp(0.875rem,1vw+0.4rem,1rem)] font-medium text-[#c24141]" />
                </div>
                <div>
                  <label htmlFor="login-password" className="mb-2 block text-[clamp(0.8125rem,1vw+0.35rem,1rem)] font-medium uppercase tracking-wider" style={{ color: '#292929' }}>
                    Password
                  </label>
                  <Field
                    id="login-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className={inputClass}
                    style={{ fontFamily, color: '#292929' }}
                  />
                  <ErrorMessage name="password" component="p" className="mt-1.5 text-[clamp(0.875rem,1vw+0.4rem,1rem)] font-medium text-[#c24141]" />
                </div>
                {status && (
                  <p className="text-[clamp(0.875rem,1vw+0.4rem,1rem)] font-medium" style={{ color: '#c24141' }}>
                    {status}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full rounded-[9999px] px-6 py-3.5 text-[clamp(0.95rem,1.1vw+0.5rem,1.05rem)] font-bold leading-snug transition-opacity hover:opacity-90 disabled:opacity-60"
                  style={{ backgroundColor: accent, color: '#292929', fontFamily }}
                >
                  {isSubmitting ? 'Signing in…' : 'Sign in'}
                </button>
              </Form>
            )}
          </Formik>
          <p className="mt-8 text-center text-[clamp(0.875rem,1vw+0.4rem,1rem)]" style={{ color: '#666' }}>
            For demo or access, use the credentials set in your Supabase project.
          </p>
        </div>
      </div>
    </main>
  )
}
