#!/usr/bin/env node
/**
 * Generates 1 new MDX article per run using Claude API.
 * Reads from scripts/topics.json and tracks progress in scripts/topics-done.json.
 * Designed to run in GitHub Actions via cron.
 */

import Anthropic from '@anthropic-ai/sdk'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

const TOPICS_FILE = path.join(__dirname, 'topics.json')
const DONE_FILE = path.join(__dirname, 'topics-done.json')
const CONTENT_DIR = path.join(ROOT, 'content')

const ARTICLES_PER_RUN = 1
const TODAY = new Date().toISOString().split('T')[0]

function loadTopics() {
  const all = JSON.parse(fs.readFileSync(TOPICS_FILE, 'utf8'))
  const done = fs.existsSync(DONE_FILE)
    ? JSON.parse(fs.readFileSync(DONE_FILE, 'utf8'))
    : []
  const doneSlugs = new Set(done.map((d) => d.slug))
  return { all, done, doneSlugs }
}

function markDone(done, topic) {
  done.push({ slug: topic.slug, date: TODAY })
  fs.writeFileSync(DONE_FILE, JSON.stringify(done, null, 2))
}

async function generateArticle(client, topic, index) {
  const date = new Date()
  date.setDate(date.getDate() - index) // stagger dates slightly
  const articleDate = date.toISOString().split('T')[0]

  const prompt = `Eres un experto en burocracia y trámites españoles. Escribe un artículo en español para el blog TrámitesHoy.es sobre el siguiente tema.

TEMA: ${topic.title}
CATEGORÍA: ${topic.category}
KEYWORDS: ${topic.keywords.join(', ')}

El artículo debe:
- Estar en formato MDX con frontmatter YAML
- Ser completo, útil y actual para 2025
- Tener entre 800 y 1200 palabras de contenido (sin contar el frontmatter)
- Incluir tablas, listas y estructura clara con ## y ###
- Ser 100% original y no plagiar ninguna fuente
- Usar lenguaje claro y directo, sin tecnicismos innecesarios

El frontmatter DEBE seguir exactamente este formato (sin añadir ni quitar campos):
---
title: "${topic.title}"
description: "<meta descripción de 150-160 caracteres que incluya la keyword principal>"
slug: "${topic.slug}"
category: "${topic.category}"
date: "${articleDate}"
updated: "${TODAY}"
keywords: ${JSON.stringify(topic.keywords)}
faqs:
  - q: "${topic.questions[0]}"
    a: "<respuesta concisa y completa de 2-3 frases>"
  - q: "${topic.questions[1]}"
    a: "<respuesta concisa y completa de 2-3 frases>"
  - q: "${topic.questions[2]}"
    a: "<respuesta concisa y completa de 2-3 frases>"
  - q: "${topic.questions[3]}"
    a: "<respuesta concisa y completa de 2-3 frases>"
  - q: "${topic.questions[4]}"
    a: "<respuesta concisa y completa de 2-3 frases>"
---

Tras el frontmatter, escribe el cuerpo del artículo en Markdown. Termina con:

## Preguntas frecuentes

(No escribas las preguntas de nuevo aquí, el sistema las muestra automáticamente desde el frontmatter.)

IMPORTANTE: Devuelve SOLO el contenido MDX completo, sin explicaciones adicionales, sin bloques de código extra, solo el texto desde --- hasta el final del artículo.`

  console.log(`  Generando: ${topic.slug}...`)

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  })

  const content = message.content[0].text.trim()

  // Ensure it starts with frontmatter
  if (!content.startsWith('---')) {
    throw new Error(`Artículo generado sin frontmatter válido: ${topic.slug}`)
  }

  return content
}

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('❌ ANTHROPIC_API_KEY no está definida')
    process.exit(1)
  }

  const client = new Anthropic({ apiKey })
  const { all, done, doneSlugs } = loadTopics()

  const pending = all.filter((t) => !doneSlugs.has(t.slug))

  if (pending.length === 0) {
    console.log('✅ Todos los temas han sido publicados. Añade más a scripts/topics.json.')
    process.exit(0)
  }

  const batch = pending.slice(0, ARTICLES_PER_RUN)
  console.log(`🚀 Generando ${batch.length} artículos...`)

  let generated = 0
  for (let i = 0; i < batch.length; i++) {
    const topic = batch[i]
    try {
      const mdx = await generateArticle(client, topic, i)
      const filePath = path.join(CONTENT_DIR, `${topic.slug}.mdx`)
      fs.writeFileSync(filePath, mdx)
      markDone(done, topic)
      console.log(`  ✅ ${topic.slug}.mdx guardado`)
      generated++
    } catch (err) {
      console.error(`  ❌ Error generando ${topic.slug}:`, err.message)
    }
  }

  console.log(`\n✅ ${generated}/${batch.length} artículos generados. Quedan ${pending.length - generated} temas pendientes.`)
}

main()
