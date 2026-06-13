import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getArticlesByCategory, getAllCategorySlugs } from '@/lib/mdx'
import { getCategoryBySlug, CATEGORIES } from '@/lib/categories'
import { ArticleCard } from '@/components/ArticleCard'
import { Breadcrumb } from '@/components/Breadcrumb'

export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllCategorySlugs()
  const allSlugs = [...new Set([...slugs, ...CATEGORIES.map((c) => c.slug)])]
  return allSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) return {}

  const title = `${category.name} — Guías y trámites`
  const description = `${category.description} Guías detalladas y actualizadas sobre ${category.name.toLowerCase()} en España.`

  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { title, description },
    alternates: { canonical: `/categoria/${slug}` },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) notFound()

  const articles = getArticlesByCategory(slug)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumb items={[{ label: category.name }]} />

      <header className="mt-6 mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{category.icon}</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">{category.name}</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl">{category.description}</p>
        <p className="text-sm text-gray-400 mt-2">
          {articles.length} {articles.length === 1 ? 'artículo' : 'artículos'} disponibles
        </p>
      </header>

      {articles.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg">Próximamente habrá artículos en esta categoría.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <div key={article.slug} className="relative">
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
