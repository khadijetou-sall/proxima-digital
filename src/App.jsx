import React from 'react'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="sticky top-0 z-20 bg-slate-900 border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <img src="/logo.png" alt="Proxima Digital Logo" className="w-10 h-10 rounded-lg object-cover" />
            <span className="text-white font-semibold text-lg">Proxima Digital</span>
          </a>

          {/* Menu Center */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-slate-300 hover:text-white transition">Services</a>
            <a href="#apropos" className="text-slate-300 hover:text-white transition">À propos</a>
            <a href="#contact" className="text-slate-300 hover:text-white transition">Contact</a>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden lg:block relative">
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="bg-slate-800 text-white placeholder-slate-400 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 w-48"
              />
            </div>
            
            {/* Notification */}
            <button className="text-slate-300 hover:text-white transition p-2 hover:bg-slate-800 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>

            {/* Profile */}
            <button className="flex items-center gap-2 p-1 hover:bg-slate-800 rounded-lg transition">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                PD
              </div>
            </button>

            {/* Login Button */}
            <a href="#login" className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg font-semibold transition">
              Se connecter
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
          {/* couverture.png */}
          <div className="absolute inset-0 bg-black/40 blur-md" style={{backgroundImage: 'url(/couverture.png)', backgroundSize: 'cover', backgroundPosition: 'center'}} />
          
          <div className="relative z-10">
            <div className="mb-12 max-w-3xl">
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl drop-shadow-lg">
                Les grandes marques ne négligent jamais leur image digitale, car c'est une amana
              </h1>
              <p className="text-lg leading-8 text-slate-100 drop-shadow-md">
                Nous sommes là pour vous rendre visible, donner de la force à votre image et faire de votre présence digitale un véritable levier de succès.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-8 backdrop-blur-sm transition hover:bg-slate-950/70">
                <div className="mb-4 text-4xl">🎨</div>
                <h3 className="mb-3 text-xl font-semibold text-white">Identité visuelle</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>Logo</li>
                  <li>Affiches & visuels</li>
                  <li>Branding</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-8 backdrop-blur-sm transition hover:bg-slate-950/70">
                <div className="mb-4 text-4xl">📱</div>
                <h3 className="mb-3 text-xl font-semibold text-white">Community Management</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>Posts & stories</li>
                  <li>Gestion des comptes</li>
                  <li>Stratégie digitale</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-700 bg-slate-950/50 p-8 backdrop-blur-sm transition hover:bg-slate-950/70">
                <div className="mb-4 text-4xl">💻</div>
                <h3 className="mb-3 text-xl font-semibold text-white">Développement web</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>Sites web</li>
                  <li>Responsive design</li>
                  <li>Optimisation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="mt-20 space-y-10">
          <div className="grid gap-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Services</p>
            <h2 className="text-3xl font-semibold text-slate-950 sm:text-4xl">Nos services</h2>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {[
              { emoji: '🎨', title: 'Identité visuelle', items: ['Logo', 'Affiches & visuels', 'Branding'] },
              { emoji: '📱', title: 'Community Management', items: ['Posts & stories', 'Gestion des comptes', 'Stratégie digitale'] },
              { emoji: '💻', title: 'Développement web', items: ['Sites web', 'Responsive design', 'Optimisation'] },
            ].map((service) => (
              <div key={service.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-3 text-3xl">
                  {service.emoji}
                </div>
                <h3 className="mb-3 text-base font-semibold text-slate-950">{service.title}</h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  {service.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="packs" className="mt-16 space-y-6">
          <div className="grid gap-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Packs</p>
            <h2 className="text-3xl font-semibold text-slate-950 sm:text-4xl">Nos packs</h2>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col">
              <div className="mb-3 text-2xl">🟢</div>
              <div className="mb-3 text-3xl">🚀</div>
              <h3 className="mb-3 text-sm font-semibold text-slate-950">PACK ESSENTIEL</h3>
              <ul className="space-y-1 text-xs text-slate-600 mb-4 flex-1">
                <li>• Consultation gratuite</li>
                <li>• Logo professionnel</li>
                <li>• Identité visuelle de base</li>
                <li>• 3 posts réseaux sociaux</li>
                <li>• Site vitrine simple</li>
              </ul>
              <a href="https://wa.me/222615040793?text=Bonjour,%20je%20suis%20int%C3%A9ress%C3%A9%20par%20le%20PACK%20ESSENTIEL" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-cyan-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-cyan-700">
                Demander un devis
              </a>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col">
              <div className="mb-3 text-2xl">🔵</div>
              <div className="mb-3 text-3xl">💼</div>
              <h3 className="mb-3 text-sm font-semibold text-slate-950">PACK PROFESSIONNEL</h3>
              <ul className="space-y-1 text-xs text-slate-600 mb-4 flex-1">
                <li>• Consultation gratuite</li>
                <li>• Logo + branding</li>
                <li>• Charte graphique</li>
                <li>• 7 posts réseaux sociaux</li>
                <li>• Gestion des réseaux sociaux (1 mois)</li>
                <li>• Site web responsive</li>
              </ul>
              <a href="https://wa.me/222615040793?text=Bonjour,%20je%20suis%20int%C3%A9ress%C3%A9%20par%20le%20PACK%20PROFESSIONNEL" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-cyan-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-cyan-700">
                Discuter du projet
              </a>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col">
              <div className="mb-3 text-2xl">🟣</div>
              <div className="mb-3 text-3xl">⭐</div>
              <h3 className="mb-3 text-sm font-semibold text-slate-950">PACK PREMIUM</h3>
              <ul className="space-y-1 text-xs text-slate-600 mb-4 flex-1">
                <li>• Consultation gratuite</li>
                <li>• Branding complet</li>
                <li>• Charte graphique avancée</li>
                <li>• 15 posts réseaux sociaux</li>
                <li>• Gestion des réseaux sociaux (1 mois)</li>
                <li>• Création de visuels personnalisés</li>
                <li>• Site web sur mesure</li>
                <li>• Maintenance (1 mois)</li>
              </ul>
              <a href="https://wa.me/222615040793?text=Bonjour,%20je%20suis%20int%C3%A9ress%C3%A9%20par%20le%20PACK%20PREMIUM" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-cyan-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-cyan-700">
                Nous contacter
              </a>
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-12 lg:grid-cols-2" id="apropos">
          <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">À propos</p>
            <h2 className="text-3xl font-semibold text-slate-950">À propos de Proxima Digital</h2>
            <p className="text-slate-600">Je vends l'image digitale de votre entreprise. Ne la négligez plus. La flèche ascendante n'a jamais autant converti.</p>
            <p className="text-slate-600">Le circuit avouas donnent mention est un liamir que pouibuits et potentielant.</p>
          </div>

          <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm" id="contact">
            <div className="space-y-3 text-center">
              <p className="text-xl font-semibold text-slate-950">Contact</p>
              <p className="text-slate-600">Dens contact qu’ils most be required.</p>
            </div>
            <div className="space-y-4 rounded-3xl bg-slate-50 p-6">
              <form className="space-y-4">
                <input type="text" placeholder="Nom" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100" />
                <input type="email" placeholder="Email" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100" />
                <textarea rows="4" placeholder="Message" className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100" />
                <button type="submit" className="w-full rounded-full bg-cyan-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700">
                  Envoyer
                </button>
              </form>
              <a href="https://wa.me/222615040793" target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                Contactez-nous sur WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Login Section */}
        <section id="login" className="mt-20 mb-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Connexion</h2>
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
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-lg font-semibold text-slate-950">Proxima Digital</p>
            <p className="mt-2 max-w-xl text-sm text-slate-600">Création de sites, branding et community management au service de votre entreprise.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <a href="#services" className="text-sm text-slate-600 transition hover:text-slate-950">Services</a>
            <a href="#apropos" className="text-sm text-slate-600 transition hover:text-slate-950">À propos</a>
            <a href="#contact" className="text-sm text-slate-600 transition hover:text-slate-950">Contact</a>
          </div>
          <a href="https://wa.me/222615040793" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-cyan-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700">
            WhatsApp
          </a>
        </div>
      </footer>
    </div>
  )
}
