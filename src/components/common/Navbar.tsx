import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaLinkedin, FaInstagram, FaBehance, FaYoutube } from 'react-icons/fa'
import { useAuthContext } from '../../context/AuthContext'

const socialLinks = [
  { href: 'https://linkedin.com', icon: FaLinkedin, label: 'LinkedIn' },
  { href: 'https://instagram.com', icon: FaInstagram, label: 'Instagram' },
  { href: 'https://behance.net', icon: FaBehance, label: 'Behance' },
  { href: 'https://youtube.com', icon: FaYoutube, label: 'YouTube' },
]

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/teams', label: 'Teams' },
  { to: '/blog', label: 'Blog' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { isAuthenticated } = useAuthContext()
  const location = useLocation()

  const closeMenu = () => setIsOpen(false)

  return (
    <>
      {/* Top bar: Logo N + Arrow (fixed position, 1 tombol saja) */}
      <div className="flex items-center justify-between flex-shrink-0">
        <Link
          to="/"
          className="flex items-center transition-opacity hover:opacity-70"
          aria-label="Nexora Agency – Home"
        >
          <img
            src="/logo.png"
            alt="Nexora Agency"
            className="h-16 w-auto max-md:h-14 sm:h-20 md:h-24 lg:h-28 xl:h-32"
            width={240}
            height={128}
          />
        </Link>
        {/* Spacer untuk balance layout - tombol arrow dipindah fixed */}
        <div className="w-12 md:w-16 lg:w-20 max-md:w-10" />
      </div>

      {/* Toggle button - fixed position */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-6 top-8 z-[60] flex items-center justify-center transition-opacity hover:opacity-70 cursor-pointer bg-transparent border-none md:right-8 md:top-10 max-md:right-4 max-md:top-6 max-md:min-h-[44px] max-md:min-w-[44px]"
        style={{ color: '#333333' }}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-14 h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 max-md:w-12 max-md:h-12 transition-transform duration-300 ease-out origin-center ${
            isOpen ? '-rotate-90' : 'rotate-0'
          }`}
        >
          <path d="M4 12 L16 12 L22 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"/>
        </svg>
      </button>

      {/* Overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20"
          onClick={closeMenu}
          onKeyDown={(e) => e.key === 'Escape' && closeMenu()}
          role="button"
          tabIndex={0}
          aria-label="Close menu"
        />
      )}

      {/* Slide-out navigation panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-[440px] transform transition-transform duration-300 ease-out md:max-w-[520px] max-md:max-w-[85%] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: '#F5F0E8' }}
      >
        <div className="relative flex h-full flex-col px-8 py-10 md:px-12 max-md:px-5 max-md:py-8">
          {/* Highlighter zigzag - di belakang teks, animasi reveal saat buka */}
          <div
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
            aria-hidden
          >
            <svg
              viewBox="0 0 360 750"
              preserveAspectRatio="xMidYMid slice"
              className={`absolute left-0 top-0 h-full w-full max-w-full origin-top ${isOpen ? 'animate-highlighter-reveal' : ''}`}
            >
              {/* 1 garis highlight rapih dari atas ke bawah */}
              <path
                d="M 80 20 L 220 130 L 100 250 L 240 360 L 120 480 L 260 590 L 140 720"
                fill="none"
                stroke="#f9db60"
                strokeWidth="100"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Nav links - jarak sama desktop & mobile */}
          <nav className="relative z-10 mt-16 flex flex-col gap-0.5" style={{ fontFamily: "'PP Neue Montreal', system-ui, sans-serif" }}>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className={`text-5xl font-medium transition-opacity hover:opacity-70 md:text-6xl max-md:text-[clamp(2rem,6vw+1.5rem,3rem)] max-md:min-h-[44px] max-md:flex max-md:items-center ${
                  location.pathname === link.to ? 'opacity-100' : 'opacity-90'
                }`}
                style={{ color: '#333333' }}
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                onClick={closeMenu}
                className="text-5xl font-medium transition-opacity hover:opacity-70 md:text-6xl max-md:text-[clamp(2rem,6vw+1.5rem,3rem)] max-md:min-h-[44px] max-md:flex max-md:items-center"
                style={{ color: '#333333' }}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="text-5xl font-medium transition-opacity hover:opacity-70 md:text-6xl max-md:text-[clamp(2rem,6vw+1.5rem,3rem)] max-md:min-h-[44px] max-md:flex max-md:items-center"
                style={{ color: '#333333' }}
              >
                Login
              </Link>
            )}
          </nav>

          {/* Social icons + CTA - jarak sama desktop & mobile */}
          <div className="relative z-10 mt-20 inline-flex w-fit flex-col items-stretch gap-4">
            <div className="flex w-fit gap-4" style={{ color: '#333333' }}>
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-70 max-md:flex max-md:min-h-[44px] max-md:min-w-[44px] max-md:items-center max-md:justify-center"
                  aria-label={label}
                >
                  <Icon size={26} className="max-md:w-8 max-md:h-8" />
                </a>
              ))}
            </div>
            <button
              type="button"
              className="flex w-0 min-w-full items-center justify-center rounded-[9999px] bg-[#343434] px-6 py-3 text-center text-[0.95rem] font-medium leading-snug text-white transition-all duration-200 hover:bg-[#3d3d3d] max-md:py-2.5 max-md:text-[clamp(0.875rem,2.2vw+0.45rem,1rem)]"
              style={{ fontFamily: "'PP Neue Montreal', system-ui, sans-serif" }}
            >
              Start a Project
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
