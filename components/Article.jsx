import React, { useEffect, useState } from 'react'
import { useFetch } from '@/helpers/hooks';
import { latestBlog } from '@/helpers/backend_helper';
import dayjs from 'dayjs'
import Link from 'next/link';
import { useI18n } from '@/context/i18n';
import ArticalCard from './common/card/ArticalCard';


const Article = () => {
  const i18n = useI18n()
  let { lang, languages } = useI18n()
  const [article, getArticle] = useFetch(latestBlog)

  let defaultWindowSize;
  if (typeof window !== 'undefined') {
    defaultWindowSize = window.innerWidth;
  }

  const [windowSize, setWindowSize] = useState(defaultWindowSize);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = windowSize < 767;

  return (
    <section className='bg-white dark:bg-BG_Color py-10'>
      <div className={`${isMobile ? 'px-3' : 'container'} mx-auto`}>
        <h1 className='text-center md:header_1 header_3 text-Font1_Color dark:text-white mb-10'>{i18n?.t('Latest Article')}</h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">

          {
            article && article.map((item) => (
              <>
                <div className='hidden md:block' key={item?._id}>
                  <ArticalCard item={item} />
                </div>
                <div className='rounded-lg border border-Font2_Color p-4 block md:hidden' key={item?._id}>
                  <div className=" group flex gap-4">
                    <div className="basis-1/3 group-hover:border-Primary_Color border border-transparent duration-300 rounded">
                      <img className=' h-full w-full rounded object-cover' src={item?.cover_image} alt="image" />
                    </div>
                    <div className="basis-2/3 flex flex-col justify-between">
                      <p className='px-2 p-1 mb-1 rounded-md text-white py-1 bg-Primary_Color paragraph_2  capitalize w-fit'>{item?.category?.name && item?.category?.name[lang]}</p>
                      <Link href={`/blog/${item._id}`} className='md:paragraph_1 text-sm text-Font1_Color dark:text-white group-hover:text-Primary_Color duration-300 capitalize my-2'>{item?.title && item?.title[lang]}</Link>

                      <div className="md:paragraph_2 text-xs text-Font2_Color flex  items-center justify-between ">
                        <p className=''>{dayjs(item?.createdAt).format(' MMM. DD, YYYY')}</p>
                        <span className='h-2 w-2 rounded-full bg-Primary_Color mx-5 md:block hidden'></span>
                        <p>{item.number_of_comments} {i18n?.t('Comments')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))
          }

        </div>
        <div className="flex justify-center py-8">
          <Link href='/blogs' className=' text-Font1_Color dark:text-white flex items-center dark:hover:text-Primary_Color hover:text-Primary_Color duration-300 header_4 '>{i18n?.t('View Article')} <div className="ml-2"><img src="/view-arrow.png" width={50} alt="" /></div></Link>
        </div>
      </div>
    </section>
  )
}

export default Article