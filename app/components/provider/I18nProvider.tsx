'use client'

import { I18nextProvider } from 'react-i18next'
import { ReactNode } from 'react'
import i18n from '@/i18n/client';

export default function I18nProvider({ children, lng }: { children: ReactNode; lng: string }) {
  if (i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng)
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
