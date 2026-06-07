import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, User, LogOut } from 'lucide-react'
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
  const [mobileOpen, setMobileOpen] = useState(false)
  const [prevLocation, setPrevLocation] = useState(null)
  const location = useLocation()
  const { user, logout } = useAuth()
  const { t } = useTranslation()

  if (location !== prevLocation) {
    setPrevLocation(location)
    setMobileOpen(false)
  }

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
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img src="/logo.png" alt="Proxima Digital" className="w-9 h-9 rounded-xl object-cover shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/30 transition-shadow" />
          <span className={`text-base font-semibold tracking-tight transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
            {t('brand')}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                location.pathname === link.to
                  ? scrolled
                    ? 'bg-gray-100 text-gray-900'
                    : 'bg-white/10 text-white'
                  : scrolled
                    ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              >
              {t(link.label)}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSelector />
          {user ? (
            <div className="flex items-center gap-2">
              {user.isAdmin || user.role ? (
                <Link
                  to="/admin"
                  className={`hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    scrolled
                      ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:shadow-md'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <User className="w-4 h-4" />
                  {t('auth.admin')}
                </Link>
              ) : (
                <Link
                  to="/dashboard"
                  className={`hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    scrolled
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-md'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <User className="w-4 h-4" />
                  {user.name}
                </Link>
              )}
              <button
                onClick={logout}
                className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                scrolled
                  ? 'bg-gray-900 text-white hover:bg-gray-800'
                  : 'bg-white text-gray-900 hover:bg-gray-100'
              }`}
            >
              {t('auth.login')}
            </Link>
          )}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 rounded-lg transition ${scrolled ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-6 py-4 space-y-1">
              <div className="px-4 py-2">
                <LanguageSelector />
              </div>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                  location.pathname === link.to
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                  {t(link.label)}
              </Link>
            ))}
            <hr className="my-3 border-gray-100" />
            {user ? (
              <>
                {user.isAdmin || user.role ? (
                  <Link to="/admin" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-purple-600 hover:bg-purple-50 transition">
                    <User className="w-4 h-4" />
                    {t('auth.admin')}
                  </Link>
                ) : (
                  <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-blue-600 hover:bg-blue-50 transition">
                    <User className="w-4 h-4" />
                    {t('auth.dashboard')}
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition"
                >
                  {t('auth.logout')}
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block text-center px-4 py-2.5 rounded-xl text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 transition"
              >
                {t('auth.login')}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
