'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useParams } from 'next/navigation'
import { PATH } from '@/constants/path'

const tours = [
  {  img: 'europe-1.png' },
  {  img: 'europe-2.png' },
  {  img: 'europe-3.png' },
  { img: 'europe-4.png' }
]

export default function EuropePromotion() {
  const { t } = useTranslation('common')
  const params = useParams()
  const lng = (params.lng as string) || 'en'

  return (
    <section className='overflow-hidden py-20 lg:py-28'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-16 grid grid-cols-1 gap-12 lg:grid-cols-2'>
          <div className='flex flex-col justify-center'>
            <h3 className='mb-2 font-bold uppercase tracking-widest text-primary'>{t('europe.subtitle')}</h3>
            <h2 className='mb-6 font-serif text-4xl font-bold leading-tight text-[#181E4B] lg:text-5xl'>
              {t('europe.title')}
            </h2>
            <p className='mb-8 text-base leading-loose text-[#5E6282]'>{t('europe.desc')}</p>
            <Link href={`/${lng}${PATH.TOURS}`}>
              <button className='rounded-md bg-primary px-8 py-3 text-base font-bold text-white shadow-lg shadow-orange-200 transition-all hover:-translate-y-1 hover:bg-primary-hover'>
                {t('europe.button')}
              </button>
            </Link>
          </div>

          <div className='relative flex justify-center lg:justify-end'>
            <div
              className='absolute -right-10 top-1/2 hidden -translate-y-1/2 rotate-180 transform text-6xl font-bold tracking-widest text-gray-100 xl:block'
              style={{ writingMode: 'vertical-rl' }}
            >
              {t('europe.decor_text')}
            </div>

            <div className='relative h-[500px] w-full max-w-md'>
              <div className='relative h-full w-full overflow-hidden rounded-t-full border-[10px] border-white shadow-2xl ring-1 ring-gray-100'>
                <Image
                  src='/images/home/euro-5.png'
                  alt='Europe Sightseeing'
                  fill
                  className='object-cover'
                />
              </div>

              <div className='absolute -inset-4 -z-10 rounded-t-full border-2 border-primary/30' />
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4'>
          {tours.map((tour, index) => (
            <div key={index} className='group relative h-48 w-full overflow-hidden rounded-2xl shadow-md sm:h-64'>
              <Image
                src={`/images/home/${tour.img}`}
                alt='Tour Destination'
                fill
                className='object-cover transition-transform duration-500 group-hover:scale-110'
              />

              <div className='absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20' />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
