'use client'

import { useParams } from 'next/navigation'

interface PriceDisplayProps {
  price: number
  currency?: 'USD' | 'VND'
  className?: string
}

const EXCHANGE_RATE = 27000

export default function PriceDisplay({ price, currency = 'USD', className = '' }: PriceDisplayProps) {
  const params = useParams()
  const lng = (params.lng as string) || 'en'

  let displayPrice = price
  const validCurrencies = ['USD', 'VND'] as const
  if (!validCurrencies.includes(currency)) {
    console.warn(`Invalid currency "${currency}", defaulting to USD`)
    currency = 'USD'
  }
  let displayCurrency = currency

  if (lng === 'vi' && currency === 'USD') {
    displayPrice = price * EXCHANGE_RATE
    displayCurrency = 'VND'
  } else if (lng === 'en' && currency === 'VND') {
    displayPrice = price / EXCHANGE_RATE
    displayCurrency = 'USD'
  }

  const formattedPrice = new Intl.NumberFormat(lng === 'vi' ? 'vi-VN' : 'en-US', {
    style: 'currency',
    currency: displayCurrency,
    maximumFractionDigits: 0
  }).format(displayPrice)

  return <span className={className}>{formattedPrice}</span>
}
