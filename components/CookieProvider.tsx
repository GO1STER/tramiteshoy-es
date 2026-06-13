'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { CookieBanner } from './CookieBanner'

export type ConsentState = 'pending' | 'accepted' | 'rejected' | 'partial'

export interface CookieConsent {
  analytics: boolean
  advertising: boolean
}

interface CookieContextValue {
  consent: ConsentState
  preferences: CookieConsent
  acceptAll: () => void
  rejectAll: () => void
  savePartial: (prefs: CookieConsent) => void
}

const CookieContext = createContext<CookieContextValue>({
  consent: 'pending',
  preferences: { analytics: false, advertising: false },
  acceptAll: () => {},
  rejectAll: () => {},
  savePartial: () => {},
})

export function useCookieConsent() {
  return useContext(CookieContext)
}

const STORAGE_KEY = 'cookie_consent_v1'

export function CookieProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>('pending')
  const [preferences, setPreferences] = useState<CookieConsent>({
    analytics: false,
    advertising: false,
  })
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setConsent(parsed.consent)
        setPreferences(parsed.preferences)
      }
    } catch {
      // ignore
    }
    setLoaded(true)
  }, [])

  function persist(state: ConsentState, prefs: CookieConsent) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ consent: state, preferences: prefs }))
  }

  function acceptAll() {
    const prefs = { analytics: true, advertising: true }
    setConsent('accepted')
    setPreferences(prefs)
    persist('accepted', prefs)
  }

  function rejectAll() {
    const prefs = { analytics: false, advertising: false }
    setConsent('rejected')
    setPreferences(prefs)
    persist('rejected', prefs)
  }

  function savePartial(prefs: CookieConsent) {
    const state: ConsentState = prefs.analytics || prefs.advertising ? 'partial' : 'rejected'
    setConsent(state)
    setPreferences(prefs)
    persist(state, prefs)
  }

  const showBanner = loaded && consent === 'pending'

  return (
    <CookieContext.Provider value={{ consent, preferences, acceptAll, rejectAll, savePartial }}>
      {children}
      {showBanner && <CookieBanner />}
    </CookieContext.Provider>
  )
}
