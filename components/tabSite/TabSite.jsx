"use client"
import React, { useEffect, useState } from 'react';
import { blogPublished, fetchPublishedForFrontend, getTags } from '@/helpers/backend_helper';
import { useCategoryContext } from '@/context/category';
import { useFetch } from '@/helpers/hooks';
import TabCard from '../common/card/TabCard';
import { Swiper, SwiperSlide } from "swiper/react";
import { RiQuestionnaireLine } from "react-icons/ri";
import { FaPoll } from "react-icons/fa";
import Image from 'next/image';
import { GrGallery } from "react-icons/gr";
import { RiGalleryLine } from "react-icons/ri";
import { FaRegCheckSquare } from "react-icons/fa"
import { MdInsertChart } from "react-icons/md";
import { message } from 'antd';


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
import { useUserContext } from '@/context/user';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const TabSite = () => {
    let { lang, languages } = useI18n()
    const i18n = useI18n()


    const { tags, tagLoading } = useCategoryContext();
    const [tagID, setTagID] = useState(null)
    const [blog, getBlog, { loading, error }] = useFetch(fetchPublishedForFrontend);
    const [firstModalOpen, setFirstModalOpen] = useState(false);
    const { user } = useUserContext();

    const showModal = () => {
        // console.log(user)
        user._id ?
            setFirstModalOpen(true) :
            message.warning("Please login first!")
    };
    const handleCancel = () => {
        setFirstModalOpen(false);
    };

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
        <div className='pt-6 md:pt-5 p-6'>
            {
              tagLoading ?  
              <Skeleton className='m-6' width={1000} height={80} />:
              <div
              onClick={showModal}
              className="   dark:border-BG_Line_Color border-Light_Line_Color hover:border-[#fd4b5f] dark:!text-white w-full rounded-lg group hover:opacity-90 sm:  cursor-pointer flex flex-row gap-4 p-2 mb-[30px]  border-2"
          >
              <div className="flex items-center gap-2 w-[65rem]">

                  <Image
                      width={100}
                      height={100}
                      className="h-[40px] w-[40px] rounded-full border-2 "
                      alt="..."
                      src={
                          user?.image ?
                              user?.image :
                              "/blank-profile.png"
                      }
                  />
                  <p className="text-sm font-normal  border dark:border-BG_Line_Color border-Light_Line_Color rounded-lg w-full py-2 pl-4">
                      {i18n?.t('An opinion or question? Share it with us!?')}
                  </p>
              </div>
              <div className="flex justify-center items-center text-md w-[10rem] gap-2 dark:border-BG_Line_Color border-Light_Line_Color rounded-lg">
              <MdInsertChart className='w-8 h-8 ' />
              <RiGalleryLine  className='w-8 h-8 ' />
              <FaRegCheckSquare className='w-8 h-8' />

              
              
              
              </div>
          </div>
            }

           


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
                            <Link href={'/test'} >Test</Link>
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


