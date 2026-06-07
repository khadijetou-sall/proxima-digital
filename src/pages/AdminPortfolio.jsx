import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { portfolioAPI } from '../api/portfolioAPI'
import portfolioProjectsFallback from '../data/portfolioProjects'
import {
  Plus, Trash2, Edit, Image, Search, X, ArrowLeft, Upload, Paperclip,
  Globe, ExternalLink, Calendar, User, FileText, FolderOpen,
} from 'lucide-react'

const categories = [
  'Logo', 'Site Web', 'Application', 'Community Management', 'Branding', 'Design Graphique',
]

export default function AdminPortfolio() {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  const [showModal, setShowModal] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [form, setForm] = useState({
    title: '', description: '', category: 'Logo', tags: '', clientName: '',
    projectDate: '', image: '', images: [], projectUrl: '', appUrl: '', files: [],
  })

  const [uploading, setUploading] = useState(false)
  const [uploadingFile, setUploadingFile] = useState(false)
  const [activeView, setActiveView] = useState('projects')

  const [uploads, setUploads] = useState([])
  const [loadingUploads, setLoadingUploads] = useState(false)

  useEffect(() => {
    if (authLoading) return
    if (!user?.isAdmin && !user?.role) { navigate('/admin/login'); return }
    fetchProjects()
    fetchUploads()
  }, [authLoading])

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const res = await portfolioAPI.getAll()
      setProjects(res.data.projects || [])
    } catch {
      setProjects(portfolioProjectsFallback)
    } finally {
      setLoading(false)
    }
  }

  const fetchUploads = async () => {
    setLoadingUploads(true)
    try {
      const res = await portfolioAPI.getUploads()
      setUploads(res.data.files || [])
    } catch {
      setUploads([])
    } finally {
      setLoadingUploads(false)
    }
  }

  const openNew = () => {
    setEditingProject(null)
    setForm({ title: '', description: '', category: 'Logo', tags: '', clientName: '', projectDate: '', image: '', images: [], projectUrl: '', appUrl: '', files: [] })
    setShowModal(true)
  }

  const openEdit = (p) => {
    setEditingProject(p)
    setForm({
      title: p.title || '',
      description: p.description || '',
      category: p.category || 'Logo',
      tags: (p.tags || []).join(', '),
      clientName: p.clientName || '',
      projectDate: p.projectDate ? p.projectDate.slice(0, 10) : '',
      image: p.image || '',
      images: p.images || [],
      projectUrl: p.projectUrl || '',
      appUrl: p.appUrl || '',
      files: p.files || [],
    })
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      title: form.title,
      description: form.description,
      category: form.category,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      clientName: form.clientName,
      projectDate: form.projectDate || undefined,
      image: form.image,
      images: form.images,
      projectUrl: form.projectUrl,
      appUrl: form.appUrl,
      files: form.files,
    }
    try {
      if (editingProject) {
        await portfolioAPI.update(editingProject._id, data)
      } else {
        await portfolioAPI.create(data)
      }
      setShowModal(false)
      fetchProjects()
    } catch (err) {
      if (!editingProject && !editingProject?._id) {
        const fallback = portfolioProjectsFallback
        const newId = String(fallback.length + 1)
        fallback.push({ id: newId, ...data, createdAt: new Date().toISOString().slice(0, 10) })
        setProjects([...fallback])
        setShowModal(false)
      }
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce projet du portfolio ?')) return
    try {
      await portfolioAPI.delete(id)
      fetchProjects()
    } catch {
      setProjects((prev) => prev.filter((p) => p._id !== id && p.id !== id))
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const res = await portfolioAPI.uploadImage(file)
      setForm((prev) => ({ ...prev, image: res.data.url }))
    } catch {
      setForm((prev) => ({ ...prev, image: URL.createObjectURL(file) }))
    } finally {
      setUploading(false)
    }
  }

  const handleMultipleImageUpload = async (e) => {
    const files = Array.from(e.target.files)
    for (const file of files) {
      setUploading(true)
      try {
        const res = await portfolioAPI.uploadImage(file)
        setForm((prev) => ({ ...prev, images: [...prev.images, res.data.url] }))
      } catch {
        setForm((prev) => ({ ...prev, images: [...prev.images, URL.createObjectURL(file)] }))
      } finally {
        setUploading(false)
      }
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploadingFile(true)
    try {
      const res = await portfolioAPI.uploadFile(file)
      setForm((prev) => ({
        ...prev, files: [...(prev.files || []), { name: res.data.name, url: res.data.url }],
      }))
    } catch {
      setForm((prev) => ({
        ...prev, files: [...(prev.files || []), { name: file.name, url: URL.createObjectURL(file) }],
      }))
    } finally {
      setUploadingFile(false)
    }
  }

  const handleRemoveFile = (idx) => {
    setForm((prev) => ({ ...prev, files: prev.files.filter((_, i) => i !== idx) }))
  }

  const handleRemoveImage = (idx) => {
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }))
  }

  const handleDeleteUpload = async (name) => {
    if (!confirm(`Supprimer le fichier "${name}" ?`)) return
    try {
      await portfolioAPI.deleteUpload(name)
      fetchUploads()
    } catch {}
  }

  const filtered = projects.filter((p) => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.trim().toLowerCase()
    const title = (p.title || '').toLowerCase()
    const desc = (p.description || '').toLowerCase()
    const cat = (p.category || '').toLowerCase()
    const tags = (p.tags || []).map((t) => t.toLowerCase())
    const client = (p.clientName || '').toLowerCase()
    return title.includes(q) || desc.includes(q) || cat.includes(q) ||
      tags.some((t) => t.includes(q)) || client.includes(q)
  })

  return (
    <div className="min-h-screen bg-gray-950">
      <header className="sticky top-0 z-30 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/admin')} className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-gray-800 transition">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-white">Gestion du Portfolio</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveView('projects')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${activeView === 'projects' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Projets
            </button>
            <button
              onClick={() => { setActiveView('uploads'); fetchUploads() }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${activeView === 'uploads' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Fichiers
            </button>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        {activeView === 'uploads' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">Fichiers stockés</h2>
                <p className="text-sm text-gray-400 mt-0.5">{uploads.length} fichier{uploads.length !== 1 ? 's' : ''}</p>
              </div>
              <button onClick={fetchUploads} className="text-sm text-blue-400 hover:text-blue-300">Actualiser</button>
            </div>
            {loadingUploads ? (
              <div className="flex justify-center py-12"><div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>
            ) : uploads.length === 0 ? (
              <div className="bg-gray-900 rounded-xl p-12 text-center border border-gray-800">
                <Upload className="w-10 h-10 text-gray-700 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">Aucun fichier uploadé.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {uploads.map((f) => {
                  const isImage = /\.(png|jpg|jpeg|gif|svg|webp)$/i.test(f.name)
                  return (
                    <div key={f.name} className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden group">
                      <div className="relative h-28 bg-gray-800 flex items-center justify-center">
                        {isImage ? (
                          <img src={f.url} alt={f.name} className="w-full h-full object-cover" />
                        ) : (
                          <FileText className="w-8 h-8 text-gray-600" />
                        )}
                        <button
                          onClick={() => handleDeleteUpload(f.name)}
                          className="absolute top-1.5 right-1.5 bg-red-500/80 text-white p-1 rounded-lg opacity-0 group-hover:opacity-100 transition hover:bg-red-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="px-2.5 py-2">
                        <p className="text-[10px] text-gray-400 truncate">{f.name}</p>
                        <p className="text-[9px] text-gray-600">{(f.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un projet..."
                  className="w-full pl-9 pr-8 py-2 rounded-xl border border-gray-700 bg-gray-900 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <button onClick={openNew} className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all active:scale-[0.98] shrink-0">
                <Plus className="w-4 h-4" /> Nouveau projet
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>
            ) : filtered.length === 0 ? (
              <div className="bg-gray-900 rounded-xl p-12 text-center border border-gray-800">
                <Image className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                <p className="text-gray-400 text-sm">
                  {searchQuery ? 'Aucun projet trouvé.' : 'Aucun projet dans le portfolio.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((p) => (
                  <div key={p._id || p.id} className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition group">
                    <div className="relative h-40 bg-gray-800 overflow-hidden">
                      {p.image ? (
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center"><Image className="w-8 h-8 text-gray-600" /></div>
                      )}
                      <div className="absolute top-2 left-2">
                        <span className="text-xs px-2 py-0.5 bg-blue-600/90 text-white rounded-full">{p.category}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-white mb-1">{p.title}</h3>
                      {p.clientName && (
                        <p className="text-[11px] text-gray-500 mb-1 flex items-center gap-1">
                          <User className="w-3 h-3" /> {p.clientName}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 line-clamp-2 mb-2">{p.description}</p>
                      {(p.projectUrl || p.appUrl) && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          {p.projectUrl && (
                            <a href={p.projectUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1 text-[10px] text-blue-400 hover:text-blue-300">
                              <Globe className="w-3 h-3" /> Site
                            </a>
                          )}
                          {p.appUrl && (
                            <a href={p.appUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1 text-[10px] text-emerald-400 hover:text-emerald-300">
                              <ExternalLink className="w-3 h-3" /> App
                            </a>
                          )}
                        </div>
                      )}
                      {p.tags && p.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {p.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-[10px] px-2 py-0.5 bg-gray-800 text-gray-400 rounded-full">{tag}</span>
                          ))}
                        </div>
                      )}
                      {p.files && p.files.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {p.files.map((f, i) => (
                            <a key={i} href={f.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 bg-gray-800 text-gray-400 rounded-full hover:text-white hover:bg-gray-700 transition">
                              <Paperclip className="w-2.5 h-2.5" /> {f.name.length > 12 ? f.name.slice(0, 12) + '...' : f.name}
                            </a>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-800">
                        <span className="text-[10px] text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {p.createdAt ? new Date(p.createdAt).toLocaleDateString('fr-FR') : ''}
                        </span>
                        <div className="flex items-center gap-1">
                          <button onClick={() => openEdit(p)} className="text-gray-500 hover:text-blue-400 p-1 rounded-lg hover:bg-gray-800 transition"><Edit className="w-3.5 h-3.5" /></button>
                          <button onClick={() => handleDelete(p._id || p.id)} className="text-gray-500 hover:text-red-400 p-1 rounded-lg hover:bg-gray-800 transition"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-2xl border border-gray-800 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-white">{editingProject ? 'Modifier le projet' : 'Nouveau projet'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Titre *</label>
                  <input required value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="Nom du projet" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Description *</label>
                  <textarea required value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none" placeholder="Description du projet" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Catégorie *</label>
                  <select value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                    {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Tags (séparés par des virgules)</label>
                  <input value={form.tags} onChange={(e) => setForm({...form, tags: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="e-commerce, startup, islamique" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Nom du client</label>
                  <input value={form.clientName} onChange={(e) => setForm({...form, clientName: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="Nom du client" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Date du projet</label>
                  <input type="date" value={form.projectDate} onChange={(e) => setForm({...form, projectDate: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">URL du site web</label>
                  <input value={form.projectUrl} onChange={(e) => setForm({...form, projectUrl: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">URL de l'application</label>
                  <input value={form.appUrl} onChange={(e) => setForm({...form, appUrl: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="https://..." />
                </div>
              </div>

              <div className="border-t border-gray-800 pt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Image principale</label>
                  <div className="flex items-center gap-3">
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm text-gray-400 file:mr-3 file:px-4 file:py-2 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-gray-800 file:text-white hover:file:bg-gray-700" />
                    {uploading && <span className="text-xs text-gray-500">Upload...</span>}
                  </div>
                  {form.image && (
                    <div className="mt-2 relative inline-block">
                      <img src={form.image} alt="" className="w-32 h-20 object-cover rounded-lg border border-gray-700" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Images supplémentaires</label>
                  <div className="flex items-center gap-3">
                    <input type="file" accept="image/*" multiple onChange={handleMultipleImageUpload} className="text-sm text-gray-400 file:mr-3 file:px-4 file:py-2 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-gray-800 file:text-white hover:file:bg-gray-700" />
                    {uploading && <span className="text-xs text-gray-500">Upload...</span>}
                  </div>
                  {form.images.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {form.images.map((url, i) => (
                        <div key={i} className="relative group/img">
                          <img src={url} alt="" className="w-20 h-14 object-cover rounded-lg border border-gray-700" />
                          <button type="button" onClick={() => handleRemoveImage(i)} className="absolute -top-1.5 -right-1.5 bg-red-500 text-white p-0.5 rounded-full opacity-0 group-hover/img:opacity-100 transition"><X className="w-3 h-3" /></button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Fichiers (PDF, documents, etc.)</label>
                  <div className="flex items-center gap-3">
                    <input type="file" onChange={handleFileUpload} className="text-sm text-gray-400 file:mr-3 file:px-4 file:py-2 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-gray-800 file:text-white hover:file:bg-gray-700" />
                    {uploadingFile && <span className="text-xs text-gray-500">Upload...</span>}
                  </div>
                  {form.files.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {form.files.map((f, i) => (
                        <div key={i} className="flex items-center justify-between bg-gray-800 rounded-lg px-3 py-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <Paperclip className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                            <span className="text-xs text-gray-300 truncate">{f.name}</span>
                          </div>
                          <button type="button" onClick={() => handleRemoveFile(i)} className="text-red-400 hover:text-red-300 shrink-0"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-700 text-gray-300 text-sm font-medium hover:bg-gray-800 transition">Annuler</button>
                <button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-2.5 rounded-xl text-sm font-medium hover:shadow-lg transition">{editingProject ? 'Enregistrer' : 'Créer'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
