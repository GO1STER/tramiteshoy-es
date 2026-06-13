'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { useCookieConsent } from './CookieProvider'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export function GoogleAnalytics() {
  const { preferences } = useCookieConsent()

  useEffect(() => {
    if (!GA_ID || typeof window === 'undefined') return
    if (preferences.analytics) {
      window.gtag?.('consent', 'update', {
        analytics_storage: 'granted',
      })
    } else {
      window.gtag?.('consent', 'update', {
        analytics_storage: 'denied',
      })
    }
  }, [preferences.analytics])

  if (!GA_ID) return null

  return (
    <>
      {/* Carga GA con consent mode: analytics_storage denied por defecto */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: true });
        `}
      </Script>
    </>
  )
}

// Amplía tipos globales para gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}
