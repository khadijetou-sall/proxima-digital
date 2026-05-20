import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Palette, TrendingUp, Code, ArrowRight, CheckCircle, Pen, Layout, Image, Camera, Eye, PenTool, MessageCircle, Calendar, BarChart3, Globe, Smartphone, Search, Monitor, Settings, Rocket, Briefcase, Crown, Users } from 'lucide-react'
import Header from '../components/Header'
import PageHero from '../components/PageHero'

gsap.registerPlugin(ScrollTrigger)

const serviceCategories = [
  {
    title: 'Graphic Design',
    icon: Palette,
    gradient: 'from-blue-600 to-cyan-500',
    accent: 'bg-blue-50',
    accentIcon: 'text-blue-600',
    border: 'border-blue-200',
    bar: 'bg-blue-600',
    description: 'Donnez vie à votre marque avec une identité visuelle forte et cohérente. Du logo à la charte graphique, nous créons des univers uniques qui captent l\'attention et renforcent votre crédibilité.',
    services: [
      { icon: Pen, label: 'Création de logo' },
      { icon: Palette, label: 'Branding' },
      { icon: Layout, label: 'Charte graphique' },
      { icon: Image, label: 'Visuels réseaux sociaux' },
      { icon: Camera, label: 'Bannières publicitaires' },
      { icon: Eye, label: 'Identité visuelle' },
      { icon: Layout, label: 'Templates Instagram' },
      { icon: PenTool, label: 'Direction artistique' },
    ],
  },
  {
    title: 'Community Management',
    icon: TrendingUp,
    gradient: 'from-blue-500 to-cyan-400',
    accent: 'bg-cyan-50',
    accentIcon: 'text-cyan-600',
    border: 'border-cyan-200',
    bar: 'bg-cyan-500',
    description: 'Développez une communauté engagée autour de votre marque grâce à une stratégie de contenu réfléchie et une présence authentique sur les réseaux sociaux.',
    services: [
      { icon: MessageCircle, label: 'Gestion des réseaux sociaux' },
      { icon: Pen, label: 'Aide à la création de contenu' },
      { icon: Calendar, label: 'Planification des publications' },
      { icon: TrendingUp, label: 'Stratégie de marketing digital' },
      { icon: BarChart3, label: 'Analyse d\'engagement' },
      { icon: Globe, label: 'Optimisation de la présence en ligne' },
      { icon: Users, label: 'Développement de communauté' },
    ],
  },
  {
    title: 'Développement Web & Applications',
    icon: Code,
    gradient: 'from-blue-600 to-indigo-500',
    accent: 'bg-indigo-50',
    accentIcon: 'text-indigo-600',
    border: 'border-indigo-200',
    bar: 'bg-indigo-600',
    description: 'Des solutions digitales performantes — sites web et applications modernes, rapides et optimisés pour une expérience utilisateur exceptionnelle.',
    services: [
      { icon: Code, label: 'Création de sites web' },
      { icon: Monitor, label: 'Landing pages' },
      { icon: Globe, label: 'Sites vitrines' },
      { icon: Smartphone, label: 'Design responsive' },
      { icon: Search, label: 'Optimisation SEO' },
      { icon: Settings, label: 'Maintenance web' },
      { icon: Code, label: 'Intégration front-end' },
      { icon: Eye, label: 'Expérience utilisateur (UI/UX)' },
    ],
  },
]

const packs = [
  {
    name: 'Starter',
    desc: 'Pour les petites marques ou projets débutants.',
    icon: Rocket,
    items: [
      'Logo simple',
      'Palette de couleurs',
      'Visuels réseaux sociaux basiques',
      'Aide à la création de contenu',
      'Mini landing page',
    ],
    cta: 'Choisir cette offre',
    popular: false,
  },
  {
    name: 'Business',
    desc: 'Pour les marques en développement.',
    icon: Briefcase,
    items: [
      'Logo & branding',
      'Charte graphique',
      'Visuels réseaux sociaux',
      'Aide à la création de contenu',
      'Stratégie de marketing digital',
      'Gestion basique des réseaux sociaux',
      'Site vitrine professionnel',
    ],
    cta: 'Commander ce pack',
    popular: true,
  },
  {
    name: 'Premium',
    desc: 'Pour les entreprises qui veulent une présence digitale complète.',
    icon: Crown,
    items: [
      'Identité visuelle complète',
      'Templates professionnels',
      'Accompagnement communication',
      'Community management avancé',
      'Site web responsive',
      'Développement d\'applications ou fonctionnalités web',
      'SEO optimisé',
    ],
    cta: 'Réserver cette offre',
    popular: false,
  },
]

