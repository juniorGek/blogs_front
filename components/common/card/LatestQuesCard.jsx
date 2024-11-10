/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Card, Avatar } from "antd";
import { useState, useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";

import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { motion } from 'framer-motion';
import { useI18n } from "@/context/i18n";

import { useUserContext } from "@/context/user";

import { useParams } from "next/navigation";
import { Radio, Space, Progress, message } from "antd";
import { postQuesPollVote } from "@/helpers/backend_helper";


const LatestQuestionCard = ({ data, getData }) => {

    const i18n = useI18n()
    let { lang, languages } = useI18n()
    const { user } = useUserContext();
    const [pollValue, setpollValue] = useState(null);
    const [showMore, setShowMore] = useState(false)

    var relativeTime = require('dayjs/plugin/relativeTime')
    dayjs.extend(relativeTime)

    // post poll vote and poll options================
    useEffect(() => {
        if (user && data && data?.options) {
            data?.options?.forEach(option => {
                if (option?.voted_users?.includes(user?._id)) {
                    setpollValue(option?._id); // Set the selected option to the one voted by the current user
                }
            });
        }
    }, [data, user]);

    const onChange = async (e) => {
        if (!user?._id) {
            message.warning('Please login first!');
            return;
        }
        const postData = {
            pollId: data?._id,
            optionId: e.target.value
        };
        const res = await postQuesPollVote(postData);
        if (res?.error === false) {
            message.success(res?.message);
            getData();
        } else {
            message.error(res?.message);
        }
    };
    const handleShowMore = () => {
        setShowMore(!showMore);
    }

    return (

        <Card
            // dark:bg-white bg-BG_Color !bg-opacity-5
            className="question2 h-full gap-2 group 
            dark:bg-[#042552] bg-[#CFCFD3] 
             !border-none dark:text-white text-black !rounded-2xl"

        >
            <div className="flex gap-2">

                <div className="w-full">
                    <div className="flex items-center flex-wrap ">
                        <div className="flex gap-2 items-center dark:text-white text-black">
                            <Avatar size={40} src={<img src={data?.user?.image ? data?.user?.image : '/blank-profile.png'} alt="avatar" />} />

                            {/* <div className="lg:h-[50px] lg:min-w-[50px] h-[40px] min-w-[40px]">
                                <Image
                                    width={100}
                                    height={100}
                                    className="h-full w-full object-fill rounded-full border-2 "
                                    alt="user"
                                    src={data?.user?.image}
                                />
                            </div> */}
                            <div className="">
                                <h5 className="lg:header_4 paragraph_1 !font-bold "> {data?.user?.name}</h5>

                                <p className='text-xs flex items-center '><span className=''>{dayjs(data?.createdAt).fromNow()}</span></p>
                            </div>
                        </div>

                    </div>

                    <div className="mt-3 mb-2 min-h-[60px]">
                        <div className="mt-3 mb-2 min-h-[60px]">
                            <div className="lg:header_4 paragraph_2 font-bold dark:text-white text-black duration-500 capitalize">
                                {<div className={`${showMore ? '' : 'lg:line-clamp-2 line-clamp-4'}`}
                                    dangerouslySetInnerHTML={{ __html: data?.question }}
                                >
                                </div>
                                }
                                {
                                    data?.question.length > 150 ?
                                        <span onClick={handleShowMore} className="!text-Primary_Color md:paragraph_1 paragraph_2 cursor-pointer">{showMore ? '(show less)' : '(show more)'}</span>
                                        : ''
                                }
                            </div>

                        </div>
                    </div>
                    {
                        data?.media &&
                        <div className="flex items-center md:h-[300px] h-[250px] justify-center my-2 overflow-hidden">
                            <motion.div
                                whileHover={{ scale: [null, 1.1] }}
                                transition={{ duration: 0.5 }}
                                className='w-full h-full'
                            >
                                <Image
                                    width={1000}
                                    height={600}
                                    className="rounded-xl h-full object-contain cursor-pointer"
                                    alt="example"
                                    src={data?.media}
                                />
                            </motion.div>
                        </div>
                    }
                    {
                        data?.type === 'poll' ?
                            <Radio.Group
                                onChange={onChange} value={pollValue}
                                className='custom-poll mt-4 mb-4 w-full'>
                                <Space direction="vertical" className='flex flex-col gap-4 mt-4 px-2'>
                                    {data?.options?.map((item) => (
                                        <div key={item?._id} className="flex flex-col gap-1 poll-custom-progrss">
                                            <Radio value={item?._id}>
                                                <p className='dark:text-white'>{item?.text}</p>
                                            </Radio>
                                            <ProgressBar
                                                completed={((item?.number_of_votes * 100) / (data?.total_number_of_votes || 1)).toFixed(1)}
                                                height="12px"
                                                labelSize="10px"
                                                bgColor="#1677ff"
                                                labelColor="#ffffff"
                                                customLabel={((item?.number_of_votes * 100) / (data?.total_number_of_votes || 1)).toFixed(1) + '%'}
                                                baseBgColor="#ffffff"
                                            />
                                        </div>
                                    ))}
                                </Space>
                            </Radio.Group>
                            : ''
                    }
                    <div className="flex flex-col flex-wrap">

                        <Link
                            href={`/forum/${data?._id}`} className='
                                dark:text-white text-black flex items-center group-hover:text-Primary_Color duration-300 my-2'> view details<div className="ml-2"><img src="/view-arrow.png" width={50} alt="" /></div></Link>

                    </div>
                </div>
            </div>


        </Card>
    );
};

export default LatestQuestionCard;