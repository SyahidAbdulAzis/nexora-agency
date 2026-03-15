import { Navbar } from '../../components/common/Navbar'
import { Footer } from '../../components/common/Footer'

const fontFamily = "'PP Neue Montreal', system-ui, sans-serif"
const bgDark = '#292929'
const textLight = '#F5F0E8'
const textMuted = 'rgba(242, 236, 231, 0.85)'
const placeholderBg = 'rgba(242, 236, 231, 0.08)'
const borderMuted = 'rgba(242, 236, 231, 0.2)'

// Foto dari folder public/team/ — download lalu simpan dengan nama di bawah
const TEAM_PHOTOS = {
  founder: '/team/founder.jpg',
  cofounder: '/team/cofounder.jpg',
  headOfStrategy: '/team/head-of-strategy.jpg',
  headOfGrowth: '/team/head-of-growth.jpg',
}

function PortraitImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="relative flex h-full min-h-[320px] overflow-hidden rounded-lg md:min-h-0"
      style={{ backgroundColor: placeholderBg }}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover object-top"
        loading="lazy"
        onError={(e) => {
          const target = e.currentTarget
          target.style.display = 'none'
          const fallback = target.nextElementSibling as HTMLElement | null
          if (fallback) fallback.style.display = 'flex'
        }}
      />
      <div
        className="absolute inset-0 hidden flex-col items-center justify-center rounded-lg border border-dashed px-4 py-8"
        style={{
          backgroundColor: placeholderBg,
          borderColor: borderMuted,
          fontFamily,
          color: textMuted,
          fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
        }}
        aria-hidden
      >
        <span className="font-medium">{alt}</span>
      </div>
    </div>
  )
}

