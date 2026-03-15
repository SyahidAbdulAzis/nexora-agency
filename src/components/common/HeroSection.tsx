import { useRef, useState } from 'react'
import { Navbar } from './Navbar'

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isMuted, setIsMuted] = useState(true)

  const handleVideoClick = () => {
    const el = videoRef.current
    if (!el) return

    const nextMuted = !isMuted
    el.muted = nextMuted

    if (el.paused) {
      el.play().catch(() => {
        // ignore autoplay restriction errors
      })
    }

    setIsMuted(nextMuted)
  }

  return (
    <section
      className="relative flex min-h-[75vh] w-full flex-col overflow-x-hidden px-6 py-8 md:px-12 md:py-12 lg:px-16 lg:py-16 max-md:min-h-[80dvh]"
      style={{ backgroundColor: '#F5F0E8' }}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col">
        <Navbar />

        {/* Main content - alignment rapih */}
        <div className="mt-12 flex flex-1 items-center pb-24 lg:mt-20 lg:pb-32 max-md:mt-10 max-md:items-start max-md:pb-16 max-md:pt-2">
          <div className="grid w-full gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:items-center max-md:gap-10">
            {/* Left column - Headline + Subtitle */}
            <div className="space-y-8 max-md:mt-4 max-md:space-y-5">
              <h1
                className="text-[clamp(2.05rem,3.8vw+1.25rem,3.6rem)] font-medium leading-[1.08] tracking-[0.03em] md:text-[38px] lg:text-[48px] xl:text-[56px]"
                style={{
                  color: '#333333',
                  fontFamily: "'PP Neue Montreal', system-ui, sans-serif",
                }}
              >
                Nexora Agency: We Build Brands That Move
              </h1>
              <p
                className="max-w-[420px] text-[19px] font-normal leading-[1.7] tracking-[0.01em] lg:text-[21px] max-md:max-w-none max-md:text-[clamp(1.0625rem,3vw+0.75rem,1.25rem)]"
                style={{
                  color: '#333333',
                  fontFamily: "'PP Neue Montreal', system-ui, sans-serif",
                }}
              >
                Full-service digital agency specializing in brand strategy, performance marketing, and UI/UX design. We
                drive growth through clarity—from bold visual identities to data-driven campaigns that deliver measurable
                results.
              </p>
              <p
                className="text-[19px] font-normal tracking-[0.08em] max-md:text-[clamp(0.95rem,2.3vw+0.7rem,1.125rem)]"
                style={{
                  color: '#333333',
                  fontFamily: "'PP Neue Montreal', system-ui, sans-serif",
                }}
              >
                <span className="font-bold tracking-[0.14em]">NEXORA</span> AGENCY / Est. 2026
              </p>
            </div>

            {/* Right column - Hero video */}
            <div className="pt-6 lg:pt-10 flex flex-col items-start lg:items-end">
              <div
                className="overflow-hidden rounded-[24px] bg-[#E8E2DC] shadow-[0_18px_40px_rgba(0,0,0,0.12)] w-full max-w-[520px] aspect-[16/9] cursor-pointer"
                onClick={handleVideoClick}
              >
                <video
                  src="/videos/hero.mp4"
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  ref={videoRef}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
