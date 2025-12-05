import { Metadata } from 'next'
import AboutHero from '@/app/components/about/hero'
import AboutPromotion from '@/app/components/about/promotion'
import AboutTourPlans from '@/app/components/about/tour-plans'

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
  const { lng } = await params

  const title = lng === 'vi' ? 'Về chúng tôi - Travel' : 'About Us - Travel'
  const description =
    lng === 'vi'
      ? 'Tìm hiểu thêm về Travel - Đối tác du lịch tin cậy của bạn.'
      : 'Learn more about Travel - Your trusted travel partner.'

  return {
    title,
    description
  }
}

export default function AboutPage() {
  return (
    <div className='flex flex-col'>
      <AboutHero />

      <AboutPromotion />

      <AboutTourPlans />
    </div>
  )
}
