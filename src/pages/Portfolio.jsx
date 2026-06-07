import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Search, X, FolderOpen, ArrowRight, Globe, ExternalLink, Paperclip } from 'lucide-react'
import Header from '../components/Header'
import { portfolioAPI } from '../api/portfolioAPI'
import portfolioProjects from '../data/portfolioProjects'

const categories = [
  'Logo', 'Site Web', 'Application', 'Community Management', 'Branding', 'Design Graphique',
]

export default function Portfolio() {
  const { t } = useTranslation()
  const [projects, setProjects] = useState(portfolioProjects)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    portfolioAPI.getAll()
      .then((res) => {
        if (res.data.projects && res.data.projects.length > 0) {
          setProjects(res.data.projects)
        }
      })
      .catch(() => {})
  }, [])

  const filtered = useMemo(() => {
    let result = projects
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      result = result.filter((p) => {
        const title = (p.title || '').toLowerCase()
        const desc = (p.description || '').toLowerCase()
        const cat = (p.category || '').toLowerCase()
        const tags = (p.tags || []).map((t) => t.toLowerCase())
        return title.includes(q) || desc.includes(q) || cat.includes(q) || tags.some((tag) => tag.includes(q))
      })
    }
    return result
  }, [projects, searchQuery, selectedCategory])

  const handleClear = () => {
    setSearchQuery('')
    setSelectedCategory('')
  }

  const hasFilters = searchQuery.trim() || selectedCategory

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <Header />

      <div className="bg-gray-900 pt-20 pb-12 sm:pb-16" />

      <section className="bg-white pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 text-center pt-12 sm:pt-16 pb-8">
            {t('portfolio.title')}
          </h1>
          <div className="max-w-xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('portfolio.search.placeholder')}
                className="w-full pl-12 pr-10 py-4 bg-white rounded-2xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm transition"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600 shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-500">{t('portfolio.search.noResults')}</p>
              {hasFilters && (
                <button onClick={handleClear} className="mt-4 inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-blue-700 transition">
                  {t('portfolio.search.viewAll')} <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((project) => (
                  <div key={project.id || project._id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300">
                    <div className="relative h-52 overflow-hidden bg-gray-100">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FolderOpen className="w-12 h-12 text-gray-300" />
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-blue-600 rounded-full shadow-sm">
                          {project.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-semibold text-gray-900 mb-1.5">{project.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{project.description}</p>
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-[11px] px-2.5 py-0.5 bg-gray-100 text-gray-500 rounded-full">{tag}</span>
                          ))}
                        </div>
                      )}
                      {(project.projectUrl || project.appUrl || (project.files && project.files.length > 0)) && (
                        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
                          {project.projectUrl && (
                            <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium">
                              <Globe className="w-3.5 h-3.5" /> Site web
                            </a>
                          )}
                          {project.appUrl && (
                            <a href={project.appUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 font-medium">
                              <ExternalLink className="w-3.5 h-3.5" /> Application
                            </a>
                          )}
                          {project.files && project.files.map((f, i) => (
                            <a key={i} href={f.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
                              <Paperclip className="w-3.5 h-3.5" /> {f.name.length > 20 ? f.name.slice(0, 20) + '...' : f.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
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
