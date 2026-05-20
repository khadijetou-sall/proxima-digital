import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Shield, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react'

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const { adminLogin } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await adminLogin(form.email, form.password)
      navigate('/admin')
    } catch (err) {
      setError(err.response?.data?.message || 'Identifiants administrateur incorrects')
    }
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8">
          <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Retour au site</span>
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
              PD
            </div>
            <span className="text-sm font-semibold text-white">Proxima Digital</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-md px-6 py-16 sm:py-24">
        <div className="text-center mb-10">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-semibold text-white tracking-tight">Administration</h1>
          <p className="mt-2 text-gray-400">Espace réservé aux administrateurs</p>
        </div>

        <div className="bg-gray-900 rounded-2xl shadow-sm border border-gray-800 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email administrateur</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800/50 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition"
                  placeholder="admin@proxima.digital"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-700 bg-gray-800/50 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition"
                  placeholder="Votre mot de passe"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-500/10 px-4 py-2.5 rounded-xl">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2.5 rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-purple-500/25 transition-all active:scale-[0.98]"
            >
              Accéder à l'administration
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}