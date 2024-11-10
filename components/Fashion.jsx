"use client"
import React, { useEffect, useState } from 'react'
import { AiOutlineArrowRight, AiOutlineArrowLeft, AiFillFacebook } from 'react-icons/ai';
import CategoryCart from './common/card/CategoryCard';
import ChoiceCard from './common/card/ChoiceCard';
import Stay from './common/btn/Stay';
import { fetchCtwData } from '@/helpers/backend_helper';
import { useFetch } from '@/helpers/hooks';
import { useI18n } from '@/context/i18n';



const Fashion = () => {
  const i18n = useI18n()
  let {lang,languages} = useI18n()

  const [page, setpage] = useState(1);
  const [blogs, getBlogs] = useFetch(fetchCtwData, {}, false);

  useEffect(() => {
    getBlogs({
      page: page,
      size: ""
    })
  }, [page])

  const nextc = () => {
    setpage(page + 1)
  }
  const prevc = () => {
    setpage(page - 1)
  }

  return (
    <>
      <section className='bg-white dark:bg-BG_Color py-10'>
        <div className="container mx-auto">
          <div className="">

            <div className="lg:flex gap-7 md:mt-12">
              <div className="basis-2/3 md:mb-0 mb-5">

                <div className='md:pt-2'>
                  <div className=' flex justify-between items-center'>
                    <h1 className='md:header_1 header_3  text-Font1_Color dark:text-white overflow-hidden '>{blogs?.docs[0]?.name && blogs?.docs[0]?.name[lang]}</h1>
                    <div className="flex gap-2 md:hidden">

                      <button onClick={() => prevc()} disabled={!blogs?.hasPrevPage || page === 1} className='text-Font1_Color dark:text-white flex items-center justify-center rounded-full border text-2xl dark:border-Primary_Color dark:border-opacity-30 hover:text-White_Color hover:bg-Primary_Color duration-300 h-[40px] w-[40px]'><AiOutlineArrowLeft /></button>

                      <button onClick={() => nextc()} disabled={!blogs?.hasNextPage} className='text-Font1_Color dark:text-white flex items-center justify-center rounded-full border text-2xl dark:border-Primary_Color dark:border-opacity-30 hover:text-White_Color hover:bg-Primary_Color duration-300 h-[40px] w-[40px]'><AiOutlineArrowRight /></button>

                    </div>
                  </div>

                  <div>
                    {
                      blogs?.docs[0]?.latestBlogs?.length > 0 ? (

                        blogs.docs[0].latestBlogs.map((e) => (
                          <CategoryCart item={e} key={e?._id} />
                        ))
                      ) : (<p className='header_4 py-3 font-semibold text-Primary_Color mt-10'>
                        {i18n?.t("No blog found")}
                      </p>
                      )
                    }
                  </div>
                </div>
              </div>

              <div className="basis-1/3 ">
                <div className="flex md:justify-center lg:justify-end pb-14 md:pt-8 lg:pt-0 justify-center ">
                  <div className="md:flex hidden ">

                    <button onClick={() => prevc()} disabled={!blogs?.hasPrevPage || page === 1} className='text-Font1_Color dark:text-white flex items-center justify-center rounded-full border text-2xl dark:border-Primary_Color dark:border-opacity-30 hover:text-White_Color hover:bg-Primary_Color duration-300 h-[40px] w-[40px] mr-6'><AiOutlineArrowLeft /></button>

                    <button onClick={() => nextc()} disabled={!blogs?.hasNextPage} className='text-Font1_Color dark:text-white flex items-center justify-center rounded-full border text-2xl dark:border-Primary_Color dark:border-opacity-30 hover:text-White_Color hover:bg-Primary_Color duration-300 h-[40px] w-[40px]'><AiOutlineArrowRight /></button>

                  </div>
                </div>

                <div className="rounded-lg border border-Font2_Color p-6 mb-10">
                  <h1 className='header_4 pb-4 border-b border-Font2_Color text-Font1_Color dark:text-white'>{i18n?.t('EDITOR’S CHOICE')}</h1>
                  <div className="space-y-5 mt-4">
                    {
                      blogs?.docs[0]?.editorBlogs?.map((e) => {
                        return (<ChoiceCard item={e} key={e._id} />)
                      })
                    }
                    {
                      blogs?.docs[0]?.editorBlogs.length === 0 && (
                        <p className='header_4 py-3 font-semibold text-Primary_Color'>
                          {i18n?.t("No blog found")}
                        </p>
                      )
                    }
                  </div>
                </div>

                <Stay></Stay>

              </div>
            </div>
          </div>

        </div>
      </section>
    </>

  )
}

export default Fashion