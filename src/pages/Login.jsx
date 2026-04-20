import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-slate-900 border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Proxima Digital Logo" className="w-10 h-10 rounded-lg object-cover" />
            <span className="text-white font-semibold text-lg">Proxima Digital</span>
          </Link>

          <Link to="/" className="text-slate-300 hover:text-white transition">
            ← Retour à l'accueil
          </Link>
        </div>
      </header>

      {/* Login Section */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Connexion</h1>
              <p className="text-slate-600">Accédez à votre compte pour gérer vos projets</p>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Email</label>
                <input type="email" placeholder="votre@email.com" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Mot de passe</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-slate-600">Se souvenir de moi</span>
                </label>
                <a href="#" className="text-sm text-cyan-600 hover:text-cyan-700">Mot de passe oublié?</a>
              </div>
              <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-lg font-semibold transition">
                Se connecter
              </button>
              <p className="text-center text-slate-600 text-sm">
                Pas encore de compte? <a href="#" className="text-cyan-600 hover:text-cyan-700 font-semibold">S'inscrire</a>
              </p>
            </form>
          </div>
          
          <div className="hidden lg:block">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-8 text-white space-y-6">
              <div>
                <div className="text-4xl mb-2">🚀</div>
                <h3 className="text-2xl font-bold mb-2">Bienvenue</h3>
                <p>Accédez à tous vos projets digitaux en un seul endroit</p>
              </div>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="text-2xl">✓</span>
                  <div>
                    <p className="font-semibold">Gestion complète</p>
                    <p className="text-sm text-cyan-100">Gérez tous vos projets facilement</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-2xl">✓</span>
                  <div>
                    <p className="font-semibold">Suivi en temps réel</p>
                    <p className="text-sm text-cyan-100">Suivez la progression de vos projets</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-2xl">✓</span>
                  <div>
                    <p className="font-semibold">Support 24/7</p>
                    <p className="text-sm text-cyan-100">Notre équipe est toujours disponible</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
