import { useI18n } from '@/context/i18n'
import dayjs from 'dayjs'
import Link from 'next/link'
import { title } from 'process'
import React from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { BiPlay } from 'react-icons/bi'

const CategoryCard = ({ item }) => {
    const i18n = useI18n()
    let {lang,languages} = useI18n()

    var relativeTime = require('dayjs/plugin/relativeTime')
    dayjs.extend(relativeTime)
    return (

        <div className="group relative border-b border-Font2_Color py-7" >
            <div className='relative md:flex gap-10 items-center justify-between '>
                <div className="md:relative absolute md:top-auto top-[180px] md:left-auto left-10 z-10 ">
                    <div className=" md:h-[110px] md:w-[110px] h-[80px] w-[80px] border rounded-full md:group-hover:bg-Primary_Color duration-500 border-Font2_Color flex flex-col justify-center items-center text-center md:bg-transparent bg-Primary_Color">
                        <h1 className='md:header_3 header_2 text-black dark:text-white group-hover:text-white duration-300'>{dayjs(item?.createdAt).format('DD')}</h1>
                        <p className='md:paragraph_1 paragraph_2 md:text-Font2_Color text-white group-hover:text-white duration-500'>{dayjs(item?.createdAt).format('MMMM')}</p>
                    </div>

                </div>
                <div className="basis-3/6 md:block flex flex-col">
                    <div className="flex md:justify-normal justify-center order-2 ">

                        <h1 className='paragraph_1 text-Font2_Color capitalize '>{item?.category?.name && item?.category?.name[lang]}</h1>
                    </div>
                    <div className="py-3 order-1 md:mb-5 ">
                        <Link href={`/blog/${item?._id}`} className='header_3 md:text-start text-Font1_Color group-hover:text-Primary_Color duration-500 dark:text-white text-justify capitalize'>{item?.title && item?.title[lang]}</Link>
                    </div>
                    <div className="flex justify-between md:relative absolute bottom-1 md:bottom-5 md:w-auto w-full">
                        <Link href={`/blog/${item?._id}`}>
                            <button className=' text-Font2_Color flex items-center group-hover:text-Primary_Color duration-500'>{i18n?.t('view')} <div className="ml-2"><img src="view-arrow.png" width={50} alt="" /></div></button>
                        </Link>
                        <p className=' text-Font2_Color paragraph_1 flex items-center'>
                            <span>
                                <AiOutlineClockCircle />
                            </span>
                            <span className='ms-2'>{dayjs(item?.createdAt).fromNow()}</span>
                        </p>
                    </div>
                </div>
                <div className="basis-2/6 md:mt-0 mt-7 pb-10 md:pb-0">
                    <div className="relative">
                        <img className=' object-fill rounded-xl h-[200px] w-full' src={item?.cover_image} alt=""  />
                        {/* <Link href={`/blog/${item?._id}`} className="opacity-0 group-hover:opacity-100 duration-500 cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-3 bg-Primary_Color text-white flex justify-center items-center border border-white">
                            <span className='text-3xl'><BiPlay /></span>
                        </Link> */}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CategoryCard