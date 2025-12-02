'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useParams, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { Menu, X, Globe } from 'lucide-react'
import { PATH } from '@/constants/path'
import i18n from '@/i18n/client'

export default function Header() {
  const { t } = useTranslation('common')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const params = useParams()
  const lng = (params.lng as string) || 'en'

  const pathname = usePathname()
  const router = useRouter()

  const navLinks = [
    { name: t('nav.home'), href: `/${lng}${PATH.HOME}` },
    { name: t('nav.about'), href: `/${lng}${PATH.ABOUT}` },
    { name: t('nav.tours'), href: `/${lng}${PATH.TOURS}` }
  ]

  const handleLanguageChange = () => {
    const newLng = lng === 'en' ? 'vi' : 'en'

    let newPath = pathname.replace(`/${lng}`, `/${newLng}`)

    if (!newPath.startsWith(`/${newLng}`)) {
      newPath = `/${newLng}${pathname.substring(3)}`
    }

    if (i18n && typeof i18n.changeLanguage === 'function') {
      i18n.changeLanguage(newLng)
    }

    router.push(newPath)
  }

  return (
    <header className='sticky top-0 z-50 w-full bg-white/80 shadow-sm backdrop-blur-md transition-all'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex h-20 items-center justify-between'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <Link href={`/${lng}${PATH.HOME}`} className='flex items-center gap-2'>
              <span className='text-3xl font-extrabold tracking-tight text-[#181E4B]'>Travel</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className='hidden items-center space-x-8 md:flex'>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='text-base font-medium text-gray-600 transition-colors hover:text-primary'
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className='hidden items-center space-x-4 md:flex'>
            <button
              onClick={handleLanguageChange}
              className='flex items-center gap-1 font-medium text-gray-600 hover:text-primary'
            >
              <Globe size={20} />
              <span className='uppercase'>{lng}</span>
            </button>

            <Link href={`/${lng}${PATH.LOGIN}`}>
              <button className='rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-primary-hover'>
                {t('nav.login')}
              </button>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className='flex items-center gap-4 md:hidden'>
            <button
              onClick={handleLanguageChange}
              className='flex items-center gap-1 font-medium text-gray-600 hover:text-primary'
            >
              <span className='uppercase'>{lng}</span>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className='text-gray-600 hover:text-primary focus:outline-none'
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='absolute w-full border-t border-gray-100 bg-white shadow-lg md:hidden'>
          <div className='space-y-1 px-4 py-4 pb-6'>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className='block rounded-md px-3 py-3 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-primary'
              >
                {link.name}
              </Link>
            ))}
            <div className='mt-4 border-t border-gray-100 pt-4'>
              <Link href={`/${lng}${PATH.LOGIN}`} onClick={() => setIsMobileMenuOpen(false)}>
                <button className='w-full justify-center rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white shadow-sm'>
                  {t('nav.login')}
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
