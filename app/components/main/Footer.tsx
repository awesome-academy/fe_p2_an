'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { Facebook, Linkedin, Twitter, Infinity } from 'lucide-react'
import { PATH } from '@/constants/path'

export default function Footer() {
  const { t } = useTranslation('common')
  const params = useParams()
  const lng = (params.lng as string) || 'en'

  return (
    <footer className='bg-white pb-8 pt-16'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5'>
          {/* Brand Column */}
          <div className='flex flex-col gap-6 lg:col-span-2'>
            <Link href={`/${lng}${PATH.HOME}`} className='text-4xl font-extrabold text-[#181E4B]'>
              Travel
            </Link>
            <p className='max-w-xs text-sm leading-relaxed text-gray-500'>{t('footer.brand_desc')}</p>
            <div className='mt-2 flex items-center gap-4'>
              <a href='#' className='text-primary transition-transform hover:scale-110'>
                <Linkedin size={20} fill='currentColor' />
              </a>
              <a href='#' className='text-primary transition-transform hover:scale-110'>
                <Facebook size={20} fill='currentColor' />
              </a>
              <a href='#' className='text-primary transition-transform hover:scale-110'>
                <Twitter size={20} fill='currentColor' />
              </a>
              <a href='#' className='text-primary transition-transform hover:scale-110'>
                <Infinity size={20} />
              </a>
            </div>
          </div>

          {/* Company Column */}
          <div className='flex flex-col gap-6'>
            <h4 className='text-xl font-bold text-[#181E4B]'>{t('footer.company')}</h4>
            <ul className='flex flex-col gap-4 font-medium text-gray-500'>
              <li>
                <Link href={`/${lng}${PATH.ABOUT}`} className='transition-colors hover:text-primary'>
                  {t('footer.about_us')}
                </Link>
              </li>
              <li>
                <Link href={`/${lng}${PATH.CAREERS}`} className='transition-colors hover:text-primary'>
                  {t('footer.careers')}
                </Link>
              </li>
              <li>
                <Link href={`/${lng}${PATH.BLOG}`} className='transition-colors hover:text-primary'>
                  {t('footer.blog')}
                </Link>
              </li>
              <li>
                <Link href={`/${lng}${PATH.PRICING}`} className='transition-colors hover:text-primary'>
                  {t('footer.pricing')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Destinations Column */}
          <div className='flex flex-col gap-6'>
            <h4 className='text-xl font-bold text-[#181E4B]'>{t('footer.destinations')}</h4>
            <ul className='flex flex-col gap-4 font-medium text-gray-500'>
              <li>
                <Link href='#' className='transition-colors hover:text-primary'>
                  Maldives
                </Link>
              </li>
              <li>
                <Link href='#' className='transition-colors hover:text-primary'>
                  Los Angeles
                </Link>
              </li>
              <li>
                <Link href='#' className='transition-colors hover:text-primary'>
                  Las Vegas
                </Link>
              </li>
              <li>
                <Link href='#' className='transition-colors hover:text-primary'>
                  Toronto
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className='flex flex-col gap-6 lg:col-span-1'>
            <h4 className='text-xl font-bold text-[#181E4B]'>{t('footer.newsletter')}</h4>
            <form className='flex flex-col gap-4' onSubmit={(e) => e.preventDefault()}>
              <div className='flex h-12 overflow-hidden rounded-md bg-[#EFF0F6] p-1'>
                <input
                  type='email'
                  placeholder={t('footer.email_placeholder')}
                  className='flex-1 bg-transparent px-4 text-sm text-gray-700 outline-none placeholder:text-gray-400'
                />
                <button
                  type='submit'
                  className='rounded-md bg-primary px-6 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition-colors hover:bg-primary-hover'
                >
                  {t('footer.subscribe')}
                </button>
              </div>
              <p className='text-xs leading-relaxed text-gray-400'>{t('footer.newsletter_desc')}</p>
            </form>
          </div>
        </div>

        <div className='border-t border-gray-100 pt-8 text-center'>
          <p className='text-sm font-medium text-gray-500'>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
