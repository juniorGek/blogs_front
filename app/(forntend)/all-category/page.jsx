"use client"
import TopicCard from '@/components/common/card/TopicCard';
import { getAllCategoryData } from '@/helpers/backend_helper';
import { useFetch } from '@/helpers/hooks';
import React from 'react';

const Page = () => {

    const [topic, getTopic, { loading, error }] = useFetch(getAllCategoryData)

    return (
        <div className='dark:bg-BG_Color bg-white py-10'>

            <div className='container'>
                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 pt-12 md:pt-28'>
                    {
                        topic?.map((item) => <TopicCard key={item._id} item={item}></TopicCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Page;