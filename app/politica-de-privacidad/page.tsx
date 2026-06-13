import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: 'Política de privacidad de TrámitesHoy conforme al RGPD y la LOPDGDD española.',
  alternates: { canonical: '/politica-de-privacidad' },
}

const SITE_NAME = 'TrámitesHoy'
const SITE_URL = 'https://tramiteshoy.es'
const CONTACT_EMAIL = 'privacidad@tramiteshoy.es'
const LAST_UPDATED = '1 de junio de 2025'

export default function PrivacidadPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Política de privacidad</h1>
      <p className="text-sm text-gray-500 mb-10">Última actualización: {LAST_UPDATED}</p>

      <div className="prose prose-lg max-w-none text-gray-700">
        <h2>1. Responsable del tratamiento</h2>
        <p>
          El responsable del tratamiento de los datos personales recogidos a través del sitio web <strong>{SITE_URL}</strong> es:
        </p>
        <ul>
          <li><strong>Denominación:</strong> {SITE_NAME}</li>
          <li><strong>Correo electrónico de contacto:</strong> {CONTACT_EMAIL}</li>
        </ul>

        <h2>2. Datos que recogemos y finalidades</h2>
        <h3>2.1 Datos de navegación (cookies y analítica)</h3>
        <p>
          Cuando visitas este sitio, podemos recoger datos de navegación de forma automática (dirección IP anonimizada,
          páginas visitadas, tiempo de permanencia, dispositivo y navegador) con las siguientes finalidades:
        </p>
        <ul>
          <li><strong>Análisis de audiencia</strong> (base jurídica: consentimiento) mediante Google Analytics 4, que
          anonimiza las IPs y aplica medidas de privacidad conforme al RGPD.</li>
          <li><strong>Publicidad contextual</strong> (base jurídica: consentimiento) mediante Google AdSense, que puede
          utilizar cookies para mostrar anuncios relevantes.</li>
        </ul>
        <p>
          Estas cookies solo se activan si das tu consentimiento a través del banner de cookies. Puedes retirar el
          consentimiento en cualquier momento desde la <a href="/politica-de-cookies">Política de cookies</a>.
        </p>

        <h3>2.2 Formulario de contacto</h3>
        <p>
          Si nos envías un mensaje a través del formulario de contacto, recogemos tu nombre y dirección de correo
          electrónico con la finalidad de gestionar tu consulta o sugerencia. La base jurídica es el consentimiento
          expreso. Los datos no se ceden a terceros y se eliminan una vez resuelta la comunicación.
        </p>

        <h2>3. Transferencias internacionales</h2>
        <p>
          Google LLC, proveedor de Analytics y AdSense, puede transferir datos a servidores en Estados Unidos. Estas
          transferencias se amparan en las Cláusulas Contractuales Tipo aprobadas por la Comisión Europea y en el
          marco del Data Privacy Framework UE-EE.UU. Más información en la{' '}
          <a href="https://policies.google.com/privacy" rel="noopener noreferrer" target="_blank">
            Política de privacidad de Google
          </a>.
        </p>

        <h2>4. Plazo de conservación</h2>
        <p>
          Los datos de contacto se conservan durante el tiempo necesario para resolver la comunicación y, como máximo,
          3 años. Los datos de analítica se conservan según la configuración de Google Analytics (por defecto, 14 meses).
        </p>

        <h2>5. Tus derechos</h2>
        <p>
          Conforme al RGPD (UE) 2016/679 y la LOPDGDD (Ley Orgánica 3/2018), tienes derecho a:
        </p>
        <ul>
          <li><strong>Acceso:</strong> conocer qué datos tuyos tratamos.</li>
          <li><strong>Rectificación:</strong> corregir datos inexactos.</li>
          <li><strong>Supresión:</strong> solicitar que eliminemos tus datos («derecho al olvido»).</li>
          <li><strong>Limitación:</strong> restringir el tratamiento en determinadas circunstancias.</li>
          <li><strong>Portabilidad:</strong> recibir tus datos en formato estructurado.</li>
          <li><strong>Oposición:</strong> oponerte al tratamiento basado en interés legítimo.</li>
          <li><strong>Retirada del consentimiento</strong> en cualquier momento, sin que ello afecte a la licitud del
          tratamiento previo.</li>
        </ul>
        <p>
          Para ejercer estos derechos, escríbenos a <strong>{CONTACT_EMAIL}</strong> con el asunto «Derechos RGPD» e
          indica el derecho que deseas ejercer, adjuntando copia de un documento de identidad.
        </p>
        <p>
          Si consideras que el tratamiento no se ajusta a la normativa, puedes presentar una reclamación ante la{' '}
          <a href="https://www.aepd.es" rel="noopener noreferrer" target="_blank">
            Agencia Española de Protección de Datos (AEPD)
          </a>.
        </p>

        <h2>6. Menores de edad</h2>
        <p>
          Este sitio no está dirigido a menores de 14 años y no recogemos conscientemente datos personales de menores.
          Si detectas que un menor ha facilitado sus datos sin consentimiento parental, contáctanos para eliminarlos.
        </p>

        <h2>7. Cambios en esta política</h2>
        <p>
          Podemos actualizar esta política para adaptarla a cambios normativos o de funcionamiento del sitio. La fecha
          de última actualización siempre estará visible al inicio de esta página. Te recomendamos revisarla
          periódicamente.
        </p>
      </div>
    </div>
  )
}
