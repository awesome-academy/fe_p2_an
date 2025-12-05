'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useParams, useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { Menu, X, Globe, ChevronDown, User as UserIcon, LogOut } from 'lucide-react'
import i18n from '@/i18n/client'
import { PATH } from '@/constants/path'
import { useAuthStore } from '@/store/useAuthStore'
import { logoutAction } from '@/actions/auth'
import toast from 'react-hot-toast'

export default function Header() {
  const { t } = useTranslation('common')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const params = useParams()
  const lng = (params.lng as string) || 'en'

  const pathname = usePathname()
  const router = useRouter()

  // Lấy user và hàm logout từ store
  const { user, logout } = useAuthStore()

  // Ref để xử lý click outside đóng menu
  const userMenuRef = useRef<HTMLDivElement>(null)

  // Đóng user menu khi click ra ngoài
  useEffect(() => {
    function handleUserMenuClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleUserMenuClickOutside)
    return () => document.removeEventListener('mousedown', handleUserMenuClickOutside)
  }, [])

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

  const handleLogout = async () => {
    try {
      const res = await logoutAction()
      if (!res.success) {
        throw new Error('Logout failed')
      }

      logout()
      setIsUserMenuOpen(false)
      router.push(`/${lng}${PATH.LOGIN}`)
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
      toast.error(t('logout_failed'))
    }
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
            {/* Language Switcher */}
            <button
              onClick={handleLanguageChange}
              className='flex items-center gap-1 font-medium text-gray-600 hover:text-primary'
            >
              <Globe size={20} />
              <span className='uppercase'>{lng}</span>
            </button>

            {/* Logic hiển thị User hoặc Login */}
            {user ? (
              <div className='relative' ref={userMenuRef}>
                {/* User Button */}
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className='flex items-center gap-2 rounded-full border border-gray-200 bg-white py-1 pl-1 pr-3 transition-all hover:border-primary hover:shadow-sm'
                >
                  <div className='relative h-10 w-10 overflow-hidden rounded-full'>
                    <Image
                      src={user.avatar || `https://ui-avatars.com/api/?name=${user.username}`}
                      alt={user.username}
                      fill
                      className='object-cover'
                      onError={(e) => {
                        ;(e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${user.username}`
                      }}
                    />
                  </div>
                  <span className='max-w-[100px] truncate text-sm font-medium text-gray-700'>{user.username}</span>
                  <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className='absolute right-0 mt-2 w-48 origin-top-right rounded-xl border border-gray-100 bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    <div className='border-b border-gray-100 px-4 py-3'>
                      <p className='text-xs text-gray-500'>{t('nav.signed_in_as')}</p>
                      <p className='truncate text-sm font-bold text-gray-900'>{user.email}</p>
                    </div>

                    <Link
                      href='#'
                      className='flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50'
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <UserIcon size={16} /> {t('nav.my_account')}
                    </Link>

                    <button
                      onClick={handleLogout}
                      className='flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50'
                    >
                      <LogOut size={16} /> {t('nav.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href={`/${lng}${PATH.LOGIN}`}>
                <button className='rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-primary-hover'>
                  {t('nav.login')}
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Actions (Hamburger) */}
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

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className='absolute w-full border-t border-gray-100 bg-white shadow-lg md:hidden'>
          <div className='space-y-1 px-4 py-4 pb-6'>
            {/* Nếu đã login, hiển thị thông tin user trước */}
            {user && (
              <div className='mb-4 flex items-center gap-3 border-b border-gray-100 pb-4'>
                <div className='relative h-10 w-10 overflow-hidden rounded-full'>
                  <Image
                    src={user.avatar || `https://ui-avatars.com/api/?name=${user.username}`}
                    alt={user.username}
                    fill
                    className='object-cover'
                  />
                </div>
                <div className='flex flex-col'>
                  <span className='font-bold text-gray-900'>{user.username}</span>
                  <span className='text-xs text-gray-500'>{user.email}</span>
                </div>
              </div>
            )}

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
              {user ? (
                <>
                  <Link
                    href='#'
                    className='flex w-full items-center gap-2 rounded-md px-3 py-3 text-base font-medium text-gray-600 hover:bg-gray-50'
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <UserIcon size={20} /> {t('nav.my_account')}
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMobileMenuOpen(false)
                    }}
                    aria-label={t('nav.logout')}
                    className='flex w-full items-center gap-2 rounded-md px-3 py-3 text-base font-medium text-red-600 hover:bg-red-50'
                  >
                    <LogOut size={20} /> {t('nav.logout')}
                  </button>
                </>
              ) : (
                <Link href={`/${lng}${PATH.LOGIN}`} onClick={() => setIsMobileMenuOpen(false)}>
                  <button className='w-full justify-center rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white shadow-sm'>
                    {t('nav.login')}
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
