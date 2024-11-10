"use client"
import Image from 'next/image';
import React from 'react';

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { FreeMode, Pagination } from 'swiper/modules';
import TabCard from '../common/card/TabCard';

const items = [
    {
        id: 1,
        img: '/tab/Rectangle3.png'
    },
    {
        id: 2,
        img: '/tab/Rectangle2.png'
    },
    {
        id: 3,
        img: '/tab/Rectangle3.png'
    },
    {
        id: 4,
        img: '/tab/Rectangle2.png'
    },
    {
        id: 5,
        img: '/tab/image2.png'
    },
    {
        id: 6,
        img: '/tab/Rectangle3.png'
    }
]

const All = () => {
    return (
        <div>
            <Swiper
            // navigation={true}

                slidesPerView={1}
                spaceBetween={24}
                freeMode={true}
                // pagination={}
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
                modules={[FreeMode, Pagination]}
                className="mySwiper"
            >
                {
                    items.map((item) => <SwiperSlide key={item.id}>
                        <TabCard item={item}></TabCard>
                    </SwiperSlide>)
                }
                
            </Swiper>
            
        </div>

    );
};

export default All;