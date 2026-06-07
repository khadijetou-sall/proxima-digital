import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Palette, TrendingUp, Code, ArrowRight, CheckCircle, Pen, Layout, Image, Camera, Eye, PenTool, MessageCircle, Calendar, BarChart3, Globe, Smartphone, Search, Monitor, Settings, Rocket, Briefcase, Crown, Users } from 'lucide-react'
import Header from '../components/Header'
import PageHero from '../components/PageHero'

gsap.registerPlugin(ScrollTrigger)

// service data will be created inside the component using translations

export default function Services() {
  const { t } = useTranslation()
  const serviceCategories = [
    {
      title: t('services.categories.graphic.title'),
      icon: Palette,
      gradient: 'from-blue-600 to-cyan-500',
      accent: 'bg-blue-50',
      accentIcon: 'text-blue-600',
      border: 'border-blue-200',
      bar: 'bg-blue-600',
      description: t('services.categories.graphic.description'),
      services: [
        { icon: Pen, label: t('services.categories.graphic.services.0') },
        { icon: Palette, label: t('services.categories.graphic.services.1') },
        { icon: Layout, label: t('services.categories.graphic.services.2') },
        { icon: Image, label: t('services.categories.graphic.services.3') },
        { icon: Camera, label: t('services.categories.graphic.services.4') },
        { icon: Eye, label: t('services.categories.graphic.services.5') },
        { icon: Layout, label: t('services.categories.graphic.services.6') },
        { icon: PenTool, label: t('services.categories.graphic.services.7') },
      ],
    },
    {
      title: t('services.categories.community.title'),
      icon: TrendingUp,
      gradient: 'from-blue-500 to-cyan-400',
      accent: 'bg-cyan-50',
      accentIcon: 'text-cyan-600',
      border: 'border-cyan-200',
      bar: 'bg-cyan-500',
      description: t('services.categories.community.description'),
      services: [
        { icon: MessageCircle, label: t('services.categories.community.services.0') },
        { icon: Pen, label: t('services.categories.community.services.1') },
        { icon: Calendar, label: t('services.categories.community.services.2') },
        { icon: TrendingUp, label: t('services.categories.community.services.3') },
        { icon: BarChart3, label: t('services.categories.community.services.4') },
        { icon: Globe, label: t('services.categories.community.services.5') },
        { icon: Users, label: t('services.categories.community.services.6') },
      ],
    },
    {
      title: t('services.categories.dev.title'),
      icon: Code,
      gradient: 'from-blue-600 to-indigo-500',
      accent: 'bg-indigo-50',
      accentIcon: 'text-indigo-600',
      border: 'border-indigo-200',
      bar: 'bg-indigo-600',
      description: t('services.categories.dev.description'),
      services: [
        { icon: Code, label: t('services.categories.dev.services.0') },
        { icon: Monitor, label: t('services.categories.dev.services.1') },
        { icon: Globe, label: t('services.categories.dev.services.2') },
        { icon: Smartphone, label: t('services.categories.dev.services.3') },
        { icon: Search, label: t('services.categories.dev.services.4') },
        { icon: Settings, label: t('services.categories.dev.services.5') },
        { icon: Code, label: t('services.categories.dev.services.6') },
        { icon: Eye, label: t('services.categories.dev.services.7') },
      ],
    },
  ]

  const packs = [
    {
      name: t('services.packs.starter.name'),
      desc: t('services.packs.starter.desc'),
      icon: Rocket,
      items: t('services.packs.starter.items', { returnObjects: true }),
      cta: t('services.packs.starter.cta'),
      popular: false,
    },
    {
      name: t('services.packs.business.name'),
      desc: t('services.packs.business.desc'),
      icon: Briefcase,
      items: t('services.packs.business.items', { returnObjects: true }),
      cta: t('services.packs.business.cta'),
      popular: true,
    },
    {
      name: t('services.packs.premium.name'),
      desc: t('services.packs.premium.desc'),
      icon: Crown,
      items: t('services.packs.premium.items', { returnObjects: true }),
      cta: t('services.packs.premium.cta'),
      popular: false,
    },
  ]
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
        label={t('nav.services')}
        title={t('services.hero.title')}
        description={t('services.hero.description')}
        primaryCta={{ text: t('services.hero.cta'), href: 'https://wa.me/222615040793', external: true }}
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
                            {t('services.cta.contact')} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 mb-3 sm:mb-4">{t('services.packs.title')}</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 tracking-tight">{t('services.packs.leadTitle')}</h2>
            <p className="mt-2 sm:mt-4 text-sm sm:text-base text-gray-500">{t('services.packs.lead')}</p>
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
                      {t('services.packs.popular')}
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
              {t('services.cta.projectTitle')}
            </h2>
            <p className="mt-3 sm:mt-4 text-blue-100 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              {t('services.cta.projectLead')}
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="https://wa.me/222615040793"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition-all active:scale-[0.98]"
              >
                {t('services.cta.freeConsult')} <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-sm font-semibold hover:bg-white/10 transition-all"
              >
                {t('services.cta.contactForm')}
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
                <span className="text-sm sm:text-base font-semibold text-white">{t('brand')}</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed">{t('footer.description')}</p>
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-white mb-3 sm:mb-4">{t('footer.servicesTitle')}</h3>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <li><Link to="/services" className="hover:text-white transition">{t('home.services.identity.title')}</Link></li>
                <li><Link to="/services" className="hover:text-white transition">{t('home.services.community.title')}</Link></li>
                <li><Link to="/services" className="hover:text-white transition">{t('home.services.dev.title')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-white mb-3 sm:mb-4">{t('footer.agencyTitle')}</h3>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <li><Link to="/" className="hover:text-white transition">{t('nav.home')}</Link></li>
                <li><Link to="/about" className="hover:text-white transition">{t('nav.about')}</Link></li>
                <li><Link to="/contact" className="hover:text-white transition">{t('nav.contact')}</Link></li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-2 lg:col-span-1">
              <h3 className="text-xs sm:text-sm font-semibold text-white mb-3 sm:mb-4">{t('footer.contactTitle')}</h3>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <li><a href="mailto:digitalproxima317@gmail.com" className="hover:text-white transition">{t('nav.contact')}</a></li>
                <li><a href="https://wa.me/222615040793" target="_blank" rel="noreferrer" className="hover:text-white transition">WhatsApp</a></li>
                <li><a href="https://www.instagram.com/digitalproxima317" target="_blank" rel="noreferrer" className="hover:text-white transition">Instagram</a></li>
                <li><a href="https://www.tiktok.com/@proxima..digital" target="_blank" rel="noreferrer" className="hover:text-white transition">TikTok</a></li>
                <li><a href="https://www.linkedin.com/company/proxima-digital/" target="_blank" rel="noreferrer" className="hover:text-white transition">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-800 text-xs sm:text-sm text-center">{t('footer.copyright')}</div>
        </div>
      </footer>
    </div>
  )
}
