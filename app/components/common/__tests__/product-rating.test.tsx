import { render } from '@testing-library/react'
import ProductRating from '../product-rating'

describe('ProductRating Component', () => {
  it('renders correct number of full stars for integer rating', () => {
    const { container } = render(<ProductRating rating={5} />)
    const fullStars = container.querySelectorAll('.fill-yellow-400.text-yellow-400')
    expect(fullStars).toHaveLength(5)
  })

  it('renders correct number of empty stars for 0 rating', () => {
    const { container } = render(<ProductRating rating={0} />)

    const emptyStars = container.querySelectorAll('.text-gray-300')
    expect(emptyStars).toHaveLength(5)
  })

  it('displays review count when provided and showCount is true', () => {
    const { getByText } = render(<ProductRating rating={4} reviewCount={100} showCount={true} />)
    expect(getByText('(100)')).toBeInTheDocument()
  })

  it('hides review count when showCount is false', () => {
    const { queryByText } = render(<ProductRating rating={4} reviewCount={100} showCount={false} />)
    expect(queryByText('(100)')).not.toBeInTheDocument()
  })

  it('handles rating overflow (greater than 5)', () => {
    const { container } = render(<ProductRating rating={10} />)
    const fullStars = container.querySelectorAll('.fill-yellow-400.text-yellow-400')
    expect(fullStars).toHaveLength(5)
  })

  it('handles negative rating', () => {
    const { container } = render(<ProductRating rating={-1} />)
    const emptyStars = container.querySelectorAll('.text-gray-300')
    expect(emptyStars).toHaveLength(5)
  })
})
