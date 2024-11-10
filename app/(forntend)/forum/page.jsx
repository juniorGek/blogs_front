/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useI18n } from "@/context/i18n";
import { fetchForumQuestions } from "@/helpers/backend_helper";
import { useFetch } from "@/helpers/hooks";
import { Modal } from "antd";
import Stay from "@/components/common/btn/Stay";
import Skeleton from 'react-loading-skeleton';
import QuestionCard2 from "@/components/common/card/QuestionCard2";
import InfiniteScroll from 'react-infinite-scroll-component';
import { RiQuestionnaireLine } from "react-icons/ri";
import Image from 'next/image'
import { useUserContext } from "@/context/user";
import { useState } from "react";
import { message } from 'antd';
import { FaPoll } from "react-icons/fa";
import PollForm from "@/components/PollForm";
import QuestionForm from "@/components/common/card/QuestionForm";

const page = () => {
    const i18n = useI18n();
    const { lang } = useI18n();
    const [data, getData, { loading, error }] = useFetch(fetchForumQuestions);
    const [firstModalOpen, setFirstModalOpen] = useState(false);
    const { user } = useUserContext();

    const showModal = () => {
        // console.log(user)
        user._id ?
            setFirstModalOpen(true) :
            message.warning("Please login first!")
    };
    const handleCancel = () => {
        setFirstModalOpen(false);
    };



    return (
        <section className='dark:bg-BG_Color pt-6'>
            <div className="container mx-auto justify-between md:flex gap-x-4">
                <div className="lg:flex hidden basis-1/4">
                    <div className="flex h-fit ">
                        {/* <p className="text-2xl font-bold text-[#fd4b5f]">Forum</p> */}
                    </div>
                </div>
                <div className="flex basis-2/4">
                    <div className="w-full">
                        <div
                            onClick={showModal}
                            className="cursor-pointer flex flex-col gap-4 p-2 mb-[30px]  border-2 dark:border-BG_Line_Color border-Light_Line_Color hover:border-[#fd4b5f] dark:!text-white w-full rounded-lg group hover:opacity-90"
                        >
                            <div className="flex items-center gap-2 w-full">

                                <Image
                                    width={100}
                                    height={100}
                                    className="h-[40px] w-[40px] rounded-full border-2 "
                                    alt="..."
                                    src={
                                        user?.image ?
                                            user?.image :
                                            "/blank-profile.png"
                                    }
                                />
                                <p className="text-sm font-normal  border dark:border-BG_Line_Color border-Light_Line_Color rounded-lg w-full py-2 pl-4">
                                    {i18n?.t('An opinion or question? Share it with us!?')}
                                </p>
                            </div>
                            <div className="flex justify-around text-md">
                                <div className="flex gap-2 items-center group-hover:text-[#fd4b5f]">
                                    <RiQuestionnaireLine />
                                    <p>{i18n?.t('Ask?')}</p>
                                </div>
                                <div className="flex gap-2 items-center group-hover:text-[#fd4b5f]">
                                    <FaPoll />
                                    <p>{i18n?.t('Poll?')}</p>
                                </div>
                            </div>
                        </div>


                        {
                            !!data && <InfiniteScroll
                                dataLength={data?.docs?.length}
                                next={() => {
                                    const newSize = data?.limit + 10;
                                    getData({ size: newSize });
                                }}
                                hasMore={
                                    data?.totalDocs > data?.docs?.length
                                }
                                loader={<>
                                    <div className="mt-5">
                                        <Skeleton height={400} />
                                    </div>
                                </>
                                }>
                                <div className="">
                                    {
                                        <div className="grid gap-4" >
                                            {data?.docs?.map((item, index) => (
                                                <div key={index}> <QuestionCard2 data={item} getData={getData} footer={true} /></div>
                                            ))}
                                        </div>
                                    }
                                </div>
                            </InfiniteScroll>
                        }
                    </div>

                </div>
                <div className="flex lg:basis-1/4 h-fit md:mt-0 mt-8">
                    <Stay></Stay>
                </div>
            </div>
            <Modal
                title={i18n?.t('Ask a Question')}
                open={firstModalOpen}
                destroyOnClose={true}
                footer={null}
                onCancel={handleCancel}
                className="anserForm"
            >
                <div className="flex items-center justify-center gap-2 pt-8"  >
                    <QuestionForm getData={getData} setFirstModalOpen={setFirstModalOpen} />
                    <PollForm getData={getData} setFirstModalOpen={setFirstModalOpen} />
                </div>
            </Modal>
        </section>
    );
};

export default page;

