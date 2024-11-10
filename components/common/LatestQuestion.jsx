"use client";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { useI18n } from "@/context/i18n";
import { fetchForumQuestions } from "@/helpers/backend_helper";
import { useFetch } from "@/helpers/hooks";
import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import LatestQuestionCard from './card/LatestQuesCard';

const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 2,
    swipeToSlide: true,
    arrows: false,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,

            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,

            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,

            }
        }
    ]

};
const LatestQuestions = () => {
    const slider = useRef(null);
    const i18n = useI18n();
    const [data, getData, { loading, error }] = useFetch(fetchForumQuestions);
    const { lang } = useI18n();

    return (
        <section className='bg-white dark:bg-BG_Color py-10'>
            <div className="container mx-auto ">
                <div className="flex md:justify-between justify-center ">
                    <h1 className='text-center md:header_1 header_3 text-Font1_Color dark:text-white mb-10'>{i18n?.t('Latest Questions')}</h1>
                    <div className="md:flex hidden ">
                        <button onClick={() => slider?.current?.slickPrev()} className='text-Font1_Color dark:text-white dark:border-Primary_Color dark:border-opacity-30 hover:text-White_Color  flex items-center justify-center rounded-full border text-2xl border-opacity-30  hover:bg-Primary_Color duration-300 h-[40px] w-[40px] mr-6'><AiOutlineArrowLeft /></button>
                        <button onClick={() => slider?.current?.slickNext()} className='text-Font1_Color dark:text-white flex items-center justify-center rounded-full border text-2xl dark:border-Primary_Color dark:border-opacity-30 hover:text-White_Color hover:bg-Primary_Color duration-300 h-[40px] w-[40px]'><AiOutlineArrowRight /></button>
                    </div>
                </div>
                <div className="flex">
                    <div className="w-full">

                        {
                            // <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10" >
                            <Slider ref={slider} {...settings}>

                                {data?.docs?.slice(0, 6)?.map((item, index) => (
                                    <div key={index}>
                                        <LatestQuestionCard data={item} getData={getData}/>
                                    </div>
                                ))}
                            </Slider>
                        }
                    </div>
                </div>
                <div className="flex justify-center py-8">
                    <Link href='/forum' className=' text-Font1_Color dark:text-white flex items-center dark:hover:text-Primary_Color hover:text-Primary_Color duration-300 header_4 gap-2'>{i18n?.t('View Forum')} <img src="/view-arrow.png" width={60} alt="" /></Link>
                </div>
            </div>
        </section>
    );
};

export default LatestQuestions;

