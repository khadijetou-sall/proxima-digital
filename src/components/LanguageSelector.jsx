import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const languages = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
]

export default function LanguageSelector({ light } = {}) {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)

  const current = languages.find((l) => l.code === i18n.language) || languages[0]

  const change = (code) => {
    i18n.changeLanguage(code)
    setOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`px-2 sm:px-3 py-2 rounded-full text-sm transition flex items-center gap-1 sm:gap-2 ${light ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-white/10 text-white hover:bg-white/20'}`}
        aria-label="Select language"
      >
        <span className="text-base sm:text-lg leading-none">{current.flag}</span>
        <span className="hidden sm:inline">{current.label}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => change(l.code)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition ${i18n.language === l.code ? 'bg-gray-50' : ''}`}
            >
              <span className="mr-2">{l.flag}</span>
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
