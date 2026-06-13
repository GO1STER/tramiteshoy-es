export interface Category {
  slug: string
  name: string
  description: string
  icon: string
  color: string
}

export const CATEGORIES: Category[] = [
  {
    slug: 'ayudas-y-subvenciones',
    name: 'Ayudas y Subvenciones',
    description: 'Bonos, ayudas al alquiler, subvenciones autonómicas y estatales.',
    icon: '💰',
    color: 'bg-green-50 text-green-700 border-green-200',
  },
  {
    slug: 'autonomos',
    name: 'Autónomos',
    description: 'Alta, baja, cuota de autónomos, tarifa plana y gestión fiscal.',
    icon: '💼',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    slug: 'empleo-y-paro',
    name: 'Empleo y Paro',
    description: 'Prestación por desempleo, ERTE, subsidios y búsqueda de empleo.',
    icon: '👔',
    color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  },
  {
    slug: 'tramites-dgt',
    name: 'Trámites DGT',
    description: 'Carné de conducir, transferencias, ITV y multas de tráfico.',
    icon: '🚗',
    color: 'bg-red-50 text-red-700 border-red-200',
  },
  {
    slug: 'seguridad-social',
    name: 'Seguridad Social',
    description: 'Afiliación, pensiones, incapacidad temporal y tarjeta sanitaria.',
    icon: '🏥',
    color: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  {
    slug: 'hacienda',
    name: 'Hacienda',
    description: 'Declaración de la renta, IVA, modelos tributarios y devoluciones.',
    icon: '🏛️',
    color: 'bg-orange-50 text-orange-700 border-orange-200',
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug)
}
