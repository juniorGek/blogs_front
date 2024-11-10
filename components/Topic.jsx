"use client"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import TopicCard from './common/card/TopicCard'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { useRef } from 'react';
import { useCategoryContext } from '@/context/category';
import { useI18n } from '@/context/i18n';
import { useFetch } from '@/helpers/hooks';
import { getAllCategoryData, getCategoryData } from '@/helpers/backend_helper';

const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,
    swipeToSlide: true,
    arrows:false,
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

const Topic = () => {
    const i18n = useI18n()
    const slider = useRef(null);
    // const { topic } = useCategoryContext()
    const [topic,getTopic,{loading,error}] = useFetch(getAllCategoryData)


    
    var settings2 = {
        dots: false,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        // initialSlide: 0,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 0,

                }
            },
            {
                breakpoint: 600,
                settings: {
                    infinite: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay:true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    infinite: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,

                }
            }
        ]
    };

    if(loading) return <div></div>

    return (
        <section className='bg-white dark:bg-BG_Color py-10'>
            <div className="container mx-auto">
                <div className="">
                    <div className="flex md:justify-between justify-center ">
                        <h1 className='md:header_1 text-3xl font-medium text-Font1_Color dark:text-white  '>{i18n?.t('Entire Topics')}</h1>
                        <div className="md:flex hidden ">
                            <button onClick={() => slider?.current?.slickPrev()} className='text-Font1_Color dark:text-white dark:border-Primary_Color dark:border-opacity-30 hover:text-White_Color  flex items-center justify-center rounded-full border text-2xl border-opacity-30  hover:bg-Primary_Color duration-300 h-[40px] w-[40px] mr-6'><AiOutlineArrowLeft /></button>
                            <button onClick={() => slider?.current?.slickNext()} className='text-Font1_Color dark:text-white flex items-center justify-center rounded-full border text-2xl dark:border-Primary_Color dark:border-opacity-30 hover:text-White_Color hover:bg-Primary_Color duration-300 h-[40px] w-[40px]'><AiOutlineArrowRight /></button>
                        </div>
                    </div>
                    <div className=" mt-8">
                        <Slider ref={slider} {...settings}>
                            {
                                topic?.map((e) => {
                                    return (<TopicCard item={e} key={e?._id} />);
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Topic