import React from 'react'
import { Link } from 'react-router-dom'

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-slate-900 border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <img src="/logo.png" alt="Proxima Digital Logo" className="w-10 h-10 rounded-lg object-cover" />
            <span className="text-white font-semibold text-lg">Proxima Digital</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-slate-300 hover:text-white transition">Accueil</Link>
            <Link to="/services" className="text-slate-300 hover:text-white transition">Services</Link>
            <a href="#contact" className="text-slate-300 hover:text-white transition">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            <a href="https://wa.me/222615040793" target="_blank" rel="noreferrer" className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg font-semibold transition">
              WhatsApp
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* 1. HERO */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-900 to-slate-900 px-6 py-24 sm:px-12 lg:py-32 mb-32">
          <div className="absolute inset-0 bg-grid-slate-700/10 opacity-20" />
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 tracking-tight">
              Contactez-nous
            </h1>
            <p className="text-xl text-slate-200 mb-8 leading-relaxed">
              Parlons de votre projet digital
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#formulaire" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105">
                ✉️ Envoyer un message
              </a>
              <a href="https://wa.me/222615040793" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-full font-bold text-lg transition-all">
                💬 Discuter sur WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* 2. FORMULAIRE DE CONTACT */}
        <section id="formulaire" className="mb-32 space-y-12">
          <div className="text-center space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Contact</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-950">Envoyez-nous un message</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Nous vous répondrons dans les plus brefs délais pour discuter de votre projet</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-lg">
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nom" className="block text-sm font-semibold text-slate-950 mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-all"
                      placeholder="Votre nom complet"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-950 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-all"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="sujet" className="block text-sm font-semibold text-slate-950 mb-2">
                    Sujet *
                  </label>
                  <select
                    id="sujet"
                    name="sujet"
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-all"
                  >
                    <option value="">Choisissez un sujet</option>
                    <option value="site-web">Création de site web</option>
                    <option value="logo">Design de logo</option>
                    <option value="branding">Identité visuelle / Branding</option>
                    <option value="social-media">Community Management</option>
                    <option value="consultation">Consultation gratuite</option>
                    <option value="autre">Autre projet</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-950 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition-all resize-none"
                    placeholder="Décrivez votre projet, vos besoins, votre budget approximatif..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-4 font-bold text-lg transition-all transform hover:scale-105 hover:shadow-lg"
                >
                  📤 Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* 3. INFORMATIONS DE CONTACT */}
        <section className="mb-32 space-y-12">
          <div className="text-center space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Informations</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-950">Nos coordonnées</h2>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 text-center hover:shadow-lg transition-all duration-300">
              <div className="text-6xl mb-4">📧</div>
              <h3 className="text-xl font-bold text-slate-950 mb-2">Email professionnel</h3>
              <p className="text-slate-600 mb-4">digitalproxima317@gmail.com</p>
              <a href="mailto:digitalproxima317@gmail.com" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-xl font-semibold transition-all hover:scale-105">
                ✉️ Écrire un email
              </a>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 text-center hover:shadow-lg transition-all duration-300">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-slate-950 mb-2">WhatsApp</h3>
              <p className="text-slate-600 mb-4">+222 615 040 793</p>
              <a href="https://wa.me/222615040793" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-semibold transition-all hover:scale-105">
                💬 WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* 4. CONSULTATION GRATUITE */}
        <section className="mb-32">
          <div className="rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 p-8 text-center text-white">
            <div className="text-6xl mb-4">✨</div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Consultation gratuite disponible
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Prenons 30 minutes pour discuter de votre projet et vous proposer la meilleure solution
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/222615040793?text=Bonjour,%20je%20souhaite%20une%20consultation%20gratuite" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 bg-white text-cyan-600 hover:bg-slate-100 px-6 py-3 rounded-full font-bold transition-all transform hover:scale-105">
                📅 Réserver ma consultation
              </a>
              <a href="#formulaire" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-cyan-600 px-6 py-3 rounded-full font-bold transition-all">
                📝 Formulaire de contact
              </a>
            </div>
          </div>
        </section>

        {/* 5. BOUTON WHATSAPP */}
        <section className="mb-32">
          <div className="rounded-3xl bg-gradient-to-r from-green-500 to-green-600 p-8 text-center text-white">
            <div className="text-6xl mb-4">💬</div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Discuter sur WhatsApp
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Pour une réponse rapide et personnalisée, contactez-nous directement sur WhatsApp
            </p>
            <a href="https://wa.me/222615040793?text=Bonjour,%20je%20suis%20int%C3%A9ress%C3%A9%20par%20vos%20services%20digitaux" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 bg-white text-green-600 hover:bg-slate-100 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105">
              💬 Ouvrir WhatsApp
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Proxima Digital</p>
            <p className="mt-4 text-lg leading-8 text-slate-300 max-w-2xl mx-auto">Faire briller votre présence digitale avec des sites clairs, des marques modernes et une communication sociale percutante.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-300 mb-10">
            <a href="https://www.instagram.com/digitalproxima317?igsh=Znp1YnV0eDV4eTF4" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-sm transition hover:border-cyan-400 hover:text-white">
              📷 Instagram
            </a>
            <a href="https://www.tiktok.com/@proxima..digital?_r=1&_t=ZS-95a4SNxq33S" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-sm transition hover:border-cyan-400 hover:text-white">
              🎵 TikTok
            </a>
            <a href="mailto:digitalproxima317@gmail.com" className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-sm transition hover:border-cyan-400 hover:text-white">
              ✉️ Email
            </a>
            <a href="https://wa.me/222615040793" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-sm transition hover:border-cyan-400 hover:text-white">
              💬 WhatsApp
            </a>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">Solutions</h3>
              <ul className="mt-6 space-y-3 text-slate-400">
                <li><Link to="/services" className="transition hover:text-white">Sites vitrines</Link></li>
                <li><Link to="/services" className="transition hover:text-white">Branding</Link></li>
                <li><Link to="/services" className="transition hover:text-white">Community management</Link></li>
                <li><Link to="/services" className="transition hover:text-white">Publicité digitale</Link></li>
                <li><Link to="/services" className="transition hover:text-white">Stratégie de contenu</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">Support</h3>
              <ul className="mt-6 space-y-3 text-slate-400">
                <li><a href="mailto:digitalproxima317@gmail.com" className="transition hover:text-white">Demande de devis</a></li>
                <li><Link to="/contact" className="transition hover:text-white">Contact</Link></li>
                <li><Link to="/about" className="transition hover:text-white">À propos</Link></li>
                <li><a href="https://wa.me/222615040793" target="_blank" rel="noreferrer" className="transition hover:text-white">Assistance rapide</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">Agence</h3>
              <ul className="mt-6 space-y-3 text-slate-400">
                <li><Link to="/about" className="transition hover:text-white">Notre histoire</Link></li>
                <li><Link to="/services" className="transition hover:text-white">Nos expertises</Link></li>
                <li><Link to="/contact" className="transition hover:text-white">Nous rejoindre</Link></li>
                <li><a href="https://www.instagram.com/digitalproxima317?igsh=Znp1YnV0eDV4eTF4" target="_blank" rel="noreferrer" className="transition hover:text-white">Instagram</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">Legal</h3>
              <ul className="mt-6 space-y-3 text-slate-400">
                <li><a href="#mentions" className="transition hover:text-white">Mentions légales</a></li>
                <li><a href="#cgv" className="transition hover:text-white">CGV</a></li>
                <li><a href="#politique" className="transition hover:text-white">Politique de confidentialité</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-800 pt-8 text-sm text-slate-500 text-center">
            © 2026 Proxima Digital. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  )
}
