import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Zap, Users, Shield, MessageSquare } from 'lucide-react'
import Header from '../components/Header'

gsap.registerPlugin(ScrollTrigger)

const visualSvgs = {
  logos: (id) => (
    <svg viewBox="0 0 200 150" className="w-full h-full" fill="none">
      <circle cx="100" cy="65" r="40" stroke={`url(#${id}-g1)`} strokeWidth="1.5" className="opacity-35" />
      <circle cx="100" cy="65" r="25" fill={`url(#${id}-g1)`} className="opacity-25" />
      <polygon points="100,35 125,75 100,95 75,75" fill={`url(#${id}-g1)`} className="opacity-85" />
      <circle cx="100" cy="65" r="8" fill="white" className="opacity-70" />
      <circle cx="60" cy="88" r="4" fill={`url(#${id}-g1)`} className="opacity-50" />
      <circle cx="140" cy="88" r="4" fill={`url(#${id}-g1)`} className="opacity-50" />
    </svg>
  ),
  chartes: (id) => (
    <svg viewBox="0 0 200 150" className="w-full h-full" fill="none">
      <rect x="30" y="25" width="140" height="100" rx="8" stroke={`url(#${id}-g1)`} strokeWidth="1" className="opacity-25" />
      <circle cx="60" cy="60" r="18" fill={`url(#${id}-g1)`} className="opacity-85" />
      <circle cx="100" cy="60" r="18" fill={`url(#${id}-g2)`} className="opacity-85" />
      <circle cx="140" cy="60" r="18" fill={`url(#${id}-g3)`} className="opacity-85" />
      <rect x="47" y="98" width="25" height="3" rx="1.5" fill="white" className="opacity-50" />
      <rect x="87" y="98" width="25" height="3" rx="1.5" fill="white" className="opacity-50" />
      <rect x="127" y="98" width="25" height="3" rx="1.5" fill="white" className="opacity-50" />
    </svg>
  ),
  social: (id) => (
    <svg viewBox="0 0 200 150" className="w-full h-full" fill="none">
      <rect x="50" y="25" width="100" height="100" rx="12" stroke={`url(#${id}-g1)`} strokeWidth="1" className="opacity-35" />
      <circle cx="100" cy="55" r="15" fill={`url(#${id}-g1)`} className="opacity-85" />
      <rect x="72" y="82" width="56" height="6" rx="3" fill={`url(#${id}-g1)`} className="opacity-50" />
      <rect x="76" y="94" width="48" height="4" rx="2" fill={`url(#${id}-g1)`} className="opacity-35" />
      <rect x="80" y="104" width="40" height="3" rx="1.5" fill={`url(#${id}-g1)`} className="opacity-25" />
      <circle cx="77" cy="55" r="3" fill="white" className="opacity-60" />
      <circle cx="123" cy="55" r="3" fill="white" className="opacity-60" />
    </svg>
  ),
  community: (id) => (
    <svg viewBox="0 0 200 150" className="w-full h-full" fill="none">
      <circle cx="100" cy="60" r="20" fill={`url(#${id}-g1)`} className="opacity-85" />
      <circle cx="60" cy="35" r="10" fill={`url(#${id}-g2)`} className="opacity-75" />
      <circle cx="140" cy="35" r="10" fill={`url(#${id}-g2)`} className="opacity-75" />
      <circle cx="50" cy="100" r="10" fill={`url(#${id}-g3)`} className="opacity-75" />
      <circle cx="150" cy="100" r="10" fill={`url(#${id}-g3)`} className="opacity-75" />
      <circle cx="100" cy="120" r="8" fill={`url(#${id}-g1)`} className="opacity-50" />
      <path d="M78 47 L64 39" stroke={`url(#${id}-g1)`} strokeWidth="1.5" className="opacity-35" />
      <path d="M122 47 L136 39" stroke={`url(#${id}-g1)`} strokeWidth="1.5" className="opacity-35" />
      <path d="M66 43 L58 90" stroke={`url(#${id}-g1)`} strokeWidth="1.5" className="opacity-35" />
      <path d="M134 43 L142 90" stroke={`url(#${id}-g1)`} strokeWidth="1.5" className="opacity-35" />
      <path d="M100 80 L100 112" stroke={`url(#${id}-g1)`} strokeWidth="1.5" className="opacity-35" />
    </svg>
  ),
  websites: (id) => (
    <svg viewBox="0 0 200 150" className="w-full h-full" fill="none">
      <rect x="40" y="30" width="120" height="90" rx="6" stroke={`url(#${id}-g1)`} strokeWidth="1.2" className="opacity-35" />
      <rect x="40" y="30" width="120" height="18" rx="6" fill={`url(#${id}-g1)`} className="opacity-25" />
      <circle cx="50" cy="39" r="3" fill={`url(#${id}-g1)`} className="opacity-60" />
      <circle cx="60" cy="39" r="3" fill={`url(#${id}-g1)`} className="opacity-60" />
      <circle cx="70" cy="39" r="3" fill={`url(#${id}-g1)`} className="opacity-60" />
      <rect x="55" y="60" width="90" height="8" rx="4" fill={`url(#${id}-g1)`} className="opacity-50" />
      <rect x="55" y="75" width="70" height="6" rx="3" fill={`url(#${id}-g1)`} className="opacity-35" />
      <rect x="55" y="88" width="80" height="6" rx="3" fill={`url(#${id}-g1)`} className="opacity-35" />
      <rect x="55" y="101" width="50" height="5" rx="2.5" fill={`url(#${id}-g1)`} className="opacity-25" />
    </svg>
  ),
  branding: (id) => (
    <svg viewBox="0 0 200 150" className="w-full h-full" fill="none">
      <rect x="55" y="30" width="90" height="90" rx="8" stroke={`url(#${id}-g1)`} strokeWidth="1.5" className="opacity-35" />
      <rect x="65" y="40" width="70" height="70" rx="6" fill={`url(#${id}-g1)`} className="opacity-85" />
      <rect x="75" y="50" width="50" height="50" rx="4" fill={`url(#${id}-g2)`} className="opacity-85" />
      <rect x="85" y="60" width="30" height="30" rx="3" fill={`url(#${id}-g3)`} className="opacity-85" />
      <path d="M55 120 L145 120" stroke={`url(#${id}-g1)`} strokeWidth="1" className="opacity-35" />
      <path d="M55 128 L120 128" stroke={`url(#${id}-g1)`} strokeWidth="1" className="opacity-25" />
    </svg>
  ),
  identity: (id) => (
    <svg viewBox="0 0 200 150" className="w-full h-full" fill="none">
      <circle cx="100" cy="65" r="45" stroke={`url(#${id}-g1)`} strokeWidth="1.5" className="opacity-25" />
      <circle cx="100" cy="65" r="30" stroke={`url(#${id}-g1)`} strokeWidth="1" className="opacity-35" />
      <ellipse cx="100" cy="55" rx="20" ry="12" fill={`url(#${id}-g1)`} className="opacity-85" />
      <circle cx="100" cy="55" r="5" fill="white" className="opacity-80" />
      <circle cx="100" cy="55" r="2" fill={`url(#${id}-g1)`} />
      <circle cx="100" cy="95" r="8" fill={`url(#${id}-g1)`} className="opacity-50" />
      <circle cx="100" cy="95" r="4" fill="white" className="opacity-40" />
      <path d="M80 50 Q100 35 120 50" stroke={`url(#${id}-g1)`} strokeWidth="1" className="opacity-50" fill="none" />
      <path d="M80 80 Q100 95 120 80" stroke={`url(#${id}-g1)`} strokeWidth="1" className="opacity-50" fill="none" />
    </svg>
  ),
  marketing: (id) => (
    <svg viewBox="0 0 200 150" className="w-full h-full" fill="none">
      <rect x="35" y="55" width="16" height="55" rx="3" fill={`url(#${id}-g1)`} className="opacity-50" />
      <rect x="60" y="40" width="16" height="70" rx="3" fill={`url(#${id}-g1)`} className="opacity-65" />
      <rect x="85" y="25" width="16" height="85" rx="3" fill={`url(#${id}-g1)`} className="opacity-80" />
      <rect x="110" y="15" width="16" height="95" rx="3" fill={`url(#${id}-g1)`} className="opacity-95" />
      <rect x="135" y="35" width="16" height="75" rx="3" fill={`url(#${id}-g1)`} className="opacity-65" />
      <path d="M35 115 L155 115" stroke={`url(#${id}-g1)`} strokeWidth="1" className="opacity-35" />
      <circle cx="118" cy="15" r="4" fill={`url(#${id}-g1)`} className="opacity-85" />
      <path d="M118 15 L130 3" stroke={`url(#${id}-g1)`} strokeWidth="1.5" className="opacity-70" />
      <path d="M130 -1 L134 7 L126 7Z" fill={`url(#${id}-g1)`} className="opacity-85" />
    </svg>
  ),
}

