'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'

const partners = [
  { name: 'Fly Emirates', src: '/images/home/fly-emirate.png' },
  { name: 'Trivago', src: '/images/home/trivago.png' },
  { name: 'Airbnb', src: '/images/home/airbnb.png' },
  { name: 'Turkish Airlines', src: '/images/home/turkish-airline.png' },
  { name: 'Swiss', src: '/images/home/swiss.png' }
]

const avatars = [
  'https://i.pravatar.cc/150?u=1',
  'https://i.pravatar.cc/150?u=2',
  'https://i.pravatar.cc/150?u=3',
  'https://i.pravatar.cc/150?u=4',
  'https://i.pravatar.cc/150?u=5',
  'https://i.pravatar.cc/150?u=6'
]

export default function Hero() {
  const { t } = useTranslation('common')

  return (
    <section className='relative w-full'>
      <div className='relative h-[calc(100vh-80px)] min-h-[700px] w-full'>
        <div className='absolute inset-0'>
          <Image
            src='/images/home/background-1.png'
            alt='Hero Background'
            fill
            priority
            className='object-cover object-center'
            quality={100}
          />
          <div className='absolute inset-0 bg-black/10' />
        </div>

        <div className='container relative z-10 mx-auto flex h-full flex-col justify-center px-4 sm:px-6 lg:px-8'>
          <div className='mb-8 max-w-3xl'>
            <svg
              width='60'
              height='12'
              viewBox='0 0 60 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='mb-4'
            >
              <path
                d='M2 10L12 2L22 10L32 2L42 10L52 2'
                stroke='#DF6951'
                strokeWidth='3'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <h1 className='font-serif text-5xl font-bold leading-tight text-white drop-shadow-lg md:text-6xl lg:text-7xl'>
              {t('hero.subtitle')}
            </h1>
          </div>

          <div className='flex items-center gap-4'>
            <div className='flex -space-x-3'>
              {avatars.map((avatar, index) => (
                <div key={index} className='relative h-10 w-10 overflow-hidden rounded-full border-2 border-white'>
                  <Image src={avatar} alt='User' fill className='object-cover' />
                </div>
              ))}
              <div className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-primary text-xs font-bold text-white'>
                +
              </div>
            </div>
            <p className='text-sm font-medium text-white drop-shadow-md'>{t('hero.booked_info')}</p>
          </div>
        </div>
      </div>

      <div className='bg-[#F7F7F7] py-10'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-wrap items-center justify-center gap-8 opacity-60 grayscale transition-all hover:grayscale-0 md:justify-between'>
            {partners.map((partner) => (
              <div key={partner.name} className='relative h-8 w-24 sm:h-10 sm:w-32 lg:h-12 lg:w-40'>
                <Image src={partner.src} alt={partner.name} fill className='object-contain' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
