import { useEffect, useLayoutEffect, useState } from 'react'
import axios from 'axios'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Navbar } from '../../components/common/Navbar'
import { CTASection } from '../../components/common/CTASection'
import { Footer } from '../../components/common/Footer'

gsap.registerPlugin(ScrollTrigger)

type RandomUser = {
  login: { uuid: string }
  name: { first: string; last: string }
  picture: { large: string }
  location: { city: string; country: string }
}

type TeamMember = {
  id: string
  name: string
  role: string
  photo: string
  bio: string
}

const ROLES = [
  'Brand Strategy Lead',
  'Senior Product Designer',
  'Performance Marketing Lead',
  'Motion Designer',
  'Client Partnership Lead',
  'UX Researcher',
  'Content Strategist',
  'Design Engineer',
  'Creative Producer',
  'Product Marketing Strategist',
  'Growth Analyst',
  'Design Operations',
]

const fontFamily = "'PP Neue Montreal', system-ui, sans-serif"

export default function TeamsPage() {
  const [members, setMembers] = useState<TeamMember[]>([])

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const { data } = await axios.get<{ results: RandomUser[] }>(
          'https://randomuser.me/api/?results=12&nat=us,gb,au,ca'
        )

        if (cancelled) return

        const mapped: TeamMember[] = data.results.map((user, index) => {
          const fullName = `${user.name.first} ${user.name.last}`
          const role = ROLES[index % ROLES.length]
          const city = user.location.city
          const country = user.location.country

          const bio = `Based in ${city}, ${country}. Helps clients translate complex briefs into clear, testable work for Nexora—balancing craft, collaboration, and measurable outcomes.`

          return {
            id: user.login.uuid,
            name: fullName,
            role,
            photo: user.picture.large,
            bio,
          }
        })

        setMembers(mapped)
      } catch {
        // kalau gagal request, biarkan kosong tanpa error ke user
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const header = document.querySelector('.teams-header')
      const cards = gsap.utils.toArray<HTMLElement>('.team-card')

      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: header,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          },
        )
      }

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 56 },
          {
            opacity: 1,
            y: 0,
            duration: 1.25,
            ease: 'power2.out',
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          },
        )
      })
    })

    return () => ctx.revert()
  }, [members.length])

  return (
    <main
      className="flex min-h-screen w-full flex-col bg-[#292929]"
      style={{ fontFamily }}
    >
      {/* Navbar strip di atas */}
      <section className="w-full px-6 pt-6 md:px-12 md:pt-8 lg:px-16">
        <div className="mx-auto flex w-full flex-col pb-6 md:pb-8">
          <Navbar />
        </div>
      </section>

      {/* Header + grid tim */}
      <section className="w-full px-6 pb-20 pt-4 md:px-12 md:pb-24 md:pt-8 lg:px-16 lg:pb-28 lg:pt-10">
        <div className="mx-auto w-full">
          <header className="teams-header mb-10 flex flex-col items-center gap-3 text-center md:mb-14 lg:mb-16">
            <p className="text-[1rem] font-medium uppercase tracking-[0.22em] md:text-[1.05rem]" style={{ color: 'rgba(245,240,232,0.8)' }}>
              Our team
            </p>
            <h1
              className="text-[clamp(2.25rem,5vw+1.5rem,4rem)] font-medium leading-[1.05] tracking-tight"
              style={{ color: '#F5F0E8' }}
            >
              People who make Nexora move.
            </h1>
            <p
              className="max-w-2xl text-[clamp(0.9375rem,1.2vw+0.5rem,1.125rem)] leading-relaxed"
              style={{ color: 'rgba(245,240,232,0.78)' }}
            >
              A multidisciplinary studio of strategists, designers, and growth partners. This list is generated from live
              data to simulate how Nexora’s team could scale over time.
            </p>
          </header>

          <div className="mt-2 grid grid-cols-2 gap-x-7 gap-y-8 md:mt-4 md:grid-cols-4 md:gap-x-9 md:gap-y-10 lg:mt-6 lg:gap-x-10 lg:gap-y-12">
            {members.map((member) => (
              <article
                key={member.id}
                className="team-card group flex flex-col"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#333333] shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  {/* Overlay bio on hover */}
                  <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-[rgba(0,0,0,0.78)] via-[rgba(0,0,0,0.48)] to-transparent opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
                    <p className="px-4 pb-4 text-[0.9rem] leading-relaxed text-[#F5F0E8]">
                      {member.bio}
                    </p>
                  </div>
                </div>
                {/* Nama & jabatan langsung di bawah foto, dengan jarak lebih lega */}
                <div className="mt-4 flex flex-col">
                  <h2
                    className="text-[clamp(1.25rem,1.7vw+0.8rem,1.5rem)] font-medium leading-snug"
                    style={{ color: '#F5F0E8' }}
                  >
                    {member.name}
                  </h2>
                  <p
                    className="mt-1 text-[clamp(1.05rem,1.4vw+0.65rem,1.2rem)]"
                    style={{ color: 'rgba(245,240,232,0.7)' }}
                  >
                    {member.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full border-t border-[rgba(41,41,41,0.1)]">
        <CTASection />
      </div>

      <Footer />
    </main>
  )
}
