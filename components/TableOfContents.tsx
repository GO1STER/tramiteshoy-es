'use client'

import { useEffect, useState } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const article = document.querySelector('article.prose')
    if (!article) return

    const nodes = article.querySelectorAll('h2, h3')
    const items: Heading[] = []

    nodes.forEach((node) => {
      const el = node as HTMLElement
      if (!el.id) {
        el.id = el.textContent
          ?.toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-') ?? ''
      }
      items.push({ id: el.id, text: el.textContent ?? '', level: parseInt(el.tagName[1]) })
    })

    setHeadings(items)

    // IntersectionObserver para resaltar heading activo
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-20% 0% -70% 0%' }
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  if (headings.length < 2) return null

  return (
    <nav
      aria-label="Índice de contenidos"
      className="bg-gray-50 border border-gray-200 rounded-xl p-5 space-y-2"
    >
      <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">En este artículo</h2>
      <ol className="space-y-1">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? 'pl-4' : ''}>
            <a
              href={`#${h.id}`}
              className={`block text-sm py-0.5 transition-colors ${
                active === h.id
                  ? 'text-brand-600 font-semibold'
                  : 'text-gray-600 hover:text-brand-600'
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
