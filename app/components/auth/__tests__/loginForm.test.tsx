import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LoginPage from '../loginForm'
import * as navigation from 'next/navigation'
import * as authActions from '@/actions/auth'
import { useAuthStore } from '@/store/useAuthStore'

// --- MOCKS ---

// 1. Mock Next.js Navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn()
}))

// 2. Mock React-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key // Return key as translation
  })
}))

jest.mock('@/actions/auth', () => ({
  loginAction: jest.fn()
}))

jest.mock('@/store/useAuthStore', () => ({
  useAuthStore: jest.fn()
}))

describe('LoginPage Component', () => {
  const mockRouterPush = jest.fn()
  const mockLoginState = jest.fn() 

  beforeEach(() => {
    jest.clearAllMocks()

    // Setup Router
    ;(navigation.useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush
    })
    ;(navigation.useParams as jest.Mock).mockReturnValue({ lng: 'en' })

    // Setup Store Mock
    // When useAuthStore is called with a selector, it returns the selected state.
    // In the component: const login = useAuthStore((state) => state.login)
    // So we mock the implementation to return our mockLoginState function.
    ;(useAuthStore as unknown as jest.Mock).mockImplementation((selector) => {
      // We simulate the selector: (state) => state.login
      // We return a mock state object that the selector operates on
      const mockState = {
        login: mockLoginState,
        user: null,
        isAuthenticated: false
      }
      return selector(mockState)
    })
  })

  it('renders login form correctly', () => {
    render(<LoginPage />)

    expect(screen.getByText('welcome_back')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('email_placeholder')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('password_placeholder')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'sign_in' })).toBeInTheDocument()
  })

  it('shows validation errors for empty fields', async () => {
    render(<LoginPage />)

    const submitBtn = screen.getByRole('button', { name: 'sign_in' })
    fireEvent.click(submitBtn)

    const emailInput = screen.getByPlaceholderText('email_placeholder')
    fireEvent.change(emailInput, { target: { value: 'not-an-email' } })
    fireEvent.click(submitBtn)

    await waitFor(() => {
      expect(screen.getByText('error_email_invalid')).toBeInTheDocument()
    })
  })

  it('calls loginAction and redirects on success', async () => {
    // Setup Server Action Success Response
    const mockUser = { id: '123', email: 'test@example.com', name: 'Test User' }
    ;(authActions.loginAction as jest.Mock).mockResolvedValue({
      success: true,
      user: mockUser
    })

    render(<LoginPage />)

    // Fill Form
    fireEvent.change(screen.getByPlaceholderText('email_placeholder'), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByPlaceholderText('password_placeholder'), { target: { value: 'password123' } })

    // Submit
    fireEvent.click(screen.getByRole('button', { name: 'sign_in' }))

    await waitFor(() => {
      // 1. Check if server action was called
      expect(authActions.loginAction).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        rememberMe: false // Default value
      })

      // 2. Check if store login function was called
      expect(mockLoginState).toHaveBeenCalledWith(mockUser)

      // 3. Check if router pushed to home
      expect(mockRouterPush).toHaveBeenCalledWith('/en/')
    })
  })

  it('displays server error on failure', async () => {
    // Setup Server Action Failure Response
    ;(authActions.loginAction as jest.Mock).mockResolvedValue({
      success: false,
      error: 'Invalid credentials'
    })

    render(<LoginPage />)

    // Fill Form
    fireEvent.change(screen.getByPlaceholderText('email_placeholder'), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByPlaceholderText('password_placeholder'), { target: { value: 'wrongpassword' } })

    // Submit
    fireEvent.click(screen.getByRole('button', { name: 'sign_in' }))

    await waitFor(() => {
      // Check if error message is displayed
      // The component renders `serverError` directly if present
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument()

      // Router should NOT be called
      expect(mockRouterPush).not.toHaveBeenCalled()
    })
  })

  it('displays unexpected error on exception', async () => {
    // Setup Server Action to throw
    ;(authActions.loginAction as jest.Mock).mockRejectedValue(new Error('Network Error'))

    render(<LoginPage />)

    fireEvent.change(screen.getByPlaceholderText('email_placeholder'), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByPlaceholderText('password_placeholder'), { target: { value: 'password123' } })

    fireEvent.click(screen.getByRole('button', { name: 'sign_in' }))

    await waitFor(() => {
      expect(screen.getByText('unexpected_error')).toBeInTheDocument()
    })
  })
})
