import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const SLIDES = [
  {
    image: '/oddsbora-logo.png',
    tag: 'The OddsBora Vision',
    title: 'AI-Powered Sports Intelligence',
    subtitle: 'Read the odds. Know the risk.',
    description: 'OddsBora combines cutting-edge AI with deep sports data to deliver transparent probabilities, honest risk assessments, and clear insights. We strip away the noise to give you the purest probability signals based on real-world performance.',
    glowClass: 'hero-glow-green',
  },
  {
    image: '/hero/oddsbora-hero-1.jpg',
    tag: 'Model Probability',
    title: 'Transparent Estimates',
    subtitle: 'Built on real historical and form data.',
    description: 'A transparent estimate built from real historical and form data across football, netball, boxing, basketball, and more. See where the model and the market disagree, and by how much.',
    glowClass: 'hero-glow-green',
  },
  {
    image: '/hero/oddsbora-hero-2.jpg',
    tag: 'Sports Intelligence for Africa',
    title: 'Clearer Probabilities',
    subtitle: 'Honest risk, for the leagues you follow.',
    description: 'Built specifically for the leagues and sports Kenya follows most. We provide clearer probabilities and honest risk assessments, empowering you to see the game from a completely different, data-driven perspective.',
    glowClass: 'hero-glow-amber',
  },
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-advance the carousel every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)
  }

  const currentData = SLIDES[currentSlide]

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto fade-up">
      
      {/* Image Carousel Container */}
      <div className={`relative rounded-2xl border border-black/10 bg-white overflow-hidden shadow-xl ${currentData.glowClass} transition-all duration-500`}>
        
        {/* Slides Wrapper */}
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden bg-navy-950">
          {SLIDES.map((slide, index) => (
            <img
              key={slide.image}
              src={slide.image}
              alt={slide.title}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
                index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
            />
          ))}
          
          {/* Subtle Gradient Overlay for Arrow Visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition z-10"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Pagination Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-signal-green w-6' : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Rich Description Section */}
      <div className="bg-white rounded-2xl border border-black/10 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col gap-4">
          
          {/* Tag & Subtitle */}
          <div className="flex items-center gap-3">
            <span className="text-signal-green text-xs font-mono uppercase tracking-widest bg-signal-green/10 px-3 py-1 rounded-full border border-signal-green/20">
              {currentData.tag}
            </span>
            <span className="text-slate-400 text-xs hidden sm:block">
              {currentSlide + 1} / {SLIDES.length}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-navy-950 leading-tight">
            {currentData.title}
          </h3>

          {/* Subtitle */}
          <p className="text-lg text-slate-600 font-medium">
            {currentData.subtitle}
          </p>

          {/* Detailed Description */}
          <p className="text-slate-500 leading-relaxed text-sm sm:text-base max-w-3xl">
            {currentData.description}
          </p>

          {/* Call to Action (Optional but recommended) */}
          <div className="mt-2">
            <a 
              href="/how-it-works" 
              className="inline-flex items-center gap-2 text-sm font-semibold text-signal-green hover:text-signal-green/80 transition"
            >
              Learn more about our methodology <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </div>
      
    </div>
  )
}