import { useI18n } from '@/context/i18n'
import dayjs from 'dayjs'
import Link from 'next/link'
import React from 'react'

const ChoiceCard = ({item}) => {
  const i18n = useI18n()
  let {lang,languages} = useI18n()

  return (
    <div className=" group flex gap-4 mt-3">
        <div className="basis-1/3 group-hover:border-Primary_Color border border-transparent duration-300">
            <img  className=' md:h-[84px] h-[60px] w-full rounded object-fill' src={item?.cover_image} alt="image" />
        </div>
        <div className="basis-2/3 flex flex-col justify-between">
            <Link href={`/blog/${item._id}`} className='md:paragraph_1 text-sm text-Font1_Color dark:text-white group-hover:text-Primary_Color duration-300 capitalize line-clamp-2 md:line-clamp-3'>{item?.title && item?.title[lang]}</Link>
            <div className="md:paragraph_2 text-xs text-Font2_Color flex  items-center justify-between ">
                <p className=''>{dayjs(item?.createdAt).format(' MMM. DD, YYYY')}</p>
                <span className='h-2 w-2 rounded-full bg-Primary_Color mx-5 md:block hidden'></span>
                <p>{item.number_of_comments} {i18n?.t('Comments')}</p>
            </div>
        </div>
    </div>
  )
}

export default ChoiceCard