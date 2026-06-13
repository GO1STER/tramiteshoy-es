import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre nosotros',
  description:
    'Conoce el equipo detrás de TrámitesHoy, un proyecto independiente dedicado a explicar la burocracia española de forma clara y accesible.',
  alternates: { canonical: '/sobre-nosotros' },
}

export default function SobreNosotrosPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Sobre nosotros</h1>

      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <p>
          <strong>TrámitesHoy</strong> es un proyecto editorial independiente creado con un objetivo simple:
          explicar la burocracia española en un lenguaje claro, sin tecnicismos innecesarios y siempre actualizado.
        </p>

        <h2>¿Por qué existe este sitio?</h2>
        <p>
          Cualquiera que haya intentado solicitar una prestación, darse de alta como autónomo o renovar el carné de
          conducir sabe lo frustrante que puede resultar navegar por la web de la administración pública española. Los
          procedimientos cambian, los plazos varían y la información oficial suele ser difícil de entender.
        </p>
        <p>
          Nació de esa frustración. Somos redactores y especialistas en derecho administrativo y fiscalidad que
          creemos que acceder a información pública no debería requerir un título universitario.
        </p>

        <h2>Cómo trabajamos</h2>
        <p>
          Cada artículo es redactado y revisado por personas con conocimiento del tema, contrastado con fuentes
          oficiales (BOE, webs de ministerios, Seguridad Social, AEAT, DGT) y actualizado cuando cambian los
          procedimientos o cuantías.
        </p>
        <p>
          <strong>Importante:</strong> La información de este sitio es orientativa y no constituye asesoramiento
          jurídico, fiscal ni laboral. Ante dudas concretas sobre tu situación personal, te recomendamos consultar
          con un profesional colegiado o acudir directamente al organismo competente.
        </p>

        <h2>Financiación</h2>
        <p>
          Este sitio se financia mediante publicidad contextual a través de Google AdSense. No recibimos
          comisiones por recomendar ningún trámite, producto o servicio. Las guías son editorialmente independientes.
        </p>

        <h2>Contacto</h2>
        <p>
          Si detectas un error, una información desactualizada o quieres proponer un tema, puedes escribirnos desde
          la <a href="/contacto">página de contacto</a>.
        </p>
      </div>
    </div>
  )
}
