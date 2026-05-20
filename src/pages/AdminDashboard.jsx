import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { adminAPI, projectAPI, contactAPI, newsletterAPI, deliverableAPI } from '../api/axios'
import {
  LayoutDashboard, Users, FolderOpen, MessageSquare, Mail, LogOut, Menu, X,
  TrendingUp, CheckCircle, Clock, AlertCircle, Package, Trash2, Plus,
  ChevronRight, ChevronLeft, Calendar, FileText, Image, ExternalLink,
  Shield, Search, Send, Download, Eye,
} from 'lucide-react'

const statusConfig = {
  pending: { label: 'En attente', icon: Clock, class: 'bg-amber-50 text-amber-600' },
  'in-progress': { label: 'En cours', icon: AlertCircle, class: 'bg-blue-50 text-blue-600' },
  completed: { label: 'Terminé', icon: CheckCircle, class: 'bg-emerald-50 text-emerald-600' },
}

const navItems = [
  { id: 'overview', label: 'Vue d\'ensemble', icon: LayoutDashboard },
  { id: 'clients', label: 'Clients', icon: Users },
  { id: 'projects', label: 'Projets', icon: FolderOpen },
  { id: 'contacts', label: 'Demandes', icon: MessageSquare },
  { id: 'newsletter', label: 'Newsletter', icon: Mail },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

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

  useEffect(() => {
    if (!user?.isAdmin && !user?.role) {
      navigate('/dashboard')
      return
    }
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const [statsRes, clientsRes, projectsRes, contactsRes, subsRes] = await Promise.all([
        adminAPI.getStats(),
        adminAPI.getClients(),
        projectAPI.getAll(),
        contactAPI.getAll(),
        newsletterAPI.getAll(),
      ])
      setStats(statsRes.data.stats)
      setClients(clientsRes.data.clients)
      setProjects(projectsRes.data.projects)
      setContacts(contactsRes.data.contacts)
      setSubscribers(subsRes.data.subscribers)
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
    if (!confirm('Supprimer ce client et tous ses projets ?')) return
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
    if (!confirm('Supprimer ce projet ?')) return
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
      alert(err.response?.data?.message || 'Erreur')
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview()
      case 'clients': return renderClients()
      case 'projects': return renderProjects()
      case 'contacts': return renderContacts()
      case 'newsletter': return renderNewsletter()
      default: return renderOverview()
    }
  }

  const renderOverview = () => {
    if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" /></div>
    if (!stats) return <p className="text-gray-500 text-center py-20">Aucune donnée disponible.</p>

    const statCards = [
      { label: 'Clients', value: stats.totalClients, icon: Users, color: 'from-blue-600 to-cyan-500' },
      { label: 'Projets', value: stats.totalProjects, icon: FolderOpen, color: 'from-purple-600 to-pink-500' },
      { label: 'En cours', value: stats.inProgressProjects, icon: TrendingUp, color: 'from-amber-500 to-orange-500' },
      { label: 'Terminés', value: stats.completedProjects, icon: CheckCircle, color: 'from-emerald-500 to-teal-500' },
      { label: 'Nouvelles demandes', value: stats.newContacts, icon: MessageSquare, color: 'from-blue-500 to-indigo-500' },
      { label: 'Abonnés newsletter', value: stats.totalSubscribers, icon: Mail, color: 'from-cyan-500 to-teal-500' },
    ]

    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-white">Tableau de bord</h1>
          <p className="text-sm text-gray-400 mt-1">Vue d'ensemble de votre agence.</p>
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
          <h1 className="text-2xl font-semibold text-white">Clients</h1>
          <p className="text-sm text-gray-400 mt-1">{clients.length} client{clients.length !== 1 ? 's' : ''} inscrit{clients.length !== 1 ? 's' : ''}.</p>
        </div>
      </div>
      {clients.length === 0 ? (
        <div className="bg-gray-900 rounded-xl p-12 text-center border border-gray-800">
          <Users className="w-12 h-12 text-gray-700 mx-auto mb-4" />
          <p className="text-gray-400 text-sm">Aucun client pour le moment.</p>
        </div>
      ) : (
        <div className="bg-gray-900 rounded-xl shadow-sm border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left px-6 py-3 text-gray-400 font-medium">Nom</th>
                  <th className="text-left px-6 py-3 text-gray-400 font-medium">Email</th>
                  <th className="text-center px-6 py-3 text-gray-400 font-medium">Projets</th>
                  <th className="text-left px-6 py-3 text-gray-400 font-medium">Inscrit le</th>
                  <th className="text-right px-6 py-3 text-gray-400 font-medium">Actions</th>
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
            <h1 className="text-2xl font-semibold text-white">Projets</h1>
            <p className="text-sm text-gray-400 mt-1">{projects.length} projet{projects.length !== 1 ? 's' : ''}.</p>
          </div>
          <button onClick={() => setShowNewProject(true)} className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all active:scale-[0.98]">
            <Plus className="w-4 h-4" /> Nouveau projet
          </button>
        </div>

        {showNewProject && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowNewProject(false)}>
            <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-lg border border-gray-800 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-lg font-semibold text-white mb-4">Nouveau projet</h2>
              <form onSubmit={handleCreateProject} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Client</label>
                  <select required value={newProject.clientId} onChange={(e) => setNewProject({...newProject, clientId: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500">
                    <option value="">Sélectionner un client</option>
                    {clients.map((c) => <option key={c._id} value={c._id}>{c.name} ({c.email})</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Nom du projet</label>
                  <input required value={newProject.name} onChange={(e) => setNewProject({...newProject, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500" placeholder="Nom du projet" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Type</label>
                  <select value={newProject.type} onChange={(e) => setNewProject({...newProject, type: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500">
                    <option value="custom">Sur mesure</option>
                    <option value="pack">Pack</option>
                  </select>
                </div>
                {newProject.type === 'pack' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Pack</label>
                    <select value={newProject.pack} onChange={(e) => setNewProject({...newProject, pack: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500">
                      <option value="Starter">Starter</option>
                      <option value="Business">Business</option>
                      <option value="Premium">Premium</option>
                    </select>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                  <textarea value={newProject.description} onChange={(e) => setNewProject({...newProject, description: e.target.value})} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Progression (%)</label>
                    <input type="number" min="0" max="100" value={newProject.progress} onChange={(e) => setNewProject({...newProject, progress: Number(e.target.value)})} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Date livraison</label>
                    <input type="text" value={newProject.deadline} onChange={(e) => setNewProject({...newProject, deadline: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500" placeholder="15/06/2026" />
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowNewProject(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-700 text-gray-300 text-sm font-medium hover:bg-gray-800 transition">Annuler</button>
                  <button type="submit" className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2.5 rounded-xl text-sm font-medium hover:shadow-lg transition">Créer</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {projects.length === 0 ? (
          <div className="bg-gray-900 rounded-xl p-12 text-center border border-gray-800">
            <Package className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-400 text-sm">Aucun projet.</p>
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
                        <span className="text-xs text-gray-500">— {p.clientId?.name || 'Client inconnu'}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{p.type === 'pack' ? `Pack ${p.pack}` : 'Sur mesure'}{p.deadline ? ` · ${p.deadline}` : ''}</p>
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
                      <div className={`h-full rounded-full transition-all ${p.status === 'completed' ? 'bg-emerald-500' : 'bg-gradient-to-r from-purple-600 to-pink-500'}`} style={{ width: `${p.progress}%` }} />
                    </div>
                    <span className="text-xs font-medium text-gray-400 w-8 text-right">{p.progress}%</span>
                    <div className="flex items-center gap-1">
                      {[0, 25, 50, 75, 100].map((v) => (
                        <button
                          key={v}
                          onClick={() => handleProgressUpdate(p._id, v)}
                          className={`w-6 h-5 text-[10px] rounded font-medium transition ${
                            p.progress === v ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-500 hover:bg-gray-700'
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
          <ChevronLeft className="w-4 h-4" /> Retour
        </button>
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 space-y-5">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">{p.name}</h2>
              <p className="text-sm text-gray-400 mt-1">{p.clientId?.name} · {p.type === 'pack' ? `Pack ${p.pack}` : 'Sur mesure'}{p.deadline ? ` · Livraison : ${p.deadline}` : ''}</p>
            </div>
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusConfig[p.status]?.class}`}>
              {statusConfig[p.status]?.label}
            </span>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-400">Progression</span>
              <span className="text-sm font-semibold text-white">{p.progress}%</span>
            </div>
            <div className="h-2.5 bg-gray-800 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${p.status === 'completed' ? 'bg-emerald-500' : 'bg-gradient-to-r from-purple-600 to-pink-500'}`} style={{ width: `${p.progress}%` }} />
            </div>
          </div>
          {p.description && <p className="text-sm text-gray-400">{p.description}</p>}
          {p.notes && <p className="text-sm text-gray-500 italic">Notes : {p.notes}</p>}
        </div>
      </div>
    )
  }

  const renderContacts = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Demandes de contact</h1>
        <p className="text-sm text-gray-400 mt-1">{contacts.length} demande{contacts.length !== 1 ? 's' : ''}.</p>
      </div>
      {contacts.length === 0 ? (
        <div className="bg-gray-900 rounded-xl p-12 text-center border border-gray-800">
          <MessageSquare className="w-12 h-12 text-gray-700 mx-auto mb-4" />
          <p className="text-gray-400 text-sm">Aucune demande.</p>
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
                    }`}>{c.status === 'new' ? 'Nouveau' : c.status === 'read' ? 'Lu' : 'Répondu'}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{c.email} · {new Date(c.createdAt).toLocaleDateString('fr-FR')}</p>
                </div>
                <div className="flex items-center gap-1">
                  {c.status === 'new' && <button onClick={() => handleContactStatus(c._id, 'read')} className="text-gray-500 hover:text-white p-1.5 rounded-lg hover:bg-gray-800 transition text-xs">Marquer lu</button>}
                  {c.status !== 'replied' && <button onClick={() => handleContactStatus(c._id, 'replied')} className="text-emerald-400 hover:text-emerald-300 p-1.5 rounded-lg hover:bg-emerald-500/10 transition"><CheckCircle className="w-4 h-4" /></button>}
                  <button onClick={() => handleDeleteContact(c._id)} className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-500/10 transition"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-500">Projet :</span>
                <span className="text-gray-300 font-medium capitalize">{c.projectType?.replace('-', ' ')}</span>
              </div>
              <p className="text-sm text-gray-400 bg-gray-800/50 rounded-lg p-3">{c.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const renderNewsletter = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Newsletter</h1>
        <p className="text-sm text-gray-400 mt-1">{subscribers.length} abonné{subscribers.length !== 1 ? 's' : ''}.</p>
      </div>
      {subscribers.length === 0 ? (
        <div className="bg-gray-900 rounded-xl p-12 text-center border border-gray-800">
          <Mail className="w-12 h-12 text-gray-700 mx-auto mb-4" />
          <p className="text-gray-400 text-sm">Aucun abonné.</p>
        </div>
      ) : (
        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left px-6 py-3 text-gray-400 font-medium">Email</th>
                  <th className="text-left px-6 py-3 text-gray-400 font-medium">Statut</th>
                  <th className="text-left px-6 py-3 text-gray-400 font-medium">Inscrit le</th>
                  <th className="text-right px-6 py-3 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {subscribers.map((s) => (
                  <tr key={s._id} className="hover:bg-gray-800/50 transition">
                    <td className="px-6 py-4 text-white">{s.email}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.subscribed ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-800 text-gray-500'}`}>
                        {s.subscribed ? 'Actif' : 'Désabonné'}
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
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside className={`fixed lg:sticky top-0 left-0 z-50 h-full w-64 bg-gray-900 border-r border-gray-800 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white text-xs font-bold">PD</div>
            <span className="text-sm font-semibold text-white">Admin</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <nav className="px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSelectedProject(null); setSidebarOpen(false) }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  activeTab === item.id ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${activeTab === item.id ? 'text-white' : 'text-gray-500'}`} />
                {item.label}
              </button>
            )
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 px-3 py-4 border-t border-gray-800">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition">
            <LogOut className="w-4 h-4" /> Déconnexion
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400 hover:text-white"><Menu className="w-5 h-5" /></button>
            <div className="flex items-center gap-3 ml-auto">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Shield className="w-4 h-4 text-purple-400" />
                {user?.name || 'Admin'}
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white text-xs font-bold shadow-md">
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