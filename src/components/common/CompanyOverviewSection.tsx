/**
 * Company Overview — layout kolase: foto tim + kotak Background, Team, Culture.
 * Foto: isi TEAM_PHOTOS dengan URL atau path lokal (public/team/team-1.jpg → /team/team-1.jpg).
 * Butuh 6 gambar: foto orang/tim, atau lingkungan kerja/kantor. Kalau ada link gambar, beri URL-nya.
 */
const fontSerif = "'PP Neue Montreal', system-ui, sans-serif"
const fontSans = "'PP Neue Montreal', system-ui, sans-serif"

const TEAM_PHOTOS = [
  // Diambil dari gallery StudioSection (Unsplash) untuk mencerminkan work, team, strategy, growth
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80', // creative workspace
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80', // team collaboration
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&q=80', // brand strategy
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=80', // business growth
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', // lunch / team culture
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80', // workshop / collaboration
  'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200&q=80', // extra environment
]

function CollageImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-[#E8E2DC] aspect-[4/3] w-full min-h-0 self-start md:aspect-auto md:min-h-[180px] md:self-auto ${className ?? ''}`}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover object-center"
        loading="lazy"
        onError={(e) => {
          const target = e.currentTarget
          target.style.display = 'none'
          const placeholder = target.nextElementSibling as HTMLElement
          if (placeholder) placeholder.classList.remove('hidden')
        }}
      />
      <div
        className="hidden absolute inset-0 flex flex-col items-center justify-center gap-1 border-2 border-dashed border-[#292929]/25 rounded-lg bg-[#F5F0E8]"
        style={{ fontFamily: fontSans, color: '#292929', fontSize: 'clamp(0.9375rem, 2vw, 1.125rem)' }}
        aria-hidden
      >
        <span className="font-medium">Foto tim</span>
        <span className="text-[0.8em] opacity-75">Ganti di TEAM_PHOTOS</span>
      </div>
    </div>
  )
}

export function CompanyOverviewSection() {
  return (
    <section
      className="w-full px-4 py-16 md:px-6 md:py-20 lg:px-8 lg:py-24"
      style={{ backgroundColor: '#F5F0E8' }}
    >
      <div className="mx-auto w-full max-w-[92rem]">
        <h2
          className="mb-10 text-center font-medium leading-tight tracking-[0.03em] md:mb-14"
          style={{
            color: '#292929',
            fontFamily: fontSerif,
            fontSize: 'clamp(2rem, 5vw + 1.25rem, 3.5rem)',
          }}
        >
          Who We Are
        </h2>

        {/* Grid kolase: foto tim + kotak Background, Team, Culture */}
        <div className="company-overview-grid grid gap-3 md:gap-4 lg:gap-5">
          <CollageImage src={TEAM_PHOTOS[0]} alt="Team" className="cog-photo-1" />
          <div
            className="cog-background flex w-full flex-col justify-center rounded-xl px-6 py-8 md:px-10 md:py-12"
            style={{ backgroundColor: '#C4714F' }}
          >
            <h3
              className="text-[clamp(1.55rem,3vw+1rem,2rem)] font-medium italic tracking-tight"
              style={{ color: '#FFFFFF', fontFamily: fontSerif }}
            >
              Background
            </h3>
            <p
              className="mt-4 text-[clamp(1.35rem,2.3vw+0.8rem,1.7rem)] font-medium leading-relaxed md:mt-5"
              style={{ color: '#FFFFFF', fontFamily: fontSans }}
            >
              Nexora Agency is a full-service digital agency specializing in brand strategy, performance marketing, and UI/UX design. We help ambitious brands grow through clarity—from bold visual identities to data-driven campaigns that deliver measurable results.
            </p>
          </div>
          <CollageImage src={TEAM_PHOTOS[1]} alt="Team" className="cog-photo-2" />
          <CollageImage src={TEAM_PHOTOS[2]} alt="Team" className="cog-photo-3" />
          <div
            className="cog-team flex flex-col justify-center rounded-lg px-6 py-9 md:px-10 md:py-12"
            style={{ backgroundColor: '#292929' }}
          >
            <h3
              className="text-[clamp(1.55rem,3vw+1rem,2rem)] font-medium italic tracking-tight"
              style={{ color: '#F5F0E8', fontFamily: fontSerif }}
            >
              Team
            </h3>
            <p
              className="mt-4 max-w-2xl text-[clamp(1.35rem,2.3vw+0.8rem,1.7rem)] font-medium leading-relaxed text-[rgba(242,236,231,0.95)] md:mt-5"
              style={{ fontFamily: fontSans }}
            >
              We are a multidisciplinary team of strategists, designers, and performance marketers who care about both craft and outcomes. Every project is led by a small, senior core team so decisions are fast, clear, and aligned with your goals.
            </p>
          </div>
          <CollageImage src={TEAM_PHOTOS[3]} alt="Team" className="cog-photo-4" />
          <CollageImage src={TEAM_PHOTOS[4]} alt="Team" className="cog-photo-5" />
          <CollageImage src={TEAM_PHOTOS[5]} alt="Team" className="cog-photo-6" />
        </div>

        {/* Baris kedua: foto besar (kiri) + Culture (kanan) */}
        <div className="mt-2 grid grid-cols-1 gap-3 md:mt-3 md:grid-cols-2 md:gap-4 lg:gap-5">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#E8E2DC] min-h-0 md:aspect-auto md:min-h-[280px]">
            <img
              src={TEAM_PHOTOS[6]}
              alt="Team"
              className="h-full w-full object-cover object-center"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                const next = e.currentTarget.nextElementSibling as HTMLElement
                if (next) next.classList.remove('hidden')
              }}
            />
            <div className="hidden absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-[#292929]/25 bg-[#F5F0E8]" style={{ fontFamily: fontSans, color: '#292929', fontSize: 'clamp(0.9375rem, 2vw, 1.125rem)' }} aria-hidden>
              <span className="font-medium">Foto tim</span>
              <span className="text-[0.8em] opacity-75">Ganti di TEAM_PHOTOS</span>
            </div>
          </div>
          <div
            className="flex flex-col justify-center rounded-lg px-6 py-9 md:px-10 md:py-12 ring-1 ring-[#292929]/10"
            style={{ backgroundColor: '#6EDD80' }}
          >
            <h3
              className="text-[clamp(1.55rem,3vw+1rem,2rem)] font-medium italic tracking-tight"
              style={{ color: '#292929', fontFamily: fontSerif }}
            >
              Culture
            </h3>
            <p
              className="mt-4 text-[clamp(1.35rem,2.3vw+0.8rem,1.7rem)] font-medium leading-relaxed md:mt-5"
              style={{ color: '#292929', fontFamily: fontSans }}
            >
              We believe great brands move people—through clear stories, distinctive visuals, and experiences that convert. Our culture is collaborative, curious, and data-informed, so every idea is tested against real impact.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
