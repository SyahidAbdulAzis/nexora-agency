import { useState } from 'react'

/** Gambar placeholder company overview */
const GALLERY_IMAGES = [
  { id: 1, src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80', alt: 'Creative workspace' },
  { id: 2, src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80', alt: 'Team collaboration' },
  { id: 3, src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80', alt: 'Brand strategy' },
  { id: 4, src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80', alt: 'Business growth' },
]

const GALLERY_HEIGHT = 280
const HALF = GALLERY_HEIGHT / 2
const HEADER_HEIGHT = 56

export function StudioSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextSlide = () => {
    setActiveIndex((i) => (i + 1) % GALLERY_IMAGES.length)
  }

  return (
    <section className="relative w-full overflow-visible">
      {/* #F5F0E8 — ruang bawah agar gallery (setengah) + header ada di perbatasan */}
      <div
        className="w-full"
        style={{
          backgroundColor: '#F5F0E8',
          paddingBottom: HALF + HEADER_HEIGHT,
        }}
      />

      {/* #292929: header lalu gallery; gallery setengah di beige setengah di sini */}
      <div
        className="relative w-full overflow-visible"
        style={{ backgroundColor: '#292929' }}
      >
        {/* Header: #01, STUDIO, panah — ditarik ke atas (di beige) */}
        <div
          className="flex items-center justify-between px-6 py-4 md:px-12 lg:px-16"
          style={{
            height: HEADER_HEIGHT,
            marginTop: -(HALF + HEADER_HEIGHT),
          }}
        >
          <div className="relative">
            <span className="absolute -top-1.5 left-0 h-2 w-2 rounded-full bg-[#3B82F6]" />
            <span
              className="pl-4 text-lg font-medium text-white md:text-xl"
              style={{ fontFamily: "'PP Neue Montreal', system-ui, sans-serif" }}
            >
              #{String(activeIndex + 1).padStart(2, '0')}
            </span>
          </div>
          <span
            className="text-sm font-medium tracking-[0.2em] text-white md:text-base"
            style={{ fontFamily: "'PP Neue Montreal', system-ui, sans-serif" }}
          >
            STUDIO
          </span>
          <button
            type="button"
            onClick={nextSlide}
            className="flex items-center justify-center text-white transition-opacity hover:opacity-70"
            aria-label="Next"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="md:w-10 md:h-10">
              <path d="M4 12 L16 12 L22 6" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
            </svg>
          </button>
        </div>

        {/* 4 kotak gambar nempel (gap 0) — setengah di perbatasan */}
        <div
          className="flex w-full"
          style={{
            height: GALLERY_HEIGHT,
            marginTop: -HALF,
          }}
        >
          {GALLERY_IMAGES.map((item, index) => (
            <div
              key={item.id}
              className="relative flex-1 overflow-hidden cursor-pointer"
              style={{ minWidth: 0 }}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveIndex(index)}
              role="button"
              tabIndex={0}
            >
              <img src={item.src} alt={item.alt} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>

        <div className="pb-12 md:pb-16" />
      </div>
    </section>
  )
}
