"use client"
import React, { useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { FreeMode, Navigation, Pagination, Loop } from 'swiper/modules';
import { useI18n } from '@/context/i18n';
import 'react-loading-skeleton/dist/skeleton.css'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { useFetch } from '@/helpers/hooks';
import { fetchAllStoryTopic, fetchStoryForFrontend } from '@/helpers/backend_helper';
import { useRouter } from 'next/navigation';
import Skeleton from 'react-loading-skeleton';





const Story = () => {
    const i18n = useI18n()
    const router = useRouter()

    const { lang } = useI18n()

    const handleClick = (_id) => {
        router.push(`/story/${_id}`)
    }

    const [stories, getStories, { loading: loadingStories }] = useFetch(fetchAllStoryTopic)






    return (
        <div className="flex w-full  items-center justify-between pt-4 px-2">
            {/* <div className='swiper-button-prev cursor-pointer hidden md:block'>

                <MdArrowBackIos className='dark:text-white' ></MdArrowBackIos>
            </div> */}
            <div className='w-full md:w-11/12 swiper-tabbar flex items-center justify-center'>
                <Swiper
                    slidesPerView={"auto"}
                    spaceBetween={24}
                    freeMode={true}

                    modules={[FreeMode, Pagination, Navigation]}
                    navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
                    className="mySwiper"
                >
                    {loadingStories ? <div className='flex items-center gap-8'>
                        <Skeleton className=' !rounded-full' width={80} height={80} />
                        <Skeleton className=' !rounded-full' width={80} height={80} />
                        <Skeleton className=' !rounded-full' width={80} height={80} />
                        <Skeleton className=' !rounded-full' width={80} height={80} />
                        <Skeleton className=' !rounded-full' width={80} height={80} />
                        <Skeleton className=' !rounded-full' width={80} height={80} />
                        <Skeleton className=' !rounded-full' width={80} height={80} />
                    </div> :
                        stories?.map((item) =>

                            <SwiperSlide key={item._id} className='!mr-4 '>
                                <div onClick={() => handleClick(item._id)} className='group cursor-pointer md:mr-3'>
                                    <img className='rounded-full h-16 w-16 md:h-20 md:w-20 border-2 border transition-all ease-in-out delay-75 group-hover:border-Primary_Color' src={item?.image} alt="" />
                                    <h1 className='text-center text-sm md:text-[16px] group-hover:text-Primary_Color dark:text-white mt-3'>{item?.title &&
                                        item?.title[lang].length > 8 ? item?.title[lang].slice(0, 8) + '...' : item?.title[lang]
                                    }</h1>
                                </div>
                            </SwiperSlide>
                        )
                    }
                </Swiper>
            </div>


            {/* <div className='swiper-button-next cursor-pointer hidden md:block'>
                <MdArrowForwardIos className='dark:text-white'></MdArrowForwardIos>
            </div> */}





        </div>
    );
};

export default Story;