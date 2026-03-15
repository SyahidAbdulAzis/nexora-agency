import { useEffect, useMemo, useState } from 'react'

type ServiceId = 'brandStrategy' | 'uiux' | 'analytics'

type ServiceConfig = {
  id: ServiceId
  label: string
  images: string[]
}

const SERVICES: ServiceConfig[] = [
  {
    id: 'brandStrategy',
    label: 'BRAND STRATEGY & IDENTITY',
    images: [
      '/services/strategy-1.jpg',
      '/services/brand-1.jpg',
      '/services/brand-2.jpg',
    ],
  },
  {
    id: 'uiux',
    label: 'UI/UX DESIGN & DEVELOPMENT',
    images: [
      '/services/web-1.jpg',
      '/services/web-2.jpg',
      '/services/web-3.jpg',
    ],
  },
  {
    id: 'analytics',
    label: 'MARKETING ANALYTICS',
    images: [
      '/services/marketing-1.jpg',
      '/services/marketing-2.jpg',
      '/services/marketing-3.jpg',
    ],
  },
]

const IMAGE_SWITCH_INTERVAL = 3000

const BASE_POSITIONS = [
  // Photo 1: top-right, slight negative rotation
  { top: 18, left: 82, rotate: -3 },
  // Photo 2: bottom-right, slight positive rotation
  { top: 78, left: 82, rotate: 2 },
  // Photo 3: center-right, overlapping toward middle
  { top: 50, left: 66, rotate: 0 },
]

export function ProductsOrServicesSection() {
  const headingStyle = {
    color: '#F5F0E8',
    fontFamily: "'PP Neue Montreal', system-ui, sans-serif",
  }
  const [activeId, setActiveId] = useState<ServiceId | null>(null)
  const [revealedImages, setRevealedImages] = useState<
    { src: string; top: number; left: number; rotate: number }[]
  >([])

  const activeService = useMemo(
    () => SERVICES.find((s) => s.id === activeId) ?? null,
    [activeId],
  )

  useEffect(() => {
    // Jika tidak ada service yang aktif, sembunyikan semua gambar
    if (!activeService) {
      setRevealedImages([])
      return
    }

    // Saat hover service baru: mulai dengan satu gambar pertama di slot pertama (top-right)
    const firstSrc = activeService.images[0]
    const firstPos = BASE_POSITIONS[0] ?? { top: 40, left: 60, rotate: 0 }

    setRevealedImages([
      {
        src: firstSrc,
        top: firstPos.top,
        left: firstPos.left,
        rotate: firstPos.rotate,
      },
    ])

    let index = 1
    const interval = window.setInterval(() => {
      // Jika semua gambar sudah muncul atau service berubah, hentikan
      if (!activeService || index >= activeService.images.length) {
        window.clearInterval(interval)
        return
      }

      const src = activeService.images[index]
      const slot =
        BASE_POSITIONS[index] ??
        BASE_POSITIONS[BASE_POSITIONS.length - 1] ?? {
          top: 50,
          left: 60,
          rotate: 0,
        }

      setRevealedImages((prev) => [
        ...prev,
        {
          src,
          top: slot.top,
          left: slot.left,
          rotate: slot.rotate,
        },
      ])

      index += 1
    }, IMAGE_SWITCH_INTERVAL)

    return () => window.clearInterval(interval)
  }, [activeService])

  return (
    <section
      className="relative w-full overflow-hidden px-6 pb-20 pt-16 md:px-12 md:pb-24 md:pt-20 lg:px-16 lg:pb-28 lg:pt-24"
      style={{ backgroundColor: '#292929' }}
    >
      <div className="mx-auto flex max-w-7xl items-center">
        {/* Layout: kiri daftar services, kanan gambar yang berganti */}
        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: daftar services besar */}
          <div className="flex flex-col">
            <h2
              className="mb-8 font-normal leading-[1.1] tracking-[0.03em] text-[clamp(2rem,5vw+1.25rem,3.5rem)] md:mb-10 md:text-[2.75rem] lg:text-[3.25rem] xl:text-[3.5rem]"
              style={headingStyle}
            >
              What We Do
            </h2>

          <div
            className="space-y-2 md:space-y-3 lg:space-y-4"
            style={{ fontFamily: "'PP Neue Montreal', system-ui, sans-serif" }}
          >
              {SERVICES.map((service) => {
                const isActive = service.id === activeId
                return (
                  <button
                    key={service.id}
                    type="button"
                    className="group flex w-full items-baseline justify-start text-left"
                  >
                    <span
                      className={`text-[clamp(2.2rem,5.5vw+1.5rem,4.2rem)] leading-none tracking-[0.03em] transition-opacity ${
                        isActive ? 'opacity-100' : 'opacity-35'
                      }`}
                      style={{ color: '#F5F0E8' }}
                      onMouseEnter={() => setActiveId(service.id)}
                      onFocus={() => setActiveId(service.id)}
                    >
                      {service.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right: gambar muncul hanya saat hover */}
          {/* Mobile: gambar ditampilkan berurutan ke bawah (lebih rapih) */}
          <div className="mt-6 flex flex-col items-center gap-4 lg:hidden">
            {revealedImages.map((img) => (
              <img
                key={img.src}
                src={img.src}
                alt={activeService?.label ?? 'Service work'}
                className="w-full max-w-xs rounded-3xl object-cover shadow-[0_14px_32px_rgba(0,0,0,0.35)]"
                loading="lazy"
              />
            ))}
          </div>

          {/* Desktop: satu per satu hingga semua keluar, posisi acak di dalam area kanan */}
          <div className="relative hidden min-h-[260px] items-center justify-center lg:flex lg:min-h-[360px]">
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-10">
              {/* optional background texture */}
            </div>

            {revealedImages.map((img) => (
              <img
                key={img.src}
                src={img.src}
                alt={activeService?.label ?? 'Service work'}
                className="absolute h-[180px] w-[220px] rounded-3xl object-cover shadow-[0_18px_45px_rgba(0,0,0,0.35)] md:h-[220px] md:w-[260px] lg:h-[260px] lg:w-[300px] transition-transform duration-700"
                style={{
                  top: `${img.top}%`,
                  left: `${img.left}%`,
                  transform: `translate(-50%, -50%) rotate(${img.rotate}deg)`,
                }}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
