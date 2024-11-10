/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Tag from '@/components/Tag';
import Stay from '@/components/common/btn/Stay';
import ArticalCard from '@/components/common/card/ArticalCard';
import ChoiceCard from '@/components/common/card/ChoiceCard';
import Pagination2 from '@/components/common/pagination2';
import { useI18n } from '@/context/i18n';
import { blogPublished, fetchEdChoice, fetchSubCategory, fetchTags, getSigleCategory } from '@/helpers/backend_helper';
import { useFetch } from '@/helpers/hooks';
import { Input } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { BiSearch } from 'react-icons/bi';
import { Suspense } from 'react';

const Page = () => {
    const i18n = useI18n();
    let { lang, languages } = useI18n();

    const { push } = useRouter();

    const param = typeof window !== 'undefined' ? useSearchParams() : new URLSearchParams();

    const [blogs, getBlogs, { loading, error }] = useFetch(blogPublished, {}, false);
    const [category, getCategory] = useFetch(getSigleCategory, {}, false);
    const [edChoice, getEdChoice] = useFetch(fetchEdChoice, { size: 4 });
    const [tags, getTags] = useFetch(fetchTags, {}, false);
    const [subcategory, getSubCategory] = useFetch(fetchSubCategory, {}, false);

    useEffect(() => {
        if (param.get('category_id')) {
            getCategory({
                _id: param.get('category_id')
            });
            getBlogs({
                category_id: param.get('category_id'),
                search: "",
                subcategory_id: ''
            });
        } else if (param.get('tag_id')) {
            getBlogs({
                tag_id: param.get('tag_id')
            });
        } else if (param.get('search')) {
            getBlogs({
                search: param.get('search')
            });
        } else if (param.get('subcategory_id')) {
            getSubCategory({
                _id: param.get('subcategory_id')
            });
            getBlogs({
                subcategory_id: param.get('subcategory_id'),
                search: "",
                category_id: ''
            });
        } else {
            getBlogs({
                published: true
            });
        }
    }, [param, getBlogs, getCategory, getSubCategory]);

    useEffect(() => {
        getEdChoice({
            category_id: param.get('category_id'),
        });
    }, [param, getEdChoice]);

    useEffect(() => {
        getTags({});
    }, [getTags]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <section className='dark:bg-BG_Color bg-white py-10'>
                <div className="container mx-auto">
                    <div className="">
                        <h1 className='dark:text-white header_2 text-Font1_Color mb-10'>
                            {param.has('category_id') ? `${i18n?.t('Category')} : ` + category?.name[lang] : ""}
                            {param.has('tag') ? `${i18n?.t('Tag')} : ` + param.get('tag') : ""}
                            {param.has('subcategory_id') ? `${i18n?.t('Subcategory')} : ` + subcategory?.name[lang] : ""}
                        </h1>
                        <div className="lg:flex justify-between gap-x-5">
                            <div className="basis-2/3 h-full">
                                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                                    {
                                        blogs?.docs?.length > 0 ? (
                                            blogs?.docs?.map((item) => (
                                                <ArticalCard item={item} key={item._id} />
                                            ))
                                        ) : (
                                            <p className='py-10 header_4 font-semibold text-Primary_Color'>
                                                {loading === true ? "Please Wait..." : "No Blog Found"}
                                            </p>
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
                            <div className="basis-1/3 md:mt-0 mt-10">
                                <div className="border dark:border-BG_Line_Color border-Light_Line_Color p-5 relative rounded-lg">
                                    <Input onChange={(values) => push(`/blogs/?search=${values.target.value}`)} className='paragraph_2 text-Font2_Color p-5 w-full bg-Primary_Color bg-opacity-10 outline-none border-none dark:placeholder:text-white' placeholder={i18n?.t('Search Here')} type="text" />
                                    <button className='text-[28px] absolute top-1/2 right-8 hover:text-Primary_Color duration-300 text-Font2_Color -translate-y-1/2'><BiSearch /></button>
                                </div>
                                <div className="rounded-lg border dark:border-BG_Line_Color border-Light_Line_Color p-6 my-10">
                                    <h1 className='header_4 pb-4 border-b dark:border-BG_Line_Color border-Light_Line_Color text-Font1_Color dark:text-white'>{i18n?.t('EDITOR CHOICE')}</h1>
                                    <div className="">
                                        {
                                            edChoice?.map((e) => (
                                                <ChoiceCard item={e} key={e.id} />
                                            ))
                                        }
                                        {!edChoice && (
                                            <div className=''>
                                                <h1 className='py-5 text-xl text-red-500'>{i18n?.t('No Blog Available')}</h1>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <Stay />
                                <div className="rounded-lg border dark:border-BG_Line_Color border-Light_Line_Color p-6 mt-10 ">
                                    <h1 className='header_4 pb-4 border-b dark:border-BG_Line_Color border-Light_Line_Color text-Font1_Color dark:text-white'>{i18n?.t('Tag')}</h1>
                                    <div className="py-10">
                                        {
                                            tags?.docs?.map((e) => (
                                                <Tag item={e} key={e.id} />
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Suspense>
    );
};

export default Page;
