import { render, screen, fireEvent } from '@testing-library/react'
import Footer from '../Footer'
import * as navigation from 'next/navigation'

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useParams: jest.fn()
}))

describe('Footer Component', () => {
  beforeEach(() => {
    // Giả lập đang ở ngôn ngữ tiếng Việt
    ;(navigation.useParams as jest.Mock).mockReturnValue({ lng: 'vi' })
  })

  it('renders all sections correctly', () => {
    render(<Footer />)

    expect(screen.getByText('Travel')).toBeInTheDocument()
    expect(screen.getByText('footer.company')).toBeInTheDocument()
    expect(screen.getByText('footer.destinations')).toBeInTheDocument()
    expect(screen.getByText('footer.newsletter')).toBeInTheDocument()
    expect(screen.getByText('footer.subscribe')).toBeInTheDocument()
  })

  it('renders links with correct language prefix', () => {
    render(<Footer />)

    // Kiểm tra link About Us có chứa /vi/about không
    const aboutLink = screen.getByText('footer.about_us').closest('a')
    expect(aboutLink).toHaveAttribute('href', '/vi/about')

    // Kiểm tra link Careers
    const careerLink = screen.getByText('footer.careers').closest('a')
    expect(careerLink).toHaveAttribute('href', '/vi/careers')
  })

  it('handles newsletter form submission gracefully', () => {
    render(<Footer />)

    const subscribeBtn = screen.getByText('footer.subscribe')
    const input = screen.getByPlaceholderText('footer.email_placeholder')

    // Nhập email
    fireEvent.change(input, { target: { value: 'test@example.com' } })

    // Submit form
    // Vì code gốc chỉ có e.preventDefault(), test này đảm bảo nó không crash
    fireEvent.click(subscribeBtn)

    expect(input).toHaveValue('test@example.com')
  })
})
