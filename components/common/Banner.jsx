import { useI18n } from '@/context/i18n';
import dayjs from 'dayjs';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { AiFillEye } from 'react-icons/ai';
import { BiComment } from 'react-icons/bi';
import { FiClock, FiEye } from 'react-icons/fi';

const Banner = ({ item }) => {
    const i18n = useI18n()
    let { lang, languages } = useI18n()


    const [image, setImage] = useState('');

    useEffect(() => {
        if (!!item) {
            setImage(item?.cover_image)
        }
    }, [item])

    return (
        <div style={{ backgroundImage: `url(${image})` }} className="bg-no-repeat bg-center bg-cover">
            <div className="h-full w-full bg-black !bg-opacity-70">
                <div className='pt-16 md:pt-36'>
                    <div className='container text-White_Color'>
                        <button className='bg-Primary_Color text-White_Color py-2 px-4 rounded-lg'>{item?.category?.name && item?.category?.name[lang]}</button>
                        <h1 className='md:text-5xl text-3xl font-bold w-full md:w-2/3 pb-8 pt-6 capitalize'>{item?.title && item?.title[lang]}</h1>
                        <hr className='border-Font2_Color w-full' />
                        <div className='flex items-center justify-between md:justify-normal md:gap-32 py-7'>

                            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                                {/* <div className='flex items-center'><FiEye/><span className='mx-2'>{item?.number_of_views} {i18n?.t('views')}</span> |</div> */}
                                <div className='flex items-center'><BiComment /><span className='mx-2'>{item?.number_of_comments} {i18n?.t('Comments')}</span> <span className='md:block hidden'>|</span></div>
                                <div className='flex items-center basis-1'><FiClock /><span className='m-2'>{dayjs(item?.createdAt).format(' MMM. DD, YYYY')}</span></div>
                            </div>
                        </div>
                        <hr className='border-Font2_Color w-full pb-8' />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Banner;