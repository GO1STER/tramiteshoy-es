'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { CATEGORIES } from '@/lib/categories'

export function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Barra principal */}
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-xl font-extrabold text-brand-700 tracking-tight hover:text-brand-900 transition-colors"
            aria-label="Trámites España — inicio"
          >
            Trámites<span className="text-gray-900">España</span>
          </Link>

          {/* Móvil: botón hamburguesa */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="sm:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Navegación de categorías — desktop */}
        <nav aria-label="Categorías" className="hidden sm:flex items-center gap-1 pb-2 overflow-x-auto">
          {CATEGORIES.map((cat) => {
            const href = `/categoria/${cat.slug}`
            const active = pathname.startsWith(href)
            return (
              <Link
                key={cat.slug}
                href={href}
                className={`whitespace-nowrap text-sm font-medium px-3 py-1.5 rounded-full transition-colors ${
                  active
                    ? 'bg-brand-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span aria-hidden="true">{cat.icon}</span> {cat.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Menú móvil desplegable */}
      {menuOpen && (
        <nav
          aria-label="Menú móvil"
          className="sm:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1"
        >
          {CATEGORIES.map((cat) => {
            const href = `/categoria/${cat.slug}`
            const active = pathname.startsWith(href)
            return (
              <Link
                key={cat.slug}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active ? 'bg-brand-50 text-brand-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{cat.icon}</span> {cat.name}
              </Link>
            )
          })}
        </nav>
      )}
    </header>
  )
}
