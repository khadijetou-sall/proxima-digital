import React from 'react'
import { Link } from 'react-router-dom'

export default function Services() {
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
            <a href="#services" className="text-slate-300 hover:text-white transition">Services</a>
            <Link to="/about" className="text-slate-300 hover:text-white transition">À propos</Link>
            <Link to="/contact" className="text-slate-300 hover:text-white transition">Contact</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/contact" className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg font-semibold transition">
              Devis
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* 1. HERO */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-900 to-slate-900 px-6 py-24 sm:px-12 lg:py-32 mb-32">
          <div className="absolute inset-0 bg-grid-slate-700/10 opacity-20" />
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 tracking-tight">
              Nos services digitaux pour développer votre présence
            </h1>
            <p className="text-xl text-slate-200 mb-8 leading-relaxed">
              Nous aidons votre entreprise à être visible et performante en ligne
            </p>
            <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105">
              Demander un devis
            </a>
          </div>
        </section>

        {/* 2. SERVICES */}
        <section id="services" className="mb-32 space-y-12">
          <div className="text-center space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Services</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-950">Nos 3 domaines de expertise</h2>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {[
              {
                emoji: '🎨',
                title: 'Identité visuelle',
                items: ['Logo professionnel', 'Affiches & visuels', 'Charte graphique'],
                color: 'from-purple-500 to-pink-500',
                description: 'Créons une identité visuelle unique qui représente parfaitement votre marque.'
              },
              {
                emoji: '📱',
                title: 'Community Management',
                items: ['Posts & stories', 'Gestion des réseaux', 'Planification stratégique'],
                color: 'from-blue-500 to-cyan-500',
                description: 'Bâtissons votre communauté et augmentons votre engagement en ligne.'
              },
              {
                emoji: '💻',
                title: 'Développement web',
                items: ['Site vitrine', 'Site e-commerce', 'Responsive design'],
                color: 'from-cyan-500 to-teal-500',
                description: 'Construisons un site web performant et optimisé pour vos objectifs.'
              },
            ].map((service) => (
              <div key={service.title} className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-white to-slate-50 p-8 border border-slate-200 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color}`} />
                
                <div className="relative z-10">
                  <div className={`mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} bg-opacity-10 text-6xl`}>
                    {service.emoji}
                  </div>
                  
                  <h3 className="mb-3 text-2xl font-bold text-slate-950">{service.title}</h3>
                  <p className="mb-6 text-slate-600 leading-relaxed">{service.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-slate-700">
                        <span className={`inline-block h-2 w-2 rounded-full bg-gradient-to-r ${service.color}`} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <button className={`w-full rounded-xl bg-gradient-to-r ${service.color} px-4 py-3 font-bold text-white transition-all duration-300 hover:shadow-lg opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-2`}>
                    En savoir plus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. POURQUOI NOUS */}
        <section id="pourquoi" className="mb-32 space-y-12">
          <div className="text-center space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Avantages</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-950">Pourquoi nous choisir ?</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Nous offrons bien plus qu'un service, nous offrons un partenariat pour votre succès</p>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              { icon: '🎯', title: 'Approche personnalisée', desc: 'Chaque projet est unique, nous adaptons nos services à vos besoins.' },
              { icon: '🎨', title: 'Design moderne', desc: 'Nous créons des designs actuels et tendance.' },
              { icon: '⚡', title: 'Réactivité', desc: 'Nous répondons rapidement à vos demandes et questions.' },
              { icon: '🤝', title: 'Accompagnement', desc: 'Nous vous accompagnons à chaque étape du projet.' },
              { icon: '📈', title: 'Résultats mesurables', desc: 'Nous vous montrons les résultats concrets.' },
              { icon: '💡', title: 'Expertise', desc: 'Notre équipe maîtrise tous les domaines.' },
              { icon: '🔒', title: 'Transparence', desc: 'Communication claire et honnête avec vous.' },
              { icon: '🚀', title: 'Innovation', desc: 'Nous utilisons les meilleures technologies.' },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 text-center hover:shadow-lg transition-all duration-300">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-slate-950 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. PACKS */}
        <section id="packs" className="mb-32 space-y-12">
          <div className="text-center space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Pricing</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-950">Nos packs tarifaires</h2>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {[
              {
                name: 'PACK ESSENTIEL',
                emoji: '🚀',
                color: 'from-green-500 to-emerald-500',
                items: ['Consultation gratuite', 'Logo professionnel', 'Identité visuelle de base', '3 posts réseaux sociaux', 'Site vitrine simple'],
                cta: 'Demander un devis'
              },
              {
                name: 'PACK PROFESSIONNEL',
                emoji: '💼',
                color: 'from-blue-500 to-cyan-500',
                items: ['Consultation gratuite', 'Logo + branding complet', 'Charte graphique', '7 posts réseaux sociaux', 'Gestion des réseaux (1 mois)', 'Site web responsive', 'Support 1 mois'],
                cta: 'Discuter du projet',
                popular: true
              },
              {
                name: 'PACK PREMIUM',
                emoji: '⭐',
                color: 'from-purple-500 to-pink-500',
                items: ['Consultation gratuite', 'Branding complet & avancé', 'Charte graphique détaillée', '15 posts réseaux sociaux', 'Gestion des réseaux (3 mois)', 'Création de visuels personnalisés', 'Site web sur mesure', 'Maintenance (3 mois)', 'Support prioritaire'],
                cta: 'Nous contacter'
              }
            ].map((pack) => (
              <div key={pack.name} className={`relative rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 ${pack.popular ? 'ring-2 ring-cyan-500 lg:scale-105' : ''}`}>
                {pack.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-bl-xl font-bold text-sm">
                    ⭐ POPULAIRE
                  </div>
                )}
                
                <div className={`h-full rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-lg hover:shadow-2xl`}>
                  <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${pack.color} bg-opacity-10 text-4xl mb-4`}>
                    {pack.emoji}
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-950 mb-6">{pack.name}</h3>
                  
                  <ul className="space-y-3 mb-8">
                    {pack.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-slate-700">
                        <span className={`inline-block h-2 w-2 rounded-full mt-2 bg-gradient-to-r ${pack.color} flex-shrink-0`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <a href="https://wa.me/222615040793" target="_blank" rel="noreferrer" className={`w-full rounded-xl px-4 py-3 font-bold text-white transition-all duration-300 hover:shadow-lg inline-flex items-center justify-center bg-gradient-to-r ${pack.color}`}>
                    {pack.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. PROCESS */}
        <section id="process" className="mb-32 space-y-12">
          <div className="text-center space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Méthodologie</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-950">Notre process</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Nous suivons une approche structurée et professionnelle pour chaque projet</p>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hidden lg:block" style={{transform: 'translateY(50%)'}} />
            
            <div className="grid grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Analyse du besoin', icon: '🔍', desc: 'Nous comprenons votre business et vos objectifs.' },
                { step: '02', title: 'Proposition', icon: '📋', desc: 'Nous présentons nos recommandations.' },
                { step: '03', title: 'Création', icon: '⚡', desc: 'Nos équipes créent votre projet.' },
                { step: '04', title: 'Livraison', icon: '🎉', desc: 'Nous livrons et continuons le support.' },
              ].map((process, index) => (
                <div key={process.step} className="relative">
                  <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 text-center hover:shadow-lg transition-all duration-300">
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-3xl border-4 border-white shadow-lg">
                      {process.step}
                    </div>
                    
                    <div className="text-4xl mb-4 mt-8">{process.icon}</div>
                    <h3 className="text-xl font-bold text-slate-950 mb-2">{process.title}</h3>
                    <p className="text-slate-600">{process.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. CTA FINAL */}
        <section id="contact" className="mb-20 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-900 to-slate-900 relative overflow-hidden py-20 px-8 text-center">
          <div className="absolute inset-0 bg-grid-slate-700/10 opacity-20" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              Prêt à lancer votre projet ?
            </h2>
            <p className="text-xl text-slate-200 mb-8">
              Contactez-nous dès aujourd'hui pour une consultation gratuite
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/222615040793" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105">
                💬 Contacter sur WhatsApp
              </a>
              <a href="mailto:digitalproxima317@gmail.com" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-full font-bold text-lg transition-all">
                ✉️ Envoyer un email
              </a>
            </div>
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
