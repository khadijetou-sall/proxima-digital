import { useState, useEffect, useMemo } from 'react'
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
    </div>
  )
}
