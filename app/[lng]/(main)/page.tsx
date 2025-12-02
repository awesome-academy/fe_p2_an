import EuropePromotion from '@/app/components/home/euroPromotion'
import Explore from '@/app/components/home/explore'
import FastAndEasy from '@/app/components/home/fastAndEasy'
import Hero from '@/app/components/home/hero'
import Honeymoon from '@/app/components/home/honeymoon'
import Promotion from '@/app/components/home/promotion'
import Services from '@/app/components/home/service'
import Trending from '@/app/components/home/trending'

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