const expertiseItems = [
  { key: 'logos', title: 'Logo', desc: 'expertise.items.0.desc', gradient: 'from-blue-600 to-cyan-500', svg: 'logos', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop' },
  { key: 'chartes', title: 'Charte graphique', desc: 'expertise.items.1.desc', gradient: 'from-indigo-500 to-blue-600', svg: 'chartes', image: '/Gemini_Generated_Image_xj119jxj119jxj11.png' },
  { key: 'social', title: 'Community Management', desc: 'expertise.items.2.desc', gradient: 'from-cyan-500 to-blue-500', svg: 'social', image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=600&h=400&fit=crop' },
  { key: 'community', title: 'Site web', desc: 'expertise.items.3.desc', gradient: 'from-blue-500 to-indigo-700', svg: 'community', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop' },
  { key: 'websites', title: 'Création de sites web', desc: 'expertise.items.4.desc', gradient: 'from-blue-400 to-cyan-400', svg: 'websites', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop' },
  { key: 'branding', title: 'Branding', desc: 'expertise.items.5.desc', gradient: 'from-indigo-600 to-blue-700', svg: 'branding', image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop' },
  { key: 'identity', title: 'Identité visuelle', desc: 'expertise.items.6.desc', gradient: 'from-cyan-400 to-blue-600', svg: 'identity', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop' },
  { key: 'marketing', title: 'Marketing digital', desc: 'expertise.items.7.desc', gradient: 'from-blue-600 to-indigo-600', svg: 'marketing', image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=600&h=400&fit=crop' },
]

const stats = [
  { value: 50, suffix: '+', label: 'home.stats.projects', icon: Zap },
  { value: 30, suffix: '+', label: 'home.stats.clients', icon: Users },
  { value: 98, suffix: '%', label: 'home.stats.recommendation', icon: Shield },
  { value: 24, suffix: '/7', label: 'home.stats.support', icon: MessageSquare },
]

const processSteps = [
  { step: '01', title: 'home.process.steps.01.title', desc: 'home.process.steps.01.desc' },
  { step: '02', title: 'home.process.steps.02.title', desc: 'home.process.steps.02.desc' },
  { step: '03', title: 'home.process.steps.03.title', desc: 'home.process.steps.03.desc' },
  { step: '04', title: 'home.process.steps.04.title', desc: 'home.process.steps.04.desc' },
]

function AnimatedCounter({ end, suffix, isVisible }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!isVisible || !ref.current) return
    const obj = { val: 0 }
    gsap.to(obj, {
      val: end,
      duration: 2,
      ease: 'power3.out',
      onUpdate: () => {
        if (ref.current) ref.current.textContent = Math.floor(obj.val) + suffix
      },
    })
  }, [end, suffix, isVisible])
  return <span ref={ref}>0{suffix}</span>
}

function ExpertiseCard({ item, index, t }) {
  const id = `expertise-${item.key}`
  const VisualSvg = visualSvgs[item.svg]
  const hasImage = !!item.image

  return (
    <div className="expertise-card group relative bg-white rounded-3xl overflow-hidden border border-gray-100/80 hover:shadow-2xl cursor-pointer">
      <div className="relative aspect-[4/3] overflow-hidden">
        {hasImage ? (
          <>
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />
            <img
              src={item.image}
              alt={item.title}
              className="relative w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </>
        ) : (
          <>
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]" />
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-black/5 rounded-full blur-xl" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center p-10">
              <svg className="w-full h-full" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))' }}>
                <defs>
                  <linearGradient id={`${id}-g1`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.5)" />
                  </linearGradient>
                  <linearGradient id={`${id}-g2`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
                  </linearGradient>
                  <linearGradient id={`${id}-g3`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
                  </linearGradient>
                </defs>
                {VisualSvg && <VisualSvg id={id} />}
              </svg>
            </div>
          </>
        )}
      </div>

      <div className="px-5 py-3.5">
        <h3 className="text-sm font-semibold text-gray-900 leading-tight">{t(item.title)}</h3>
      </div>
    </div>
  )
}

export default function Home() {
  const { t } = useTranslation()
  const heroRef = useRef(null)
  const expertiseRef = useRef(null)
  const statsRef = useRef(null)
  const processRef = useRef(null)
  const [countersVisible, setCountersVisible] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)

  const heroSlides = [
    { src: '/Gemini_Generated_Image_q8ijqsq8ijqsq8ij.png', mobileSrc: '/Gemini_Generated_Image_hdw16mhdw16mhdw1.png', alt: 'Branding' },
    { src: '/Gemini_Generated_Image_hunfryhunfryhunf.png', mobileSrc: '/Gemini_Generated_Image_824hko824hko824h.png', alt: 'Création' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % heroSlides.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title span', {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power4.out',
      })
      gsap.from('.hero-sub', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: 'power3.out',
      })
      gsap.from('.hero-cta', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: 1,
        stagger: 0.15,
        ease: 'power3.out',
      })
      gsap.from('.hero-badge', {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        delay: 0.3,
        ease: 'back.out(1.7)',
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = expertiseRef.current?.querySelectorAll('.expertise-card')
      if (cards) {
        gsap.from(cards, {
          y: 60,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: expertiseRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    }, expertiseRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = statsRef.current?.querySelectorAll('.stat-item')
      if (items) {
        gsap.from(items, {
          y: 40,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            onEnter: () => setCountersVisible(true),
            toggleActions: 'play none none reverse',
          },
        })
      }
    }, statsRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const steps = processRef.current?.querySelectorAll('.process-step')
      if (steps) {
        gsap.from(steps, {
          y: 40,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: processRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    }, processRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <Header />

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[100dvh] sm:min-h-screen flex items-center max-sm:bg-[#f5f5f7] sm:bg-black overflow-hidden sm:pt-0">
        {heroSlides.map((slide, idx) => (
          <div
            key={slide.src}
            className={`absolute inset-0 sm:transition-opacity sm:duration-1000 sm:ease-in-out ${idx === slideIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <img
              src={slide.mobileSrc}
              alt={slide.alt}
              className="block sm:hidden absolute inset-0 w-full h-full object-contain object-center"
            />
            <img
              src={slide.src}
              alt={slide.alt}
              className="hidden sm:block absolute inset-0 w-full h-full object-cover object-center"
              style={{
                animation: idx === slideIndex ? 'kenBurns 3s ease-in-out forwards' : 'none',
              }}
            />
          </div>
        ))}
        <div className="absolute inset-0 sm:bg-black/30 z-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 sm:from-black/60 sm:via-black/30 sm:to-transparent z-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 sm:bg-gradient-to-t from-black/40 via-transparent to-transparent z-20" />

        <div className="relative z-30 mx-auto max-w-7xl px-6 lg:px-8 w-full max-sm:-mt-20 sm:pt-20 sm:pb-16">
          <div className="max-w-3xl">

            <div className="hero-title">
              <span className="block text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.15]" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5), 0 4px 40px rgba(0,0,0,0.3)' }}>
                {t('home.hero.line1')}
              </span>
            </div>
            <p className="hero-sub mt-4 sm:mt-6 text-base sm:text-xl text-gray-100 max-w-xl leading-relaxed" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>
              {t('home.hero.sub')}
            </p>
          </div>
          <div className="hidden sm:flex hero-cta mt-10 flex-row gap-4">
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full text-sm font-semibold hover:bg-gray-100 transition-all active:scale-[0.98] shadow-lg shadow-white/10 hover:shadow-xl hover:shadow-white/20"
            >
              {t('home.hero.ctaServices')}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-black/20 backdrop-blur-md border border-white/40 text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-black/30 hover:border-white/60 transition-all shadow-lg"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
            >
              {t('home.hero.ctaContact')}
            </Link>
          </div>
        </div>

        <div className="block sm:hidden absolute bottom-12 left-0 right-0 z-30 px-6">
          <div className="hero-cta flex flex-col gap-3 max-w-3xl mx-auto">
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-100 transition-all active:scale-[0.98] shadow-lg shadow-white/10 hover:shadow-xl hover:shadow-white/20"
            >
              {t('home.hero.ctaServices')}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-black/20 backdrop-blur-md border border-white/40 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-black/30 hover:border-white/60 transition-all shadow-lg"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
            >
              {t('home.hero.ctaContact')}
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-40 bg-gradient-to-t from-[#f5f5f7] to-transparent z-20" />
      </section>

      {/* EXPERTISE */}
      <section ref={expertiseRef} id="services" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">{t('home.expertise.title')}</h2>
            <p className="mt-4 text-gray-500 leading-relaxed">
              {t('home.expertise.lead')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {expertiseItems.map((item, index) => (
              <ExpertiseCard key={item.key} item={item} index={index} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} className="py-20 bg-white border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="stat-item text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center mx-auto mb-5 shadow-sm">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} isVisible={countersVisible} />
                  </p>
                  <p className="mt-2 text-sm text-gray-500 font-medium">{t(stat.label)}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section ref={processRef} id="process" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">{t('home.process.title')}</h2>
            <p className="mt-4 text-gray-500 leading-relaxed">
              {t('home.process.lead')}
            </p>
          </div>

          <div className="relative">
            <div className="absolute top-16 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-blue-200 via-cyan-200 to-transparent hidden md:block" />
            <div className="grid md:grid-cols-4 gap-8">
              {processSteps.map((step) => (
                <div key={step.step} className="process-step relative text-center group">
                  <div className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/20 group-hover:shadow-xl group-hover:shadow-blue-500/30 transition-shadow duration-500">
                    <span className="text-white text-xl font-bold">{step.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-4">{t(step.title)}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-[220px] mx-auto">{t(step.desc)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2.5 mb-6">
                <img src="/logo.png" alt="Proxima Digital" className="w-9 h-9 rounded-xl object-cover shadow-lg shadow-blue-500/20" />
                <span className="text-base font-semibold text-white">{t('brand')}</span>
              </div>
              <p className="text-sm leading-relaxed">{t('footer.description')}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">{t('footer.servicesTitle')}</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/services" className="hover:text-white transition">{t('home.services.identity.title')}</Link></li>
                <li><Link to="/services" className="hover:text-white transition">{t('home.services.community.title')}</Link></li>
                <li><Link to="/services" className="hover:text-white transition">{t('home.services.dev.title')}</Link></li>
                <li><Link to="/contact" className="hover:text-white transition">{t('home.consultation')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">{t('footer.agencyTitle')}</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/about" className="hover:text-white transition">{t('nav.about')}</Link></li>
                <li><Link to="/contact" className="hover:text-white transition">{t('nav.contact')}</Link></li>
                <li><Link to="/services" className="hover:text-white transition">{t('footer.servicesTitle')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">{t('footer.contactTitle')}</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="mailto:digitalproxima317@gmail.com" className="hover:text-white transition">digitalproxima317@gmail.com</a></li>
                <li><a href="https://wa.me/222615040793" target="_blank" rel="noreferrer" className="hover:text-white transition">WhatsApp</a></li>
                <li><a href="https://www.instagram.com/digitalproxima317" target="_blank" rel="noreferrer" className="hover:text-white transition">Instagram</a></li>
                <li><a href="https://www.tiktok.com/@proxima..digital" target="_blank" rel="noreferrer" className="hover:text-white transition">TikTok</a></li>
                <li><a href="https://www.linkedin.com/in/proxima-digital-7a1638414" target="_blank" rel="noreferrer" className="hover:text-white transition">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-center">
            {t('footer.copyright')}
          </div>
        </div>
      </footer>
    </div>
  )
}
