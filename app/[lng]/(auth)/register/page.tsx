import { Metadata } from 'next'
import RegisterForm from '../../../components/auth/registerForm'

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
  const { lng } = await params

  const title = lng === 'vi' ? 'Đăng ký - Travel' : 'Sign Up - Travel'
  const description =
    lng === 'vi'
      ? 'Tạo tài khoản mới để khám phá các tour du lịch hấp dẫn.'
      : 'Create a new account to explore amazing tour packages.'

  return {
    title,
    description
  }
}

export default function RegisterPage() {
  return <RegisterForm />
}
