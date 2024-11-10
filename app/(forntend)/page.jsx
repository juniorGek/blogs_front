'use client'
import Article from '@/components/Article'
import Fashion from '@/components/Fashion'
import LatestPolls from '@/components/LatestPoll'
import Newsletter from '@/components/Newsletter'
import Topic from '@/components/Topic'
import VideoSection from '@/components/VideoSection'
import LatestQuestions from '@/components/common/LatestQuestion'
import TabSite from '@/components/tabSite/TabSite'


const Page = () => {
  
  return (
    <div className='dark:bg-BG_Color'>

      <TabSite />
      <Topic />
      <LatestQuestions />
      <Article />
      <Fashion />
      <VideoSection />
      <Newsletter />
    </div>

  )
}

export default Page