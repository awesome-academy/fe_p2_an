import { Metadata } from 'next'
import LoginForm from '@/app/components/auth/loginForm'

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
  const { lng } = await params

  const title = lng === 'vi' ? 'Đăng nhập - Travel' : 'Sign In - Travel'
  const description =
    lng === 'vi'
      ? 'Đăng nhập để khám phá các tour du lịch hấp dẫn.'
      : 'Login to explore amazing tour packages.'

  return {
    title,
    description
  }
}

export default function LoginPage() {
  return <LoginForm />
}