export default function Services() {
  const categoriesRef = useRef(null)
  const packsRef = useRef(null)

  useEffect(() => {
    const section = categoriesRef.current
    if (!section) return

    ScrollTrigger.getAll().forEach(st => {
      if (st.trigger === section) st.kill()
    })

    const ctx = gsap.context(() => {
      gsap.from('.cat-block', {
        y: 60, opacity: 0, duration: 0.8, stagger: 0.25, ease: 'power3.out', immediateRender: false,
        scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse', id: 'cats-trigger' },
      })
    }, categoriesRef)

    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === section || st.vars?.id === 'cats-trigger') st.kill()
      })
    }
  }, [])

  useEffect(() => {
    const section = packsRef.current
    if (!section) return

    ScrollTrigger.getAll().forEach(st => {
      if (st.trigger === section) st.kill()
    })

    const ctx = gsap.context(() => {
      gsap.from('.pack-card', {
        y: 60, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out', immediateRender: false,
        scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse', id: 'packs-trigger' },
      })
    }, packsRef)

    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === section || st.vars?.id === 'packs-trigger') st.kill()
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <Header />

      <PageHero
        label="Services"
        title="Des solutions digitales <span>sur mesure</span>"
        description="Nous vous accompagnons dans chaque aspect de votre présence digitale."
        primaryCta={{ text: 'Demander un devis', href: 'https://wa.me/222615040793', external: true }}
      />

      <section ref={categoriesRef} className="py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-16 sm:space-y-28">
          {serviceCategories.map((cat) => {
            const CatIcon = cat.icon
            return (
              <div key={cat.title} className="cat-block">
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-lg">
                  <div className={`h-1.5 sm:h-2 ${cat.bar}`} />
                  <div className="p-6 sm:p-10 lg:p-12">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                      <div className="lg:w-5/12 space-y-4 sm:space-y-5">
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center shadow-lg`}>
                          <CatIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 tracking-tight">{cat.title}</h2>
                        <p className="text-sm sm:text-base text-gray-500 leading-relaxed">{cat.description}</p>
                        <div className="pt-2">
                          <Link
                            to="/contact"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition group"
                          >
                            Demander un devis <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                        </div>
                      </div>
                      <div className="lg:w-7/12">
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                          {cat.services.map((svc) => {
                            const SvcIcon = svc.icon
                            return (
                              <div
                                key={svc.label}
                                className={`flex items-center gap-3 sm:gap-3.5 ${cat.accent} rounded-xl px-3.5 sm:px-4 py-3 sm:py-3.5 transition hover:shadow-sm`}
                              >
                                <SvcIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${cat.accentIcon} flex-shrink-0`} />
                                <span className="text-xs sm:text-sm font-medium text-gray-700 leading-tight">{svc.label}</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section ref={packsRef} className="py-16 sm:py-24 lg:py-32 bg-white border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 mb-3 sm:mb-4">Nos Packs</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 tracking-tight">Des offres adaptées à chaque projet</h2>
            <p className="mt-2 sm:mt-4 text-sm sm:text-base text-gray-500">Des solutions complètes pour tous les budgets et tous les besoins.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {packs.map((pack) => {
              const Icon = pack.icon
              return (
                <div
                  key={pack.name}
                  className="pack-card relative bg-white rounded-2xl shadow-sm border border-gray-200 transition-all duration-500 hover:shadow-xl flex flex-col h-full"
                >
                  {pack.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-3 sm:px-4 py-1 rounded-full text-xs font-semibold whitespace-nowrap z-10">
                      Populaire
                    </div>
                  )}
                  <div className="h-1.5 rounded-t-2xl bg-gradient-to-r from-blue-600 to-cyan-500" />
                  <div className="p-6 sm:p-8 flex flex-col flex-1">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center mb-4 shadow-lg">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{pack.name}</h3>
                    <p className="text-xs text-gray-400 mt-1 mb-4 leading-relaxed">{pack.desc}</p>
                    <ul className="space-y-2 mb-4 flex-1">
                      {pack.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                          <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={`https://wa.me/222615040793?text=Bonjour,%20je%20suis%20int%C3%A9ress%C3%A9%20par%20le%20Pack%20${encodeURIComponent(pack.name)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all active:scale-[0.98] bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/25"
                    >
                      {pack.cta} <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center shadow-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight">
              Discutons de votre projet
            </h2>
            <p className="mt-3 sm:mt-4 text-blue-100 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Réservez une consultation gratuite pour définir ensemble la stratégie digitale idéale.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="https://wa.me/222615040793"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition-all active:scale-[0.98]"
              >
                Consultation gratuite <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-sm font-semibold hover:bg-white/10 transition-all"
              >
                Formulaire de contact
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8">
          <div className="grid gap-8 sm:gap-10 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
            <div className="col-span-2 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-4 sm:mb-6">
                <img src="/logo.png" alt="Proxima Digital" className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-cover shadow-lg" />
                <span className="text-sm sm:text-base font-semibold text-white">Proxima Digital</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed">Agence digitale spécialisée en identité visuelle, développement web et community management.</p>
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-white mb-3 sm:mb-4">Services</h3>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <li><Link to="/services" className="hover:text-white transition">Graphic Design</Link></li>
                <li><Link to="/services" className="hover:text-white transition">Community management</Link></li>
                <li><Link to="/services" className="hover:text-white transition">Développement Web & Applications</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-white mb-3 sm:mb-4">Liens</h3>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <li><Link to="/" className="hover:text-white transition">Accueil</Link></li>
                <li><Link to="/about" className="hover:text-white transition">À propos</Link></li>
                <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-2 lg:col-span-1">
              <h3 className="text-xs sm:text-sm font-semibold text-white mb-3 sm:mb-4">Contact</h3>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <li><a href="mailto:digitalproxima317@gmail.com" className="hover:text-white transition">Email</a></li>
                <li><a href="https://wa.me/222615040793" target="_blank" rel="noreferrer" className="hover:text-white transition">WhatsApp</a></li>
                <li><a href="https://www.instagram.com/digitalproxima317" target="_blank" rel="noreferrer" className="hover:text-white transition">Instagram</a></li>
                <li><a href="https://www.tiktok.com/@proxima..digital" target="_blank" rel="noreferrer" className="hover:text-white transition">TikTok</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-800 text-xs sm:text-sm text-center">© 2026 Proxima Digital. Tous droits réservés.</div>
        </div>
      </footer>
    </div>
  )
}
