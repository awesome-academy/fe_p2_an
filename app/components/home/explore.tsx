'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useParams } from 'next/navigation'
import { PATH } from '@/constants/path'

export default function Explore() {
  const { t } = useTranslation('common')
  const params = useParams()
  const lng = (params.lng as string) || 'en'

  const items = [
    {
      subtitleKey: 'explore.subtitle',
      titleKey: 'explore.nature_title',
      img: 'explore-nature.png',
      path: PATH.TOURS
    },
    {
      subtitleKey: 'explore.subtitle',
      titleKey: 'explore.cities_title',
      img: 'explore-city.png',
      path: PATH.TOURS
    }
  ]

  return (
    <section className='w-full'>
      <div className='grid h-auto min-h-[500px] w-full grid-cols-1 md:grid-cols-2'>
        {items.map((item, index) => (
          <div
            key={index}
            className='group relative flex h-[500px] w-full items-center justify-center overflow-hidden md:h-[600px]'
          >
            <div className='absolute inset-0'>
              <Image
                src={`/images/home/${item.img}`}
                alt={t(item.titleKey)}
                fill
                className='object-cover transition-transform duration-700 group-hover:scale-110'
                quality={100}
              />
              <div className='absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/40' />
            </div>

            <div className='relative z-10 flex flex-col items-center text-center text-white'>
              <span className='mb-2 text-sm font-bold uppercase tracking-[0.2em] opacity-90'>
                {t(item.subtitleKey)}
              </span>

              <h2 className='relative mb-8 font-serif text-4xl font-bold md:text-5xl lg:text-6xl'>
                {t(item.titleKey)}
                <div className='absolute -bottom-4 left-1/2 h-3 w-32 -translate-x-1/2'>
                  <svg
                    viewBox='0 0 200 20'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-full opacity-80'
                  >
                    <path
                      d='M2 12C40 12 50 2 90 2C130 2 140 12 198 12'
                      stroke='white'
                      strokeWidth='4'
                      strokeLinecap='round'
                    />
                  </svg>
                </div>
              </h2>

              <Link
                href={`/${lng}${item.path}`}
                className='mt-4 inline-block rounded-lg border-2 border-white/80 px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-black hover:shadow-lg'
              >
                {t('explore.button')}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
