import { useState } from 'react'
import { Send, CheckCircle, Mail } from 'lucide-react'
import { newsletterAPI } from '../api/axios'

export default function NewsletterSignup({ dark = false }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')
    try {
      const res = await newsletterAPI.subscribe(email)
      setStatus('success')
      setMessage(res.data.message)
      setEmail('')
    } catch (err) {
      setStatus('error')
      setMessage(err.response?.data?.message || 'Une erreur est survenue.')
    }
  }

  if (status === 'success') {
    return (
      <div className={`flex items-center gap-3 p-4 rounded-xl ${dark ? 'bg-gray-800' : 'bg-emerald-50'}`}>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${dark ? 'bg-emerald-500/20' : 'bg-emerald-100'}`}>
          <CheckCircle className={`w-5 h-5 ${dark ? 'text-emerald-400' : 'text-emerald-600'}`} />
        </div>
        <div>
          <p className={`text-sm font-medium ${dark ? 'text-white' : 'text-gray-900'}`}>Merci de votre inscription !</p>
          <p className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-500'}`}>{message}</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${dark ? 'text-gray-500' : 'text-gray-400'}`} />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse email"
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 transition ${
              dark
                ? 'bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 focus:ring-purple-500/20 focus:border-purple-500'
                : 'bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:ring-blue-500/20 focus:border-blue-500'
            }`}
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-[0.98] disabled:opacity-60 ${
            dark
              ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/25'
              : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/25'
          }`}
        >
          <Send className="w-3.5 h-3.5" />
          {status === 'loading' ? '...' : 'S\'abonner'}
        </button>
      </div>
      {status === 'error' && (
        <p className="text-xs text-red-400">{message}</p>
      )}
    </form>
  )
}