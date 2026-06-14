import type { Metadata } from 'next'
import { getAllArticles } from '@/lib/mdx'
import { CATEGORIES } from '@/lib/categories'
import { ArticleCard } from '@/components/ArticleCard'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Todas las guías de trámites en España — TrámitesHoy',
  description:
    'Listado completo de guías sobre trámites, ayudas y burocracia en España: Seguridad Social, Hacienda, autónomos, DGT, prestaciones, impuestos y más. Actualizadas en 2026.',
  alternates: { canonical: '/guias' },
}

export default function GuiasPage() {
  const articles = getAllArticles()

  const byCategory = CATEGORIES.map((cat) => ({
    ...cat,
    articles: articles.filter((a) => a.category === cat.slug),
  })).filter((c) => c.articles.length > 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
          Todas las guías de trámites
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          {articles.length} guías actualizadas sobre burocracia española. Encuentra el trámite que necesitas por categoría.
        </p>
      </div>

      {/* Índice de categorías */}
      <nav className="flex flex-wrap gap-2 mb-12" aria-label="Categorías">
        {byCategory.map((cat) => (
          <a
            key={cat.slug}
            href={`#${cat.slug}`}
            className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full border transition-colors hover:opacity-80 ${cat.color}`}
          >
            {cat.icon} {cat.name}
            <span className="opacity-60 text-xs">({cat.articles.length})</span>
          </a>
        ))}
      </nav>

      {/* Artículos por categoría */}
      <div className="space-y-16">
        {byCategory.map((cat) => (
          <section key={cat.slug} id={cat.slug}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span>{cat.icon}</span>
                {cat.name}
              </h2>
              <Link
                href={`/categoria/${cat.slug}`}
                className="text-sm text-brand-600 hover:text-brand-700 font-medium"
              >
                Ver categoría →
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cat.articles.map((article) => (
                <div key={article.slug} className="relative">
                  <ArticleCard article={article} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
