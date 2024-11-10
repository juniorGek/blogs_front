"use client"
import React, { useEffect, useState } from 'react';
import { blogPublished, fetchPublishedForFrontend, getTags } from '@/helpers/backend_helper';
import { useCategoryContext } from '@/context/category';
import { useFetch } from '@/helpers/hooks';
import TabCard from '../common/card/TabCard';
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
// import { Skeleton } from 'antd';
import { useI18n } from '@/context/i18n';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import Link from 'next/link';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const TabSite = () => {
    let { lang, languages } = useI18n()
    const i18n = useI18n()

    const { tags, tagLoading } = useCategoryContext();
    const [tagID, setTagID] = useState(null)
    const [blog, getBlog, { loading, error }] = useFetch(fetchPublishedForFrontend);

    const handleTag = (id) => {
        setTagID(id)
    }

    useEffect(() => {
        if (tagID) {
            getBlog({ tag_id: tagID })
        }
        else {
            getBlog()
        }
    }, [tagID])

    return (
        <div className='pt-6 md:pt-5'>

            <div className="py-9 pr-4 container swiper-tabbar">
                <Swiper
                    slidesPerView="auto"
                    spaceBetween={24}
                    freeMode={true}
                    modules={[FreeMode, Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        {tagLoading ? "" : <div className='border-none outline-none' onClick={() => { getBlog({ tag_id: null }), setTagID(null) }}>
                            <h1 className={`border-2 py-1 px-4 w-fit flex justify-center border-Dsha_Font_2nd_Color rounded-3xl text-Dsha_Font_2nd_Color capitalize cursor-pointer hover:text-Primary_Color hover:border-Primary_Color ${tagID === null && "border-Primary_Color text-Primary_Color"}`}>{i18n.t("All")}</h1>
                        </div>}
                    </SwiperSlide>
                    {
                        tagLoading ? <div className='flex items-center gap-8'>
                            <Skeleton width={150} height={30} />
                            <Skeleton width={150} height={30} />
                            <Skeleton width={150} height={30} />
                            <Skeleton width={150} height={30} />
                            <Skeleton width={150} height={30} />
                            <Link  href={'/test'} >Test</Link>
                        </div> : tags?.map((item) => (
                            <SwiperSlide key={item?._id}>
                                <div className='border-none outline-none' onClick={() => handleTag(item?._id)}>
                                    <h1 className={`border-2 py-1 w-fit flex justify-center items-center px-4 border-Dsha_Font_2nd_Color rounded-3xl text-Dsha_Font_2nd_Color  capitalize cursor-pointer hover:text-Primary_Color hover:border-Primary_Color ${item?._id === tagID && "border-Primary_Color text-Primary_Color"}`}>{item?.name && item?.name[lang]}</h1>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>


            <div className="py-9 px-4">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={24}
                    freeMode={true}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 24,
                        },
                    }}
                    modules={[Autoplay, FreeMode, Pagination]}
                    autoplay={{
                        delay: 1500,
                        disableOnInteraction: true,
                        pauseOnMouseEnter: true,
                        pauseOnMouseEnter: true,

                    }}
                    className="mySwiper"
                >
                    {
                        loading ? <div className='flex justify-center items-center gap-8'>
                            <Skeleton width={300} height={300} />
                            <Skeleton width={300} height={300} />
                            <Skeleton width={300} height={300} />
                            <Skeleton width={300} height={300} />
                        </div> :
                            blog?.docs?.length > 0 ? blog?.docs?.map((item) =>
                                <SwiperSlide key={item._id}>
                                    <TabCard item={item} key={item?._id} />

                                </SwiperSlide>
                            ) : <div className='py-10 header_4 font-semibold text-Primary_Color flex justify-center h-[354px] items-center'>
                                <p>{i18n?.t("No blog found")}</p>
                            </div>
                    }
                </Swiper>


            </div>
        </div>
    );
};

export default TabSite;


