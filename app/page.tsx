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
  const featured = articles.find((a) => a.slug === 'declaracion-renta-2026') ?? articles[0]
  const latest = articles.filter((a) => a.slug !== featured?.slug).slice(0, 9)

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

      {/* Artículo destacado — Renta 2026 (campaña activa) */}
      {featured && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-2">
          <div className="relative rounded-2xl overflow-hidden bg-amber-50 border border-amber-200 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div className="flex-shrink-0 bg-amber-400 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide sm:hidden">
              Ahora importante
            </div>
            <div className="hidden sm:flex flex-shrink-0 flex-col items-center justify-center bg-amber-100 border border-amber-300 rounded-xl p-4 text-center min-w-[80px]">
              <span className="text-3xl">📅</span>
              <span className="text-xs font-bold text-amber-700 mt-1 leading-tight">Hasta<br />30 jun</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-1">Campaña activa — plazo: 30 de junio 2026</p>
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-snug mb-2">
                <Link href={`/${featured.slug}`} className="hover:text-brand-700 transition-colors after:absolute after:inset-0">
                  {featured.title}
                </Link>
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{featured.description}</p>
            </div>
            <Link
              href={`/${featured.slug}`}
              className="flex-shrink-0 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm whitespace-nowrap"
            >
              Leer guía →
            </Link>
          </div>
        </section>
      )}

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
          <Link href="/guias" className="text-sm text-brand-600 hover:text-brand-700 font-medium">
            Ver todas ({articles.length}) →
          </Link>
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

        <div className="mt-8 text-center">
          <Link
            href="/guias"
            className="inline-block border border-brand-200 text-brand-700 hover:bg-brand-50 font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Ver todas las guías ({articles.length} disponibles)
          </Link>
        </div>
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
