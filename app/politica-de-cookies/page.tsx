import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de cookies',
  description: 'Información sobre las cookies utilizadas en TrámitesHoy conforme al RGPD y la normativa española.',
  alternates: { canonical: '/politica-de-cookies' },
}

const LAST_UPDATED = '1 de junio de 2025'

export default function PoliticaCookiesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Política de cookies</h1>
      <p className="text-sm text-gray-500 mb-10">Última actualización: {LAST_UPDATED}</p>

      <div className="prose prose-lg max-w-none text-gray-700">
        <p>
          En cumplimiento del artículo 22.2 de la Ley 34/2002 de Servicios de la Sociedad de la Información (LSSI) y
          del Reglamento General de Protección de Datos (RGPD), esta página explica qué son las cookies, qué tipos
          utilizamos en este sitio y cómo puedes gestionarlas.
        </p>

        <h2>¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños ficheros de texto que los sitios web almacenan en tu dispositivo cuando los visitas.
          Sirven para que el sitio funcione correctamente, para recordar tus preferencias y para recopilar
          estadísticas de uso.
        </p>

        <h2>Tipos de cookies que utilizamos</h2>

        <h3>1. Cookies estrictamente necesarias</h3>
        <p>
          Son imprescindibles para el funcionamiento del sitio. Sin ellas, algunas partes del sitio no funcionarían
          correctamente. No requieren consentimiento previo.
        </p>
        <div className="overflow-x-auto">
          <table className="text-sm w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-3 py-2 text-left">Nombre</th>
                <th className="border border-gray-200 px-3 py-2 text-left">Finalidad</th>
                <th className="border border-gray-200 px-3 py-2 text-left">Duración</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-3 py-2 font-mono">cookie_consent_v1</td>
                <td className="border border-gray-200 px-3 py-2">Guarda tus preferencias de cookies (propia)</td>
                <td className="border border-gray-200 px-3 py-2">12 meses (localStorage)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>2. Cookies analíticas (requieren consentimiento)</h3>
        <p>
          Utilizamos <strong>Google Analytics 4</strong> para entender cómo se usa el sitio y mejorar el contenido.
          Las IPs se anonimizan. Solo se activan si aceptas las cookies analíticas.
        </p>
        <div className="overflow-x-auto">
          <table className="text-sm w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-3 py-2 text-left">Nombre</th>
                <th className="border border-gray-200 px-3 py-2 text-left">Proveedor</th>
                <th className="border border-gray-200 px-3 py-2 text-left">Duración</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-3 py-2 font-mono">_ga</td>
                <td className="border border-gray-200 px-3 py-2">Google Analytics</td>
                <td className="border border-gray-200 px-3 py-2">2 años</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2 font-mono">_ga_*</td>
                <td className="border border-gray-200 px-3 py-2">Google Analytics</td>
                <td className="border border-gray-200 px-3 py-2">2 años</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>3. Cookies publicitarias (requieren consentimiento)</h3>
        <p>
          Utilizamos <strong>Google AdSense</strong> para mostrar anuncios. Estas cookies permiten a Google mostrar
          anuncios personalizados basados en tu historial de navegación. Solo se activan si aceptas las cookies
          publicitarias.
        </p>
        <div className="overflow-x-auto">
          <table className="text-sm w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-3 py-2 text-left">Nombre</th>
                <th className="border border-gray-200 px-3 py-2 text-left">Proveedor</th>
                <th className="border border-gray-200 px-3 py-2 text-left">Duración</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-3 py-2 font-mono">IDE</td>
                <td className="border border-gray-200 px-3 py-2">Google DoubleClick</td>
                <td className="border border-gray-200 px-3 py-2">13 meses</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-3 py-2 font-mono">test_cookie</td>
                <td className="border border-gray-200 px-3 py-2">Google DoubleClick</td>
                <td className="border border-gray-200 px-3 py-2">Sesión</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Cómo gestionar o retirar tu consentimiento</h2>
        <p>Puedes cambiar tus preferencias de cookies en cualquier momento:</p>
        <ul>
          <li>
            <strong>Desde el banner de cookies:</strong> aparece la primera vez que visitas el sitio. Si ya lo
            cerraste, borra las cookies de tu navegador para verlo de nuevo.
          </li>
          <li>
            <strong>Desde tu navegador:</strong> todos los navegadores modernos permiten ver, bloquear o eliminar
            cookies. Consulta la ayuda de tu navegador (Chrome, Firefox, Safari, Edge).
          </li>
          <li>
            <strong>Herramientas de opt-out de Google:</strong>{' '}
            <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener noreferrer" target="_blank">
              Google Analytics Opt-out Add-on
            </a>{' '}
            y{' '}
            <a href="https://www.google.com/settings/ads" rel="noopener noreferrer" target="_blank">
              Configuración de anuncios de Google
            </a>
            .
          </li>
        </ul>

        <p>
          Ten en cuenta que rechazar las cookies publicitarias no elimina los anuncios, sino que los hace menos
          relevantes para ti.
        </p>

        <h2>Más información</h2>
        <p>
          Para más información, consulta nuestra{' '}
          <a href="/politica-de-privacidad">Política de privacidad</a> o escríbenos a{' '}
          <strong>privacidad@tramiteshoy.es</strong>.
        </p>
      </div>
    </div>
  )
}
