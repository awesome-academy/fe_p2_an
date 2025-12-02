'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useParams } from 'next/navigation'
import { Calendar, MapPin, Flag } from 'lucide-react'
import { PATH } from '@/constants/path'
import { Tour } from '@/types/db'
import { useQuery } from '@tanstack/react-query'
import ProductRating from '@/app/components/common/product-rating'
import PriceDisplay from '@/app/components/common/price-display'

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? (process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '')

const fetchTrendingTours = async (): Promise<Tour[]> => {
  const res = await fetch(`${API_URL}/tours?_limit=3`)

  if (!res.ok) {
    const errorText = await res.text().catch(() => 'Unknown error')
    throw new Error(`Failed to fetch tours: ${res.status} ${res.statusText} - ${errorText}`)
  }

  const contentType = res.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) {
    const text = await res.text().catch(() => 'Unknown body')
    throw new Error(`Invalid JSON response: ${text}`)
  }

  try {
    return await res.json()
  } catch {
    const text = await res.text().catch(() => 'Unknown body')
    const error = new Error('Failed to parse JSON response') as Error & {
      hint?: string
      responsePreview?: string
      endpoint?: string
    }
    error.hint = 'Check if backend /tours API returns valid JSON.'
    error.responsePreview = text
    error.endpoint = `${API_URL}/tours?_limit=3`

    throw error
  }
}

export default function Trending() {
  const { t } = useTranslation('common')
  const params = useParams()
  const lng = (params.lng as string as 'en' | 'vi') || 'en'

  const {
    data: tours,
    isLoading,
    error
  } = useQuery({
    queryKey: ['trending-tours'],
    queryFn: fetchTrendingTours
  })

  if (isLoading) {
    return <div className='py-20 text-center text-gray-500'>{t('common.loading')}</div>
  }

  if (error) {
    return (
      <div className='py-20 text-center'>
        <p className='mb-2 font-bold text-red-500'>{t('common.error_loading')}</p>
        <p className='font-mono text-sm text-gray-400'>
          {error instanceof Error ? error.message : 'Unknown error occurred'}
        </p>
      </div>
    )
  }

  return (
    <section className='py-20 lg:py-28'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-12 text-center'>
          <h3 className='mb-2 font-bold uppercase tracking-widest text-primary'>{t('trending.subtitle')}</h3>
          <h2 className='font-serif text-4xl font-bold text-[#181E4B] lg:text-5xl'>{t('trending.title')}</h2>
        </div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {tours?.map((tour) => (
            <div
              key={tour.id}
              className='group relative flex flex-col overflow-hidden rounded-[30px] bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl'
            >
              <div className='relative h-64 w-full overflow-hidden'>
                <Image
                  src={tour.images?.[0] || '/images/placeholder.jpg'}
                  alt={tour.name[lng]}
                  fill
                  className='object-cover transition-transform duration-500 group-hover:scale-110'
                />

                <div className='absolute -bottom-6 left-8 flex h-12 w-12 items-center justify-center rounded-full bg-white p-1 shadow-md'>
                  <Flag size={24} className='text-primary' fill='currentColor' />
                </div>
              </div>

              <div className='flex flex-1 flex-col p-8 pt-10'>
                <div className='mb-4 flex items-center justify-between text-sm font-medium text-gray-500'>
                  <div className='flex items-center gap-2'>
                    <Calendar size={16} />
                    <span>{tour.duration[lng]}</span>
                  </div>
                </div>

                <div className='mb-2 flex items-start justify-between'>
                  <h3 className='line-clamp-1 text-xl font-bold text-[#181E4B] transition-colors group-hover:text-primary'>
                    {tour.name[lng]}
                  </h3>
                  <ProductRating rating={tour.rating} showCount={false} />
                </div>

                <div className='mb-4 flex items-center gap-2 text-gray-500'>
                  <MapPin size={16} />
                  <span className='text-sm'>{tour.destination}</span>
                </div>

                <div className='mb-4 flex items-center gap-3'>
                  <PriceDisplay price={tour.price} currency='USD' className='text-2xl font-bold text-primary' />

                  <PriceDisplay
                    price={Math.round(tour.price * 1.1)}
                    currency='USD'
                    className='text-lg text-gray-400 line-through'
                  />
                </div>

                <p className='mb-6 line-clamp-2 text-sm leading-relaxed text-gray-500'>{tour.description[lng]}</p>

                <Link href={`/${lng}${PATH.TOURS}/${tour.id}`} className='mt-auto'>
                  <button className='w-full rounded-lg bg-primary py-3 text-sm font-bold text-white shadow-lg shadow-orange-200 transition-all hover:bg-primary-hover hover:shadow-xl'>
                    {t('trending.explore_now')}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
