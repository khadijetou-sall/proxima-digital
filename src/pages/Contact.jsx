import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Globe, Send, CheckCircle, ArrowRight, MessageCircle } from 'lucide-react'
import Header from '../components/Header'
import PageHero from '../components/PageHero'
import { contactAPI } from '../api/axios'

const projectTypeMap = {
  'Création de site web': 'site-web',
  'Design de logo': 'branding',
  'Identité visuelle / Branding': 'branding',
  'Community Management': 'reseaux-sociaux',
  'Consultation gratuite': 'autre',
  'Autre projet': 'autre',
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError('')
    const form = e.target
    const subject = form.sujet.value
    const data = {
      name: form.nom.value,
      email: form.email.value,
      projectType: projectTypeMap[subject] || 'autre',
      message: form.message.value,
    }
    try {
      await contactAPI.create(data)
      setSubmitted(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'envoi.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <Header />

      <PageHero
        label="Contact"
        title="Parlons de <span>votre projet</span>"
        description="Une question, un projet ? Nous sommes là pour vous écouter et vous proposer la meilleure solution."
      />

      <section className="pt-20 sm:pt-28 pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm border border-gray-100">
              {submitted ? (
                <div className="text-center py-8 sm:py-12">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">Message envoyé !</h3>
                  <p className="text-gray-500 mb-6">Nous vous répondrons dans les plus brefs délais.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium underline underline-offset-4"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 sm:mb-8">Envoyez-nous un message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Nom *</label>
                        <input
                          type="text"
                          name="nom"
                          required
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                          placeholder="Votre nom"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                          placeholder="vous@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Sujet *</label>
                      <select
                        name="sujet"
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                      >
                        <option value="">Choisissez un sujet</option>
                        <option value="Création de site web">Création de site web</option>
                        <option value="Design de logo">Design de logo</option>
                        <option value="Identité visuelle / Branding">Identité visuelle / Branding</option>
                        <option value="Community Management">Community Management</option>
                        <option value="Consultation gratuite">Consultation gratuite</option>
                        <option value="Autre projet">Autre projet</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                      <textarea
                        name="message"
                        rows={5}
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition resize-none"
                        placeholder="Décrivez votre projet..."
                      />
                    </div>
                    {error && (
                      <p className="text-sm text-red-500 bg-red-50 px-4 py-2.5 rounded-xl">{error}</p>
                    )}
                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all active:scale-[0.98] inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                      {sending ? 'Envoi en cours...' : 'Envoyer le message'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-24 lg:pb-32 pt-8 sm:pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 transition hover:shadow-md text-center">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Email professionnel</h3>
              <p className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4">Une réponse sous 24h ouvrées</p>
              <a href="mailto:digitalproxima317@gmail.com" className="text-blue-600 hover:text-blue-700 font-medium text-xs sm:text-sm transition-colors break-all">
                digitalproxima317@gmail.com
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 transition hover:shadow-md text-center">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">Réseaux sociaux</h3>
              <p className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4">Suivez notre actualité</p>
              <div className="flex justify-center gap-4">
                <a href="https://www.instagram.com/digitalproxima317" target="_blank" rel="noreferrer" className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition font-medium">Instagram</a>
                <a href="https://www.tiktok.com/@proxima..digital" target="_blank" rel="noreferrer" className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition font-medium">TikTok</a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl p-6 sm:p-8 shadow-xl text-center">
              <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white/80 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">Consultation gratuite</h3>
              <p className="text-blue-100 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                Profitez d'une consultation sans engagement.
              </p>
              <a
                href="https://wa.me/222615040793?text=Bonjour,%20je%20souhaite%20une%20consultation%20gratuite"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold hover:bg-gray-100 transition-all active:scale-[0.98]"
              >
                Réserver <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
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
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-white mb-3 sm:mb-4">Contact</h3>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <li><a href="mailto:digitalproxima317@gmail.com" className="hover:text-white transition">Email</a></li>
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
