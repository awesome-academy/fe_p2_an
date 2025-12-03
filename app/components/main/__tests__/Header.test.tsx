import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../Header'
import * as navigation from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/store/useAuthStore'
import { logoutAction } from '@/actions/auth'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useParams: jest.fn()
}))

jest.mock('@/store/useAuthStore')
jest.mock('@/actions/auth')

describe('Header Component', () => {
  const mockPush = jest.fn()
  const mockRefresh = jest.fn()
  const mockChangeLanguage = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(navigation.useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      refresh: mockRefresh
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
    ;(useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: null,
      logout: jest.fn()
    })
  })

  // ---------------------------------------------------
  it('renders logo and navigation links', () => {
    render(<Header />)
    expect(screen.getByText('Travel')).toBeInTheDocument()
    expect(screen.getByText('nav.home')).toBeInTheDocument()
    expect(screen.getByText('nav.about')).toBeInTheDocument()
  })

  // ---------------------------------------------------
  it('toggles mobile menu when clicking hamburger icon', () => {
    render(<Header />)

    const toggleBtn = screen.getAllByRole('button').pop()!
    fireEvent.click(toggleBtn)

    expect(screen.getAllByText('nav.login')).toHaveLength(2)
  })

  // ---------------------------------------------------
  it('switches language when clicking language button', () => {
    render(<Header />)

    const langBtn = screen.getAllByText('en')[0]
    fireEvent.click(langBtn)

    expect(mockPush).toHaveBeenCalledWith('/vi/tours')
  })


  // ---------------------------------------------------
  it('opens user dropdown when clicking user button', () => {
    ;(useAuthStore as jest.Mock).mockReturnValue({
      user: { username: 'BaoAn', email: 'a@a.com', avatar: '' },
      logout: jest.fn()
    })

    render(<Header />)

    const userBtn = screen.getByText('BaoAn')
    fireEvent.click(userBtn)

    expect(screen.getByText('nav.my_account')).toBeInTheDocument()
    expect(screen.getByText('nav.logout')).toBeInTheDocument()
  })

  // ---------------------------------------------------
  it('closes user dropdown when clicking outside', () => {
    ;(useAuthStore as jest.Mock).mockReturnValue({
      user: { username: 'BaoAn', email: 'a@a.com', avatar: '' },
      logout: jest.fn()
    })

    render(<Header />)

    const userBtn = screen.getByText('BaoAn')
    fireEvent.click(userBtn)
    expect(screen.getByText('nav.logout')).toBeInTheDocument()

    fireEvent.mouseDown(document.body)

    expect(screen.queryByText('nav.logout')).not.toBeInTheDocument()
  })

  // ---------------------------------------------------
  it('calls logoutAction and redirects correctly', async () => {
    const mockLogout = jest.fn()
    ;(useAuthStore as jest.Mock).mockReturnValue({
      user: { username: 'BaoAn', email: 'a@a.com', avatar: '' },
      logout: mockLogout
    })
    ;(logoutAction as jest.Mock).mockResolvedValueOnce(true)

    render(<Header />)

    const userBtn = screen.getByText('BaoAn')
    fireEvent.click(userBtn)

    const logoutBtn = screen.getByText('nav.logout')
    fireEvent.click(logoutBtn)

    expect(logoutAction).toHaveBeenCalled()
  })
})
