'use client'
import categoryContext from '@/context/category';
import { getCategoryData, getCategoryDataSub, getTags } from '@/helpers/backend_helper';
import { useFetch } from '@/helpers/hooks';
import React, { useEffect, useState } from 'react';

const CategoryProviders = ({ children }) => {
    const [tags, setTags] = useState([])
    // const [topic, setTopic] = useState([]);
    // console.log("🚀 ~ file: CategoryProviders.jsx:10 ~ CategoryProviders ~ topic:", topic)
    const [tagsData, getTag, {loading: tagLoading}] = useFetch(getTags)
    const [topic, getTopic, {loading: topicLoading}] = useFetch(getCategoryDataSub)
    // console.log("🚀 ~ file: CategoryProviders.jsx:12 ~ CategoryProviders ~ topicData:", topicData)

    // const CategoryDataSub = async () => {
    //     const sub = await useFetch(getCategoryDataSub)
    //     console.log("🚀 ~ file: CategoryProviders.jsx:17 ~ useEffect ~ sub:", sub)
        
    // }
    
    useEffect(() => {
        getTag()
        getTopic()
        // CategoryDataSub()
        // getTopicSub()
    }, [] );
    
    useEffect(() => {
        if (tagsData?.docs) {
            setTags(tagsData?.docs)
            // setTopic(topicData?.docs)
        }
        
    }, [tagsData?.docs]);
    // tag()
    // getCategory()
    // const getCategory = async () => {
    //     const { error, data } = await getCategoryData()
    //     if (error === false) {
    //         setTopic(data?.docs)
    //     }
    // }

    // const tag = async () => {
    //     const { error, data } = await getTags()
    //     setTags(data?.docs)
    // }

    return (
        <categoryContext.Provider value={{ topic, tags, tagLoading, topicLoading }}>
            {children}
        </categoryContext.Provider>
    );
};

export default CategoryProviders;