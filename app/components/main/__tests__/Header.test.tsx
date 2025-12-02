import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../Header'
import * as navigation from 'next/navigation'
import { useTranslation } from 'react-i18next'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useParams: jest.fn()
}))

describe('Header Component', () => {
  const mockPush = jest.fn()
  const mockChangeLanguage = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    ;(navigation.useRouter as jest.Mock).mockReturnValue({
      push: mockPush
    })
    ;(navigation.usePathname as jest.Mock).mockReturnValue('/en/tours')
    ;(navigation.useParams as jest.Mock).mockReturnValue({ lng: 'en' })

    ;(useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => key,
      i18n: {
        changeLanguage: mockChangeLanguage,
        language: 'en'
      }
    })
  })

  it('renders logo and navigation links correctly', () => {
    render(<Header />)
    expect(screen.getByText('Travel')).toBeInTheDocument()
    expect(screen.getByText('nav.home')).toBeInTheDocument()
  })

  it('toggles mobile menu when clicking hamburger icon', () => {
    render(<Header />)

    const buttons = screen.getAllByRole('button')
    const toggleBtn = buttons[buttons.length - 1]

    fireEvent.click(toggleBtn)

    const loginButtons = screen.getAllByText('nav.login')
    expect(loginButtons).toHaveLength(2)

    const mobileHomeLink = screen.getAllByText('nav.home')[1]
    fireEvent.click(mobileHomeLink)
  })
})
