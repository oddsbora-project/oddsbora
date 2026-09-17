const SLIDES = [
  {
    image: '/hero/oddsbora-hero-1.jpg',
    caption: 'Model Probability',
    detail: 'A transparent estimate built from real historical and form data — across football, netball, boxing, basketball, and more.',
    glowClass: 'hero-glow-green',
  },
  {
    image: '/hero/oddsbora-hero-2.jpg',
    caption: 'Sports Intelligence for Africa',
    detail: 'Clearer probabilities, honest risk, for the leagues you follow.',
    glowClass: 'hero-glow-amber',
  },
]

export default function HeroCarousel() {
  return (
    <div className="flex flex-col gap-6">
      {SLIDES.map((slide, i) => (
        <div
          key={slide.image}
          className={`rounded-2xl border border-black/10 bg-white overflow-hidden shadow-lg ${slide.glowClass} fade-up`}
          style={{ animationDelay: `${i * 150}ms` }}
        >
          <img
            src={slide.image}
            alt={slide.caption}
            className="w-full h-auto block"
          />
          <div className="px-5 py-4 sm:px-6 sm:py-5">
            <span className="text-signal-green text-xs font-mono uppercase tracking-wide">{slide.caption}</span>
            <p className="text-slate-700 text-sm sm:text-base mt-1">{slide.detail}</p>
          </div>
        </div>
      ))}
    </div>
  )
}