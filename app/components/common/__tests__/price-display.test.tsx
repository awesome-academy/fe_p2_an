import { render, screen } from '@testing-library/react'
import PriceDisplay from '../price-display'
import * as navigation from 'next/navigation'

jest.mock('next/navigation', () => ({
  useParams: jest.fn()
}))

describe('PriceDisplay Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  // --- Locale EN / VI, USD/VND ---
  it('renders default USD price correctly in EN locale', () => {
    ;(navigation.useParams as jest.Mock).mockReturnValue({ lng: 'en' })
    render(<PriceDisplay price={100} />)
    expect(screen.getByText('$100')).toBeInTheDocument()
  })

  it('converts USD to VND correctly in VI locale', () => {
    ;(navigation.useParams as jest.Mock).mockReturnValue({ lng: 'vi' })
    render(<PriceDisplay price={100} currency='USD' />)
    expect(screen.getByText(/2[.,]700[.,]000/)).toBeInTheDocument()
    expect(screen.getByText(/₫|VND/)).toBeInTheDocument()
  })

  it('converts VND to USD correctly in EN locale', () => {
    ;(navigation.useParams as jest.Mock).mockReturnValue({ lng: 'en' })
    render(<PriceDisplay price={2_700_000} currency='VND' />)
    expect(screen.getByText('$100')).toBeInTheDocument()
  })

  it('keeps VND price as is in VI locale', () => {
    ;(navigation.useParams as jest.Mock).mockReturnValue({ lng: 'vi' })
    render(<PriceDisplay price={500_000} currency='VND' />)
    expect(screen.getByText(/500[.,]000/)).toBeInTheDocument()
  })

  // --- className ---
  it('applies custom className', () => {
    ;(navigation.useParams as jest.Mock).mockReturnValue({ lng: 'en' })
    render(<PriceDisplay price={100} className='font-bold text-red-500' />)
    const priceEl = screen.getByText('$100')
    expect(priceEl).toHaveClass('text-red-500 font-bold')
  })

  // --- Edge cases: 0, negative, large values ---
  it('renders price 0 correctly', () => {
    ;(navigation.useParams as jest.Mock).mockReturnValue({ lng: 'en' })
    render(<PriceDisplay price={0} />)
    expect(screen.getByText('$0')).toBeInTheDocument()
  })

  it('renders negative price correctly', () => {
    ;(navigation.useParams as jest.Mock).mockReturnValue({ lng: 'vi' })
    render(<PriceDisplay price={-100} />)
    expect(screen.getByText(/-2[.,]700[.,]000/)).toBeInTheDocument()
  })

  it('renders very large price correctly', () => {
    ;(navigation.useParams as jest.Mock).mockReturnValue({ lng: 'en' })
    render(<PriceDisplay price={1_000_000_000} />)
    expect(screen.getByText('$1,000,000,000')).toBeInTheDocument()
  })

  // --- Invalid or missing currency ---
  it('defaults to USD if currency is invalid', () => {
    ;(navigation.useParams as jest.Mock).mockReturnValue({ lng: 'en' })
    // @ts-expect-error: intentionally passing invalid currency
    render(<PriceDisplay price={100} currency='EUR' />)
    expect(screen.getByText('$100')).toBeInTheDocument()
  })

  it('defaults to USD if currency is missing', () => {
    ;(navigation.useParams as jest.Mock).mockReturnValue({ lng: 'en' })
    render(<PriceDisplay price={100} />)
    expect(screen.getByText('$100')).toBeInTheDocument()
  })

  // --- Missing or invalid locale ---
  it('defaults to EN locale if lng is missing', () => {
    ;(navigation.useParams as jest.Mock).mockReturnValue({})
    render(<PriceDisplay price={100} />)
    expect(screen.getByText('$100')).toBeInTheDocument()
  })

  it('handles unexpected lng gracefully', () => {
    ;(navigation.useParams as jest.Mock).mockReturnValue({ lng: 'jp' })
    render(<PriceDisplay price={100} />)
    expect(screen.getByText('$100')).toBeInTheDocument()
  })

  // --- Optional: test combination of props ---
  it('applies className with large VND price in VI locale', () => {
    ;(navigation.useParams as jest.Mock).mockReturnValue({ lng: 'vi' })
    render(<PriceDisplay price={1_000} currency='USD' className='text-green-500' />)
    const el = screen.getByText(/27[.,]000[.,]000/)
    expect(el).toHaveClass('text-green-500')
  })
})
