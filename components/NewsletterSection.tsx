import { NewsletterForm } from './NewsletterForm'

export function NewsletterSection() {
  return (
    <section className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-3xl p-8 sm:p-12 text-white">
      <div className="max-w-2xl mx-auto text-center">
        <div className="text-4xl mb-4">📬</div>
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
          Alertas de ayudas y trámites
        </h2>
        <p className="text-brand-100 mb-8 text-base sm:text-lg leading-relaxed">
          Recibe un aviso cuando publiquemos nuevas guías sobre ayudas, subvenciones,
          prestaciones y trámites. Sin spam, solo lo que te interesa.
        </p>
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5">
          <NewsletterForm />
        </div>
        <p className="mt-4 text-xs text-brand-200">
          Sin spam. Puedes darte de baja cuando quieras. Consulta nuestra{' '}
          <a href="/politica-de-privacidad" className="underline hover:text-white">
            política de privacidad
          </a>
          .
        </p>
      </div>
    </section>
  )
}
