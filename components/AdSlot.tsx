'use client'

import { useCookieConsent } from './CookieProvider'

interface AdSlotProps {
  slot: string
  className?: string
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical'
}

/**
 * Placeholder de AdSense. Para activar:
 * 1. Pegar el script de AdSense en app/layout.tsx (en <head>)
 * 2. Sustituir el div placeholder por el <ins class="adsbygoogle"> real
 * 3. Añadir tu data-ad-client="ca-pub-XXXXXXXX" y data-ad-slot={slot}
 */
export function AdSlot({ slot, className = '', format = 'auto' }: AdSlotProps) {
  const { preferences, consent } = useCookieConsent()

  // Solo mostrar anuncios si el usuario ha dado consentimiento publicitario
  const canShowAds = consent !== 'pending' && preferences.advertising

  if (!canShowAds) {
    // Reservar espacio visual incluso sin consentimiento (evita CLS)
    return (
      <div
        className={`ad-placeholder ${className}`}
        style={{ minHeight: format === 'horizontal' ? 90 : 250 }}
        aria-hidden="true"
      />
    )
  }

  return (
    <div className={`ad-slot my-6 ${className}`} data-ad-slot={slot} data-ad-format={format}>
      {/* === PLACEHOLDER — reemplazar por código real de AdSense === */}
      <div
        className="flex items-center justify-center bg-gray-100 border border-dashed border-gray-300 rounded-lg text-gray-400 text-xs font-mono select-none"
        style={{ minHeight: format === 'horizontal' ? 90 : 250 }}
      >
        [AdSense slot: {slot}]
      </div>
      {/* === FIN PLACEHOLDER === */}

      {/*
      CÓDIGO REAL (descomentar cuando AdSense esté aprobado):

      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      */}
    </div>
  )
}
