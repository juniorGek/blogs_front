/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { Radio, Space, Progress, Tooltip } from 'antd';
import Image from 'next/image';
import { BsThreeDots } from 'react-icons/bs';
import { useUserContext } from '@/context/user';
import { useActionConfirm } from '@/helpers/hooks';
import { delPoll, postPollVote } from '@/helpers/backend_helper';
import { message } from 'antd';

const PollCard = ({ data, getData }) => {
    const { user } = useUserContext();
    console.log("🚀 ~ PollCard ~ user:", user)
    const [value, setValue] = useState(null); // State to hold the selected option ID

    useEffect(() => {
        if (user && data && data.options) {
            data.options.forEach(option => {
                if (option.voted_users.includes(user._id)) {
                    setValue(option._id); // Set the selected option to the one voted by the current user
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
        const res = await postPollVote(postData);
        if (res?.error === false) {
            message.success(res?.message);
            getData();
        } else {
            message.error(res?.message);
        }
    };

    return (
        <div className="dark:bg-[#042552] bg-[#9BBEC8]  !text-white !rounded-lg md:p-8 p-4 ">
            <div className="flex gap-2 items-center text-white mb-4">
                <div className='w-full flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <div className="h-[40px] w-[40px]">
                            <Image
                                width={100}
                                height={100}
                                className="h-full w-full object-fill rounded-full border-2 "
                                alt="user"
                                src={data?.user?.image || "/blank-profile.png"}
                            />
                        </div>
                        <h5 className="lg:header_4 paragraph_1 lg:!font-bold font-medium">
                            {data?.user?.name}
                        </h5>
                    </div>
                    <div>
                        {
                            (user?._id === data?.user?._id || user?.role === 'admin') &&
                            <Tooltip color="red" placement="top" title={
                                <button onClick={() => {
                                    useActionConfirm(delPoll, {
                                        _id: data?._id
                                    },
                                        () => {
                                            getData();
                                        }
                                    ),
                                    'Are you sure you want to delete this poll?'


                                }}
                                    className="hover:text-white r px-3 py-1">Delete</button>} >
                                <BsThreeDots className="cursor-pointer header_4" />
                            </Tooltip>
                        }
                    </div>
                </div>
            </div>
            <h3 className="py-2 header_4 font-semibold">{data?.question}</h3>
            <Radio.Group onChange={onChange} value={value} className='custom-poll'>
                <Space direction="vertical" className='flex flex-col gap-4 mt-4 px-2'>
                    {data?.options?.map((item) => (
                        <div key={item?._id} className="flex flex-col gap-1 poll-custom-progrss">
                            <Radio value={item?._id}>
                                <p className='dark:text-white'>{item?.text}</p>
                            </Radio>
                            <Progress percent={((item?.number_of_votes * 100) / (data?.total_number_of_votes || 1)).toFixed(2)} className='sm:flex items-center gap-1 poll-text !text-white' />
                        </div>
                    ))}
                </Space>
            </Radio.Group>
            <p className='paragraph_2 flex items-center mt-6 font-bold'>Total Vote : <span className=''> {data?.total_number_of_votes}</span></p>
        </div>
    );
};

export default PollCard;
