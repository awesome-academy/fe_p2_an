'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { useParams, useRouter } from 'next/navigation'
import { PATH } from '@/constants/path'
import { LoginInput, loginSchema } from '@/validators/auth'
import { Facebook, Mail } from 'lucide-react'
import { loginAction } from '@/actions/auth'
import { useAuthStore } from '@/store/useAuthStore'
import { useState } from 'react'

export default function LoginForm() {
  const { t } = useTranslation('auth')
  const params = useParams()
  const router = useRouter()
  const lng = (params.lng as string) || 'en'

  const login = useAuthStore((state) => state.login)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false
    }
  })

  const onSubmit = async (data: LoginInput) => {
    setServerError(null)

    try {
      const res = await loginAction(data)

      if (res.success && res.user) {
        login(res.user as unknown as Parameters<typeof login>[0])
        router.push(`/${lng}${PATH.HOME}`)
      } else {
        setServerError(res.error || t('unexpected_error'))
      }
    } catch (error) {
      console.error('Login error:', error)
      setServerError(t('unexpected_error'))
    }
  }

  return (
    <>
      <div className='text-center'>
        <h2 className='text-3xl font-bold text-[#181E4B]'>{t('welcome_back')}</h2>
        <p className='mt-2 text-gray-500'>{t('welcome_subtitle')}</p>
      </div>

      {serverError && (
        <div className='mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-center text-sm text-red-500'>
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className='mt-8 space-y-6'>
        {/* Email */}
        <div>
          <label className='mb-2 block text-sm font-medium text-gray-700'>{t('email')}</label>
          <input
            {...register('email')}
            type='email'
            placeholder={t('email_placeholder')}
            className='w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary'
          />
          {errors.email?.message && <p className='mt-1 text-xs text-red-500'>{t(`${errors.email.message}`)}</p>}
        </div>

        {/* Password */}
        <div>
          <label className='mb-2 block text-sm font-medium text-gray-700'>{t('password')}</label>
          <input
            {...register('password')}
            type='password'
            placeholder={t('password_placeholder')}
            className='w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary'
          />
          {errors.password?.message && <p className='mt-1 text-xs text-red-500'>{t(`${errors.password.message}`)}</p>}
        </div>

        {/* Remember Me + Forgot Password */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <input
              id='remember-me'
              type='checkbox'
              {...register('rememberMe')}
              className='h-4 w-4 rounded border-gray-300 text-primary accent-primary focus:ring-primary'
            />
            <label htmlFor='remember-me' className='ml-2 block cursor-pointer select-none text-sm text-gray-700'>
              {t('remember_me')}
            </label>
          </div>

          <Link href='#' className='text-sm font-medium text-primary transition-colors hover:text-[#c65a43]'>
            {t('forgot_password')}
          </Link>
        </div>

        {/* Submit */}
        <button
          type='submit'
          disabled={isSubmitting}
          className='flex w-full justify-center rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#c65a43] disabled:cursor-not-allowed disabled:opacity-70'
        >
          {isSubmitting ? t('common.loading') : t('sign_in')}
        </button>

        {/* Divider */}
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300' />
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='bg-white px-2 text-gray-500'>{t('or_continue_with')}</span>
          </div>
        </div>

        {/* Social Login */}
        <div className='grid grid-cols-2 gap-4'>
          <button
            type='button'
            className='flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50'
          >
            <Mail size={20} /> Google
          </button>
          <button
            type='button'
            className='flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50'
          >
            <Facebook size={20} className='text-blue-600' /> Facebook
          </button>
        </div>

        {/* Register Link */}
        <p className='text-center text-sm text-gray-600'>
          {t('dont_have_account')}{' '}
          <Link href={`/${lng}${PATH.REGISTER}`} className='font-bold text-primary hover:underline'>
            {t('sign_up')}
          </Link>
        </p>
      </form>
    </>
  )
}
