import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FaLinkedin, FaInstagram, FaBehance, FaYoutube } from 'react-icons/fa'

const socialLinks = [
  { href: 'https://linkedin.com', icon: FaLinkedin, label: 'LinkedIn' },
  { href: 'https://instagram.com', icon: FaInstagram, label: 'Instagram' },
  { href: 'https://behance.net', icon: FaBehance, label: 'Behance' },
  { href: 'https://youtube.com', icon: FaYoutube, label: 'YouTube' },
]

const textColor = '#292929'
const fontSerif = "'PP Neue Montreal', system-ui, sans-serif"
const fontSans = "'PP Neue Montreal', system-ui, sans-serif"

export function Footer() {
  const [email, setEmail] = useState('')
  const currentYear = new Date().getFullYear()

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: connect to newsletter API
  }

  return (
    <footer
      className="relative w-full overflow-hidden px-6 py-40 md:px-12 md:py-44 lg:px-16 lg:py-48"
      style={{ backgroundColor: '#6EDD80' }}
    >
      {/* Background text dekoratif */}
      <div
        className="pointer-events-none absolute inset-0 flex items-end justify-center opacity-[0.12]"
        aria-hidden
      >
        <span
          className="text-[clamp(8rem,25vw,18rem)] font-normal leading-none tracking-tight"
          style={{ color: '#F5F0E8', fontFamily: fontSerif }}
        >
          Nexora
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Baris utama: 3 kolom, sejajar di atas */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:items-start md:gap-12 lg:gap-16">
          {/* Kolom 1: Newsletter */}
          <div className="flex flex-col">
            <h3
              className="text-[1.1rem] font-medium italic tracking-tight md:text-[1.2rem]"
              style={{ color: textColor, fontFamily: fontSerif }}
            >
              Stay ahead with Nexora
            </h3>
            <p
              className="mt-2 max-w-sm text-[0.9rem] font-normal leading-relaxed md:text-[0.95rem]"
              style={{ color: textColor, fontFamily: fontSans }}
            >
              Get a short monthly digest on brand strategy, performance marketing, and new work from our team.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="mt-4 flex items-end gap-3">
              <div className="min-w-0 flex-1 border-b-2 border-[#292929] pb-1.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-transparent text-[0.95rem] outline-none placeholder:opacity-60 md:text-[1rem]"
                  style={{ color: textColor, fontFamily: fontSans }}
                />
              </div>
              <button
                type="submit"
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center transition-opacity hover:opacity-80 md:h-10 md:w-10"
                style={{ color: textColor }}
                aria-label="Subscribe"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          </div>

          {/* Kolom 2: Visit Us */}
          <div className="flex flex-col">
            <h3
              className="text-[1.1rem] font-medium italic tracking-tight md:text-[1.2rem]"
              style={{ color: textColor, fontFamily: fontSerif }}
            >
              Studio & office
            </h3>
            <p
              className="mt-2 max-w-xs text-[0.9rem] font-normal leading-relaxed md:text-[0.95rem]"
              style={{ color: textColor, fontFamily: fontSans }}
            >
              Nexora Agency — Jakarta & remote-first team, available for global collaborations.
            </p>
          </div>

          {/* Kolom 3: Contact Us + Social */}
          <div className="flex flex-col">
            <h3
              className="text-[1.1rem] font-medium italic tracking-tight md:text-[1.2rem]"
              style={{ color: textColor, fontFamily: fontSerif }}
            >
              Contact Us
            </h3>
            <a
              href="tel:+628001234567"
              className="mt-2 text-[0.9rem] font-normal transition-opacity hover:opacity-80 md:text-[0.95rem]"
              style={{ color: textColor, fontFamily: fontSans }}
            >
              +62 800 123 4567
            </a>
            <a
              href="mailto:hello@nexora.agency"
              className="mt-1 text-[0.9rem] font-normal underline transition-opacity hover:opacity-80 md:text-[0.95rem]"
              style={{ color: textColor, fontFamily: fontSans }}
            >
              hello@nexora.agency
            </a>
            <div className="mt-4 flex gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[#292929]/25 bg-[#F5F0E8] transition-opacity hover:opacity-90"
                  style={{ color: '#292929' }}
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Baris bawah: kiri branding, kanan copyright + privacy */}
        <div className="mt-12 flex flex-col gap-4 border-t-2 border-[#292929]/20 pt-6 md:mt-14 md:flex-row md:items-center md:justify-between md:pt-8">
          <div className="flex flex-col">
          <span
            className="text-[0.85rem] font-medium uppercase tracking-wider"
              style={{ color: textColor, fontFamily: fontSans }}
            >
              Nexora Agency
            </span>
            <span
              className="mt-0.5 text-[0.8rem] font-normal opacity-90"
              style={{ color: textColor, fontFamily: fontSans }}
            >
              Full-service digital agency
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <p
              className="text-[0.9rem] font-normal"
              style={{ color: textColor, fontFamily: fontSans }}
            >
              © {currentYear} Nexora Agency.
            </p>
            <Link
              to="/privacy"
              className="text-[0.9rem] font-normal underline transition-opacity hover:opacity-80"
              style={{ color: textColor, fontFamily: fontSans }}
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
