'use client'

import React from 'react'
import MediaLink from './btn/MediaLink'
import { useI18n } from '@/context/i18n'


const Footer = ({ site }) => {
const i18n = useI18n()
let { lang, languages } = useI18n()


  return (
    <footer className=' dark:bg-BG_Color dark:text-White_Color md:px-8 lg:px-0 pt-36'>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 md:pb-36 pb-10 gap-10 md:gap-8 lg:gap-56 text-Font2_Color text-lg text-center md:text-start '>
          <div>
            <h3 className='font-medium text-lg text-Font2_Color'>{i18n?.t('Contact Me')}</h3>
            <h1 className='dark:text-White_Color text-Black_Color lg:text-[24px] text-[20px] pt-3 font-medium lowercase'>{site?.email}</h1>
            {/* <p className='text-base text-[#7C7C7C] capitalize'>{site?.phone}</p> */}
            <p className='text-base text-[#7C7C7C] capitalize md:mt-5 mt-2'>
              {site?.description && site?.description[lang]}
              </p>
          </div>
          <div>
            <h3 className='font-medium text-lg text-Font2_Color'>{i18n?.t('My Address')}</h3>
            <h1 className='dark:text-White_Color text-Black_Color lg:text-[24px] text-[20px] pt-3 font-medium capitalize'>{site?.city && site?.city[lang]}</h1>
            <p className='text-base text-[#7C7C7C] md:max-w-[200px] capitalize md:mt-5 md:text-start text-center mt-2'>{site?.address && site?.address[lang]}</p>

          </div>
          <div>
            <h3 className='font-medium text-lg text-Font2_Color'>{i18n?.t('Social Links')}</h3>
            <h1 className='dark:text-White_Color text-Black_Color lg:text-[24px] text-[20px] pt-3 font-medium capitalize'>{i18n?.t('Follow Me')}</h1>
            <div className='dark:text-White_Color text-Black_Color flex justify-center md:justify-start mt-5'>
              <MediaLink data={site?.social_media_link}></MediaLink>
            </div>
          </div>
        </div>
      </div>
      <hr className='border-Font2_Color w-full' />
      <h1 className='text-center py-7 text-Font2_Color '>{site?.footer}</h1>
    </footer>
  )
}

export default Footer