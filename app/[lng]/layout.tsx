import React from 'react'
import I18nProvider from '@/app/components/provider/I18nProvider'

import { languages } from '@/i18n/setting'
import QueryProvider from '@/app/components/provider/QueryProvider'

export function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default async function LanguageLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { lng: string }
}) {
  const { lng } = await params
  return (
    <QueryProvider>
      <I18nProvider lng={lng}>{children}</I18nProvider>
    </QueryProvider>
  )
}
