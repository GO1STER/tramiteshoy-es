'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error' | 'exists'

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else if (res.status === 409) {
        setStatus('exists')
      } else {
        setStatus('error')
        setErrorMsg(data.message ?? 'Error desconocido')
      }
    } catch {
      setStatus('error')
      setErrorMsg('No se pudo conectar. Inténtalo de nuevo.')
    }
  }

  if (status === 'success') {
    return (
      <div className={`flex items-center gap-3 ${compact ? 'py-2' : 'p-5 bg-green-50 rounded-2xl border border-green-200'}`}>
        <span className="text-2xl">✅</span>
        <div>
          <p className="font-semibold text-green-800">¡Suscripción confirmada!</p>
          <p className="text-sm text-green-700">Te avisaremos cuando publiquemos nuevas guías.</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? 'flex gap-2' : 'space-y-3'}>
      <label htmlFor="nl-email" className={compact ? 'sr-only' : 'block text-sm font-medium text-gray-700'}>
        Tu correo electrónico
      </label>
      <input
        id="nl-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tucorreo@ejemplo.com"
        disabled={status === 'loading'}
        className={`block w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none disabled:opacity-60 transition ${compact ? 'flex-1' : ''}`}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className={`whitespace-nowrap rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 active:bg-brand-800 disabled:opacity-60 transition ${compact ? '' : 'w-full'}`}
      >
        {status === 'loading' ? 'Enviando…' : 'Suscribirme gratis'}
      </button>

      {status === 'exists' && (
        <p className="text-sm text-amber-600">Este correo ya está suscrito.</p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-600">{errorMsg || 'Algo falló. Inténtalo más tarde.'}</p>
      )}
    </form>
  )
}
