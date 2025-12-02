'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'

export default function Promotion() {
  const { t } = useTranslation('common')

  return (
    <section className='relative w-full py-24 lg:py-32'>
      <div className='absolute inset-0'>
        <Image
          src='/images/home/free-statue.png'
          alt='Statue of Liberty Background'
          fill
          className='object-cover object-center'
          quality={100}
        />
        <div className='absolute inset-0 bg-black/10' />
      </div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='relative z-10 max-w-2xl'>
          <h2 className='flex flex-col font-serif text-4xl font-bold leading-tight text-white drop-shadow-lg md:text-5xl lg:text-6xl'>
            <span>{t('promotion.title_1')}</span>
            <span className='mt-2'>{t('promotion.title_2')}</span>
          </h2>

          <div className='mt-4 w-48 md:w-64'>
            <svg viewBox='0 0 200 20' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-full'>
              <path
                d='M2 12C40 12 50 2 90 2C130 2 140 12 198 12'
                stroke='white'
                strokeWidth='3'
                strokeLinecap='round'
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
