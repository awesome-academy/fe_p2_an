'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'

export default function AboutHero() {
  const { t } = useTranslation('about')

  return (
    <section className='relative w-full'>
      <div className='relative h-[500px] w-full md:h-[600px] lg:h-[700px]'>
        <div className='absolute inset-0'>
          <Image
            src='/images/about/background-1.png'
            alt='About Us Background'
            fill
            priority
            className='object-cover object-center'
            quality={100}
          />
        </div>

        <div className='container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white'>
          <span className='mb-2 text-sm font-bold uppercase tracking-[0.3em] opacity-90 md:text-base'>
            {t('hero.read')}
          </span>

          <h1 className='font-script text-7xl font-bold leading-tight drop-shadow-lg md:text-8xl lg:text-9xl'>
            {t('hero.title')}
          </h1>
        </div>
      </div>
    </section>
  )
}
