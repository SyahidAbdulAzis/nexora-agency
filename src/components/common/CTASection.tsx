export function CTASection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: '#F5F0E8' }}>
      <div className="mx-auto max-w-[85rem] px-6 py-12 sm:py-14 md:px-12 md:py-20 lg:px-16 lg:py-24">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Kiri: headline + tombol */}
          <div className="relative z-10">
            <h2
              className="max-w-2xl text-[clamp(1.85rem,5vw+1rem,2.75rem)] font-normal leading-[1.15] tracking-[0.03em] sm:text-[clamp(2.25rem,5.5vw+1.25rem,3.25rem)] md:text-[3.5rem] md:leading-[1.1] lg:text-[4.25rem] xl:text-[5rem]"
              style={{
                color: '#292929',
                fontFamily: "'PP Neue Montreal', system-ui, sans-serif",
              }}
            >
              Let's build
              <br />
              <em className="font-normal italic max-sm:whitespace-normal sm:whitespace-nowrap">brands&nbsp;that&nbsp;move</em>
              <br />
              the right people
            </h2>
            <button
              type="button"
              className="mt-6 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[9999px] px-6 py-2.5 text-[0.95rem] font-bold leading-snug transition-opacity hover:opacity-90 sm:mt-8 sm:px-7 md:mt-10 md:px-9 md:py-3 md:text-[1rem]"
              style={{
                backgroundColor: '#6EDD80',
                color: '#292929',
                fontFamily: "'PP Neue Montreal', system-ui, sans-serif",
              }}
            >
              Start a project
            </button>
          </div>

          {/* Kanan: hiasan bentuk per — disembunyikan di mobile kecil, tampil dari sm */}
          <div className="relative hidden min-h-[140px] items-center justify-end sm:flex sm:min-h-[200px] md:min-h-[280px] lg:min-h-[320px]">
            <svg
              className="absolute right-0 top-1/2 w-full max-w-[90%] -translate-y-1/2 opacity-90 sm:max-w-[95%] md:max-w-[88%] lg:max-w-[78%]"
              viewBox="0 0 400 280"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M 24 200 C 72 120 120 72 176 112 C 232 152 216 216 272 208 C 328 200 344 128 376 88"
                stroke="rgba(255,255,255,0.92)"
                strokeWidth="44"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
