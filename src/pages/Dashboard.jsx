import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { projectAPI, deliverableAPI } from '../api/axios'
import {
  LayoutDashboard, FolderOpen, Download, LogOut, Menu, X,
  Clock, CheckCircle, AlertCircle, ArrowRight, FileText, Image, ExternalLink, ChevronRight,
  User, Package, TrendingUp, Calendar, ChevronLeft, FileDown, Eye, Layers,
} from 'lucide-react'

const navItems = [
  { id: 'dashboard', label: 'dashboard.nav.dashboard', icon: LayoutDashboard },
  { id: 'projects', label: 'dashboard.nav.projects', icon: FolderOpen },
  { id: 'deliverables', label: 'dashboard.nav.deliverables', icon: Download },
]

const statusConfig = {
  pending: { label: 'dashboard.statusPending', icon: Clock, class: 'bg-amber-50 text-amber-600' },
  'in-progress': { label: 'dashboard.statusInProgress', icon: AlertCircle, class: 'bg-blue-50 text-blue-600' },
  completed: { label: 'dashboard.statusCompleted', icon: CheckCircle, class: 'bg-emerald-50 text-emerald-600' },
}

const defaultSteps = [
  { label: 'dashboard.stepBrief', key: 'brief' },
  { label: 'dashboard.stepDesign', key: 'design' },
  { label: 'dashboard.stepDev', key: 'dev' },
  { label: 'dashboard.stepFinal', key: 'final' },
]

