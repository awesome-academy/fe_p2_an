import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import RegisterForm from '../registerForm'
import { useTranslation } from 'react-i18next'
import * as navigation from 'next/navigation'
import { registerAction } from '@/actions/auth'
import { useAuthStore } from '@/store/useAuthStore'

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn()
}))

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  useRouter: jest.fn()
}))

jest.mock('@/actions/auth', () => ({
  registerAction: jest.fn()
}))

jest.mock('@/store/useAuthStore', () => ({
  useAuthStore: jest.fn()
}))

describe('RegisterForm', () => {
  const mockPush = jest.fn()
  const mockLogin = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    ;(useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => key
    })

    ;(navigation.useParams as jest.Mock).mockReturnValue({ lng: 'en' })
    ;(navigation.useRouter as jest.Mock).mockReturnValue({
      push: mockPush
    })

    ;(useAuthStore as jest.Mock).mockReturnValue({
      login: mockLogin
    })
  })

  const fillForm = () => {
    fireEvent.change(screen.getByPlaceholderText('username_placeholder'), {
      target: { value: 'testuser' }
    })
    fireEvent.change(screen.getByPlaceholderText('email_placeholder'), {
      target: { value: 'test@example.com' }
    })
    fireEvent.change(screen.getByPlaceholderText('password_placeholder'), {
      target: { value: '123456' }
    })
    fireEvent.change(screen.getByPlaceholderText('confirm_password_placeholder'), {
      target: { value: '123456' }
    })
    fireEvent.click(screen.getByLabelText('terms_agreement'))
  }

  it('renders form with all fields', () => {
    render(<RegisterForm />)

    expect(screen.getByText('create_account')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('username_placeholder')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('email_placeholder')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('password_placeholder')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('confirm_password_placeholder')).toBeInTheDocument()
  })

  it('shows validation errors when submitting empty form', async () => {
    render(<RegisterForm />)

    await act(async () => {
      fireEvent.click(screen.getByText('sign_up'))
    })

    await waitFor(() => {
      expect(screen.getAllByText(/required/i).length).toBeGreaterThan(0)
    })
  })

  it('displays server error message when registerAction returns error', async () => {
    ;(registerAction as jest.Mock).mockResolvedValue({
      success: false,
      error: 'server_error'
    })

    render(<RegisterForm />)

    fillForm()

    await act(async () => {
      fireEvent.click(screen.getByText('sign_up'))
    })

    await waitFor(() => {
      expect(screen.getByText('server_error')).toBeInTheDocument()
    })
  })

  it('handles unexpected exception in registerAction', async () => {
    ;(registerAction as jest.Mock).mockRejectedValue(new Error('boom'))

    render(<RegisterForm />)

    fillForm()

    await act(async () => {
      fireEvent.click(screen.getByText('sign_up'))
    })

    await waitFor(() => {
      expect(screen.getByText('unexpected_error')).toBeInTheDocument()
    })
  })

  it('disables submit button while submitting', async () => {
    let resolveFn: any = null
    ;(registerAction as jest.Mock).mockReturnValue(
      new Promise((resolve) => {
        resolveFn = resolve
      })
    )

    render(<RegisterForm />)
    fillForm()

    const btn = screen.getByText('sign_up')

    await act(async () => {
      fireEvent.click(btn)
    })

    expect(btn).toBeDisabled()

    await act(async () => {
      resolveFn({ success: true, user: { id: 1, username: 'testuser' } })
    })
  })
})
