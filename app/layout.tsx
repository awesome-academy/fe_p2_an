import React from 'react'
import { languages } from '@/i18n/setting'
import './globals.css'
import I18nProvider from '@/app/components/provider/I18nProvider'
import { Be_Vietnam_Pro, Lora } from 'next/font/google'

const beVietnamPro = Be_Vietnam_Pro({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'vietnamese'],
  variable: '--font-sans',
  display: 'swap'
})

const lora = Lora({
  weight: ['400', '700'],
  subsets: ['latin', 'vietnamese'],
  variable: '--font-serif',
  display: 'swap'
})

export function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default async function LanguageLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ lng: string }>
}) {
  const { lng } = await params

  return (
    <html lang={lng} suppressHydrationWarning>
      <body className={`${beVietnamPro.variable} ${lora.variable} bg-white font-sans text-black antialiased`}>
        <I18nProvider lng={lng}>{children}</I18nProvider>
      </body>
    </html>
  )
}
