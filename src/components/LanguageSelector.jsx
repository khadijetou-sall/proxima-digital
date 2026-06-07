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
        className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition flex items-center gap-1 sm:gap-2 ${
          light
            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
            : 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
        }`}
        aria-label="Select language"
      >
        <span className="text-sm sm:text-lg leading-none">{current.flag}</span>
        <span className="hidden sm:inline">{current.label}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => change(l.code)}
              className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition flex items-center gap-2 ${i18n.language === l.code ? 'bg-gray-50 font-medium' : ''}`}
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
