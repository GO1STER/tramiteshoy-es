import type { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/mdx'
import { CATEGORIES } from '@/lib/categories'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tramiteshoy.es'

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles()

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${SITE_URL}/sobre-nosotros`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/contacto`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/aviso-legal`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/politica-de-privacidad`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/politica-de-cookies`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
  ]

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${SITE_URL}/categoria/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/${article.slug}`,
    lastModified: new Date(article.updated ?? article.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...categoryPages, ...articlePages]
}
