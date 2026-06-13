import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'TrámitesHoy — Guías de trámites y ayudas en España'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
          <div
            style={{
              background: 'white',
              borderRadius: '12px',
              width: '64px',
              height: '64px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              fontWeight: 900,
              color: '#1d4ed8',
            }}
          >
            T
          </div>
          <span style={{ fontSize: '48px', fontWeight: 800, color: 'white' }}>
            Trámites<span style={{ color: '#93c5fd' }}>Hoy</span>
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: '52px',
            fontWeight: 800,
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.2,
            maxWidth: '900px',
          }}
        >
          Trámites y ayudas en España, explicados sin rodeos
        </div>

        {/* Subline */}
        <div
          style={{
            fontSize: '28px',
            color: '#bfdbfe',
            textAlign: 'center',
            marginTop: '24px',
            maxWidth: '800px',
          }}
        >
          Guías actualizadas · Paso a paso · Gratis
        </div>

        {/* Categories */}
        <div style={{ display: 'flex', gap: '16px', marginTop: '48px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {['💰 Ayudas', '💼 Autónomos', '👔 Empleo', '🚗 DGT', '🏥 Seg. Social', '🏛️ Hacienda'].map((cat) => (
            <div
              key={cat}
              style={{
                background: 'rgba(255,255,255,0.15)',
                borderRadius: '999px',
                padding: '10px 24px',
                fontSize: '22px',
                color: 'white',
                fontWeight: 600,
              }}
            >
              {cat}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  )
}
