'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'

const servicesData = [
  {
    icon: 'guided-tours.png',
    titleKey: 'services.guided_tours',
    descKey: 'services.desc'
  },
  {
    icon: 'best-flight-options.png',
    titleKey: 'services.best_flights',
    descKey: 'services.desc'
  },
  {
    icon: 'religious-tours.png',
    titleKey: 'services.religious_tours',
    descKey: 'services.desc'
  },
  {
    icon: 'medical-insurance.png',
    titleKey: 'services.medical_insurance',
    descKey: 'services.desc'
  }
]

export default function Services() {
  const { t } = useTranslation('common')

  return (
    <section className='py-20 text-center lg:py-28'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-16 flex flex-col items-center gap-2'>
          <h3 className='font-bold uppercase tracking-widest text-primary'>{t('services.category')}</h3>
          <h2 className='font-serif text-3xl font-bold text-[#181E4B] md:text-5xl'>{t('services.title')}</h2>
        </div>

        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          {servicesData.map((item, index) => (
            <div key={index} className='group relative flex flex-col items-center p-6 sm:p-8'>
              <div className='flex h-full w-full flex-col items-center rounded-[36px] bg-white p-6 transition-all duration-300 hover:shadow-xl hover:shadow-gray-100 hover:ring-1 hover:ring-gray-50'>
                <div className='relative mb-6 h-20 w-20'>
                  <Image src={`/images/home/${item.icon}`} alt={t(item.titleKey)} fill className='object-contain' />
                </div>

                <h4 className='mb-3 font-serif text-xl font-semibold text-[#1E1D4C]'>{t(item.titleKey)}</h4>

                <p className='w-3/4 text-sm font-medium leading-relaxed text-[#5E6282]'>{t(item.descKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
