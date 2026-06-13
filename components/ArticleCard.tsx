import Link from 'next/link'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import type { Article } from '@/lib/mdx'
import { getCategoryBySlug } from '@/lib/categories'

interface ArticleCardProps {
  article: Article
  featured?: boolean
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const category = getCategoryBySlug(article.category)
  const dateFormatted = format(new Date(article.date), "d 'de' MMMM, yyyy", { locale: es })

  return (
    <article
      className={`group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md hover:border-brand-200 transition-all duration-200 ${
        featured ? 'sm:flex' : ''
      }`}
    >
      <div className={`p-6 flex flex-col gap-3 ${featured ? 'flex-1' : ''}`}>
        {/* Categoría */}
        {category && (
          <Link
            href={`/categoria/${category.slug}`}
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border w-fit transition-colors hover:opacity-80 ${category.color}`}
          >
            <span>{category.icon}</span>
            {category.name}
          </Link>
        )}

        {/* Título */}
        <h2 className={`font-bold text-gray-900 group-hover:text-brand-700 transition-colors leading-snug ${featured ? 'text-xl' : 'text-lg'}`}>
          <Link href={`/${article.slug}`} className="after:absolute after:inset-0">
            {article.title}
          </Link>
        </h2>

        {/* Descripción */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{article.description}</p>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-gray-400 mt-auto pt-2">
          <time dateTime={article.date}>{dateFormatted}</time>
          <span>·</span>
          <span>{article.readingTime} min de lectura</span>
        </div>
      </div>
    </article>
  )
}
