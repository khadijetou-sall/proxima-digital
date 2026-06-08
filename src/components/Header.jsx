import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { User, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTranslation } from 'react-i18next'
import LanguageSelector from './LanguageSelector'

const navLinks = [
  { to: '/', label: 'nav.home' },
  { to: '/services', label: 'nav.services' },
  { to: '/portfolio', label: 'nav.portfolio' },
  { to: '/about', label: 'nav.about' },
  { to: '/contact', label: 'nav.contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { user, logout } = useAuth()
  const { t } = useTranslation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white shadow-sm border-b border-gray-200'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between py-3">
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <img src="/logo.png" alt="Proxima Digital" className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-cover shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/30 transition-shadow" />
            <span className={`text-sm sm:text-base font-semibold tracking-tight transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
              {t('brand')}
            </span>
          </Link>

          <nav className="hidden sm:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? scrolled
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-white/15 text-white'
                      : scrolled
                        ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {t(link.label)}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-0.5 sm:gap-2 shrink-0">
            <LanguageSelector />

            {user ? (
              <div className="flex items-center gap-0.5">
                {user.isAdmin || user.role ? (
                  <Link
                    to="/admin"
                    className={`inline-flex items-center gap-1 px-2 sm:px-3 py-2 sm:py-2 rounded-full text-xs sm:text-xs lg:text-sm font-medium transition-all ${
                      scrolled
                        ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-md'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{t('auth.admin')}</span>
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    className={`inline-flex items-center gap-1 px-2 sm:px-3 py-2 sm:py-2 rounded-full text-xs sm:text-xs lg:text-sm font-medium transition-all ${
                      scrolled
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-md'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline max-w-[80px] truncate">{user.name}</span>
                  </Link>
                )}
                <button
                  onClick={logout}
                  className={`p-1.5 rounded-full transition ${scrolled ? 'text-gray-400 hover:text-gray-600 hover:bg-gray-100' : 'text-white/70 hover:text-white hover:bg-white/10'}`}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className={`px-3 sm:px-4 py-2 sm:py-2 rounded-full text-xs sm:text-xs lg:text-sm font-medium transition-all whitespace-nowrap ${
                  scrolled
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'bg-white text-gray-900 hover:bg-gray-100'
                }`}
              >
                {t('auth.login')}
              </Link>
            )}
          </div>
        </div>

        <div className="overflow-x-auto sm:hidden -mx-3 px-3 pb-4 hide-scrollbar">
          <nav className="flex items-center gap-1 w-max mx-auto">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? scrolled
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-white/15 text-white'
                      : scrolled
                        ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {t(link.label)}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}
