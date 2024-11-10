"use client"
import React from 'react';
import Link from 'next/link'
import Image from 'next/image' 
import { useFetch } from '@/helpers/hooks';
import { fetchForumQuestions } from '@/helpers/backend_helper';
import { useI18n } from '@/context/i18n'
import dayjs from 'dayjs'

const LatestQuesSidebar = () => {
    const [question, getQuestion] = useFetch(
        fetchForumQuestions
    );
    const i18n = useI18n()
    let {lang,languages} = useI18n()
   
    // console.log("🚀 ~ LatestQuesSidebar ~ question:", question)
    return (
        <div>
            <div className="border dark:border-BG_Line_Color border-Light_Line_Color  dark:!text-white w-full h-fit px-3">
                <h2 className="header_4 border-b dark:border-b-BG_Line_Color border-b-Light_Line_Color py-3 text-center">Latest Questions</h2>
                <div className="class flex flex-col gap-2 p-4">
                {
                    question?.docs?.slice(0, 5)?.map((item, index) => {
                        return (
                            <div key={index} className=" group flex gap-4 mt-3">
                                <div className="basis-1/3 group-hover:border-Primary_Color border border-transparent duration-300 h-[70px] w-[50px]">
                                    <Image src={item?.media || "/question.png"} height={80} width={80} alt="question image" className='h-full w-full object-fill'/>
                                </div>
                                <div className="basis-2/3 flex flex-col justify-between">
                                    <Link href={item?._id} className='md:paragraph_1 text-sm text-Font1_Color dark:text-white group-hover:text-Primary_Color duration-300 capitalize line-clamp-2 md:line-clamp-3'>{item?.question}</Link>
                                    <div className="md:paragraph_2 text-xs text-Font2_Color flex  items-center justify-between ">
                                        <p className=''>{dayjs(item?.createdAt).format(' MMM. DD, YYYY')}</p>
                                        <span className='h-2 w-2 rounded-full bg-Primary_Color mx-5 md:block hidden'></span>
                                        <p>{item?.totalAnswers} {i18n?.t('Answers')}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }) 
                }                
            
                </div>
            </div>
        </div>
    );
};

export default LatestQuesSidebar;