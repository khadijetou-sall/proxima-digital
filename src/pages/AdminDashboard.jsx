import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { adminAPI, projectAPI, contactAPI, newsletterAPI, deliverableAPI } from '../api/axios'
import { portfolioAPI } from '../api/portfolioAPI'
import {
  LayoutDashboard, Users, FolderOpen, MessageSquare, Mail, LogOut, Menu, X,
  TrendingUp, CheckCircle, Clock, AlertCircle, Package, Trash2, Plus,
  ChevronRight, ChevronLeft, Calendar, FileText, Image, ExternalLink,
  Shield, Search, Send, Download, Eye, Edit, Upload, Paperclip, Globe,
} from 'lucide-react'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const statusConfig = {
    pending: { label: 'En attente', icon: Clock, class: 'bg-amber-50 text-amber-600' },
    'in-progress': { label: 'En cours', icon: AlertCircle, class: 'bg-blue-50 text-blue-600' },
    completed: { label: 'Terminé', icon: CheckCircle, class: 'bg-emerald-50 text-emerald-600' },
  }

  const navItems = [
    { id: 'overview', label: t('admin.nav.overview'), icon: LayoutDashboard },
    { id: 'clients', label: t('admin.nav.clients'), icon: Users },
    { id: 'projects', label: t('admin.nav.projects'), icon: FolderOpen },
    { id: 'portfolio', label: t('admin.nav.portfolio'), icon: Image },
    { id: 'contacts', label: t('admin.nav.contacts'), icon: MessageSquare },
    { id: 'newsletter', label: t('admin.nav.newsletter'), icon: Mail },
  ]

  const [stats, setStats] = useState(null)
  const [clients, setClients] = useState([])
  const [projects, setProjects] = useState([])
  const [contacts, setContacts] = useState([])
  const [subscribers, setSubscribers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState(null)

  const [showNewProject, setShowNewProject] = useState(false)
  const [newProject, setNewProject] = useState({
    clientId: '', name: '', type: 'custom', pack: '', customDescription: '',
    description: '', status: 'pending', progress: 0, deadline: '',
  })

  const [campaign, setCampaign] = useState({ subject: '', html: '' })
  const [sending, setSending] = useState(false)
  const [campaignResult, setCampaignResult] = useState(null)

  const [portfolioProjects, setPortfolioProjects] = useState([])
  const [showPortfolioModal, setShowPortfolioModal] = useState(false)
  const [editingPortfolio, setEditingPortfolio] = useState(null)
  const [portfolioForm, setPortfolioForm] = useState({
    title: '', description: '', category: 'Logo', tags: '', image: '',
    projectUrl: '', appUrl: '', files: [],
  })
  const [uploading, setUploading] = useState(false)
  const [uploadingFile, setUploadingFile] = useState(false)

  useEffect(() => {
    if (authLoading) return
    if (!user?.isAdmin && !user?.role) {
      navigate('/dashboard')
      return
    }
    loadData()
  }, [authLoading])

  const loadData = async () => {
    setLoading(true)
    try {
      const [statsRes, clientsRes, projectsRes, contactsRes, subsRes, portfolioRes] = await Promise.all([
        adminAPI.getStats(),
        adminAPI.getClients(),
        projectAPI.getAll(),
        contactAPI.getAll(),
        newsletterAPI.getAll(),
        portfolioAPI.getAll(),
      ])
      setStats(statsRes.data.stats)
      setClients(clientsRes.data.clients)
      setProjects(projectsRes.data.projects)
      setContacts(contactsRes.data.contacts)
      setSubscribers(subsRes.data.subscribers)
      setPortfolioProjects(portfolioRes.data.projects || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleDeleteClient = async (id) => {
    if (!confirm(t('admin.clients.deleteConfirm'))) return
    await adminAPI.removeClient(id)
    loadData()
  }

  const handleDeleteContact = async (id) => {
    await contactAPI.remove(id)
    loadData()
  }

  const handleDeleteSubscriber = async (id) => {
    await newsletterAPI.remove(id)
    loadData()
  }

  const handleContactStatus = async (id, status) => {
    await contactAPI.updateStatus(id, status)
    loadData()
  }

  const handleDeleteProject = async (id) => {
    if (!confirm(t('admin.projects.deleteConfirm'))) return
    await projectAPI.delete(id)
    loadData()
  }

  const handleProgressUpdate = async (id, progress) => {
    await projectAPI.updateProgress(id, progress)
    loadData()
  }

  const handleCreateProject = async (e) => {
    e.preventDefault()
    try {
      const data = { ...newProject }
      if (data.type === 'pack') {
        data.customDescription = ''
      } else {
        data.pack = null
      }
      await projectAPI.create(data)
      setShowNewProject(false)
      setNewProject({
        clientId: '', name: '', type: 'custom', pack: '', customDescription: '',
        description: '', status: 'pending', progress: 0, deadline: '',
      })
      loadData()
    } catch (err) {
      alert(err.response?.data?.message || t('admin.errorPrefix'))
    }
  }

  const handlePortfolioSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = {
        title: portfolioForm.title,
        description: portfolioForm.description,
        category: portfolioForm.category,
        tags: portfolioForm.tags.split(',').map((t) => t.trim()).filter(Boolean),
        projectUrl: portfolioForm.projectUrl,
        appUrl: portfolioForm.appUrl,
        image: portfolioForm.image,
        files: portfolioForm.files,
      }
      if (editingPortfolio) {
        await portfolioAPI.update(editingPortfolio._id, data)
      } else {
        await portfolioAPI.create(data)
      }
      setShowPortfolioModal(false)
      setEditingPortfolio(null)
      setPortfolioForm({ title: '', description: '', category: 'Logo', tags: '', image: '', projectUrl: '', appUrl: '', files: [] })
      const res = await portfolioAPI.getAll()
      setPortfolioProjects(res.data.projects || [])
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de l\'enregistrement.')
    }
  }

  const handleEditPortfolio = (project) => {
    setEditingPortfolio(project)
    setPortfolioForm({
      title: project.title || '',
      description: project.description || '',
      category: project.category || 'Logo',
      tags: (project.tags || []).join(', '),
      image: project.image || '',
      projectUrl: project.projectUrl || '',
      appUrl: project.appUrl || '',
      files: project.files || [],
    })
    setShowPortfolioModal(true)
  }

  const handleDeletePortfolio = async (id) => {
    if (!confirm('Supprimer ce projet du portfolio ?')) return
    try {
      await portfolioAPI.delete(id)
      const res = await portfolioAPI.getAll()
      setPortfolioProjects(res.data.projects || [])
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de la suppression.')
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const res = await portfolioAPI.uploadImage(file)
      setPortfolioForm((prev) => ({ ...prev, image: res.data.url }))
    } catch {
      const url = URL.createObjectURL(file)
      setPortfolioForm((prev) => ({ ...prev, image: url }))
    } finally {
      setUploading(false)
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploadingFile(true)
    try {
      const res = await portfolioAPI.uploadFile(file)
      setPortfolioForm((prev) => ({
        ...prev,
        files: [...(prev.files || []), { name: res.data.name, url: res.data.url }],
      }))
    } catch {
      const url = URL.createObjectURL(file)
      setPortfolioForm((prev) => ({
        ...prev,
        files: [...(prev.files || []), { name: file.name, url }],
      }))
    } finally {
      setUploadingFile(false)
    }
  }

  const handleRemoveFile = (index) => {
    setPortfolioForm((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }))
  }

  const handleSendCampaign = async (e) => {
    e.preventDefault()
    setSending(true)
    setCampaignResult(null)
    try {
      const res = await newsletterAPI.sendCampaign(campaign)
      setCampaignResult({ type: 'success', message: res.data.message })
      setCampaign({ subject: '', html: '' })
    } catch (err) {
      setCampaignResult({ type: 'error', message: err.response?.data?.message || t('admin.newsletter.errorSend') })
    } finally {
      setSending(false)
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview()
      case 'clients': return renderClients()
      case 'projects': return renderProjects()
      case 'contacts': return renderContacts()
      case 'portfolio': return renderPortfolio()
      case 'newsletter': return renderNewsletter()
      default: return renderOverview()
    }
  }

  const renderOverview = () => {
    if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>
    if (!stats) return <p className="text-gray-500 text-center py-20">{t('admin.overview.noData')}</p>

    const statCards = [
      { label: t('admin.overview.statsClients'), value: stats.totalClients, icon: Users, color: 'from-blue-600 to-cyan-500' },
      { label: t('admin.overview.statsProjects'), value: stats.totalProjects, icon: FolderOpen, color: 'from-blue-600 to-indigo-500' },
      { label: t('admin.overview.statsInProgress'), value: stats.inProgressProjects, icon: TrendingUp, color: 'from-amber-500 to-orange-500' },
      { label: t('admin.overview.statsCompleted'), value: stats.completedProjects, icon: CheckCircle, color: 'from-emerald-500 to-teal-500' },
      { label: t('admin.overview.statsContacts'), value: stats.newContacts, icon: MessageSquare, color: 'from-blue-500 to-indigo-500' },
      { label: t('admin.overview.statsSubscribers'), value: stats.totalSubscribers, icon: Mail, color: 'from-cyan-500 to-teal-500' },
    ]

    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-white">{t('admin.overview.title')}</h1>
          <p className="text-sm text-gray-400 mt-1">{t('admin.overview.sub')}</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {statCards.map((card) => {
            const Icon = card.icon
            return (
              <div key={card.label} className="bg-gray-900 rounded-xl p-5 shadow-sm border border-gray-800 hover:border-gray-700 transition">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-semibold text-white">{card.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{card.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const renderClients = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">{t('admin.clients.title')}</h1>
          <p className="text-sm text-gray-400 mt-1">{clients.length} client{clients.length !== 1 ? 's' : ''} inscrit{clients.length !== 1 ? 's' : ''}.</p>
        </div>
      </div>
      {clients.length === 0 ? (
        <div className="bg-gray-900 rounded-xl p-12 text-center border border-gray-800">
          <Users className="w-12 h-12 text-gray-700 mx-auto mb-4" />
          <p className="text-gray-400 text-sm">{t('admin.clients.empty')}</p>
        </div>
      ) : (
        <div className="bg-gray-900 rounded-xl shadow-sm border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left px-6 py-3 text-gray-400 font-medium">{t('admin.clients.tableName')}</th>
                  <th className="text-left px-6 py-3 text-gray-400 font-medium">{t('admin.clients.tableEmail')}</th>
                  <th className="text-center px-6 py-3 text-gray-400 font-medium">{t('admin.clients.tableProjects')}</th>
                  <th className="text-left px-6 py-3 text-gray-400 font-medium">{t('admin.clients.tableDate')}</th>
                  <th className="text-right px-6 py-3 text-gray-400 font-medium">{t('admin.clients.tableActions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {clients.map((client) => (
                  <tr key={client._id} className="hover:bg-gray-800/50 transition">
                    <td className="px-6 py-4 text-white font-medium">{client.name}</td>
                    <td className="px-6 py-4 text-gray-400">{client.email}</td>
                    <td className="px-6 py-4 text-center text-gray-300">{client.projectCount}</td>
                    <td className="px-6 py-4 text-gray-400">{new Date(client.createdAt).toLocaleDateString('fr-FR')}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDeleteClient(client._id)} className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-500/10 transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )

  const renderProjects = () => {
    if (selectedProject) return renderProjectDetail()
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">{t('admin.projects.title')}</h1>
            <p className="text-sm text-gray-400 mt-1">{projects.length} projet{projects.length !== 1 ? 's' : ''}.</p>
          </div>
          <button onClick={() => setShowNewProject(true)} className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all active:scale-[0.98]">
            <Plus className="w-4 h-4" /> {t('admin.projects.new')}
          </button>
        </div>

        {showNewProject && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowNewProject(false)}>
            <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-lg border border-gray-800 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-lg font-semibold text-white mb-4">{t('admin.projects.modalTitle')}</h2>
              <form onSubmit={handleCreateProject} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">{t('admin.projects.modalClient')}</label>
                    <select required value={newProject.clientId} onChange={(e) => setNewProject({...newProject, clientId: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                      <option value="">{t('admin.projects.modalSelectClient')}</option>
                    {clients.map((c) => <option key={c._id} value={c._id}>{c.name} ({c.email})</option>)}
                  </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">{t('admin.projects.modalName')}</label>
                    <input required value={newProject.name} onChange={(e) => setNewProject({...newProject, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder={t('admin.projects.modalNamePlaceholder')} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">{t('admin.projects.modalType')}</label>
                  <select value={newProject.type} onChange={(e) => setNewProject({...newProject, type: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                    <option value="custom">{t('admin.projects.modalTypeCustom')}</option>
                    <option value="pack">{t('admin.projects.modalTypePack')}</option>
                  </select>
                </div>
                {newProject.type === 'pack' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">{t('admin.projects.modalPack')}</label>
                    <select value={newProject.pack} onChange={(e) => setNewProject({...newProject, pack: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                      <option value="Starter">Starter</option>
                      <option value="Business">Business</option>
                      <option value="Premium">Premium</option>
                    </select>
                  </div>
                )}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">{t('admin.projects.modalDescription')}</label>
                  <textarea value={newProject.description} onChange={(e) => setNewProject({...newProject, description: e.target.value})} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">{t('admin.projects.modalProgress')}</label>
                    <input type="number" min="0" max="100" value={newProject.progress} onChange={(e) => setNewProject({...newProject, progress: Number(e.target.value)})} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">{t('admin.projects.modalDeadline')}</label>
                    <input type="text" value={newProject.deadline} onChange={(e) => setNewProject({...newProject, deadline: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder={t('admin.projects.modalDeadlinePlaceholder')} />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowNewProject(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-700 text-gray-300 text-sm font-medium hover:bg-gray-800 transition">{t('admin.projects.modalCancel')}</button>
                  <button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-2.5 rounded-xl text-sm font-medium hover:shadow-lg transition">{t('admin.projects.modalCreate')}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {projects.length === 0 ? (
          <div className="bg-gray-900 rounded-xl p-12 text-center border border-gray-800">
            <Package className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-400 text-sm">{t('admin.projects.empty')}</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {projects.map((p) => {
              const StatusIcon = statusConfig[p.status]?.icon || Clock
              return (
                <div key={p._id} className="bg-gray-900 rounded-xl p-5 border border-gray-800 hover:border-gray-700 transition">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold text-white">{p.name}</h3>
                        <span className="text-xs text-gray-500">— {p.clientId?.name || t('admin.projects.unknownClient')}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{p.type === 'pack' ? `Pack ${p.pack}` : t('admin.projects.customType')}{p.deadline ? ` · ${p.deadline}` : ''}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[p.status]?.class}`}>
                        <StatusIcon className="w-3 h-3" />{statusConfig[p.status]?.label}
                      </span>
                      <button onClick={() => setSelectedProject(p)} className="text-gray-500 hover:text-white p-1.5 rounded-lg hover:bg-gray-800 transition"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => handleDeleteProject(p._id)} className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-500/10 transition"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${p.status === 'completed' ? 'bg-emerald-500' : 'bg-gradient-to-r from-blue-600 to-cyan-500'}`} style={{ width: `${p.progress}%` }} />
                    </div>
                    <span className="text-xs font-medium text-gray-400 w-8 text-right">{p.progress}%</span>
                    <div className="flex items-center gap-1">
                      {[0, 25, 50, 75, 100].map((v) => (
                        <button
                          key={v}
                          onClick={() => handleProgressUpdate(p._id, v)}
                          className={`w-6 h-5 text-[10px] rounded font-medium transition ${
                            p.progress === v ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-500 hover:bg-gray-700'
                          }`}
                        >
                          {v}%
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  const renderProjectDetail = () => {
    const p = selectedProject
    if (!p) return null
    return (
      <div className="space-y-6">
        <button onClick={() => setSelectedProject(null)} className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-white transition">
          <ChevronLeft className="w-4 h-4" /> {t('admin.projects.detailBack')}
        </button>
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 space-y-5">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">{p.name}</h2>
              <p className="text-sm text-gray-400 mt-1">{p.clientId?.name} · {p.type === 'pack' ? `Pack ${p.pack}` : t('admin.projects.customType')}{p.deadline ? ` · ${t('admin.projects.detailDelivery')} : ${p.deadline}` : ''}</p>
            </div>
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusConfig[p.status]?.class}`}>
              {statusConfig[p.status]?.label}
            </span>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-400">{t('admin.projects.detailProgress')}</span>
              <span className="text-sm font-semibold text-white">{p.progress}%</span>
            </div>
            <div className="h-2.5 bg-gray-800 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${p.status === 'completed' ? 'bg-emerald-500' : 'bg-gradient-to-r from-blue-600 to-cyan-500'}`} style={{ width: `${p.progress}%` }} />
            </div>
          </div>
          {p.description && <p className="text-sm text-gray-400">{p.description}</p>}
          {p.notes && <p className="text-sm text-gray-500 italic">{t('admin.projects.detailNotes')} : {p.notes}</p>}
        </div>
      </div>
    )
  }

  const renderContacts = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">{t('admin.contacts.title')}</h1>
        <p className="text-sm text-gray-400 mt-1">{contacts.length} demande{contacts.length !== 1 ? 's' : ''}.</p>
      </div>
      {contacts.length === 0 ? (
        <div className="bg-gray-900 rounded-xl p-12 text-center border border-gray-800">
          <MessageSquare className="w-12 h-12 text-gray-700 mx-auto mb-4" />
          <p className="text-gray-400 text-sm">{t('admin.contacts.empty')}</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {contacts.map((c) => (
            <div key={c._id} className="bg-gray-900 rounded-xl p-5 border border-gray-800 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white">{c.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      c.status === 'new' ? 'bg-blue-500/10 text-blue-400' :
                      c.status === 'read' ? 'bg-gray-800 text-gray-400' : 'bg-emerald-500/10 text-emerald-400'
                    }`}>{c.status === 'new' ? t('admin.contacts.statusNew') : c.status === 'read' ? t('admin.contacts.statusRead') : t('admin.contacts.statusReplied')}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{c.email} · {new Date(c.createdAt).toLocaleDateString('fr-FR')}</p>
                </div>
                <div className="flex items-center gap-1">
                  {c.status === 'new' && <button onClick={() => handleContactStatus(c._id, 'read')} className="text-gray-500 hover:text-white p-1.5 rounded-lg hover:bg-gray-800 transition text-xs">{t('admin.contacts.markRead')}</button>}
                  {c.status !== 'replied' && <button onClick={() => handleContactStatus(c._id, 'replied')} className="text-emerald-400 hover:text-emerald-300 p-1.5 rounded-lg hover:bg-emerald-500/10 transition"><CheckCircle className="w-4 h-4" /></button>}
                  <button onClick={() => handleDeleteContact(c._id)} className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-500/10 transition"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-500">{t('admin.contacts.projectLabel')} :</span>
                <span className="text-gray-300 font-medium capitalize">{c.projectType?.replace('-', ' ')}</span>
              </div>
              <p className="text-sm text-gray-400 bg-gray-800/50 rounded-lg p-3">{c.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const renderPortfolio = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">{t('admin.nav.portfolio')}</h1>
          <p className="text-sm text-gray-400 mt-1">{portfolioProjects.length} projet{portfolioProjects.length !== 1 ? 's' : ''}.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/admin/portfolio" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-700 text-gray-300 text-sm font-medium hover:bg-gray-800 transition">
            <ExternalLink className="w-4 h-4" /> Gestion complète
          </Link>
          <button onClick={() => { setEditingPortfolio(null); setPortfolioForm({ title: '', description: '', category: 'Logo', tags: '', image: '', projectUrl: '', appUrl: '', files: [] }); setShowPortfolioModal(true) }} className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all active:scale-[0.98]">
            <Plus className="w-4 h-4" /> Ajouter
          </button>
        </div>
      </div>

      {showPortfolioModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowPortfolioModal(false)}>
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-lg border border-gray-800 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold text-white mb-4">{editingPortfolio ? 'Modifier le projet' : 'Nouveau projet'}</h2>
            <form onSubmit={handlePortfolioSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Titre</label>
                <input required value={portfolioForm.title} onChange={(e) => setPortfolioForm({...portfolioForm, title: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="Nom du projet" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <textarea required value={portfolioForm.description} onChange={(e) => setPortfolioForm({...portfolioForm, description: e.target.value})} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none" placeholder="Description du projet" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Catégorie</label>
                <select value={portfolioForm.category} onChange={(e) => setPortfolioForm({...portfolioForm, category: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                  {['Logo', 'Site Web', 'Application', 'Community Management', 'Branding', 'Design Graphique'].map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Tags (séparés par des virgules)</label>
                <input value={portfolioForm.tags} onChange={(e) => setPortfolioForm({...portfolioForm, tags: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="e-commerce, startup, islamique" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">URL du site web</label>
                  <input value={portfolioForm.projectUrl} onChange={(e) => setPortfolioForm({...portfolioForm, projectUrl: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">URL de l'application</label>
                  <input value={portfolioForm.appUrl} onChange={(e) => setPortfolioForm({...portfolioForm, appUrl: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder="https://... ou play store" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Image principale</label>
                <div className="flex items-center gap-3">
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm text-gray-400 file:mr-3 file:px-4 file:py-2 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-gray-800 file:text-white hover:file:bg-gray-700" />
                  {uploading && <span className="text-xs text-gray-500">Upload...</span>}
                </div>
                {portfolioForm.image && (
                  <div className="mt-2">
                    <img src={portfolioForm.image} alt="Aperçu" className="w-32 h-20 object-cover rounded-lg border border-gray-700" />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Fichiers (PDF, documents, etc.)</label>
                <div className="flex items-center gap-3">
                  <input type="file" onChange={handleFileUpload} className="text-sm text-gray-400 file:mr-3 file:px-4 file:py-2 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-gray-800 file:text-white hover:file:bg-gray-700" />
                  {uploadingFile && <span className="text-xs text-gray-500">Upload...</span>}
                </div>
                {portfolioForm.files && portfolioForm.files.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {portfolioForm.files.map((f, i) => (
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
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowPortfolioModal(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-700 text-gray-300 text-sm font-medium hover:bg-gray-800 transition">Annuler</button>
                <button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-2.5 rounded-xl text-sm font-medium hover:shadow-lg transition">{editingPortfolio ? 'Modifier' : 'Créer'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {portfolioProjects.length === 0 ? (
        <div className="bg-gray-900 rounded-xl p-12 text-center border border-gray-800">
          <Image className="w-12 h-12 text-gray-700 mx-auto mb-4" />
          <p className="text-gray-400 text-sm">Aucun projet dans le portfolio.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolioProjects.map((p) => (
            <div key={p._id} className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition group">
              <div className="relative h-40 bg-gray-800 overflow-hidden">
                {p.image ? (
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Image className="w-8 h-8 text-gray-600" />
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <span className="text-xs px-2 py-0.5 bg-blue-600/90 text-white rounded-full">{p.category}</span>
                </div>
              </div>
                <div className="p-4">
                <h3 className="text-sm font-semibold text-white mb-1">{p.title}</h3>
                <p className="text-xs text-gray-400 line-clamp-2 mb-3">{p.description}</p>
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
                  <div className="flex flex-wrap gap-1 mb-3">
                    {p.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 bg-gray-800 text-gray-400 rounded-full">{tag}</span>
                    ))}
                  </div>
                )}
                {p.files && p.files.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {p.files.map((f, i) => (
                      <a key={i} href={f.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 bg-gray-800 text-gray-400 rounded-full hover:text-white hover:bg-gray-700 transition">
                        <Paperclip className="w-2.5 h-2.5" /> {f.name.length > 15 ? f.name.slice(0, 15) + '...' : f.name}
                      </a>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between pt-2 border-t border-gray-800">
                  <span className="text-[10px] text-gray-500">{p.createdAt ? new Date(p.createdAt).toLocaleDateString('fr-FR') : ''}</span>
                  <div className="flex items-center gap-1">
                    <button onClick={() => handleEditPortfolio(p)} className="text-gray-500 hover:text-blue-400 p-1 rounded-lg hover:bg-gray-800 transition"><Edit className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDeletePortfolio(p._id)} className="text-gray-500 hover:text-red-400 p-1 rounded-lg hover:bg-gray-800 transition"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const renderNewsletter = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">{t('admin.newsletter.title')}</h1>
        <p className="text-sm text-gray-400 mt-1">{subscribers.length} abonné{subscribers.length !== 1 ? 's' : ''}.</p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 space-y-4">
        <h2 className="text-base font-semibold text-white">{t('admin.newsletter.campaignTitle')}</h2>
        {campaignResult && (
          <div className={`text-sm px-4 py-3 rounded-xl ${campaignResult.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
            {campaignResult.message}
          </div>
        )}
        <form onSubmit={handleSendCampaign} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">{t('admin.newsletter.subjectLabel')}</label>
            <input required value={campaign.subject} onChange={(e) => setCampaign({...campaign, subject: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" placeholder={t('admin.newsletter.subjectPlaceholder')} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">{t('admin.newsletter.contentLabel')}</label>
            <textarea required value={campaign.html} onChange={(e) => setCampaign({...campaign, html: e.target.value})} rows={8} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-y" placeholder={t('admin.newsletter.contentPlaceholder')} />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">{t('admin.newsletter.sentTo')} {subscribers.filter(s => s.subscribed).length} {t('admin.newsletter.subscriber')}{subscribers.filter(s => s.subscribed).length > 1 ? 's' : ''} {t('admin.newsletter.active')}.</p>
            <button type="submit" disabled={sending} className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all active:scale-[0.98] disabled:opacity-60">
              <Send className="w-4 h-4" />
              {sending ? t('admin.newsletter.sending') : t('admin.newsletter.send')}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left px-6 py-3 text-gray-400 font-medium">{t('admin.newsletter.tableEmail')}</th>
                <th className="text-left px-6 py-3 text-gray-400 font-medium">{t('admin.newsletter.tableStatus')}</th>
                <th className="text-left px-6 py-3 text-gray-400 font-medium">{t('admin.newsletter.tableDate')}</th>
                <th className="text-right px-6 py-3 text-gray-400 font-medium">{t('admin.newsletter.tableActions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {subscribers.map((s) => (
                <tr key={s._id} className="hover:bg-gray-800/50 transition">
                  <td className="px-6 py-4 text-white">{s.email}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.subscribed ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-800 text-gray-500'}`}>
                      {s.subscribed ? t('admin.newsletter.statusActive') : t('admin.newsletter.statusUnsubscribed')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{new Date(s.subscribedAt).toLocaleDateString('fr-FR')}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDeleteSubscriber(s._id)} className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-500/10 transition"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside className={`fixed lg:sticky top-0 left-0 z-50 h-full lg:h-screen w-64 bg-gray-900 border-r border-gray-800 transform transition-transform duration-300 lg:translate-x-0 flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Proxima Digital" className="w-8 h-8 rounded-lg object-cover shadow-lg" />
            <span className="text-sm font-semibold text-white">Admin</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <nav className="px-3 py-4 space-y-1 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSelectedProject(null); setSidebarOpen(false) }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  activeTab === item.id ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${activeTab === item.id ? 'text-white' : 'text-gray-500'}`} />
                {item.label}
              </button>
            )
          })}
        </nav>
        <div className="px-3 py-4 border-t border-gray-800 shrink-0">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition">
            <LogOut className="w-4 h-4" /> {t('admin.logout')}
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400 hover:text-white"><Menu className="w-5 h-5" /></button>
            <div className="flex items-center gap-3 ml-auto">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Shield className="w-4 h-4 text-blue-400" />
                {user?.name || 'Admin'}
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shadow-md">
                {(user?.name || 'A').charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>
        <main className="px-4 sm:px-6 lg:px-8 py-8">{renderContent()}</main>
      </div>
    </div>
  )
}