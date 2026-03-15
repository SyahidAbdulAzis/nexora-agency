import { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Navbar } from '../../components/common/Navbar'
import { CTASection } from '../../components/common/CTASection'
import { Footer } from '../../components/common/Footer'

const fontFamily = "'PP Neue Montreal', system-ui, sans-serif"

gsap.registerPlugin(ScrollTrigger)

export default function ServicesPage() {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.service-card')

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top 100%', // mulai saat bagian atas kartu menyentuh bagian bawah viewport
              end: 'top 30%', // selesai ketika kartu sudah nyaman di area baca
              scrub: true, // progres animasi persis mengikuti scroll
            },
          },
        )
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <main
      className="flex min-h-screen w-full flex-col bg-[#F5F0E8]"
      style={{ fontFamily }}
    >
      {/* Navbar strip saja di atas, tanpa hero text */}
      <section
        className="relative w-full px-6 pt-6 md:px-12 md:pt-8 lg:px-16"
        style={{ backgroundColor: '#F5F0E8' }}
      >
        <div className="mx-auto flex w-full flex-col pb-6 md:pb-8">
          <Navbar />
        </div>
      </section>

      {/* Konten utama — mulai langsung dengan kartu service pertama */}
      <section className="flex-1 w-full px-6 pb-16 pt-12 md:px-12 md:pb-20 md:pt-16 lg:px-16 lg:pb-24 lg:pt-20">
        <div className="mx-auto flex w-full flex-col gap-20 md:gap-28 lg:gap-32">
          {/* 1. Brand Strategy & Identity — light */}
          <section className="service-card grid grid-cols-1 gap-10 md:grid-cols-[1fr_1fr] md:items-center md:gap-16 lg:gap-20">
            <div className="order-2 md:order-1">
              <h2 className="text-[clamp(2.1rem,4vw+1.3rem,3.1rem)] font-medium leading-[1.06] tracking-tight text-[#111111]">
                Brand Strategy &amp; Identity
              </h2>
              <p className="mt-4 max-w-lg text-[clamp(1rem,1.3vw+0.75rem,1.2rem)] leading-relaxed text-[#333333]">
                We help you define what your brand stands for and how it shows up—visually and
                verbally—across every touchpoint. Clarity that travels from pitch decks to product screens.
              </p>
              <ul className="mt-5 list-none border-t border-[#DDD5CC] text-[1rem] leading-relaxed text-[#444444]">
                {['Brand strategy & positioning', 'Naming, messaging, and narrative pillars', 'Visual identity systems & logo refinement', 'Brand guidelines and rollout toolkits'].map((item) => (
                  <li key={item} className="flex items-center gap-3 border-b border-[#DDD5CC] py-3">
                    <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-[#6EDD80]" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[0.95rem] text-[#666666]">Starting from</p>
              <p className="text-[clamp(1.7rem,2.2vw+1.1rem,2.1rem)] font-bold text-[#111111]">IDR 85M</p>
              <button
                type="button"
                className="mt-5 inline-flex items-center justify-center rounded-[9999px] bg-[#6EDD80] px-8 py-2.5 text-[0.95rem] font-medium leading-snug text-[#111111] transition-colors duration-200 hover:bg-[#5ad570]"
              >
                Start brand project →
              </button>
            </div>
            <div className="order-1 md:order-2 flex flex-col gap-4">
              <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
                <img
                  src="/services/brand-1.jpg"
                  alt="Brand strategy and identity work from Nexora"
                  className="h-auto w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <p className="text-[0.7rem] font-medium uppercase tracking-wider text-[#6EDD80]">Project Review</p>
                <p className="mt-1 text-[0.9rem] text-[#333333]">Rina Putri, Growth Manager at Lumio Health</p>
                <p className="mt-0.5 text-[0.8rem] text-[#666666]">Our new identity finally feels like us—and our clients notice the difference.</p>
              </div>
            </div>
          </section>

          {/* 2. UI/UX Design & Development — dark */}
          <section className="service-card grid grid-cols-1 gap-10 md:grid-cols-[1fr_1fr] md:items-center md:gap-16 lg:gap-20 rounded-2xl bg-[#292929] px-6 py-12 md:px-10 md:py-16 lg:px-14 lg:py-20">
            <div className="flex flex-col gap-4">
              <div className="overflow-hidden rounded-2xl bg-[#3a3a3a]">
                <img
                  src="/services/web-1.jpg"
                  alt="Product interface and UX flows designed by Nexora"
                  className="h-auto w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="rounded-xl border border-[#444] bg-[#333] p-4">
                <p className="text-[0.7rem] font-medium uppercase tracking-wider text-[#6EDD80]">Project Review</p>
                <p className="mt-1 text-[0.9rem] text-white/90">Michael Tan, Co‑founder at Northwave Studio</p>
                <p className="mt-0.5 text-[0.8rem] text-white/70">The product feels faster and clearer—our trial‑to‑paid conversions went up in weeks.</p>
              </div>
            </div>
            <div>
              <h2 className="text-[clamp(2.1rem,4vw+1.3rem,3.1rem)] font-medium leading-[1.06] tracking-tight text-white">
                UI/UX Design &amp; Development
              </h2>
              <p className="mt-4 max-w-lg text-[clamp(1rem,1.3vw+0.75rem,1.2rem)] leading-relaxed text-white/85">
                From first wireframe to production-ready UI, we design digital products that feel sharp, fast, and intuitive. Every screen is informed by research, prototyping, and real user feedback.
              </p>
              <ul className="mt-5 list-none border-t border-white/20 text-[1rem] leading-relaxed text-white/80">
                {['UX discovery, user journeys, and information architecture', 'Interface design, prototyping, and interaction states', 'Design systems for apps, marketing sites, and dashboards', 'Frontend-ready specs and collaboration with engineering'].map((item) => (
                  <li key={item} className="flex items-center gap-3 border-b border-white/20 py-3">
                    <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-[#6EDD80]" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[0.95rem] text-white/60">Starting from</p>
              <p className="text-[clamp(1.7rem,2.2vw+1.1rem,2.1rem)] font-bold text-white">IDR 140M</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-[9999px] bg-[#6EDD80] px-8 py-2.5 text-[0.95rem] font-medium leading-snug text-[#111111] transition-colors duration-200 hover:bg-[#5ad570]"
                >
                  Discuss project →
                </button>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-[9999px] border border-white/40 px-8 py-2.5 text-[0.95rem] font-medium leading-snug text-white transition-colors duration-200 hover:bg-white/10"
                >
                  View case study
                </Link>
              </div>
            </div>
          </section>

          {/* 3. Marketing Analytics — light */}
          <section className="service-card grid grid-cols-1 gap-10 md:grid-cols-[1fr_1fr] md:items-center md:gap-16 lg:gap-20">
            <div className="order-2 md:order-1">
              <h2 className="text-[clamp(2.1rem,4vw+1.3rem,3.1rem)] font-medium leading-[1.06] tracking-tight text-[#111111]">
                Marketing Analytics
              </h2>
              <p className="mt-4 max-w-lg text-[clamp(1rem,1.3vw+0.75rem,1.2rem)] leading-relaxed text-[#333333]">
                We turn raw channel data into simple stories your team can act on. Every dashboard and report is built to answer one question: what should we do next to grow?
              </p>
              <ul className="mt-5 list-none border-t border-[#DDD5CC] text-[1rem] leading-relaxed text-[#444444]">
                {['Performance dashboards across paid, organic, and product', 'Conversion tracking, funnel analysis, and experimentation', 'Campaign and cohort reporting for stakeholders', 'Insights to inform brand, UX, and growth decisions'].map((item) => (
                  <li key={item} className="flex items-center gap-3 border-b border-[#DDD5CC] py-3">
                    <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-[#6EDD80]" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[0.95rem] text-[#666666]">Starting from</p>
              <p className="text-[clamp(1.7rem,2.2vw+1.1rem,2.1rem)] font-bold text-[#111111]">IDR 60M</p>
              <button
                type="button"
                className="mt-5 inline-flex items-center justify-center rounded-[9999px] bg-[#6EDD80] px-8 py-2.5 text-[0.95rem] font-medium leading-snug text-[#111111] transition-colors duration-200 hover:bg-[#5ad570]"
              >
                Start analytics project →
              </button>
            </div>
            <div className="order-1 md:order-2 flex flex-col gap-4">
              <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
                <img
                  src="/services/marketing-1.jpg"
                  alt="Marketing analytics dashboards and reports"
                  className="h-auto w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="rounded-xl bg-white p-4 shadow-sm">
                <p className="text-[0.7rem] font-medium uppercase tracking-wider text-[#6EDD80]">Project Review</p>
                <p className="mt-1 text-[0.9rem] text-[#333333]">Andre Wijaya, Partner at Brightline Legal</p>
                <p className="mt-0.5 text-[0.8rem] text-[#666666]">Their dashboards turned messy channel data into decisions our leadership actually uses.</p>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* CTA section sebelum footer — diberi batas garis dari isi servis */}
      <div className="w-full border-t border-[rgba(41,41,41,0.1)]">
        <CTASection />
      </div>

      {/* Footer full-width di paling bawah */}
      <Footer />
    </main>
  )
}
