import { useEffect, useState } from 'react'

const SLIDES = [
  {
    image: '/hero/oddsbora-hero-1.jpg',
    caption: 'Model Probability',
    detail: 'A transparent estimate built from real historical and form data.',
  },
  {
    image: '/hero/oddsbora-hero-2.jpg',
    caption: 'Sports Intelligence for Africa',
    detail: 'Clearer probabilities, honest risk, for the leagues you follow.',
  },
]

export default function HeroCarousel() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length)
    }, 6000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 h-[220px] sm:h-[320px] md:h-[420px] hero-glow shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
      {SLIDES.map((slide, i) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === active ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <img
            src={slide.image}
            alt={slide.caption}
            className={`w-full h-full object-cover ${i === active ? 'hero-kenburns' : ''}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/10 to-transparent" />

          <div
            key={`${slide.image}-caption`}
            className={`absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-xs ${i === active ? 'hero-caption-in' : ''}`}
          >
            <div className="inline-flex flex-col gap-1 bg-white/[0.08] backdrop-blur-xl border border-signal-green/30 rounded-xl px-4 py-3">
              <span className="text-signal-green text-xs font-mono uppercase tracking-wide">{slide.caption}</span>
              <span className="text-white/85 text-sm">{slide.detail}</span>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex gap-1.5 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Show slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${i === active ? 'w-6 bg-signal-green' : 'w-1.5 bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  )
}