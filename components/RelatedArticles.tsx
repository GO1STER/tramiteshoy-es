import Link from 'next/link'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import type { Article } from '@/lib/mdx'
import { getCategoryBySlug } from '@/lib/categories'

interface RelatedArticlesProps {
  articles: Article[]
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null

  return (
    <section className="mt-12 pt-8 border-t border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-5">Artículos relacionados</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {articles.map((article) => {
          const category = getCategoryBySlug(article.category)
          const date = format(new Date(article.date), "d MMM yyyy", { locale: es })
          return (
            <Link
              key={article.slug}
              href={`/${article.slug}`}
              className="group flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-brand-200 hover:bg-brand-50 transition-all"
            >
              <div className="text-2xl shrink-0">{category?.icon ?? '📄'}</div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 group-hover:text-brand-700 transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </p>
                <p className="text-xs text-gray-400 mt-1">{date} · {article.readingTime} min</p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
