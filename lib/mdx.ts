import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'content')

export interface Faq {
  q: string
  a: string
}

export interface ArticleFrontmatter {
  title: string
  description: string
  slug: string
  category: string
  date: string
  updated?: string
  keywords: string[]
  faqs?: Faq[]
}

export interface Article extends ArticleFrontmatter {
  content: string
  readingTime: number
}

function calcReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(contentDir)) return []

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.mdx'))

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(contentDir, file), 'utf-8')
      const { data, content } = matter(raw)
      return {
        ...(data as ArticleFrontmatter),
        content,
        readingTime: calcReadingTime(content),
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getArticleBySlug(slug: string): Article | null {
  const articles = getAllArticles()
  return articles.find((a) => a.slug === slug) ?? null
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return getAllArticles().filter((a) => a.category === categorySlug)
}

export function getAllSlugs(): string[] {
  return getAllArticles().map((a) => a.slug)
}

export function getAllCategorySlugs(): string[] {
  const articles = getAllArticles()
  return [...new Set(articles.map((a) => a.category))]
}
