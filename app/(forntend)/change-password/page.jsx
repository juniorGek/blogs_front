"use client"
import { useI18n } from '@/context/i18n'
import { Input } from 'antd'
import React from 'react'

const Page = () => {
    const i18n = useI18n();
  return (
    <div className='dark:bg-BG_Color'>
    <div className='flex justify-center'>
        <div className='flex items-center justify-between w-4/5 md:w-3/5 py-9'>
            <h1 className='text-2xl md:text-5xl font-bold text-BG_Color dark:text-White_Color'>{i18n?.t('Change Password')}</h1>
        </div>
    </div>
    <hr className='border-Font2_Color w-full' />
    <div className=' w-4/5 md:w-3/5 mx-auto py-20'>
        <form action="">
            <div className="pb-6">
                <h1 className='paragraph_1 pb-2 dark:text-white'>{i18n?.t('Old Password')}</h1>
                <Input type='password' placeholder="" className='paragraph_1 p-3 !outline-none placeholder:text-Font2_Color text-Font2_Color bg-transparent' />
            </div>
            <div className="pb-6">
                <h1 className='paragraph_1 pb-2 dark:text-white'>{i18n?.t('New Password')}</h1>
                <Input type='password' placeholder="" className='paragraph_1 p-3 !outline-none placeholder:text-Font2_Color text-Font2_Color bg-transparent' />
            </div>
            <div className="pb-6">
                <h1 className='paragraph_1 pb-2 dark:text-white'>{i18n?.t('Confirm Password')}</h1>
                <Input type='password' placeholder="" className='paragraph_1 p-3 !outline-none placeholder:text-Font2_Color text-Font2_Color bg-transparent' />
            </div>

            <button className='px-5 py-2 border paragraph_1 rounded border-Primary_Color text-Primary_Color hover:bg-Primary_Color hover:text-white duration-300  dark:text-White_Color'>{i18n?.t('Continue')}</button>

        </form>
    </div>
</div>
  )
}

export default Page