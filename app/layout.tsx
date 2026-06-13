import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CookieProvider } from '@/components/CookieProvider'
import { BackToTop } from '@/components/BackToTop'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tramiteshoy.es'
const SITE_NAME = 'TrámitesHoy'
const SITE_DESCRIPTION =
  'Guías claras y actualizadas sobre trámites, ayudas y burocracia española. Todo lo que necesitas saber explicado paso a paso.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Guías de trámites y ayudas en España`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ['trámites España', 'ayudas', 'subvenciones', 'burocracia española', 'Seguridad Social', 'Hacienda', 'DGT'],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Guías de trámites y ayudas en España`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Guías de trámites y ayudas en España`,
    description: SITE_DESCRIPTION,
  },
  alternates: { canonical: SITE_URL },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body>
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>
        <CookieProvider>
          <GoogleAnalytics />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <BackToTop />
          <Analytics />
          <SpeedInsights />
        </CookieProvider>
      </body>
    </html>
  )
}
