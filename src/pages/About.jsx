import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
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
            <Link to="/about" className="text-slate-300 hover:text-white transition">À propos</Link>
            <Link to="/contact" className="text-slate-300 hover:text-white transition">Contact</Link>
          </nav>

          <div className="flex items-center gap-4">
            <a href="https://wa.me/222615040793" target="_blank" rel="noreferrer" className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg font-semibold transition">
              WhatsApp
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-20 sm:px-12 lg:py-28 mb-28 shadow-2xl shadow-slate-900/30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.2),_transparent_30%),linear-gradient(180deg,_rgba(15,23,42,0.95),rgba(15,23,42,0.9))]" />
          <div className="relative z-10 mx-auto max-w-5xl text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-cyan-300">Agence digitale haut de gamme</p>
            <h1 className="text-5xl sm:text-6xl font-semibold text-white leading-tight">
              Nous aidons les marques à se démarquer dans le monde numérique
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Une agence spécialisée en identité visuelle, développement web et gestion des réseaux sociaux, avec une vision claire : renforcer votre image digitale et augmenter votre impact.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:justify-center">
              <Link to="/contact" className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-8 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-400">
                Contactez-nous
              </Link>
              <Link to="/services" className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-950/90 px-8 py-4 text-base font-semibold text-slate-200 transition hover:border-white hover:text-white">
                Voir nos services
              </Link>
            </div>
          </div>
        </section>

        {/* Qui sommes-nous */}
        <section className="mb-32 space-y-12">
          <div className="text-center space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Notre histoire</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-950">Qui sommes-nous ?</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 lg:p-12 shadow-lg">
              <p className="text-xl text-slate-700 leading-relaxed text-center">
                Nous sommes une agence digitale spécialisée dans la création d'identités visuelles, le développement web et la gestion des réseaux sociaux, avec pour objectif d'aider les marques à se démarquer dans le monde numérique.
              </p>
            </div>
          </div>
        </section>

        {/* Notre mission */}
        <section className="mb-32">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-10 shadow-lg">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-600">Notre mission</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-950">Accompagner votre croissance digitale</h2>
              <p className="mt-6 text-slate-700 leading-8">
                Accompagner les entreprises et les créateurs dans leur transformation digitale en leur proposant des solutions modernes, créatives et efficaces pour renforcer leur présence en ligne.
              </p>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-10 shadow-lg">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-600">Notre vision</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-950">Un digital maîtrisé par tous</h2>
              <p className="mt-6 text-slate-700 leading-8">
                Changer la perception du digital en aidant chaque génération à le comprendre, le maîtriser et l'utiliser de manière saine, utile et responsable afin de construire un avenir meilleur.
              </p>
            </div>
          </div>
        </section>

        {/* Nos valeurs */}
        <section className="mb-32">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-600">Nos valeurs</p>
            <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-slate-950">Ce qui nous guide</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100 text-3xl text-cyan-600">🚀</div>
              <h3 className="text-xl font-bold text-slate-950 mb-3">Modernité</h3>
              <p className="text-slate-600 leading-7">
                Une approche contemporaine avec des interfaces élégantes, rapides et facilement reconnaissables.
              </p>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100 text-3xl text-cyan-600">🤝</div>
              <h3 className="text-xl font-bold text-slate-950 mb-3">Amana</h3>
              <p className="text-slate-600 leading-7">
                Une relation de confiance, une communication transparente et des livrables tenus dans les délais.
              </p>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100 text-3xl text-cyan-600">💡</div>
              <h3 className="text-xl font-bold text-slate-950 mb-3">Innovation</h3>
              <p className="text-slate-600 leading-7">
                Des idées originales et une expertise technique pour faire émerger votre marque dans un univers concurrentiel.
              </p>
            </div>
          </div>
        </section>

        {/* Notre message */}
        <section className="mb-32 space-y-12">
          <div className="text-center space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Notre devise</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-950">Notre message</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="rounded-3xl border-4 border-cyan-500 bg-gradient-to-br from-cyan-50 to-blue-50 p-8 lg:p-12 shadow-lg">
              <div className="text-center">
                <div className="text-6xl mb-6">💫</div>
                <blockquote className="text-2xl lg:text-3xl font-bold text-slate-950 italic leading-relaxed">
                  "Les grandes marques ne négligent jamais leur image digitale, car c'est une amana."
                </blockquote>
              </div>
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
