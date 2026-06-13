import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contacta con el equipo de TrámitesHoy para correcciones, sugerencias o consultas sobre el sitio.',
  alternates: { canonical: '/contacto' },
  robots: { index: false },
}

export default function ContactoPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Contacto</h1>
      <p className="text-lg text-gray-600 mb-10">
        ¿Has detectado un error? ¿Quieres sugerir un tema? Escríbenos y te responderemos en un plazo de 2 a 5 días
        laborables.
      </p>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 mb-8 text-sm text-yellow-800">
        <strong>Aviso importante:</strong> No podemos responder consultas jurídicas, fiscales ni laborales sobre
        situaciones personales. Para eso, consulta con un profesional colegiado o acude al organismo oficial
        correspondiente.
      </div>

      <form
        action="https://formsubmit.co/rosillon8@gmail.com"
        method="POST"
        className="space-y-5"
      >
        <input type="hidden" name="_subject" value="Contacto desde TrámitesHoy" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value="/contacto?enviado=1" />

        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1.5">
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            autoComplete="name"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 mb-1.5">
            Asunto
          </label>
          <select
            id="asunto"
            name="asunto"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition bg-white"
          >
            <option value="error">He encontrado un error en un artículo</option>
            <option value="sugerencia">Sugerencia de tema</option>
            <option value="actualizacion">Información desactualizada</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        <div>
          <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1.5">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={6}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition resize-y"
            placeholder="Cuéntanos en qué podemos mejorar..."
          />
        </div>

        <p className="text-xs text-gray-500">
          Al enviar este formulario aceptas nuestra{' '}
          <a href="/politica-de-privacidad" className="underline hover:text-brand-600">
            Política de privacidad
          </a>
          . Tus datos no serán cedidos a terceros.
        </p>

        <button
          type="submit"
          className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          Enviar mensaje
        </button>
      </form>
    </div>
  )
}
