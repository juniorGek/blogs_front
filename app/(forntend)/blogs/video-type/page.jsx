/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import Pagination2 from '@/components/common/pagination2';
import { useI18n } from '@/context/i18n';
import { fetchAllVideoBlog } from '@/helpers/backend_helper';
import { useFetch } from '@/helpers/hooks';
import dayjs from 'dayjs';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BiPlay } from 'react-icons/bi';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'


const page = () => {
    const [blogs, getBlogs ,{ loading, error }] = useFetch(fetchAllVideoBlog, {}, false)
    let { lang, languages } = useI18n()
    const i18n = useI18n()
    var relativeTime = require('dayjs/plugin/relativeTime')
    dayjs.extend(relativeTime)
    useEffect(() => {
        getBlogs()
    }, [])


    return (
        <section className='dark:bg-BG_Color bg-white py-10'>
            <div className="container mx-auto">
                <div className="">
                    <h1 className='dark:text-white header_2 text-Font1_Color mb-10'>
                        Video Blogs
                    </h1>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5' >
                    {loading ? <div className='flex justify-center gap-8'>
                        <Skeleton height={200} width={300} />
                        <Skeleton height={200} width={300} />
                        <Skeleton height={200} width={300} />
                    </div> :
                        blogs?.docs?.map((e) =>
                            <div key={e?._id} className="mb-8 group">
                                <div className="">
                                    <div className="relative w-full h-[250px]">
                                        <img className='w-full h-full rounded-t-2xl' src={e?.cover_image} alt="" />
                                        <Link href={`/blog/${e._id}`} className=" cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-3 bg-Primary_Color text-white flex justify-center items-center border border-white">
                                            <span className='text-3xl'><BiPlay /></span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="p-5 border-x border-b border-Font2_Color rounded-b-2xl">
                                    <div className="flex justify-center items-center ">

                                        <div className="">
                                            <p className='paragraph_2 flex items-center text-Font2_Color'> {dayjs(e?.createdAt).format(' MMM. DD, YYYY')}</p>
                                        </div>
                                        <div className="w-[6px] h-[6px] rounded-full bg-Primary_Color mx-5"></div>
                                        <div className="">
                                            <p className='paragraph_2 flex items-center text-Font2_Color'> {e?.category?.name && e?.category?.name[lang]}</p>
                                        </div>
                                    </div>
                                    <div className="py-8 text-center">
                                        <Link href={`/blog/${e?._id}`} className='header_2 text-Font1_Color dark:text-white group-hover:text-Primary_Color duration-300 capitalize'>{e?.title && e?.title[lang]}</Link>
                                    </div>
                                    <div className="flex justify-center items-center ">
                                        {/* <div className="">
                                                    <div className='paragraph_1 flex md:flex-row flex-col items-center text-Font2_Color'><CgEye /> <span className='ps-2'>{e?.number_of_views} {i18n?.t('views')}</span></div>
                                                </div> */}
                                        <div className=" md:mx-8 mx-4">
                                            <Link href={`/blog/${e?._id}`} className=' text-Font2_Color flex items-center group-hover:text-Primary_Color duration-300'>{i18n?.t('view')} <div className="ml-2"><img src="/view-arrow.png" width={50} alt="" /></div></Link>
                                        </div>
                                        <div className="">
                                            <div className='paragraph_1 flex md:flex-row flex-col items-center text-Font2_Color'><AiOutlineClockCircle /> <span className='ps-2'>{e?.time_to_read && e?.time_to_read[lang]}</span></div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )
                    }
                </div>
                <div className='my-8'>
                    <div className="flex items-center justify-center mt-8">
                        <Pagination2 page={blogs?.page} total={blogs?.totalDocs}
                            onSizeChange={size => getblogs({ size })} limit={blogs?.limit}
                            totalPages={blogs?.totalPages} onPageChange={page => getBlogs({ page })} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default page;