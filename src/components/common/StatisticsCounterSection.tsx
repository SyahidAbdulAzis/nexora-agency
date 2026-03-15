import { useEffect, useRef, useState } from 'react'

const STATS = [
  { value: '150+', label: 'Clients served' },
  { value: '320+', label: 'Campaigns launched' },
  { value: '24', label: 'Team members' },
]

type StatConfig = (typeof STATS)[number]

function parseNumberFromStat(value: string): number {
  // Ambil bagian angka di depan (contoh "150+" → 150)
  const match = value.match(/\d+/)
  return match ? Number(match[0]) : 0
}

function formatStatValue(base: string, current: number): string {
  // Pertahankan suffix seperti "+" kalau ada
  const suffix = base.replace(/\d+/g, '')
  return `${current.toString()}${suffix}`
}

function AnimatedStat({ value, label, active }: StatConfig & { active: boolean }) {
  const target = parseNumberFromStat(value)
  const [display, setDisplay] = useState(active ? target : 0)

  useEffect(() => {
    if (!active) return
    let frameId: number
    const duration = 1200 // ms
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      const current = Math.round(target * eased)
      setDisplay(current)
      if (progress < 1) {
        frameId = requestAnimationFrame(tick)
      }
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [active, target])

  return (
    <div className="flex flex-col items-center border-t border-[rgba(242,236,231,0.2)] pt-6 text-center">
      <span
        className="text-[clamp(2.5rem,5vw+1.5rem,4rem)] font-normal leading-[1.1] tracking-[0.03em] md:text-[3.5rem] lg:text-[4rem]"
        style={{
          color: '#F5F0E8',
          fontFamily: "'PP Neue Montreal', system-ui, sans-serif",
        }}
      >
        {formatStatValue(value, display)}
      </span>
      <span
        className="mt-2 text-[1rem] font-light tracking-[0.02em] md:text-[1.1rem]"
        style={{
          color: 'rgba(242,236,231,0.85)',
          fontFamily: "'PP Neue Montreal', system-ui, sans-serif",
        }}
      >
        {label}
      </span>
    </div>
  )
}

export function StatisticsCounterSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!sectionRef.current || hasAnimated) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasAnimated(true)
          }
        })
      },
      {
        threshold: 0.4,
      },
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [hasAnimated])

  return (
    <section
      ref={sectionRef}
      className="w-full px-6 py-16 md:px-12 md:py-20 lg:px-16 lg:py-24"
      style={{ backgroundColor: '#292929' }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          {STATS.map((stat) => (
            <AnimatedStat key={stat.label} {...stat} active={hasAnimated} />
          ))}
        </div>
      </div>
    </section>
  )
}
