# TrámitesEspaña

Web de contenido en español sobre trámites, ayudas y burocracia española. Optimizada para SEO y monetizable con Google AdSense.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS · MDX · Vercel

---

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

---

## Añadir un nuevo artículo

1. Crea un fichero `.mdx` en la carpeta `/content/`:

```
content/nombre-del-articulo.mdx
```

2. Añade el frontmatter al inicio del fichero (obligatorio):

```mdx
---
title: "Título del artículo (H1 único, incluye keyword principal)"
description: "Descripción para SEO (150-160 caracteres). Explica qué aprenderá el lector."
slug: "nombre-del-articulo"
category: "ayudas-y-subvenciones"
date: "2025-06-15"
updated: "2025-06-20"
keywords: ["keyword 1", "keyword 2", "keyword 3"]
---

Primer párrafo del artículo...
```

3. **Categorías disponibles** (`category`):
   - `ayudas-y-subvenciones`
   - `autonomos`
   - `empleo-y-paro`
   - `tramites-dgt`
   - `seguridad-social`
   - `hacienda`

4. El artículo aparecerá automáticamente en la home, en la categoría correspondiente y en el sitemap.

### Estructura recomendada para SEO

```mdx
## Título H2 principal (incluye keyword)

Primer párrafo explicativo.

## Requisitos

- Lista de requisitos

## Paso a paso

### Paso 1: ...

### Paso 2: ...

## Preguntas frecuentes

**¿Pregunta frecuente?**
Respuesta...
```

---

## Activar Google AdSense

### Paso 1: Solicitar la aprobación

1. Crea una cuenta en [Google AdSense](https://adsense.google.com).
2. Añade tu dominio y espera la revisión (puede tardar días o semanas).
3. AdSense revisará que el sitio tenga contenido original, páginas legales y buen tráfico.

### Paso 2: Añadir el script de AdSense

En `app/layout.tsx`, dentro del `<head>`, añade:

```tsx
<Script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
  crossOrigin="anonymous"
  strategy="afterInteractive"
/>
```

Sustituye `ca-pub-XXXXXXXXXXXXXXXX` por tu Publisher ID real.

### Paso 3: Activar los slots de anuncios

En `components/AdSlot.tsx`, localiza el comentario `CÓDIGO REAL` y descomenta el bloque `<ins>`, sustituyendo:
- `data-ad-client` → tu `ca-pub-XXXXXXXXXXXXXXXX`
- `data-ad-slot` → el ID del slot concreto que hayas creado en AdSense

Los slots ya colocados en la web son:
- `article-top` → Tras el encabezado del artículo (horizontal)
- `article-bottom` → Al final del artículo (rectangle)
- `sidebar` → Sidebar lateral en desktop (rectangle)

### Paso 4: Rellenar ads.txt

En `public/ads.txt`, añade la línea que te proporcione Google:

```
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

---

## Desplegar en Vercel

### Primera vez

```bash
npm install -g vercel
vercel
```

Sigue los pasos del asistente. Vercel detecta automáticamente que es un proyecto Next.js.

### Variables de entorno en Vercel

En el dashboard de Vercel → Settings → Environment Variables, añade:

| Variable | Valor |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://tu-dominio.com` |

### Despliegues posteriores

```bash
vercel --prod
```

O conecta el repositorio de GitHub a Vercel para despliegue automático en cada push a `main`.

### Dominio personalizado

En Vercel → Settings → Domains → añade tu dominio y configura los DNS según indique Vercel.

---

## Estructura del proyecto

```
tramites-espana/
├── app/
│   ├── layout.tsx              # Layout raíz: fuentes, header, footer, cookie provider
│   ├── page.tsx                # Home: hero + categorías + últimos artículos
│   ├── sitemap.ts              # /sitemap.xml dinámico
│   ├── robots.ts               # /robots.txt
│   ├── [slug]/page.tsx         # Artículo individual con MDX
│   ├── categoria/[slug]/       # Listado por categoría
│   ├── sobre-nosotros/
│   ├── contacto/
│   ├── politica-de-privacidad/
│   ├── aviso-legal/
│   └── politica-de-cookies/
├── components/
│   ├── Header.tsx              # Navegación + menú móvil
│   ├── Footer.tsx              # Footer con categorías y páginas legales
│   ├── ArticleCard.tsx         # Tarjeta de artículo para listados
│   ├── AdSlot.tsx              # Slot de AdSense (placeholder activable)
│   ├── CookieBanner.tsx        # Banner RGPD con aceptar/rechazar/configurar
│   ├── CookieProvider.tsx      # Contexto de consentimiento de cookies
│   ├── Breadcrumb.tsx          # Breadcrumb + JSON-LD BreadcrumbList
│   └── TableOfContents.tsx     # Índice de contenidos dinámico
├── content/                    # Artículos MDX (uno por fichero)
├── lib/
│   ├── mdx.ts                  # Lectura y parseo de artículos MDX
│   └── categories.ts           # Definición de categorías
└── public/
    └── ads.txt                 # Publisher verification para AdSense
```

---

## Checklist para aprobación de AdSense

- [x] Páginas legales creadas (aviso legal, privacidad, cookies)
- [x] Página "Sobre nosotros" con información real
- [x] Página de contacto con formulario
- [x] Banner de consentimiento de cookies RGPD
- [x] ads.txt en /public
- [x] Contenido original en español (mínimo 3 artículos)
- [ ] Dominio propio (no subdominio gratuito)
- [ ] Mínimo 3 meses de antigüedad del dominio (recomendado)
- [ ] Tráfico orgánico real (al menos algunas visitas diarias)
- [ ] Rellenar ads.txt con tu Publisher ID tras la aprobación
