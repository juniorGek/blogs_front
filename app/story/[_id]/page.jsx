"use client"
import { Loader } from '@/app/(dashboard)/components/common/preloader';
import { useI18n } from '@/context/i18n';
import { fetchAllStoryTopic, fetchStoryForFrontend } from '@/helpers/backend_helper';
import { useFetch } from '@/helpers/hooks';
import { set } from 'draft-js/lib/DefaultDraftBlockRenderMap';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';
import Stories from 'react-insta-stories';
import { useSwipeable } from 'react-swipeable';

const Story = ({ params }) => {
    const { _id } = params;
    const [topic_id, setTopic_id] = useState(_id ? _id : null);
    const router = useRouter();
    const [topics, getTopics, { loading: loadingTopic }] = useFetch(fetchAllStoryTopic)

    const filteredTopics = topics ? topics.filter((item) => item._id !== _id) : []

    const originalTopics = [
        topics ? topics.find((item) => item._id === _id) : null,
        ...filteredTopics
    ]

    const [mainStory, getMainStory] = useFetch(fetchStoryForFrontend, {}, false);
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getMainStory({ topic: topic_id });
    }, [topic_id]);


    const handlers = useSwipeable({
        onSwipedLeft: () => {

            const nextIndex = currentStoryIndex + 1;
            if (nextIndex < originalTopics.length) {
                setFade('fade-out');
                setLoading(true);
                setTimeout(() => {
                    setCurrentStoryIndex(nextIndex);
                    setFade('fade-in');
                    const nextTopicId = originalTopics[nextIndex]?._id;
                    if (nextTopicId) {
                        getMainStory({ topic: nextTopicId });
                        setLoading(false);
                    }
                }, 500);
            }
        },
        onSwipedRight: () => {

            const prevIndex = currentStoryIndex - 1;
            if (prevIndex >= 0) {
                setFade('fade-out');
                setLoading(true);
                setTimeout(() => {
                    setCurrentStoryIndex(prevIndex);
                    setFade('fade-in');
                    const prevTopicId = originalTopics[prevIndex]?._id;
                    if (prevTopicId) {
                        getMainStory({ topic: prevTopicId });
                        setLoading(false);
                    }
                }, 500);
            }
        },
        // preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    const i18n = useI18n()

    const [fade, setFade] = useState('fade-in');

    return (
        <div className=' bg-BG_Color h-full' >
            <div className=' md:flex justify-center relative '>
                <div className='md:h-[100vh] bg-BG_Color'>

                </div>
                <div className='hidden md:block'>
                    <div className='flex absolute top-0 left-0 items-center justify-center cursor-pointer' onClick={
                        () => {
                            router.back()
                        }
                    } >
                        <MdArrowBackIosNew className='text-2xl text-Primary_Color' />
                        <h1 className='text-2xl text-Primary_Color'>{i18n.t('Back')}</h1>
                    </div>
                </div>
                {
                    loading ?
                        <div className='flex justify-center items-center h-[100vh] w-full'>
                            <Loader />
                        </div> :
                        <div className={`story-container ${fade}`} {...handlers}>
                            {
                                mainStory && mainStory?.docs[0]?.stories && 
                                <Stories
                                    stories={Array.isArray(mainStory?.docs[0]?.stories) && mainStory?.docs[0]?.stories.map((story) => {
                                        return story.type === 'image'
                                            ? {
                                                url: story.image_url,
                                                type: 'image',
                                                header: {
                                                    heading: story.topic.title.fr || story.topic.title.en,
                                                    profileImage: story.topic.image,
                                                },
                                            }
                                            : {
                                                url: story.video_url,
                                                type: 'video',
                                                header: {
                                                    heading: story.topic.title.fr || story.topic.title.en,
                                                    profileImage: story.topic.image,
                                                },
                                            };
                                    })}
                                    onAllStoriesEnd={
                                        () => {
                                            if (currentStoryIndex < originalTopics.length - 1) {
                                                setFade('fade-out');
                                                setLoading(true);
                                                setTimeout(() => {
                                                    setCurrentStoryIndex((prevIndex) => prevIndex + 1);
                                                    setFade('fade-in');
                                                    const nextTopicId = originalTopics[currentStoryIndex + 1]?._id;
                                                    if (nextTopicId) {
                                                        getMainStory({ topic: nextTopicId });
                                                        setLoading(false);
                                                    }
                                                }, 500);
                                            } else if (currentStoryIndex === originalTopics.length - 1) {
                                                router.push('/')
                                            }
                                        }
                                    }
                                    height={'100vh'}
                                    width={window.innerWidth > 432 ? 432 : window.innerWidth}
                                    defaultInterval={20000}
                                />
                            }
                        </div>
                }
            </div>
        </div>
    );
};





export default Story;