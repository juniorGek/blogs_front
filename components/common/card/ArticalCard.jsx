import dayjs from 'dayjs'
import Link from 'next/link'
import React from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { motion } from 'framer-motion';
import { useI18n } from '@/context/i18n';
import { Tooltip } from 'antd';

const ArticalCard = ({ item }) => {
    const i18n = useI18n()
    let { lang, languages } = useI18n()
    var relativeTime = require('dayjs/plugin/relativeTime')
    dayjs.extend(relativeTime)
    return (
        <div className=" group">
            <div className="">
                <div className="relative w-full h-[200px] md:h-[240px] overflow-hidden rounded-t-2xl">
                    <motion.div
                        whileHover={{ scale: [null, 1.2] }}
                        transition={{ duration: 0.5 }}
                        className='w-full h-full'
                    >
                        <img className='w-full h-full object-cover rounded-t-2xl' src={item?.cover_image} alt="" />
                    </motion.div>
                    <p className='px-4 p-1 rounded-md text-white py-1 bg-Primary_Color header_4 absolute top-5 left-3 capitalize'>{item?.category?.name && item?.category?.name[lang]}</p>
                </div>
            </div>
            <div className="p-3 border-x border-b dark:border-BG_Line_Color border-Light_Line_Color rounded-b-2xl">
                <div className="flex  ">
                    <div className="">
                        <p className='paragraph_2 flex items-center text-Font2_Color'>{dayjs(item?.createdAt).format(' MMM DD, YYYY')}</p>
                    </div>
                    <div className="w-[2px] bg-Primary_Color mx-8"></div>
                    <div className="">
                        <p className='paragraph_2 flex items-center text-Font2_Color capitalize'>{item?.category?.name && item?.category?.name[lang]}</p>
                    </div>
                </div>
                <div className="py-5 min-h-[118px]">
                    {/* <Link href={`/blog/${item?._id}`} className='header_3 text-Font1_Color dark:text-white group-hover:text-Primary_Color duration-500 capitalize'>{ item?.title && item?.title[lang]?.slice(0, 28)} {item?.title && item?.title[lang]?.length > 28 ? "..." : ""} */}
                    {
                        <Link href={`/blog/${item?._id}`} className='header_4  text-Font1_Color dark:text-white group-hover:text-Primary_Color duration-500 capitalize'>
                            {/* {item?.title && item?.title[lang]?.length > 25 ?
                                <Tooltip title={item?.title && item?.title[lang]}>{item?.title && item?.title[lang].slice(0, 25)}...</Tooltip> : <h1>
                                    {item?.title && item?.title[lang]}
                                </h1>} */}
                            {item?.title && item?.title[lang]}

                        </Link>
                    }
                </div>
                <div className="flex justify-between items-center ">

                    <div className="">
                        <Link href={`/blog/${item?._id}`} className=' text-Font2_Color flex items-center group-hover:text-Primary_Color duration-300'>{i18n?.t('view')} <div className="ml-2"><img src="/view-arrow.png" width={50} alt="" /></div></Link>
                    </div>
                    <div className="">
                        <p className='paragraph_1 flex items-center text-Font2_Color'><AiOutlineClockCircle /> <span className='ps-2'>{dayjs(item?.createdAt).fromNow()}</span></p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ArticalCard