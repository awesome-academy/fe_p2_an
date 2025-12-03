import Header from '@/app/components/main/Header'
import Footer from '@/app/components/main/Footer'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col bg-white font-sans text-black'>
      <Header />
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  )
}
