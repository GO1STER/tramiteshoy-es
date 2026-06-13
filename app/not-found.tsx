import type { Metadata } from 'next'
import Link from 'next/link'
import { CATEGORIES } from '@/lib/categories'

export const metadata: Metadata = {
  title: 'Página no encontrada',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <p className="text-7xl font-extrabold text-brand-100 select-none">404</p>
      <h1 className="text-3xl font-extrabold text-gray-900 mt-2 mb-4">Página no encontrada</h1>
      <p className="text-gray-500 text-lg mb-10">
        Esta página no existe o ha sido movida. Prueba con una de las categorías:
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categoria/${cat.slug}`}
            className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all hover:shadow-sm ${cat.color}`}
          >
            <span>{cat.icon}</span>
            {cat.name}
          </Link>
        ))}
      </div>

      <Link
        href="/"
        className="inline-block bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
