type Testimonial = {
  id: number
  quote: string
  name: string
  role: string
  company: string
}

const TOP_ROW_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote:
      "Nexora helped us turn a complex brief into a clear digital experience that our customers actually use—and talk about.",
    name: 'Alya Pratama',
    role: 'Head of Product',
    company: 'HaloPay',
  },
  {
    id: 2,
    quote:
      "The new website finally matches the ambition of our brand. Clean, fast, and focused on the right conversions.",
    name: 'Michael Tan',
    role: 'Co-founder',
    company: 'Northwave Studio',
  },
  {
    id: 3,
    quote:
      "From strategy to rollout, the team kept everything sharp and on-message. Our launch numbers beat every forecast.",
    name: 'Farah R.',
    role: 'Marketing Lead',
    company: 'Sora Living',
  },
  {
    id: 4,
    quote:
      "They translated a long list of requirements into a simple, elegant interface that our team adopted instantly.",
    name: 'Davin Ong',
    role: 'Operations Director',
    company: 'Kinetic Logistics',
  },
]

const BOTTOM_ROW_TESTIMONIALS: Testimonial[] = [
  {
    id: 5,
    quote:
      "Nexora is solution-oriented and honest about what will move the needle. Our performance campaigns keep improving.",
    name: 'Rina Putri',
    role: 'Growth Manager',
    company: 'Lumio Health',
  },
  {
    id: 6,
    quote:
      "Our rebrand rolled out across every touchpoint without chaos. The guidelines they built are a daily reference.",
    name: 'Jared Lim',
    role: 'Brand Manager',
    company: 'Orbit Labs',
  },
  {
    id: 7,
    quote:
      "Working with Nexora felt like adding a senior design team to our company—without losing our own voice.",
    name: 'Nadia Surya',
    role: 'Founder',
    company: 'Studio Karsa',
  },
  {
    id: 8,
    quote:
      "We get better feedback from clients, and our new site finally supports the kind of work we want to be known for.",
    name: 'Andre Wijaya',
    role: 'Partner',
    company: 'Brightline Legal',
  },
]

function TestimonialCard({ quote, name, role, company }: Testimonial) {
  return (
    <article className="relative flex min-w-[280px] max-w-[480px] min-h-[230px] flex-col justify-between rounded-[32px] bg-white px-8 py-8 shadow-[0_18px_40px_rgba(0,0,0,0.05)] md:min-w-[340px] md:max-w-[540px] md:min-h-[270px] md:px-10 md:py-10 lg:min-w-[420px] lg:max-w-[620px] lg:min-h-[310px]">
      <div className="relative">
        <p
          className="text-[clamp(1.18rem,2.8vw,1.45rem)] leading-[1.7]"
          style={{
            color: '#333333',
            fontFamily: "'PP Neue Montreal', system-ui, sans-serif",
          }}
        >
          {quote}
        </p>
      </div>

      <div className="relative mt-6 flex items-center gap-3.5 md:mt-7">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#6EDD80] text-base font-medium text-[#111111] md:h-12 md:w-12">
          {name.charAt(0)}
        </div>
        <div className="flex flex-col">
          <span
            className="text-[1.05rem] font-medium md:text-[1.15rem]"
            style={{
              color: '#111111',
              fontFamily: "'PP Neue Montreal', system-ui, sans-serif",
            }}
          >
            {name}
          </span>
          <span
            className="text-[0.9rem] md:text-[0.98rem]"
            style={{
              color: '#666666',
              fontFamily: "'PP Neue Montreal', system-ui, sans-serif",
            }}
          >
            {role}, {company}
          </span>
        </div>
      </div>
    </article>
  )
}

export function TestimonialsSection() {
  return (
    <section
      className="w-full px-6 py-18 md:px-12 md:py-22 lg:px-16 lg:py-26"
      style={{ backgroundColor: '#F5F0E8' }}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 md:gap-8">
        {/* Optional heading kecil */}
        <div className="flex flex-col gap-3 md:gap-3.5">
          <span
            className="text-[1rem] font-medium tracking-[0.18em] md:text-[1.05rem]"
            style={{
              color: '#777777',
              fontFamily: "'PP Neue Montreal', system-ui, sans-serif",
            }}
          >
            TESTIMONIALS
          </span>
          <h2
            className="text-[clamp(1.9rem,3.8vw+1rem,2.3rem)] font-normal leading-[1.12] tracking-[0.03em] md:text-[2.5rem] lg:text-[2.9rem]"
            style={{
              color: '#111111',
              fontFamily: "'PP Neue Montreal', system-ui, sans-serif",
            }}
          >
            What our clients say about working with Nexora.
          </h2>
        </div>

        {/* Top row – bergerak ke kanan */}
        <div className="relative overflow-hidden">
          <div className="flex w-max gap-4 animate-testimonial-marquee-right md:gap-6 lg:gap-8">
            {[...TOP_ROW_TESTIMONIALS, ...TOP_ROW_TESTIMONIALS].map(
              (item, index) => (
                <TestimonialCard key={`${item.id}-${index}`} {...item} />
              ),
            )}
          </div>
        </div>

        {/* Bottom row – bergerak ke kiri */}
        <div className="relative overflow-hidden">
          <div className="flex w-max gap-4 animate-testimonial-marquee-left md:gap-6 lg:gap-8">
            {[...BOTTOM_ROW_TESTIMONIALS, ...BOTTOM_ROW_TESTIMONIALS].map(
              (item, index) => (
                <TestimonialCard key={`${item.id}-${index}`} {...item} />
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

