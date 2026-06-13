import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { getArticleBySlug, getAllSlugs, getArticlesByCategory } from '@/lib/mdx'
import { getCategoryBySlug } from '@/lib/categories'
import { Breadcrumb } from '@/components/Breadcrumb'
import { AdSlot } from '@/components/AdSlot'
import { TableOfContents } from '@/components/TableOfContents'
import { RelatedArticles } from '@/components/RelatedArticles'
import { FaqJsonLd } from '@/components/FaqJsonLd'
import { NewsletterForm } from '@/components/NewsletterForm'
import Link from 'next/link'

export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tramiteshoy.es'

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.date,
      modifiedTime: article.updated ?? article.date,
      locale: 'es_ES',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
    alternates: { canonical: `${SITE_URL}/${slug}` },
  }
}

function ArticleJsonLd({ article, url }: { article: ReturnType<typeof getArticleBySlug> & object; url: string }) {
  if (!article) return null
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.updated ?? article.date,
    inLanguage: 'es-ES',
    url,
    author: {
      '@type': 'Organization',
      name: 'TrámitesHoy',
      url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tramiteshoy.es',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TrámitesHoy',
      url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tramiteshoy.es',
    },
    keywords: article.keywords?.join(', '),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}

// Componentes MDX personalizados
const mdxComponents = {
  // Insertar anuncio automáticamente después del primer h2
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 {...props} />,
  // Tabla con scroll horizontal en móvil
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full divide-y divide-gray-200 text-sm" {...props} />
    </div>
  ),
  // Callout / advertencia como blockquote
  blockquote: (props: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className="border-l-4 border-brand-500 bg-brand-50 px-4 py-3 rounded-r-lg my-4 text-sm"
      {...props}
    />
  ),
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const category = getCategoryBySlug(article.category)
  const related = getArticlesByCategory(article.category)
    .filter((a) => a.slug !== article.slug)
    .slice(0, 4)
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tramiteshoy.es'
  const articleUrl = `${SITE_URL}/${slug}`

  const dateFormatted = format(new Date(article.date), "d 'de' MMMM 'de' yyyy", { locale: es })
  const updatedFormatted = article.updated
    ? format(new Date(article.updated), "d 'de' MMMM 'de' yyyy", { locale: es })
    : null

  return (
    <>
      <ArticleJsonLd article={article} url={articleUrl} />
      {article.faqs && <FaqJsonLd faqs={article.faqs} />}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            ...(category ? [{ label: category.name, href: `/categoria/${category.slug}` }] : []),
            { label: article.title },
          ]}
        />

        <div className="mt-8 lg:grid lg:grid-cols-[1fr_300px] lg:gap-12">
          {/* Columna principal */}
          <div className="min-w-0">
            {/* Encabezado del artículo */}
            <header className="mb-8">
              {category && (
                <Link
                  href={`/categoria/${category.slug}`}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border mb-4 ${category.color}`}
                >
                  {category.icon} {category.name}
                </Link>
              )}

              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                {article.title}
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed mb-5">{article.description}</p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                <time dateTime={article.date}>Publicado: {dateFormatted}</time>
                {updatedFormatted && (
                  <time dateTime={article.updated}>· Actualizado: {updatedFormatted}</time>
                )}
                <span>· {article.readingTime} min de lectura</span>
              </div>
            </header>

            {/* Anuncio tras el encabezado */}
            <AdSlot slot="article-top" format="horizontal" />

            {/* Contenido MDX */}
            <article className="prose prose-lg max-w-none prose-headings:scroll-mt-20">
              <MDXRemote source={article.content} components={mdxComponents} />
            </article>

            {/* Anuncio al final del artículo */}
            <AdSlot slot="article-bottom" format="rectangle" />

            {/* Newsletter inline */}
            <div className="my-8 p-6 bg-brand-50 border border-brand-100 rounded-2xl">
              <p className="text-sm font-semibold text-brand-700 mb-1">📬 ¿Te ha sido útil esta guía?</p>
              <p className="text-sm text-gray-600 mb-4">
                Suscríbete y te avisamos cuando publiquemos nuevas guías sobre ayudas, trámites y prestaciones.
              </p>
              <NewsletterForm compact />
            </div>

            {/* Artículos relacionados */}
            <RelatedArticles articles={related} />

            {/* Keywords */}
            {article.keywords && article.keywords.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-400 mb-2">Temas:</p>
                <div className="flex flex-wrap gap-2">
                  {article.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Aviso legal */}
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-yellow-800">
              <strong>Aviso:</strong> La información de este artículo es orientativa y puede haber variado. Consulta
              siempre las fuentes oficiales antes de realizar cualquier trámite.
            </div>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block space-y-6 mt-0">
            <TableOfContents />
            <AdSlot slot="sidebar" format="rectangle" className="sticky top-24" />
          </aside>
        </div>
      </div>
    </>
  )
}