export default function AboutUsPage() {
  return (
    <main
      className="overflow-x-hidden"
      style={{
        backgroundColor: bgDark,
        position: 'fixed',
        inset: 0,
        overflowY: 'auto',
        overflowX: 'hidden',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <div className="relative z-[50] shrink-0 px-6 pt-6 md:px-12 md:pt-8 lg:px-16">
        <Navbar />
      </div>

      {/* Tinggi 3× viewport supaya ada 3 "layar" scroll; tiap section sticky numpuk di top */}
      <div style={{ height: '300vh', position: 'relative' }}>
        {/* Section 1 — Founder & CEO */}
        <section
          className="sticky top-0 flex w-full flex-col overflow-hidden md:flex-row"
          style={{
            height: '100vh',
            minHeight: '100vh',
            backgroundColor: bgDark,
            zIndex: 10,
            boxSizing: 'border-box',
          }}
        >
          <div className="flex flex-1 flex-col justify-center px-6 py-16 md:w-[55%] md:max-w-[52rem] md:px-12 md:py-24 lg:px-16">
            <h1
              className="text-[clamp(2.25rem,5vw+1.5rem,4rem)] font-bold leading-[1.05] tracking-tight"
              style={{ color: textLight, fontFamily }}
            >
              Alex Chen
            </h1>
            <p
              className="mt-2 text-[clamp(1rem,1.5vw+0.5rem,1.25rem)] font-medium italic tracking-tight"
              style={{ color: textMuted, fontFamily }}
            >
              Founder & CEO
            </p>
            <p
              className="mt-6 max-w-xl text-[clamp(0.9375rem,1.2vw+0.5rem,1.125rem)] leading-relaxed"
              style={{ color: textMuted, fontFamily }}
            >
              Nexora Agency was established in 2018 by a group of designers and growth hackers who believed brands could grow through clarity. Our mission is to turn that story into a clear, consistent presence across every touchpoint—from bold visual identities to data-driven campaigns that deliver measurable results.
            </p>
            <ul className="mt-8 list-none border-t text-[clamp(0.9375rem,1.2vw+0.5rem,1.125rem)]" style={{ borderColor: borderMuted, fontFamily }}>
              <li className="flex items-baseline gap-3 border-b py-4" style={{ borderColor: borderMuted }}>
                <span className="italic" style={{ color: textMuted }}>I</span>
                <span style={{ color: textLight }}>2018: Nexora founded; first brand identity projects</span>
              </li>
              <li className="flex items-baseline gap-3 border-b py-4" style={{ borderColor: borderMuted }}>
                <span className="italic" style={{ color: textMuted }}>II</span>
                <span style={{ color: textLight }}>2020: Launched performance marketing practice</span>
              </li>
              <li className="flex items-baseline gap-3 border-b py-4" style={{ borderColor: borderMuted }}>
                <span className="italic" style={{ color: textMuted }}>III</span>
                <span style={{ color: textLight }}>2023: UI/UX and product design capability</span>
              </li>
            </ul>
          </div>
          <div className="flex w-full shrink-0 items-stretch md:w-[45%] md:max-w-[36rem] md:pl-8 lg:pl-12">
            <div className="w-full py-8 md:py-16 md:pl-0">
              <PortraitImage src={TEAM_PHOTOS.founder} alt="Alex Chen, Founder & CEO" />
            </div>
          </div>
        </section>

        {/* Section 2 — Co-founder & Creative Director */}
        <section
          className="sticky top-0 flex w-full flex-col overflow-hidden md:flex-row"
          style={{
            height: '100vh',
            minHeight: '100vh',
            backgroundColor: bgDark,
            zIndex: 20,
            boxShadow: '0 -2px 0 0 rgba(255,255,255,0.12)',
            boxSizing: 'border-box',
          }}
        >
          <div className="flex flex-1 flex-col justify-center px-6 py-16 md:w-[55%] md:max-w-[52rem] md:px-12 md:py-24 lg:px-16">
            <h1
              className="text-[clamp(2.25rem,5vw+1.5rem,4rem)] font-bold leading-[1.05] tracking-tight"
              style={{ color: textLight, fontFamily }}
            >
              Jordan Lee
            </h1>
            <p
              className="mt-2 text-[clamp(1rem,1.5vw+0.5rem,1.25rem)] font-medium italic tracking-tight"
              style={{ color: textMuted, fontFamily }}
            >
              Co-founder & Creative Director
            </p>
            <p
              className="mt-6 max-w-xl text-[clamp(0.9375rem,1.2vw+0.5rem,1.125rem)] leading-relaxed"
              style={{ color: textMuted, fontFamily }}
            >
              We lead with craft and curiosity. Our culture is remote-first and built around continuous learning—so every idea is tested against real impact and every brand moment earns attention.
            </p>
            <div className="mt-8">
              <p className="mb-2 text-[clamp(0.8125rem,1vw+0.35rem,1rem)] font-medium uppercase tracking-wider" style={{ color: textLight, fontFamily }}>
                Core values
              </p>
              <ul className="list-none border-t text-[clamp(0.9375rem,1.2vw+0.5rem,1.125rem)]" style={{ borderColor: borderMuted, fontFamily }}>
                <li className="flex items-baseline gap-3 border-b py-4" style={{ borderColor: borderMuted }}>
                  <span className="italic" style={{ color: textMuted }}>I</span>
                  <span style={{ color: textLight }}>Clarity</span>
                </li>
                <li className="flex items-baseline gap-3 border-b py-4" style={{ borderColor: borderMuted }}>
                  <span className="italic" style={{ color: textMuted }}>II</span>
                  <span style={{ color: textLight }}>Boldness</span>
                </li>
                <li className="flex items-baseline gap-3 border-b py-4" style={{ borderColor: borderMuted }}>
                  <span className="italic" style={{ color: textMuted }}>III</span>
                  <span style={{ color: textLight }}>Data-Driven</span>
                </li>
                <li className="flex items-baseline gap-3 border-b py-4" style={{ borderColor: borderMuted }}>
                  <span className="italic" style={{ color: textMuted }}>IV</span>
                  <span style={{ color: textLight }}>Human-Centered</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex w-full shrink-0 items-stretch md:w-[45%] md:max-w-[36rem] md:pl-8 lg:pl-12">
            <div className="w-full py-8 md:py-16 md:pl-0">
              <PortraitImage src={TEAM_PHOTOS.cofounder} alt="Jordan Lee, Co-founder & Creative Director" />
            </div>
          </div>
        </section>

        {/* Section 3 — Head of Strategy & Head of Growth */}
        <section
          className="sticky top-0 flex w-full flex-col overflow-hidden md:flex-row"
          style={{
            height: '100vh',
            minHeight: '100vh',
            backgroundColor: bgDark,
            zIndex: 30,
            boxShadow: '0 -2px 0 0 rgba(255,255,255,0.12)',
            boxSizing: 'border-box',
          }}
        >
          <div className="flex flex-1 flex-col justify-center px-6 py-16 md:w-[55%] md:max-w-[52rem] md:px-12 md:py-24 lg:px-16">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
              <div>
                <h2 className="text-[clamp(1.5rem,3vw+1rem,2.25rem)] font-bold leading-tight tracking-tight" style={{ color: textLight, fontFamily }}>
                  Sam Rivera
                </h2>
                <p className="mt-1 text-[clamp(0.9rem,1.2vw+0.4rem,1.1rem)] font-medium italic" style={{ color: textMuted, fontFamily }}>
                  Head of Strategy
                </p>
                <p className="mt-4 text-[clamp(0.875rem,1.1vw+0.4rem,1rem)] leading-relaxed" style={{ color: textMuted, fontFamily }}>
                  Leads brand strategy and positioning. Ensures every campaign is rooted in research and clear objectives.
                </p>
              </div>
              <div>
                <h2 className="text-[clamp(1.5rem,3vw+1rem,2.25rem)] font-bold leading-tight tracking-tight" style={{ color: textLight, fontFamily }}>
                  Morgan Kim
                </h2>
                <p className="mt-1 text-[clamp(0.9rem,1.2vw+0.4rem,1.1rem)] font-medium italic" style={{ color: textMuted, fontFamily }}>
                  Head of Growth
                </p>
                <p className="mt-4 text-[clamp(0.875rem,1.1vw+0.4rem,1rem)] leading-relaxed" style={{ color: textMuted, fontFamily }}>
                  Drives performance marketing and paid media. Focused on scalable growth and measurable outcomes.
                </p>
              </div>
            </div>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-6 py-8 md:w-[45%] md:max-w-[36rem] md:self-stretch md:py-16 md:pl-8 lg:pl-12">
            <div className="flex min-h-[200px] flex-1 flex-col md:min-h-0">
              <PortraitImage src={TEAM_PHOTOS.headOfStrategy} alt="Sam Rivera, Head of Strategy" />
            </div>
            <div className="flex min-h-[200px] flex-1 flex-col md:min-h-0">
              <PortraitImage src={TEAM_PHOTOS.headOfGrowth} alt="Morgan Kim, Head of Growth" />
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
