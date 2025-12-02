'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { Map, Waves, CarTaxiFront } from 'lucide-react'

const stepsData = [
  {
    icon: Map,
    color: 'bg-[#F0BB1F]',
    titleKey: 'fast_easy.step1_title',
    descKey: 'fast_easy.step1_desc'
  },
  {
    icon: Waves,
    color: 'bg-[#F15A2B]',
    titleKey: 'fast_easy.step2_title',
    descKey: 'fast_easy.step2_desc'
  },
  {
    icon: CarTaxiFront,
    color: 'bg-[#006380]',
    titleKey: 'fast_easy.step3_title',
    descKey: 'fast_easy.step3_desc'
  }
]

export default function FastAndEasy() {
  const { t } = useTranslation('common')

  return (
    <section className='py-20 lg:py-28'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24'>
          <div className='flex flex-col items-start text-left'>
            <h3 className='mb-2 font-bold uppercase tracking-widest text-primary'>{t('fast_easy.subtitle')}</h3>

            <h2 className='mb-10 font-serif text-4xl font-bold leading-tight text-[#181E4B] lg:text-5xl'>
              {t('fast_easy.title')}
            </h2>

            <div className='flex flex-col gap-8'>
              {stepsData.map((step, index) => (
                <div key={index} className='flex items-center gap-6'>
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[13px] text-white ${step.color}`}
                  >
                    <step.icon size={20} />
                  </div>

                  <div className='flex flex-col'>
                    <h4 className='font-bold text-[#5E6282]'>{t(step.titleKey)}</h4>
                    <p className='text-sm leading-relaxed text-[#5E6282]'>{t(step.descKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='relative flex items-center justify-center'>
            <div className='absolute left-1/2 top-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-[#59B1E6] opacity-40 blur-[90px] filter' />

            <div className='relative h-[600px] w-full'>
              <Image src='/images/home/fast-and-easy.png' alt='Fast and Easy Booking' fill className='object-contain' />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
