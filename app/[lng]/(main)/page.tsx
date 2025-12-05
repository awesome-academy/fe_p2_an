import { Metadata } from 'next'

import Explore from '@/app/components/home/explore'

import Hero from '@/app/components/home/hero'
import Honeymoon from '@/app/components/home/honeymoon'
import Promotion from '@/app/components/home/promotion'

import Trending from '@/app/components/home/trending'
import Services from '@/app/components/home/service'
import FastAndEasy from '@/app/components/home/fastAndEasy'
import EuropePromotion from '@/app/components/home/euroPromotion'

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
  const { lng } = await params

  const title = lng === 'vi' ? 'Trang chủ - Travel' : 'Home - Travel'
  const description =
    lng === 'vi'
      ? 'Khám phá các tour du lịch và gói nghỉ dưỡng tốt nhất cùng Travel.'
      : 'Explore the best tours and travel packages with Travel.'

  return {
    title,
    description,
  }
}

export default function Home() {
  return (
    <div className='flex flex-col'>
      <Hero />

      <Services />

      <Honeymoon />

      <FastAndEasy />

      <Promotion />

      <EuropePromotion />

      <Explore />

      <Trending />
    </div>
  )
}