function getStepProgress(progress) {
  if (progress >= 100) return { done: 4, current: -1 }
  if (progress >= 75) return { done: 3, current: 3 }
  if (progress >= 50) return { done: 2, current: 2 }
  if (progress >= 25) return { done: 1, current: 1 }
  return { done: 0, current: 0 }
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState(null)
  const { user, logout } = useAuth()
  const { t } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    projectAPI.getMyProjects()
      .then((res) => setProjects(res.data.projects))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false))
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleDownload = async (deliverableId, name) => {
    try {
      const res = await deliverableAPI.download(deliverableId)
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const a = document.createElement('a')
      a.href = url
      const ext = res.headers['content-type']?.split('/')[1] || '';
      a.download = name + '.' + ext
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      if (err.response?.status === 404) {
        alert(t('dashboard.deliverableNotFound'))
      }
    }
  }

  const activeCount = projects.filter((p) => p.status !== 'completed').length
  const completedCount = projects.filter((p) => p.status === 'completed').length
  const pendingCount = projects.filter((p) => p.status === 'pending').length
  const allDeliverables = projects.flatMap((p) =>
    (p.deliverables || []).map((d) => ({ ...d, projectName: p.name, projectId: p.id }))
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard()
      case 'projects': return renderProjects()
      case 'deliverables': return renderDeliverables()
      default: return renderDashboard()
    }
  }

  const renderDashboard = () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">{t('dashboard.greeting', { name: user?.name || 'Client' })}</h1>
        <p className="text-sm text-gray-500 mt-1">{t('dashboard.greetingSub')}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <FolderOpen className="w-5 h-5 text-blue-600 mb-3" />
          <p className="text-2xl font-semibold text-gray-900">{projects.length}</p>
          <p className="text-xs text-gray-500 mt-0.5">{t('dashboard.stats.totalProjects')}</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <TrendingUp className="w-5 h-5 text-cyan-600 mb-3" />
          <p className="text-2xl font-semibold text-gray-900">{activeCount}</p>
          <p className="text-xs text-gray-500 mt-0.5">{t('dashboard.stats.inProgress')}</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <CheckCircle className="w-5 h-5 text-emerald-600 mb-3" />
          <p className="text-2xl font-semibold text-gray-900">{completedCount}</p>
          <p className="text-xs text-gray-500 mt-0.5">{t('dashboard.stats.completed')}</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <Clock className="w-5 h-5 text-amber-600 mb-3" />
          <p className="text-2xl font-semibold text-gray-900">{pendingCount}</p>
          <p className="text-xs text-gray-500 mt-0.5">{t('dashboard.stats.pending')}</p>
        </div>
      </div>

      {projects.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">{t('dashboard.recentProjects')}</h2>
            <button onClick={() => setActiveTab('projects')} className="text-xs text-blue-600 hover:text-blue-700 font-medium">{t('dashboard.viewAll')}</button>
          </div>
          <div className="divide-y divide-gray-50">
            {projects.slice(0, 3).map((p) => {
              const StatusIcon = statusConfig[p.status]?.icon || Clock
              return (
                <div key={p.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50/50 transition cursor-pointer" onClick={() => { setSelectedProject(p); setActiveTab('projects') }}>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{p.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {p.type === 'pack' ? `Pack ${p.pack}` : p.customDescription || t('dashboard.customProject')}
                    </p>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[p.status]?.class}`}>
                    <StatusIcon className="w-3 h-3" />
                    {t(statusConfig[p.status]?.label)}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {activeCount > 0 && (
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">{t('dashboard.inProgressBanner', { count: activeCount })}</p>
              <p className="text-xs text-blue-100 mt-0.5">{t('dashboard.inProgressSub')}</p>
            </div>
            <button onClick={() => setActiveTab('projects')} className="text-xs text-white bg-white/20 px-3 py-1.5 rounded-lg hover:bg-white/30 transition">{t('dashboard.inProgressView')}</button>
          </div>
        </div>
      )}

      {!loading && projects.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Package className="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-500 text-sm">{t('dashboard.emptyTitle')}</p>
          <p className="text-gray-400 text-xs mt-1">{t('dashboard.emptySub')}</p>
        </div>
      )}
    </div>
  )

  const renderProjects = () => {
    if (selectedProject) return renderProjectDetail()
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{t('dashboard.projectsTitle')}</h1>
          <p className="text-sm text-gray-500 mt-1">{t('dashboard.projectsSub')}</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <Package className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500 text-sm">{t('dashboard.projectsEmpty')}</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {projects.map((p) => {
              const StatusIcon = statusConfig[p.status]?.icon || Clock
              const steps = defaultSteps
              const stepProgress = getStepProgress(p.progress)
              return (
                <div key={p.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900">{p.name}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {p.type === 'pack'
                          ? t('dashboard.pack') + ' ' + p.pack
                          : t('dashboard.customProject')
                        }
                        {p.deadline ? ' · ' + t('dashboard.deadline') + ' : ' + p.deadline : ''}
                      </p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap shrink-0 ${statusConfig[p.status]?.class}`}>
                      <StatusIcon className="w-3 h-3" />
                      {t(statusConfig[p.status]?.label)}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-700">{t('dashboard.progress')}</span>
                      <span className="text-xs font-semibold text-gray-500">{p.progress}%</span>
                    </div>
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${
                          p.status === 'completed' ? 'bg-emerald-500' : 'bg-gradient-to-r from-blue-600 to-cyan-500'
                        }`}
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {steps.map((step, i) => {
                      const isDone = i < stepProgress.done
                      const isCurrent = i === stepProgress.current
                      return (
                        <div
                          key={step.key}
                          className={`text-center p-3 rounded-lg border transition ${
                            isDone
                              ? 'bg-emerald-50 border-emerald-200'
                              : isCurrent
                              ? 'bg-blue-50 border-blue-200'
                              : 'bg-gray-50 border-gray-100'
                          }`}
                        >
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto mb-1.5 transition ${
                            isDone ? 'bg-emerald-500' : isCurrent ? 'bg-blue-500' : 'bg-gray-300'
                          }`}>
                            {isDone ? (
                              <CheckCircle className="w-4 h-4 text-white" />
                            ) : isCurrent ? (
                              <Clock className="w-3.5 h-3.5 text-white" />
                            ) : (
                              <div className="w-1.5 h-1.5 rounded-full bg-white" />
                            )}
                          </div>
                          <p className={`text-[11px] leading-tight ${
                            isDone ? 'text-emerald-700 font-medium' : isCurrent ? 'text-blue-700 font-medium' : 'text-gray-400'
                          }`}>{t(step.label)}</p>
                        </div>
                      )
                    })}
                  </div>

                  {p.description && (
                    <p className="text-sm text-gray-500 border-t border-gray-50 pt-3">{p.description}</p>
                  )}

                  <div className="flex items-center justify-between pt-1">
                    {p.deadline && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Calendar className="w-3.5 h-3.5" />
                        {t('dashboard.deadline') + ' : ' + p.deadline}
                      </div>
                    )}
                    <button
                      onClick={() => setSelectedProject(p)}
                      className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition"
                    >
                      {t('dashboard.viewDetails')}
                      <ChevronRight className="w-4 h-4" />
                    </button>
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
    const StatusIcon = statusConfig[p.status]?.icon || Clock
    const steps = defaultSteps
    const stepProgress = getStepProgress(p.progress)

    return (
      <div className="space-y-8">
        <button
          onClick={() => setSelectedProject(null)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          {t('dashboard.detailBack')}
        </button>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{p.name}</h1>
              <p className="text-sm text-gray-400 mt-1">
                {p.type === 'pack' ? t('dashboard.pack') + ' ' + p.pack : t('dashboard.customProject')}
                {p.deadline ? ' · ' + t('dashboard.deadline') + ' : ' + p.deadline : ''}
              </p>
            </div>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusConfig[p.status]?.class}`}>
              <StatusIcon className="w-3 h-3" />
              {t(statusConfig[p.status]?.label)}
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{t('dashboard.progress')}</span>
              <span className="text-sm font-bold text-gray-600">{p.progress}%</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${
                  p.status === 'completed' ? 'bg-emerald-500' : 'bg-gradient-to-r from-blue-600 to-cyan-500'
                }`}
                style={{ width: `${p.progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1.5">
              {[0, 25, 50, 75, 100].map((v) => (
                <span key={v}>{v}%</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {steps.map((step, i) => {
              const isDone = i < stepProgress.done
              const isCurrent = i === stepProgress.current
              return (
                <div key={step.key} className={`text-center p-4 rounded-xl border transition ${
                  isDone ? 'bg-emerald-50 border-emerald-200' : isCurrent ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-100'
                }`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 transition ${
                    isDone ? 'bg-emerald-500' : isCurrent ? 'bg-blue-500' : 'bg-gray-300'
                  }`}>
                    {isDone ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : isCurrent ? (
                      <Clock className="w-4 h-4 text-white" />
                    ) : (
                      <Layers className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <p className={`text-sm font-medium ${
                    isDone ? 'text-emerald-700' : isCurrent ? 'text-blue-700' : 'text-gray-400'
                  }`}>{t(step.label)}</p>
                  <p className={`text-xs mt-0.5 ${
                    isDone ? 'text-emerald-500' : isCurrent ? 'text-blue-400' : 'text-gray-300'
                  }`}>
                    {isDone ? t('dashboard.stepDone') : isCurrent ? t('dashboard.statusInProgress') : t('dashboard.stepUpcoming')}
                  </p>
                </div>
              )
            })}
          </div>

          {p.description && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">{t('dashboard.detailDescription')}</h3>
              <p className="text-sm text-gray-500">{p.description}</p>
            </div>
          )}
        </div>

        {p.deliverables && p.deliverables.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-900">{t('dashboard.detailDeliverables')}</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {p.deliverables.map((d, i) => (
                <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50/50 transition">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      d.type === 'image' ? 'bg-blue-50' : d.type === 'link' ? 'bg-cyan-50' : 'bg-gray-50'
                    }`}>
                      {d.type === 'image' ? <Image className="w-4 h-4 text-blue-600" /> :
                       d.type === 'link' ? <ExternalLink className="w-4 h-4 text-cyan-600" /> :
                       <FileText className="w-4 h-4 text-gray-600" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{d.name}</p>
                      <p className="text-xs text-gray-400">{d.date}{d.size ? ` · ${d.size}` : ''}</p>
                    </div>
                  </div>
                  <button onClick={() => handleDownload(d._id, d.name)} className="text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition flex items-center gap-1.5">
                      <FileDown className="w-3.5 h-3.5" />
                      {t('dashboard.download')}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )
    }

  const renderDeliverables = () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">{t('dashboard.deliverablesTitle')}</h1>
        <p className="text-sm text-gray-500 mt-1">{t('dashboard.deliverablesSub')}</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : allDeliverables.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Download className="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-500 text-sm">{t('dashboard.deliverablesEmpty')}</p>
          <p className="text-gray-400 text-xs mt-1">{t('dashboard.deliverablesEmptySub')}</p>
        </div>
      ) : (
        <div className="space-y-6">
          {projects.filter((p) => (p.deliverables || []).length > 0).map((p) => (
            <div key={p.id} className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-900">{p.name}</h2>
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[p.status]?.class}`}>
                  {t(statusConfig[p.status]?.label)}
                </span>
              </div>
              <div className="divide-y divide-gray-50">
                {p.deliverables.map((d, i) => (
                  <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50/50 transition">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        d.type === 'image' ? 'bg-blue-50' : d.type === 'link' ? 'bg-cyan-50' : 'bg-gray-50'
                      }`}>
                        {d.type === 'image' ? <Image className="w-4 h-4 text-blue-600" /> :
                         d.type === 'link' ? <ExternalLink className="w-4 h-4 text-cyan-600" /> :
                         <FileText className="w-4 h-4 text-gray-600" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{d.name}</p>
                        <p className="text-xs text-gray-400">{d.date}{d.size ? ` · ${d.size}` : ''}</p>
                      </div>
                    </div>
                    <button onClick={() => handleDownload(d._id, d.name)} className="text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition flex items-center gap-1.5">
                      <FileDown className="w-3.5 h-3.5" />
                      {t('dashboard.download')}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed lg:sticky top-0 left-0 z-50 h-full lg:h-screen w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Proxima Digital" className="w-8 h-8 rounded-lg object-cover" />
            <span className="text-sm font-semibold text-gray-900">Proxima Digital</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSelectedProject(null); setSidebarOpen(false) }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  activeTab === item.id && !selectedProject
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${activeTab === item.id && !selectedProject ? 'text-white' : 'text-gray-400'}`} />
                {t(item.label)}
              </button>
            )
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 px-3 py-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition"
          >
            <LogOut className="w-4 h-4" />
            {t('dashboard.logout')}
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-600 hover:text-gray-900">
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 ml-auto">
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                <User className="w-4 h-4 text-gray-400" />
                {user?.name || 'Client'}
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shadow-md">
                {(user?.name || 'C').charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
