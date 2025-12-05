'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useParams } from 'next/navigation'
import { PATH } from '@/constants/path'

export default function AboutPromotion() {
  const { t } = useTranslation('about')
  const params = useParams()
  const lng = (params.lng as string) || 'en'

  return (
    <section className='overflow-hidden py-20 lg:py-28'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20'>
          <div className='flex flex-col items-start text-left'>
            <h3 className='mb-2 font-bold uppercase tracking-widest text-primary'>
              {t('promotion.subtitle')}
            </h3>

            <h2 className='mb-6 font-serif text-4xl font-bold leading-tight text-[#181E4B] lg:text-5xl'>
              {t('promotion.title')}
            </h2>

            <p className='mb-8 text-base leading-loose text-[#5E6282]'>{t('promotion.desc')}</p>

            <Link href={`/${lng}${PATH.TOURS}`}>
              <button className='rounded-md bg-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-orange-200 transition-all hover:-translate-y-1 hover:bg-primary-hover'>
                {t('promotion.button')}
              </button>
            </Link>
          </div>

          <div className='relative flex items-center justify-center'>
            <div className='absolute inset-0 -z-10 flex items-center justify-center'>
              <div className='h-[450px] w-[450px] rounded-full border-[2px] border-dashed border-primary/40 opacity-70 lg:h-[550px] lg:w-[550px]' />

              <div className='absolute h-[420px] w-[420px] rounded-full border-[1px] border-primary/20 lg:h-[520px] lg:w-[520px]' />
            </div>

            <div className='relative h-[350px] w-[350px] overflow-hidden rounded-full border-8 border-white shadow-2xl lg:h-[450px] lg:w-[450px]'>
              <Image
                src='/images/about/promotion-1.png'
                alt='Europe Sightseeing'
                fill
                className='object-cover'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
