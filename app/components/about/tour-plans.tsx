'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'

const CircularProgress = ({ percentage, color, label }: { percentage: number; color: string; label: string }) => {
  const radius = 40
  const stroke = 8
  const normalizedRadius = radius - stroke * 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className='flex flex-col items-center gap-4'>
      <div className='relative flex items-center justify-center'>
        <svg height={radius * 2} width={radius * 2} className='rotate-[-90deg] transform'>
          <circle
            stroke='#E5E7EB'
            strokeWidth={stroke}
            fill='transparent'
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke={color}
            fill='transparent'
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset, transition: 'stroke-dashoffset 1s ease-in-out' }}
            strokeLinecap='round'
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <span className='absolute text-xl font-bold text-gray-600'>{percentage}%</span>
      </div>
      <span className='text-xs font-bold uppercase tracking-wider text-[#181E4B]'>{label}</span>
    </div>
  )
}

export default function AboutTourPlans() {
  const { t } = useTranslation('about')

  const stats = [
    { percentage: 78, color: '#3B82F6', label: t('tour_plans.vacations') }, // Blue
    { percentage: 55, color: '#EC4899', label: t('tour_plans.honeymoon') }, // Pink
    { percentage: 30, color: '#8B5CF6', label: t('tour_plans.musical') } // Purple
  ]

  return (
    <section className='py-20 lg:py-28'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center'>
          <div className='relative flex justify-center'>
            <div className='absolute -top-10 right-10 z-0 h-32 w-32 rounded-full border-2 border-dashed border-gray-300 opacity-50 lg:right-20' />

            <div className='relative h-[400px] w-[350px] sm:h-[500px] sm:w-[450px]'>
              <div className='absolute left-10 top-10 h-[300px] w-[250px] rotate-6 bg-white p-3 shadow-xl sm:h-[380px] sm:w-[300px]'>
                <div className='relative h-full w-full overflow-hidden bg-gray-100'>
                  <Image
                    src='/images/about/trend-1.png'
                    alt='Tour Photo Back'
                    fill
                    className='object-cover opacity-80'
                  />
                </div>
              </div>

              <div className='absolute left-0 top-0 z-10 h-[300px] w-[250px] -rotate-6 bg-white p-3 shadow-2xl transition-transform hover:scale-105 sm:h-[380px] sm:w-[300px]'>
                <div className='relative h-3/4 w-full overflow-hidden bg-gray-100'>
                  <Image src='/images/about/trend-1.png' alt='Tour Photo Front' fill className='object-cover' />
                </div>
                <div className='flex h-1/4 items-center justify-center'>
                  <span className='font-script text-4xl text-gray-600 opacity-80'>Travel</span>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col'>
            <h3 className='mb-2 font-bold uppercase tracking-widest text-primary'>
              {t('tour_plans.subtitle')}
            </h3>

            <h2 className='mb-6 font-serif text-4xl font-bold leading-tight text-[#181E4B] lg:text-5xl'>
              {t('tour_plans.title')}
            </h2>

            <p className='mb-12 text-base leading-loose text-[#5E6282]'>{t('tour_plans.desc')}</p>

            <div className='flex flex-wrap gap-12'>
              {stats.map((stat, index) => (
                <CircularProgress key={index} percentage={stat.percentage} color={stat.color} label={stat.label} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
