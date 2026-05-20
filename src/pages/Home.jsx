import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Palette, Code, TrendingUp, CheckCircle, Shield, Zap, BarChart3, Users, Globe, MessageSquare } from 'lucide-react'
import Header from '../components/Header'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Palette,
    title: 'Identité Visuelle',
    items: ['Logo & Branding', 'Charte graphique', 'Affiches & visuels', 'Branding digital'],
    gradient: 'from-blue-600 to-cyan-500',
    color: 'blue',
  },
  {
    icon: TrendingUp,
    title: 'Community Management',
    items: ['Stratégie de contenu', 'Posts & stories', 'Gestion des comptes', 'Analyse d\'engagement'],
    gradient: 'from-cyan-500 to-teal-400',
    color: 'cyan',
  },
  {
    icon: Code,
    title: 'Développement web & applications',
    items: ['Sites vitrines', 'Sites e-commerce', 'Applications web', 'SEO & performance'],
    gradient: 'from-indigo-500 to-blue-600',
    color: 'indigo',
  },
]

const stats = [
  { value: '50+', label: 'Projets réalisés', icon: Zap },
  { value: '30+', label: 'Clients satisfaits', icon: Users },
  { value: '98%', label: 'Recommandation', icon: Shield },
  { value: '24/7', label: 'Support client', icon: MessageSquare },
]

const processSteps = [
  { step: '01', title: 'Analyse', desc: 'Compréhension de vos besoins et objectifs', icon: BarChart3 },
  { step: '02', title: 'Stratégie', desc: 'Proposition d\'une solution sur mesure', icon: Globe },
  { step: '03', title: 'Création', desc: 'Développement et design de votre projet', icon: Zap },
  { step: '04', title: 'Lancement', desc: 'Mise en ligne et suivi personnalisé', icon: CheckCircle },
]

export default function Home() {
  const heroRef = useRef(null)
  const servicesRef = useRef(null)
  const statsRef = useRef(null)
  const processRef = useRef(null)
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
    }, heroRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = servicesRef.current?.querySelectorAll('.service-card')
      if (cards) {
        cards.forEach((card) => {
          gsap.from(card, {
            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          })
        })
      }
    }, servicesRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = statsRef.current?.querySelectorAll('.stat-item')
      if (items) {
        gsap.from(items, {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
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
          x: -40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.2,
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
      <section ref={heroRef} className="relative min-h-screen flex items-center bg-[#0a0a1a] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/couverture.png')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a1a]/90 via-[#0a0a1a]/70 to-[#0a0a1a]/50" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <div className="hero-title">
              <span className="block text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.2]">
                Les grandes marques ne négligent
              </span>
              <span className="block text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.2]">
                jamais leur image digitale,
              </span>
              <span className="block text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent leading-[1.2]">
                car c&rsquo;est une amana.
              </span>
            </div>
            <p className="hero-sub mt-6 text-lg sm:text-xl text-gray-400 max-w-xl leading-relaxed">
              Identité visuelle, développement web et community management — nous construisons des présences digitales qui marquent les esprits.
            </p>
            <div className="hero-cta mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition-all active:scale-[0.98]"
              >
                Découvrir nos services
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-white/10 transition-all"
              >
                Consultation gratuite
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f5f5f7] to-transparent" />
      </section>

      {/* SERVICES */}
      <section ref={servicesRef} id="services" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 mb-4">Services</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight">
              Un accompagnement digital complet
            </h2>
            <p className="mt-4 text-gray-500 leading-relaxed">
              De l'identité visuelle à la gestion de vos réseaux, nous couvrons tous les aspects de votre présence en ligne.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <div
                  key={service.title}
                  className="service-card group relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                  <ul className="space-y-2.5">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-gray-500">
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient} flex-shrink-0`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <span className="text-sm font-medium text-gray-900 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      En savoir plus <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} className="py-24 bg-white border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="stat-item text-center">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-3xl sm:text-4xl font-semibold text-gray-900">{stat.value}</p>
                  <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
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
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 mb-4">Méthodologie</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight">
              Notre processus en 4 étapes
            </h2>
            <p className="mt-4 text-gray-500 leading-relaxed">
              Une approche structurée pour garantir des résultats à la hauteur de vos ambitions.
            </p>
          </div>

          <div className="relative">
            <div className="absolute top-12 left-[15%] right-[15%] h-px bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 hidden md:block" />
            <div className="grid md:grid-cols-4 gap-8">
              {processSteps.map((step) => {
                const Icon = step.icon
                return (
                  <div key={step.step} className="process-step relative text-center">
                    <div className="relative z-10 w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/20">
                      <span className="text-white text-2xl font-bold">{step.step}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                )
              })}
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
                <img src="/logo.png" alt="Proxima Digital" className="w-9 h-9 rounded-xl object-cover shadow-lg" />
                <span className="text-base font-semibold text-white">Proxima Digital</span>
              </div>
              <p className="text-sm leading-relaxed">Agence digitale spécialisée en identité visuelle, développement web et community management.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Services</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/services" className="hover:text-white transition">Identité visuelle</Link></li>
                <li><Link to="/services" className="hover:text-white transition">Community management</Link></li>
                <li><Link to="/services" className="hover:text-white transition">Développement Web & Applications</Link></li>
                <li><Link to="/services" className="hover:text-white transition">Consultation</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Agence</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/about" className="hover:text-white transition">À propos</Link></li>
                <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
                <li><Link to="/services" className="hover:text-white transition">Nos services</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Contact</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="mailto:digitalproxima317@gmail.com" className="hover:text-white transition">digitalproxima317@gmail.com</a></li>
                <li><a href="https://wa.me/222615040793" target="_blank" rel="noreferrer" className="hover:text-white transition">WhatsApp</a></li>
                <li><a href="https://www.instagram.com/digitalproxima317" target="_blank" rel="noreferrer" className="hover:text-white transition">Instagram</a></li>
                <li><a href="https://www.tiktok.com/@proxima..digital" target="_blank" rel="noreferrer" className="hover:text-white transition">TikTok</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-center">
            © 2026 Proxima Digital. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  )
}
