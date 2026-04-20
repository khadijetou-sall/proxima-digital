import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
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
            <Link to="/services" className="text-slate-300 hover:text-white transition">Services</Link>
            <Link to="/about" className="text-slate-300 hover:text-white transition">À propos</Link>
            <Link to="/contact" className="text-slate-300 hover:text-white transition">Contact</Link>
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
            <Link to="/login" className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg font-semibold transition">
              Se connecter
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
          {/* couverture.png */}
          <div className="absolute inset-0 bg-black/50" style={{backgroundImage: 'url(/couverture.png)', backgroundSize: 'cover', backgroundPosition: 'center'}} />
          
          <div className="relative z-10">
            <div className="mb-12 max-w-3xl">
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6)'}}>
                Les grandes marques ne négligent jamais leur image digitale, car c'est une amana
              </h1>
              <p className="text-lg leading-8 text-slate-100" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.8)'}}>
                Nous sommes là pour vous rendre visible, donner de la force à votre image et faire de votre présence digitale un véritable levier de succès.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Link to="/services" className="rounded-2xl border border-slate-700 bg-slate-950/50 p-8 backdrop-blur-sm transition hover:bg-slate-950/70 hover:border-cyan-600">
                <div className="mb-4 text-4xl">🎨</div>
                <h3 className="mb-3 text-xl font-semibold text-white">Identité visuelle</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>Logo</li>
                  <li>Affiches & visuels</li>
                  <li>Branding</li>
                </ul>
              </Link>

              <Link to="/services" className="rounded-2xl border border-slate-700 bg-slate-950/50 p-8 backdrop-blur-sm transition hover:bg-slate-950/70 hover:border-cyan-600">
                <div className="mb-4 text-4xl">📱</div>
                <h3 className="mb-3 text-xl font-semibold text-white">Community Management</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>Posts & stories</li>
                  <li>Gestion des comptes</li>
                  <li>Stratégie digitale</li>
                </ul>
              </Link>

              <Link to="/services" className="rounded-2xl border border-slate-700 bg-slate-950/50 p-8 backdrop-blur-sm transition hover:bg-slate-950/70 hover:border-cyan-600">
                <div className="mb-4 text-4xl">💻</div>
                <h3 className="mb-3 text-xl font-semibold text-white">Développement web</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>Sites web</li>
                  <li>Responsive design</li>
                  <li>Optimisation</li>
                </ul>
              </Link>
            </div>
          </div>
        </section>

        <section id="services" className="mt-24 space-y-12">
          <div className="grid gap-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Services</p>
            <h2 className="text-4xl font-bold text-white sm:text-5xl">Nos services</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">Découvrez nos solutions complètes pour transformer votre présence digitale</p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {[
              { emoji: '🎨', title: 'Identité visuelle', items: ['Logo', 'Affiches & visuels', 'Branding'], color: 'from-purple-500 to-pink-500' },
              { emoji: '📱', title: 'Community Management', items: ['Posts & stories', 'Gestion des comptes', 'Stratégie digitale'], color: 'from-blue-500 to-cyan-500' },
              { emoji: '💻', title: 'Développement web', items: ['Sites web', 'Responsive design', 'Optimisation'], color: 'from-cyan-500 to-teal-500' },
            ].map((service) => (
              <div key={service.title} className="group relative rounded-3xl overflow-hidden bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Top accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color}`} />
                
                <div className="relative z-10">
                  {/* Emoji with styling */}
                  <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} bg-opacity-10 text-5xl`}>
                    {service.emoji}
                  </div>
                  
                  {/* Title */}
                  <h3 className="mb-4 text-xl font-bold text-slate-950">{service.title}</h3>
                  
                  {/* Description items */}
                  <ul className="space-y-3">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-slate-600 transition-colors group-hover:text-slate-900">
                        <span className={`inline-block h-2 w-2 rounded-full bg-gradient-to-r ${service.color}`} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link to="/services" className={`mt-6 w-full inline-block text-center rounded-xl bg-gradient-to-r ${service.color} px-4 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-current opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-2`}>
                    En savoir plus
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="packs" className="mt-16 space-y-6">
          <div className="grid gap-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Packs</p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Nos packs</h2>
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
              <p className="text-slate-600">Dens contact qu'ils most be required.</p>
            </div>
            <div className="space-y-4 rounded-3xl bg-slate-50 p-6">
              <Link to="/contact" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700">
                📧 Accéder au formulaire de contact
              </Link>
              <a href="https://wa.me/222615040793" target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                💬 Contactez-nous sur WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

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
