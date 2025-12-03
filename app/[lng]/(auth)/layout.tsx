'use client'

import Link from 'next/link'
import { PATH } from '@/constants/path'
import { usePathname, useRouter } from 'next/navigation'
import { Globe } from 'lucide-react'
import i18n from '@/i18n/client'
import { use } from 'react'

export default function AuthLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ lng: string }>
}) {
  const { lng } = use(params)
  const pathname = usePathname()
  const router = useRouter()

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
    <div className='relative flex min-h-screen w-full items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8'>
      <div className='absolute right-4 top-4 sm:right-8 sm:top-8'>
        <button
          onClick={handleLanguageChange}
          className='flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition-all hover:bg-gray-50 hover:text-primary hover:shadow-md'
        >
          <Globe size={18} />
          <span className='uppercase'>{lng}</span>
        </button>
      </div>

      <div className='w-full max-w-md space-y-8'>
        <div className='text-center'>
          <Link href={`/${lng}${PATH.HOME}`} className='text-4xl font-extrabold tracking-tight text-primary'>
            Travel
          </Link>
        </div>

        <div className='rounded-xl bg-white p-8 shadow-lg sm:p-10'>{children}</div>
      </div>
    </div>
  )
}
