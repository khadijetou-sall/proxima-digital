import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ArrowRight } from 'lucide-react'

export default function PageHero({ label, title, description, primaryCta, secondaryCta }) {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-content > *', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  const renderTitle = () => {
    if (typeof title === 'string' && title.includes('<span>')) {
      const parts = title.split(/(<span>.*?<\/span>)/)
      return parts.map((part, i) => {
        if (part.startsWith('<span>')) {
          return (
            <span key={i} className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              {part.replace('</span>', '').replace('<span>', '')}
            </span>
          )
        }
        return part
      })
    }
    return title
  }

  return (
    <section ref={heroRef} className="relative pt-32 pb-20 sm:pb-28 bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.1),transparent_50%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="hero-content max-w-3xl">
          {label && (
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400 mb-4">
              {label}
            </p>
          )}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.1]">
            {renderTitle()}
          </h1>
          <p className="mt-6 text-lg text-gray-400 max-w-xl leading-relaxed">
            {description}
          </p>
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              {primaryCta && primaryCta.href && (
                <a
                  href={primaryCta.href}
                  target={primaryCta.external ? '_blank' : undefined}
                  rel={primaryCta.external ? 'noreferrer' : undefined}
                  className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition-all active:scale-[0.98]"
                >
                  {primaryCta.text} <ArrowRight className="w-4 h-4" />
                </a>
              )}
              {primaryCta && primaryCta.to && (
                <Link
                  to={primaryCta.to}
                  className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition-all active:scale-[0.98]"
                >
                  {primaryCta.text} <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              {secondaryCta && secondaryCta.to && (
                <Link
                  to={secondaryCta.to}
                  className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-white/10 transition-all"
                >
                  {secondaryCta.text}
                </Link>
              )}
              {secondaryCta && secondaryCta.href && (
                <a
                  href={secondaryCta.href}
                  target={secondaryCta.external ? '_blank' : undefined}
                  rel={secondaryCta.external ? 'noreferrer' : undefined}
                  className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-white/10 transition-all"
                >
                  {secondaryCta.text}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
