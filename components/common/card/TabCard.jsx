"use client"
import React from 'react';
import Arrobtn from '../btn/Arrobtn';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useI18n } from '@/context/i18n';

var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const TabCard = ({ item }) => {
    const i18n = useI18n()
    let { lang, languages } = useI18n()
    return (
        <div style={{ backgroundImage: `url(${item?.cover_image})` }} className={`bg-no-repeat bg-cover bg-center h-[300px] md:h-[354px] group duration-200 relative rounded-xl `}>
            <div className='h-full w-full rounded-xl' style={{ backgroundColor: 'rgba(0, 0, 0, 0.26), rgba(0, 0, 0, 0.22)' }}>
                <div className='flex items-center justify-between p-5'>
                    <p className='bg-Primary_Color text-White_Color py-1 px-4 rounded-lg capitalize'>{item?.category?.name && item?.category?.name[lang]}</p>
                </div>

                <p className='absolute bottom-0 p-3 text-xl text-white tej flex flex-grow mt-auto opacity-100 group-hover:opacity-0 duration-200 capitalize'>
                    {/* {item?.title[lang]?.length > 50 ? item?.title && item?.title[lang]?.slice(0, 50) + '...' : item?.title && item?.title[lang]} */}
                    {
                        item?.title && item?.title[lang]
                    }
                </p>
                <div className='absolute p-5 bg-White_Color  dark:bg-BG_Color rounded-b-xl w-full opacity-0 group-hover:opacity-100 bottom-0 duration-300 transition-all ease-linear'>
                    <div className='text-center pt-4 '>
                        {/* <h1 className='border-2 rounded-full w-3/4 mx-auto py-1'>{dayjs(item?.createdAt).format('MMM DD, YYYY')} | {item?.number_of_views} {i18n?.t('views')}</h1> */}
                    </div>
                    <Link href={`/blog/${item?._id}`} className='capitalize text-2xl pt-3 text-Primary_Color text-center flex flex-grow mt-auto duration-200'>
                        {item?.title && item?.title[lang]}
                    </Link>
                    <div className='flex justify-between  dark:text-White_Color items-center pt-5'>
                        <Link href={`/blog/${item?._id}`}><Arrobtn>{i18n?.t('view')}</Arrobtn></Link>
                        <h1>{dayjs(item?.createdAt).fromNow()}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TabCard;
