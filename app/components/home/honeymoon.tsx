'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useParams } from 'next/navigation'
import { PATH } from '@/constants/path'

export default function Honeymoon() {
  const { t } = useTranslation('common')
  const params = useParams()
  const lng = (params.lng as string) || 'en'

  return (
    <section className='overflow-hidden py-20 lg:py-28'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24'>
          {/* Left Column: Image Composition */}
          <div className='relative flex justify-center lg:justify-end'>
            <div className='relative h-[500px] w-full max-w-md'>
              <div className='relative h-full w-full overflow-hidden rounded-t-[200px] shadow-2xl'>
                <Image src='/images/home/honeymoon-special.png' alt='Honeymoon Couple' fill className='object-cover' />
              </div>
            </div>
          </div>

          <div className='flex flex-col items-start text-left'>
            <h3 className='mb-2 font-bold uppercase tracking-widest text-primary'>{t('honeymoon.subtitle')}</h3>

            <h2 className='mb-6 font-serif text-4xl font-bold leading-tight text-[#181E4B] lg:text-5xl'>
              {t('honeymoon.title')}
            </h2>

            <p className='mb-8 text-base leading-loose text-[#5E6282]'>{t('honeymoon.desc')}</p>

            <Link href={`/${lng}${PATH.TOURS}`}>
              <button className='rounded-md bg-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-orange-200 transition-all hover:-translate-y-1 hover:bg-primary-hover'>
                {t('honeymoon.button')}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
