import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aviso legal',
  description: 'Aviso legal de TrámitesEspaña conforme a la Ley de Servicios de la Sociedad de la Información (LSSI).',
  alternates: { canonical: '/aviso-legal' },
}

const SITE_URL = 'https://tramites-espana.es'
const CONTACT_EMAIL = 'legal@tramites-espana.es'
const LAST_UPDATED = '1 de junio de 2025'

export default function AvisoLegalPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Aviso legal</h1>
      <p className="text-sm text-gray-500 mb-10">Última actualización: {LAST_UPDATED}</p>

      <div className="prose prose-lg max-w-none text-gray-700">
        <h2>1. Identificación del titular</h2>
        <p>
          En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de
          Comercio Electrónico (LSSI-CE), se informa que el sitio web <strong>{SITE_URL}</strong> es titularidad de{' '}
          <strong>TrámitesEspaña</strong>.
        </p>
        <ul>
          <li><strong>Correo electrónico:</strong> {CONTACT_EMAIL}</li>
          <li><strong>Sitio web:</strong> {SITE_URL}</li>
        </ul>

        <h2>2. Objeto y ámbito de aplicación</h2>
        <p>
          El presente aviso legal regula el acceso y uso del sitio web {SITE_URL}, así como los contenidos publicados
          en él. El acceso y la navegación por el sitio implican la aceptación plena de las condiciones aquí
          establecidas.
        </p>

        <h2>3. Naturaleza del contenido. Carácter informativo</h2>
        <p>
          Los contenidos publicados en {SITE_URL} tienen <strong>carácter exclusivamente informativo y divulgativo</strong>.
          No constituyen asesoramiento jurídico, fiscal, laboral ni de ningún otro tipo. La información puede no
          reflejar las últimas modificaciones normativas.
        </p>
        <p>
          TrámitesEspaña no se responsabiliza de las decisiones adoptadas por los usuarios basándose en la
          información aquí publicada. Para situaciones concretas, se recomienda consultar con un profesional
          habilitado (abogado, asesor fiscal, graduado social) o acudir directamente a los organismos oficiales
          competentes.
        </p>

        <h2>4. Propiedad intelectual e industrial</h2>
        <p>
          Los textos, gráficos, logotipos, iconos, imágenes y demás elementos del sitio web son propiedad de
          TrámitesEspaña o de terceros que han autorizado su uso. Quedan protegidos por la legislación española e
          internacional sobre propiedad intelectual e industrial.
        </p>
        <p>
          Queda prohibida la reproducción total o parcial de los contenidos sin autorización expresa y por escrito
          del titular, salvo para uso personal y no comercial.
        </p>

        <h2>5. Limitación de responsabilidad</h2>
        <p>TrámitesEspaña no garantiza:</p>
        <ul>
          <li>La exactitud, exhaustividad o actualidad de los contenidos.</li>
          <li>La disponibilidad continua e ininterrumpida del sitio web.</li>
          <li>La ausencia de virus u otros elementos dañinos en el sitio o en los servidores que lo alojan.</li>
          <li>La idoneidad de los contenidos para los fines concretos del usuario.</li>
        </ul>
        <p>
          Los enlaces externos (a organismos oficiales, BOE u otros sitios) se facilitan únicamente como referencia.
          TrámitesEspaña no controla ni asume responsabilidad por los contenidos de terceros enlazados.
        </p>

        <h2>6. Publicidad</h2>
        <p>
          Este sitio puede mostrar anuncios a través de Google AdSense. Los anunciantes son responsables de sus
          propios contenidos. TrámitesEspaña no avala los productos o servicios anunciados.
        </p>

        <h2>7. Legislación aplicable y jurisdicción</h2>
        <p>
          El presente aviso legal se rige por la legislación española. Para cualquier controversia derivada del acceso
          o uso de este sitio, las partes se someten, con renuncia expresa a cualquier otro fuero, a los juzgados y
          tribunales competentes conforme a la legislación vigente.
        </p>
      </div>
    </div>
  )
}
