import Link from 'next/link'
import { CATEGORIES } from '@/lib/categories'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Marca */}
          <div className="space-y-3">
            <Link href="/" className="text-lg font-extrabold text-brand-700">
              Trámites<span className="text-gray-900">España</span>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              Guías claras y actualizadas sobre trámites, ayudas y burocracia española. Sin jerga, sin rodeos.
            </p>
          </div>

          {/* Categorías */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Categorías</h3>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categoria/${cat.slug}`}
                    className="text-sm text-gray-600 hover:text-brand-600 transition-colors"
                  >
                    {cat.icon} {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Información */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Información</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre-nosotros" className="text-sm text-gray-600 hover:text-brand-600 transition-colors">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-sm text-gray-600 hover:text-brand-600 transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/aviso-legal" className="text-sm text-gray-600 hover:text-brand-600 transition-colors">
                  Aviso legal
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-de-privacidad"
                  className="text-sm text-gray-600 hover:text-brand-600 transition-colors"
                >
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-de-cookies"
                  className="text-sm text-gray-600 hover:text-brand-600 transition-colors"
                >
                  Política de cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            © {year} TrámitesEspaña. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-400">
            La información de este sitio es orientativa. Consulta siempre fuentes oficiales.
          </p>
        </div>
      </div>
    </footer>
  )
}
