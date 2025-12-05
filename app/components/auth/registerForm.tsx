'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { useParams, useRouter } from 'next/navigation'
import { PATH } from '@/constants/path'
import { RegisterInput, registerSchema } from '@/validators/auth'
import { registerAction } from '@/actions/auth'
import { useAuthStore } from '@/store/useAuthStore'
import { useState } from 'react'
import { User } from '@/types/db'

interface RegisterResponse {
  success: boolean
  user?: User
  error?: string
}

export default function RegisterForm() {
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
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data: RegisterInput) => {
    setServerError(null)

    try {
      const res: RegisterResponse = await registerAction(data)

      if (res.success && res.user) {
        // login với kiểu User chính xác
        login(res.user)

        router.push(`/${lng}${PATH.HOME}`)
      } else {
        setServerError(res.error || t('common.error_loading') || t('register_failed'))
      }
    } catch (error) {
      console.error('Register error:', error)
      setServerError(t('unexpected_error'))
    }
  }

  return (
    <>
      <div className='text-center'>
        <h2 className='text-3xl font-bold text-[#181E4B]'>{t('create_account')}</h2>
        <p className='mt-2 text-gray-500'>{t('create_subtitle')}</p>
      </div>

      {serverError && (
        <div className='mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-center text-sm text-red-500'>
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className='mt-8 space-y-4'>
        {/* Username */}
        <div>
          <label className='mb-2 block text-sm font-medium text-gray-700'>{t('username')}</label>
          <input
            {...register('username')}
            type='text'
            placeholder={t('username_placeholder')}
            className='w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary'
          />
          {errors.username?.message && <p className='mt-1 text-xs text-red-500'>{t(`${errors.username.message}`)}</p>}
        </div>

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

        {/* Confirm Password */}
        <div>
          <label className='mb-2 block text-sm font-medium text-gray-700'>{t('confirm_password')}</label>
          <input
            {...register('confirmPassword')}
            type='password'
            placeholder={t('confirm_password_placeholder')}
            className='w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary'
          />
          {errors.confirmPassword?.message && (
            <p className='mt-1 text-xs text-red-500'>{t(`${errors.confirmPassword.message}`)}</p>
          )}
        </div>

        {/* Terms Checkbox */}
        <div className='flex items-center'>
          <input
            id='terms'
            type='checkbox'
            {...register('terms')}
            className='h-4 w-4 rounded border-gray-300 text-primary accent-primary focus:ring-primary'
          />
          <label htmlFor='terms' className='ml-2 block cursor-pointer select-none text-sm text-gray-700'>
            {t('terms_agreement')}
          </label>
        </div>
        {errors.terms?.message && <p className='text-xs text-red-500'>{t(`${errors.terms.message}`)}</p>}

        {/* Submit Button */}
        <button
          type='submit'
          disabled={isSubmitting}
          className='mt-2 w-full rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#c65a43] disabled:cursor-not-allowed disabled:opacity-70'
        >
          {isSubmitting ? t('common.loading') : t('sign_up')}
        </button>

        <p className='text-center text-sm text-gray-600'>
          {t('already_have_account')}{' '}
          <Link href={`/${lng}${PATH.LOGIN}`} className='font-bold text-primary hover:underline'>
            {t('sign_in')}
          </Link>
        </p>
      </form>
    </>
  )
}
