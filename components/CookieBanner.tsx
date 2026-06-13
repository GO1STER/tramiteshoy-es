'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCookieConsent } from './CookieProvider'

export function CookieBanner() {
  const { acceptAll, rejectAll, savePartial } = useCookieConsent()
  const [showConfig, setShowConfig] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [advertising, setAdvertising] = useState(false)

  if (showConfig) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Configuración de cookies"
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      >
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-5">
          <h2 className="text-xl font-bold text-gray-900">Configurar cookies</h2>

          <div className="space-y-4">
            {/* Necesarias — siempre activas */}
            <label className="flex items-start gap-3">
              <input type="checkbox" checked disabled className="mt-1 h-4 w-4 accent-brand-600 cursor-not-allowed" />
              <span>
                <span className="font-semibold text-gray-900">Cookies necesarias</span>
                <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">Siempre activas</span>
                <p className="text-sm text-gray-600 mt-0.5">
                  Imprescindibles para el funcionamiento básico del sitio (sesión, preferencias de cookies).
                </p>
              </span>
            </label>

            {/* Analíticas */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="mt-1 h-4 w-4 accent-brand-600"
              />
              <span>
                <span className="font-semibold text-gray-900">Cookies analíticas</span>
                <p className="text-sm text-gray-600 mt-0.5">
                  Nos ayudan a entender cómo usas el sitio para mejorar el contenido (Google Analytics).
                </p>
              </span>
            </label>

            {/* Publicidad */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={advertising}
                onChange={(e) => setAdvertising(e.target.checked)}
                className="mt-1 h-4 w-4 accent-brand-600"
              />
              <span>
                <span className="font-semibold text-gray-900">Cookies publicitarias</span>
                <p className="text-sm text-gray-600 mt-0.5">
                  Permiten mostrar anuncios personalizados a través de Google AdSense.
                </p>
              </span>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => savePartial({ analytics, advertising })}
              className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-colors"
            >
              Guardar preferencias
            </button>
            <button
              onClick={() => setShowConfig(false)}
              className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-4 rounded-xl transition-colors"
            >
              Cancelar
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            Más info en nuestra{' '}
            <Link href="/politica-de-cookies" className="underline hover:text-brand-600">
              Política de cookies
            </Link>
            .
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Aviso de cookies"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-700 leading-relaxed">
              <span className="font-semibold">🍪 Usamos cookies</span> para mejorar tu experiencia y mostrar anuncios
              relevantes. Puedes aceptarlas todas, rechazarlas o configurarlas según tus preferencias. Consulta nuestra{' '}
              <Link href="/politica-de-cookies" className="underline hover:text-brand-600">
                Política de cookies
              </Link>{' '}
              y{' '}
              <Link href="/politica-de-privacidad" className="underline hover:text-brand-600">
                Política de privacidad
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              onClick={() => setShowConfig(true)}
              className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
            >
              Configurar
            </button>
            <button
              onClick={rejectAll}
              className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
            >
              Rechazar
            </button>
            <button
              onClick={acceptAll}
              className="px-4 py-2 text-sm font-semibold bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition-colors"
            >
              Aceptar todas
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
