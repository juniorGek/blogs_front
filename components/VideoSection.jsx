import { useI18n } from '@/context/i18n'
import { fetchVideo } from '@/helpers/backend_helper'
import { useFetch } from '@/helpers/hooks'
import dayjs from 'dayjs'
import Link from 'next/link'
import React from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { BiComment, BiCommentDots, BiPlay } from 'react-icons/bi'
import { CgEye } from 'react-icons/cg'


const VideoSection = () => {
    const i18n = useI18n()
    let { lang, languages } = useI18n()

    const [videos] = useFetch(fetchVideo);
    var relativeTime = require('dayjs/plugin/relativeTime')
    dayjs.extend(relativeTime)

    return (
        <section className='bg-white dark:bg-BG_Color py-[130px]'>
            <div className="container mx-auto">
                <div className="">
                    <div className="flex justify-between">
                        <h1 className='md:header_1 header_3 text-Font1_Color dark:text-white '>{i18n?.t('Featured Video')}</h1>
                        <Link href={`/blogs/video-type`} className=' text-Font2_Color flex items-center hover:text-Primary_Color duration-300'>{i18n?.t('Explore All')} <div className="ml-2"><img src="view-arrow.png" width={50} alt="" /></div></Link>
                    </div>
                    <div className="lg:flex gap-10 mt-[60px]">
                        {
                            videos?.blog &&
                            <div className=" basis-3/5 group">
                                <div className="relative w-full max-h-[610px]">
                                    <img className='w-full h-[610px] object-cover rounded-md' src={videos?.blog?.cover_image} alt="" />
                                    <Link href={`/blog/${videos?.blog?._id}`} className=" cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-3 bg-Primary_Color text-white flex justify-center items-center border border-white">
                                        <span className='text-3xl'><BiPlay /></span>
                                    </Link>
                                </div>
                                <div className="flex Featured_Video py-6">
                                    {/* <div className="">
                                            <div className='paragraph_1 flex md:flex-row flex-col items-center text-Font2_Color'>
                                            <CgEye /> 
                                            <span className='ps-2'>{videos?.blog?.number_of_views} {i18n?.t('views')}</span>
                                            </div>
                                        </div> */}
                                    <div className="w-[2px] bg-Primary_Color mx-5"></div>
                                    <div className="">
                                        <div className='paragraph_1 flex md:flex-row flex-col items-center text-Font2_Color'><BiCommentDots /> <span className='ps-2'>{videos?.blog?.number_of_comments} {i18n?.t('Comments')}</span></div>
                                    </div>
                                    <div className="w-[2px] bg-Primary_Color mx-5"></div>
                                    <div className="">
                                        <div className='paragraph_1 flex md:flex-row flex-col items-center text-Font2_Color'><AiOutlineClockCircle /> <span className='ps-2'>{videos?.blog?.time_to_read && videos?.blog?.time_to_read[lang]}</span></div>
                                    </div>
                                </div>
                                <div className="">
                                    <Link href={`/blog/${videos?.blog?._id}`} className='header_2 text-Font1_Color dark:text-white group-hover:text-Primary_Color duration-300 capitalize'>{videos?.blog?.title && videos?.blog?.title[lang]}</Link>
                                </div>
                                <div className="py-8">
                                    <p className='paragraph_1 text-Font2_Color capitalize'>{videos?.blog?.short_info && videos?.blog?.short_info[lang]}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="border border-Font2_Color p-1 paragraph_1 px-6 rounded-full text-Primary_Color">
                                        {dayjs(videos?.blog?.createdAt).format(' MMM. DD, YYYY')}
                                    </div>
                                    <Link href={`/blog/${videos?.blog?._id}`} className=' text-Font2_Color flex items-center group-hover:text-Primary_Color duration-300'>{i18n?.t('View')} <div className="ml-2"><img src="view-arrow.png" width={50} alt="" /></div></Link>

                                </div>
                            </div>

                        }

                        <div className="basis-2/5 md:mt-0 mt-5">
                            {
                                videos?.blogs?.length > 0 && videos?.blogs?.map((e) =>
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
                                                    <Link href={`/blog/${e?._id}`} className=' text-Font2_Color flex items-center group-hover:text-Primary_Color duration-300'>{i18n?.t('view')} <div className="ml-2"><img src="view-arrow.png" width={50} alt="" /></div></Link>
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


                    </div>
                </div>

            </div>
        </section>
    )
}

export default VideoSection