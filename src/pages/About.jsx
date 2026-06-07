import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Eye, Heart, Lightbulb, Target, Quote, Zap } from 'lucide-react'
import Header from '../components/Header'
import PageHero from '../components/PageHero'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const { t } = useTranslation()
  const missionRef = useRef(null)
  const valuesRef = useRef(null)
  const quoteRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(missionRef.current?.querySelectorAll('.mission-card'), {
        y: 50, duration: 0.8, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: missionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
      })
    }, missionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(valuesRef.current?.querySelectorAll('.value-card'), {
        y: 40, duration: 0.6, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: valuesRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
      })
    }, valuesRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(quoteRef.current?.querySelectorAll('.quote-item'), {
        y: 30, duration: 0.8, stagger: 0.3, ease: 'power3.out',
        scrollTrigger: { trigger: quoteRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
      })
    }, quoteRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <Header />

      <PageHero
        label={t('about.hero.label')}
        title={t('about.hero.title')}
        description={t('about.hero.description')}
        primaryCta={{ text: t('about.hero.ctaPrimary'), to: '/contact' }}
        secondaryCta={{ text: t('about.hero.ctaSecondary'), to: '/services' }}
      />

      <section ref={missionRef} className="py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <div className="mission-card bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-gray-100 transition-all duration-500 hover:shadow-lg">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-cyan-50 flex items-center justify-center mb-4 sm:mb-5">
                <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">{t('about.vision.title')}</h2>
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                {t('about.vision.text')}
              </p>
            </div>
            <div className="mission-card bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-gray-100 transition-all duration-500 hover:shadow-lg">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 sm:mb-5">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">{t('about.mission.title')}</h2>
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                {t('about.mission.text')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section ref={valuesRef} className="py-16 sm:py-24 bg-white border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 mb-3 sm:mb-4">{t('about.values.label')}</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 tracking-tight">{t('about.values.heading')}</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="value-card text-center bg-[#f5f5f7] rounded-2xl p-6 sm:p-10 hover:shadow-md transition-all">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4 sm:mb-5">
                <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">{t('about.values.modernity.title')}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{t('about.values.modernity.text')}</p>
            </div>
            <div className="value-card text-center bg-[#f5f5f7] rounded-2xl p-6 sm:p-10 hover:shadow-md transition-all">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4 sm:mb-5">
                <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">{t('about.values.trust.title')}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{t('about.values.trust.text')}</p>
            </div>
            <div className="value-card text-center bg-[#f5f5f7] rounded-2xl p-6 sm:p-10 hover:shadow-md transition-all">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4 sm:mb-5">
                <Lightbulb className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">{t('about.values.innovation.title')}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{t('about.values.innovation.text')}</p>
            </div>
          </div>
        </div>
      </section>

      <section ref={quoteRef} className="py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="quote-item text-center bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-16 shadow-sm border border-gray-100">
            <Quote className="w-8 h-8 sm:w-12 sm:h-12 text-blue-200 mx-auto mb-5 sm:mb-6" />
            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 leading-relaxed italic">
              {t('about.quote.text')}
            </blockquote>
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-100">
              <p className="text-sm font-medium text-gray-900">— {t('about.quote.author')}</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">{t('about.quote.role')}</p>
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
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-white mb-3 sm:mb-4">{t('footer.contactTitle')}</h3>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <li><a href="mailto:digitalproxima317@gmail.com" className="hover:text-white transition">{t('nav.contact')}</a></li>
                <li><a href="https://wa.me/222615040793" target="_blank" rel="noreferrer" className="hover:text-white transition">WhatsApp</a></li>
                <li><a href="https://www.linkedin.com/in/proxima-digital-7a1638414" target="_blank" rel="noreferrer" className="hover:text-white transition">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-800 text-xs sm:text-sm text-center">{t('footer.copyright')}</div>
        </div>
      </footer>
    </div>
  )
}
