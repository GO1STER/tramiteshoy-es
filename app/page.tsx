import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllArticles, getArticlesByCategory } from '@/lib/mdx'
import { CATEGORIES } from '@/lib/categories'
import { ArticleCard } from '@/components/ArticleCard'
import { NewsletterSection } from '@/components/NewsletterSection'

export const metadata: Metadata = {
  title: 'TrámitesHoy — Guías de trámites y ayudas en España',
  description:
    'Resuelve tus dudas sobre trámites, ayudas y burocracia en España. Guías actualizadas paso a paso: Seguridad Social, Hacienda, DGT, autónomos y más.',
  alternates: { canonical: '/' },
}

export default function HomePage() {
  const articles = getAllArticles()
  const latest = articles.slice(0, 6)

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-700 to-brand-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            Trámites en España,<br />
            <span className="text-brand-200">explicados sin rodeos</span>
          </h1>
          <p className="text-lg sm:text-xl text-brand-100 max-w-2xl mx-auto leading-relaxed">
            Guías claras y actualizadas sobre burocracia española. Desde solicitar el paro hasta darse de alta como
            autónomo, aquí encontrarás los pasos exactos.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href="/categoria/ayudas-y-subvenciones"
              className="inline-block bg-white text-brand-700 font-semibold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors"
            >
              Ver ayudas disponibles
            </Link>
            <Link
              href="/categoria/autonomos"
              className="inline-block border border-brand-400 text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-800 transition-colors"
            >
              Guías para autónomos
            </Link>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Explora por categoría</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.map((cat) => {
            const count = getArticlesByCategory(cat.slug).length
            return (
              <Link
                key={cat.slug}
                href={`/categoria/${cat.slug}`}
                className={`flex flex-col items-center text-center gap-2 p-4 rounded-xl border transition-all hover:shadow-sm hover:-translate-y-0.5 ${cat.color}`}
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-xs font-semibold leading-tight">{cat.name}</span>
                {count > 0 && (
                  <span className="text-xs opacity-60">{count} {count === 1 ? 'guía' : 'guías'}</span>
                )}
              </Link>
            )
          })}
        </div>
      </section>

      {/* Últimos artículos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Últimas guías</h2>
        </div>

        {latest.length === 0 ? (
          <p className="text-gray-500">Próximamente habrá artículos disponibles.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((article) => (
              <div key={article.slug} className="relative">
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <NewsletterSection />
      </section>

      {/* CTA informativo */}
      <section className="bg-brand-50 border-y border-brand-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">¿No encuentras lo que buscas?</h2>
          <p className="text-gray-600 leading-relaxed">
            Recuerda que la información de este sitio es orientativa. Ante dudas concretas, consulta siempre la web
            oficial del organismo correspondiente o asesórate con un profesional.
          </p>
          <Link
            href="/contacto"
            className="inline-block bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Contactar
          </Link>
        </div>
      </section>
    </>
  )
}
