/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useState, useEffect } from "react";

import { FaComments, FaReply, FaRegComment } from "react-icons/fa";
import { PiArrowFatUpThin, PiArrowFatDownThin } from "react-icons/pi";
import { GrShareOption } from "react-icons/gr";
import { BsPencil, BsThreeDots, BsTrash } from "react-icons/bs";
import { BiHome, BiLink, BiPlus } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { motion } from 'framer-motion';
import { useI18n } from "@/context/i18n";
import { useUserContext } from "@/context/user";
import { Modal, Button, Form, Input, Radio, Space, Progress, Tooltip, Spin, message, Avatar, Card } from "antd";
import MultipleImageInput from "@/app/(dashboard)/components/forms/multiple_image_input";
import { useParams } from "next/navigation";
import { DownVoteQuestion, delQuestion, fetchAnswerComments, fetchAnswers, fetchQuestionDetails, postAnswer, postQuesPollVote, postQuestion, upVoteQuestion, uploadSingleFile } from "@/helpers/backend_helper";
import { useAction, useFetch, useActionConfirm } from "@/helpers/hooks";

import { delAnswer, downVoteAnswer, fetchCommentReply, postAnswerComments, postCommentReplyAnswer, upVoteAnswer } from "@/helpers/backend_helper";
import TextArea from "antd/es/input/TextArea";
import ProgressBar from "@ramonak/react-progress-bar";
import { HiddenFormItem } from "@/app/(dashboard)/components/forms/input";

import { ShareSocial } from 'react-share-social'
import dynamic from "next/dynamic";

const DraftEditor = dynamic(() => import('@/app/(dashboard)/components/forms/text-editor'), { ssr: false });

const QuestionCard2 = ({ data, getData, footer }) => {

    const [formAnswer] = Form.useForm();
    const [formQuestion] = Form.useForm();
    const [disableBtn, setDisableBtn] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenQuestion, setIsModalOpenQuestion] = useState(false);
    const [isModalOpenSocial, setIsModalOpenSocial] = useState(false);
    const [pollValue, setpollValue] = useState(null);
    const [QuestionUpvoted, setQuestionUpvoted] = useState(false);

    const [editorValue, setEditorValue] = useState("");
    const [editorValue2, setEditorValue2] = useState("");

    const [url, setUrl] = useState('')
    const { user } = useUserContext();

    const [question, getQuestion] = useFetch(
        fetchQuestionDetails
    );
    const [editQuestion, setEditQuestion] = useState({})

    const [size, setSize] = useState(10)
    const [answer, getAnswer, { loading }] = useFetch(fetchAnswers, { size }, false);
    const [editAnswer, setEditAnswer] = useState({})

    const [formComment] = Form.useForm();

    const [commentSize, setCommentSize] = useState(5)
    const [comments, getComments] = useFetch(fetchAnswerComments, { size: commentSize }, false);

    const [commentId, setCommentId] = useState('');
    const [showComment, setShowComment] = useState(false)

    const [formReply] = Form.useForm();
    const [reply, getReply] = useFetch(fetchCommentReply, {}, false);
    const [replyId, setReplyId] = useState('');
    const [showReply, setShowReply] = useState(false)

    const [details, setDetails] = useState(false)
    const [showMore, setShowMore] = useState(false)
    const i18n = useI18n()

    var relativeTime = require('dayjs/plugin/relativeTime')
    dayjs.extend(relativeTime)

    const ShowDetails = (id) => {
        setDetails(!details)
        if (!!id) {
            getQuestion({
                _id: id,
            });
            getAnswer({
                question: id
            });

        }


    }
    const showModal = () => {
        user._id ?
            setIsModalOpen(true) :
            message.warning("Please login first!")
    };
    const showQuestionModal = () => {
        user._id ?
            setIsModalOpenQuestion(true) :
            message.warning("Please login first!")
    };
    const showSocialModal = (id) => {
        setUrl(`${window.location.href}/${id}`)
        console.log(url)
        setIsModalOpenSocial(true)

    };
    const handleCancel = () => {
        if (isModalOpenQuestion) {
            setIsModalOpenQuestion(false);
        }

        setIsModalOpen(false);
        setIsModalOpenSocial(false)
    };

    const handleComment = (id) => {
        getComments({
            answer: id
        });
        setCommentId(id);
        setShowComment(!showComment)
        // console.log("anser id ", commentId)
    }
    const handleReply = (id) => {
        getReply({
            comment: id
        });
        setReplyId(id);
        setShowReply(!showReply)
        // console.log("comment id : ", replyId)
        // console.log("reply ", reply);
    }
    const handleShowMore = () => {
        setShowMore(!showMore);
    }

    useEffect(() => {
        if (editAnswer) {
            formAnswer.setFieldsValue({
                // description: editAnswer.description
                ...editAnswer,
                user: editAnswer?.user?._id,
                image: editAnswer?.media?.length > 0 ? [{
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: editAnswer?.media,
                },] : null

            })
        }

    }, [editAnswer, formAnswer])

    useEffect(() => {
        if (editQuestion.type == 'question') {

            formQuestion.setFieldsValue({
                ...editQuestion,
                user: editQuestion?.user?._id,
                image: editQuestion?.media?.length > 0 ? [{
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: editQuestion?.media,
                },] : null,

            })
        }
        else {

            formQuestion.setFieldsValue({
                ...editQuestion,
                user: editQuestion?.user?._id,
                image: editQuestion?.media?.length > 0 ? [{
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: editQuestion?.media,
                },] : null,
                options: editQuestion.type == 'poll' ? editQuestion?.options?.map((option) => option.text) : ''

            })
        }

    }
        , [editQuestion, formQuestion])


    // post poll vote and poll options================
    useEffect(() => {
        if (user && data && data?.options) {
            data?.options?.forEach(option => {
                if (option?.voted_users?.includes(user?._id)) {
                    setpollValue(option?._id); // Set the selected option to the one voted by the current user
                }
            });
        }
        if (data) {
            if (data?.upvotedUsers
                && data?.upvotedUsers
                    .includes(user?._id)) {
                setQuestionUpvoted(true);
            } else {
                setQuestionUpvoted(false);
            }
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
    return (

        <Card
            className="question2 h-fit gap-2 group dark:bg-[#042552] bg-[#CFCFD3] !border-none dark:dark:text-white text-black !rounded-2xl"
        >

            <div className="flex items-center flex-wrap ">
                <div className='w-full flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <Avatar size={40} src={<img src={data?.user?.image ? data?.user?.image : '/blank-profile.png'} alt="avatar" />} />
                        <div className="">
                            <h5 className="lg:header_4 paragraph_1 !font-bold "> {data?.user?.name}</h5>
                            <p className='text-xs flex items-center '><span className=''>{dayjs(data?.createdAt).fromNow()}</span></p>
                        </div>
                    </div>
                    <div>
                        {
                            (user?._id === data?.user?._id || user?.role === 'admin') &&
                            <Tooltip color="black" placement="top" title={
                                <div className="flex flex-col gap-2 p-2">
                                    <button
                                        onClick={() => {
                                            useActionConfirm(delQuestion, {
                                                _id: data?._id
                                            }, () => {
                                                getData()
                                            })
                                        }}
                                        className="button bg-red-500 hover:bg-red-600">
                                        <BsTrash className="icon" />
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => {
                                            setEditQuestion(data)
                                            setIsModalOpenQuestion(true)
                                        }}
                                        className="button bg-blue-500 hover:bg-blue-600 flex items-center gap-1 px-2 py-1">
                                        <BsPencil className="icon" />
                                        Edit
                                    </button>
                                </div>
                            }
                            >
                                <BsThreeDots className="cursor-pointer header_4" />
                            </Tooltip>
                        }
                    </div>
                </div>

            </div>

            <div className="mt-3 mb-2 min-h-[60px]">
                <div className="lg:header_4 paragraph_2 font-bold dark:text-white text-black duration-500 capitalize">
                    {<div className={`${showMore ? '' : 'lg:line-clamp-2 line-clamp-4'}`}
                        dangerouslySetInnerHTML={{ __html: data?.question }}
                    >
                    </div>
                    }
                    {
                        data?.question.length > 100 ?
                            <span onClick={handleShowMore} className="!text-Primary_Color md:paragraph_1 paragraph_2 cursor-pointer">{showMore ? '(show less)' : '(show more)'}</span>
                            : ''
                    }
                </div>

            </div>
            {
                data?.media &&
                <div className="flex items-center justify-center my-2 overflow-hidden lg:max-w-xl">
                    <motion.div
                        whileHover={{ scale: [null, 1.1] }}
                        transition={{ duration: 0.5 }}
                        className='w-full h-full'
                    >
                        <Image
                            width={1000}
                            height={600}
                            className="rounded-xl h-full cursor-pointer"
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
                        className='custom-poll mt-4 mb-4'>
                        <Space direction="vertical" className='flex flex-col gap-4 mt-4 px-2'>
                            {data?.options?.map((item) => (
                                <div key={item?._id} className="flex flex-col gap-1 poll-custom-progrss">
                                    <Radio value={item?._id}>
                                        <p className='dark:text-white text-black'>{item?.text}</p>
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
            <div className="flex items-center justify-between gap-4 mt-4 paragraph_2 w-full">
                <div className="flex items-center gap-4">
                    <div className=" flex gap-4  border border-5 rounded-full bg-[#cddbf5] py-1">
                        <div className={`flex gap-1 items-center hover:text-[#fd4b5f] ${QuestionUpvoted ? 'text-[#fd4b5f]' : 'text-black'} cursor-pointer border-r border-r-black`}>
                            <div
                                onClick={() => {
                                    useAction(upVoteQuestion, {
                                        _id: data?._id
                                    }, () => {
                                        getData()
                                    })
                                }}
                                className="flex gap-1 items-center hover:text-[#fd4b5f] cursor-pointer px-4 ">
                                <PiArrowFatUpThin className=" text-[18px]" />
                                <p className="header_4">{data?.number_of_upvote}</p>
                            </div>
                        </div>
                        <div
                            onClick={() => {
                                useAction(DownVoteQuestion, {
                                    _id: data?._id
                                }, () => {
                                    getData()
                                })
                            }}
                            className="flex text-black gap-1 items-center hover:text-[#fd4b5f] cursor-pointer  pr-4">
                            <PiArrowFatDownThin className="text-[18px]" />
                        </div>
                    </div>
                    <div
                        onClick={() => ShowDetails(data?._id)}
                        className="flex items-center gap-1 dark:dark:text-white text-black hover:!text-red-400 cursor-pointer">
                        <FaRegComment className="text-[20px]" /> <span> </span>
                        <p className="header_4">{data?.totalAnswers}</p>
                    </div>
                </div>
                <div
                    onClick={() => showSocialModal(data?._id)} className=" flex gap-4 rounded-full text-black bg-[#9BBAE6] ">
                    <div
                        className="flex gap-2 items-center cursor-pointer py-2  pl-2 pr-2">
                        <GrShareOption className=" text-[18px]" />
                    </div>

                </div>

            </div>
            {
                loading ?
                    <div className="flex items-center justify-center dark:text-white text-black"><Spin colorWhite /> </div> :
                    details &&
                    <div>


                        <div className="flex items-center gap-3 py-8">
                            {user._id &&
                                <div className="flex gap-2 md:w-full cursor-pointer" onClick={showModal}>
                                    <Avatar size={40} src={<img src={user?.image ? user?.image : '/blank-profile.png'} alt="avatar" />} />
                                    <h5 className="flex items-center py-2 rounded-full bg-white text-gray-400 md:w-[100%] px-5">Click here to give answer...</h5>
                                </div>
                            }
                        </div>
                        {/* answer card =============================================== */}
                        <div className="grid gap-y-2">
                            {
                                answer?.docs?.map((data, index) => {
                                    return <div className=" " key={index}>
                                        <div className=" dark:text-white text-black  p-4 rounded-sm" >
                                            <div className="flex justify-between items-center">
                                                <div className="flex gap-2 items-center mb-2">
                                                    <Avatar size={40} src={<img src={data?.user?.image ? data?.user?.image : '/blank-profile.png'} alt="avatar" />} />
                                                    <h4 className="paragraph_1">
                                                        {data?.user?.name}
                                                    </h4>
                                                </div>

                                                {/* delete answer ================================== */}
                                                <div className="answer-tooltip">
                                                    {
                                                        (user?._id === data?.user?._id || user?.role === 'admin') &&
                                                        <Tooltip
                                                            className="tooltip"
                                                            placement="top"
                                                            arrow
                                                            title={
                                                                <div className="flex flex-col gap-2 p-2">
                                                                    <button
                                                                        onClick={() => {
                                                                            useActionConfirm(delAnswer, {
                                                                                _id: data?._id
                                                                            }, () => {
                                                                                getAnswer();
                                                                            })
                                                                        }}
                                                                        className="button bg-red-500 hover:bg-red-600">
                                                                        <BsTrash className="icon" />
                                                                        Delete
                                                                    </button>
                                                                    <button
                                                                        onClick={() => {
                                                                            // showModal()
                                                                            setEditAnswer(data)
                                                                            setIsModalOpen(true)
                                                                        }}
                                                                        className="button bg-blue-500 hover:bg-blue-600 flex items-center gap-1 px-2 py-1">
                                                                        <BsPencil className="icon" />
                                                                        Edit
                                                                    </button>
                                                                </div>
                                                            }
                                                        >
                                                            <BsThreeDots className="cursor-pointer header_4" />
                                                        </Tooltip>
                                                    }
                                                </div>
                                            </div>
                                            <div className="mt-3 mb-2 min-h-[60px]">
                                                <div className="lg:header_4 paragraph_2 font-bold dark:text-white text-black duration-500 capitalize">
                                                    {<div className=""
                                                        dangerouslySetInnerHTML={{ __html: data?.description }}
                                                    >
                                                    </div>
                                                    }
                                                </div>

                                            </div>
                                            {
                                                data?.media &&
                                                <div className="my-3">
                                                    <Image src={data?.media}
                                                        width={1000} height={500} alt="example" className="rounded-md h-[300px] w-[250px]" />
                                                </div>
                                            }
                                            <div className="flex items-center gap-4">
                                                <div className=" flex gap-4  border border-5 rounded-full text-black bg-[#cddbf5] py-1 w-fit">
                                                    <div className={`flex gap-1 items-center cursor-pointer border-r border-r-black`}>
                                                        <div
                                                            onClick={() => {
                                                                useAction(upVoteAnswer, {
                                                                    _id: data?._id
                                                                }, () => {
                                                                    getAnswer()
                                                                })
                                                            }}
                                                            className={`flex gap-1 items-center hover:text-[#fd4b5f] cursor-pointer px-4  ${data?.upvotedUsers.includes(user?._id) ? 'text-[#fd4b5f]' : 'text-black'} `}>
                                                            <PiArrowFatUpThin className=" text-[18px]" />
                                                            <p className="header_4">{data?.number_of_upvote}</p>
                                                        </div>
                                                    </div>
                                                    <div
                                                        onClick={() => {
                                                            useAction(downVoteAnswer, {
                                                                _id: data?._id
                                                            }, () => {
                                                                getAnswer()
                                                            })
                                                        }}
                                                        className="flex  gap-1 text-black items-center hover:text-[#fd4b5f] cursor-pointer  pr-4">
                                                        <PiArrowFatDownThin className="text-[18px]" />
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center  text-sm lg:font-semibold">
                                                    <div className="">

                                                    </div>
                                                    <button onClick={() => handleComment(data?._id)} className="flex items-center gap-2 hover:text-[#fd4b5f] cursor-pointer">
                                                        {data?.number_of_comments} Comments
                                                        <FaComments />
                                                    </button>
                                                </div>
                                            </div>


                                            {
                                                <div className="flex flex-col gap-2 ">
                                                    <div className="flex items-center mt-6">
                                                        {/* <h1 className="header_3  dark:dark:text-white text-black text-Font1_Color w-80">
                                                            Leave A Comment
                                                        </h1> */}
                                                        <div className="w-full h-[2px] bg-BG_Line_Color"></div>
                                                    </div>
                                                    {/* <div className="flex justify-between items-center mt-2 text-sm lg:font-semibold">
                                                        <div className="">

                                                        </div>
                                                        <button onClick={() => handleComment(data?._id)} className="flex items-center gap-2 hover:text-[#fd4b5f] cursor-pointer">
                                                            {data?.number_of_comments} Comments
                                                            <FaComments />
                                                        </button>
                                                    </div> */}

                                                    {
                                                        (data?._id == commentId && showComment) &&
                                                        comments?.docs?.map((item, index) => (

                                                            <div key={index} className="mt-8 lg:pl-10 pl-2">
                                                                <div className="flex gap-2 justify-between items-center">
                                                                    <div className="flex items-center gap-3">
                                                                        <Avatar size={40} src={<img src={item?.user_id?.image ? item?.user_id?.image : '/blank-profile.png'} alt="avatar" />} />

                                                                        {/* <Image
                                                                            width={60}
                                                                            height={60}
                                                                            className="h-[30px] w-[30px] rounded-full border-2 "
                                                                            alt="example"
                                                                            src={item?.user_id?.image? item?.user_id?.image : '/blank-profile.png'}
                                                                        /> */}
                                                                        <h4 className="paragraph_2 font-semibold">
                                                                            {item?.user_id?.name}
                                                                        </h4>
                                                                    </div>
                                                                    <p className="paragraph_2">
                                                                        {dayjs(item?.createdAt).format(" MMM. DD, YYYY")}
                                                                        <br />
                                                                        {dayjs(item?.createdAt).format("hh:mm A")}                                                                    </p>
                                                                </div>
                                                                <div className="w-full" >
                                                                    <p className="paragraph_2 mt-4 mb-2 ">
                                                                        {item?.content}
                                                                    </p>
                                                                </div>
                                                                <button onClick={() => handleReply(item?._id)} className="text-red-400 paragraph_2 my-2 flex items-center gap-1"><FaReply /> Reply ({item?.replies?.length})</button>

                                                                {

                                                                    (item?._id == replyId && showReply) &&
                                                                    item?.replies?.map((reply, index) => (
                                                                        <div key={index} className="mt-8 md:pl-10 pl-2 mb-2">

                                                                            <div className="flex justify-between gap-2 items-center">
                                                                                <div className="flex items-center gap-3">
                                                                                    <Avatar size={40} src={<img src={reply?.user_id?.image ? reply?.user_id?.image : '/blank-profile.png'} alt="avatar" />} />
                                                                                    {/* <Image
                                                                                        width={40}
                                                                                        height={40}
                                                                                        className="h-[30px] w-[30px] rounded-full border-2 "
                                                                                        alt="example"
                                                                                        src={reply?.user_id?.image ? reply?.user_id?.image : '/blank-profile.png'}
                                                                                    /> */}
                                                                                    <h4 className="paragraph_1 font-semibold">
                                                                                        {reply?.user_id?.name}
                                                                                    </h4>
                                                                                </div>
                                                                                <p className="paragraph_2">
                                                                                    {dayjs(item?.createdAt).format(" MMM. DD, YYYY")}
                                                                                    <br />
                                                                                    {dayjs(item?.createdAt).format("HH:mm A")}
                                                                                </p>
                                                                            </div>
                                                                            <div className="w-full" >
                                                                                <p className="paragraph_2 mt-4 mb-4 ">
                                                                                    {reply?.comment}
                                                                                </p>
                                                                            </div>

                                                                        </div>
                                                                    ))
                                                                }
                                                                {
                                                                    (item?._id == replyId && showReply) &&
                                                                    <>
                                                                        <div className="flex items-center mt-6 mb-6 lg:pl-10 pl-2">
                                                                            <h1 className="header_4 dark:text-white text-black  lg:w-80">
                                                                                Leave your reply here
                                                                            </h1>
                                                                            <div className="w-full h-[2px] bg-BG_Line_Color"></div>
                                                                        </div>
                                                                        <Form
                                                                            className="mt-2 lg:pl-10 pl-2"
                                                                            form={formReply}
                                                                            onFinish={async (values) => {
                                                                                values.user = user._id
                                                                                return useAction(postCommentReplyAnswer, {
                                                                                    user_id: values.user,
                                                                                    comment: values.comment,
                                                                                    answer_id: data?._id,
                                                                                    parent_comment_id: item?._id
                                                                                }
                                                                                    , () => {
                                                                                        formReply.resetFields()
                                                                                        getComments();
                                                                                    });
                                                                            }}>

                                                                            <Form.Item name="comment" >
                                                                                <TextArea
                                                                                    style={{ width: "100%" }}
                                                                                    className="bg-transparent dark:border-BG_Line_Color border-Light_Line_Color focus:border-red-500 dark:text-white text-black w-full dark:placeholder"
                                                                                    placeholder="Write your reply here"
                                                                                    required

                                                                                ></TextArea>
                                                                            </Form.Item>
                                                                            <div className="flex justify-end ">
                                                                                <button
                                                                                    className="btn-submit dark:text-white text-black">
                                                                                    Submit
                                                                                </button>
                                                                            </div>
                                                                        </Form>
                                                                    </>
                                                                }

                                                            </div>

                                                        ))

                                                    }
                                                    {
                                                        comments?.hasNextPage && data?._id === commentId && showComment &&
                                                        <Button className="!border !border-Primary_Color !text-Primary_Color hover:bg-Primary_Color hover:!dark:text-white  w-fit" onClick={() => {
                                                            getComments({ size: commentSize + 5 })
                                                            setCommentSize(commentSize + 5)
                                                        }}>Load More Comments</Button>
                                                    }
                                                    {/* answer comment form ============*/}
                                                    {
                                                        (data?._id == commentId && showComment) &&
                                                        <Form
                                                            className="mt-2"
                                                            form={formComment}
                                                            onFinish={async (values) => {
                                                                values.user = user._id

                                                                return useAction(postAnswerComments, {
                                                                    user_id: values.user,
                                                                    content: values.content,
                                                                    answer_id: data?._id
                                                                }
                                                                    , () => {
                                                                        formComment.resetFields()
                                                                        getComments();
                                                                    });
                                                            }}>
                                                            <Form.Item name="content" >
                                                                <TextArea
                                                                    style={{ width: "100%" }}
                                                                    className="bg-transparent dark:border-BG_Line_Color border-Light_Line_Color focus:border-red-500 dark:text-white text-black w-full dark:placeholder:text-white placeholder:text-black"
                                                                    placeholder="Write a comment"
                                                                    required

                                                                ></TextArea>
                                                            </Form.Item>
                                                            <div className="flex justify-end ">
                                                                <button
                                                                    className="btn-submit dark:text-white text-black">
                                                                    Submit
                                                                </button>
                                                            </div>
                                                        </Form>
                                                    }


                                                </div>
                                            }
                                        </div>
                                    </div>
                                })
                            }
                            {
                                answer?.hasNextPage &&
                                <Button className="!border !border-Primary_Color !text-Primary_Color hover:bg-Primary_Color hover:!text-white w-fit" onClick={() => {
                                    getAnswer({ size: size + 10 })
                                    setSize(size + 10)
                                }}>Load More Answers</Button>
                            }
                        </div>

                    </div>
            }

            {/* answer modal ================================================= */}
            <Modal
                title={i18n?.t("Submit your answer")}
                open={isModalOpen}
                destroyOnClose={true}
                footer={null}
                onCancel={handleCancel}
                className="anserForm"
            >
                <Form
                    form={formAnswer}
                    onFinish={async (values) => {
                        setDisableBtn(true)
                        values.user = user._id;
                        values.question = data?._id;
                        if (values.image && values.image.length > 0 && values.image[0].originFileObj) {
                            // If a new image is uploaded, update the media field
                            let image = await uploadSingleFile({
                                image: values.image[0].originFileObj,
                                image_name: 'question_image'
                            });
                            values.media = image.data;
                        } else {
                            // If no new image is uploaded, retain the previous image
                            values.media = editAnswer ? editAnswer.media : null;
                        }

                        return useAction(postAnswer, {
                            user: editAnswer?.user?._id ? editAnswer?.user?._id : user?._id,
                            _id: values._id,
                            question: values.question,
                            media: values.media ? values.media : null,
                            description: values.description,
                        }, () => {
                            setDisableBtn(false)
                            setIsModalOpen(false);
                            getAnswer({
                                question: data?._id
                            });
                            formAnswer.resetFields();
                        });
                    }}
                    layout='vertical'
                >
                    <HiddenFormItem name="_id" value={editAnswer?._id} />
                    <Form.Item name="description" >
                        <DraftEditor value={editorValue2} onChange={(val) => setEditorValue2(val)} />
                    </Form.Item>
                    <label htmlFor="image">Upload an image here</label>
                    <MultipleImageInput name='image' />
                    {
                        disableBtn ?
                            <button disabled className="btn-submit">Submit</button> :
                            <button className="btn-submit">Submit</button>
                    }
                </Form>
            </Modal>

            {/* question modal ================================================ */}
            <Modal
                title={i18n?.t("Edit Your Question")}
                open={isModalOpenQuestion}
                destroyOnClose={true}
                footer={null}
                onCancel={handleCancel}
                className="anserForm"
            >
                <Form
                    form={formQuestion}
                    onFinish={async (values) => {
                        values.user = user._id
                        console.log(values.media)
                        setDisableBtn(true)
                        if (values.image && values.image.length > 0 && values.image[0].originFileObj) {
                            // If a new image is uploaded, update the media field
                            let image = await uploadSingleFile({
                                image: values.image[0].originFileObj,
                                image_name: 'question_image'
                            });
                            values.media = image.data;
                        } else {
                            // If no new image is uploaded, retain the previous image
                            values.media = editQuestion ? editQuestion.media : null;
                        }
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        return useAction(postQuestion, {
                            user: editQuestion?.user?._id ? editQuestion?.user?._id : user?._id,
                            _id: values._id,
                            question: values.question,
                            media: values.media, // Use the updated media value
                            options: editQuestion.type == 'poll' ? values?.options.map((option) => {
                                return { text: option }
                            }) : ''

                        }, () => {
                            setIsModalOpenQuestion(false);
                            getData()
                            formQuestion.resetFields();
                        });
                    }}
                    layout='vertical'
                >
                    <HiddenFormItem name="_id" value={editQuestion?._id} />
                    <Form.Item name="question" >
                        <DraftEditor value={editorValue} onChange={(val) => setEditorValue(val)} />
                    </Form.Item>
                    <label className="font-bold mb-2" htmlFor="image">Upload an image here</label>
                    <MultipleImageInput name='image' />
                    {
                        editQuestion.type === 'poll' ?
                            <Form.List
                                name="options"
                                rules={[
                                    {
                                        validator: async (_, options) => {
                                            if (!options || options.length < 2) {
                                                return Promise.reject(new Error('Please add at least two options'));
                                            }
                                        },
                                    },
                                ]}
                            >
                                {(fields, { add, remove }, { errors }) => (
                                    <>
                                        {fields.map((field, index) => (
                                            <Form.Item
                                                label={index === 0 ? 'Answer Options' : ''}
                                                required
                                                key={field.key}
                                            >
                                                <Form.Item
                                                    {...field}
                                                    validateTrigger={['onChange', 'onBlur']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            whitespace: true,
                                                            message: "Please input option for your question",
                                                        },
                                                    ]}
                                                    noStyle
                                                >
                                                    <Input
                                                        placeholder={`option ${index + 1}`}
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                    />
                                                </Form.Item>
                                                {fields.length > 1 ? (
                                                    <MdDelete
                                                        className="text-[26px] text-red-600 cursor-pointer"
                                                        onClick={() => remove(field.name)}
                                                    />
                                                ) : null}
                                            </Form.Item>
                                        ))}
                                        <Form.Item>
                                            <button className="flex gap-2 dark:text-white text-black items-center bg-green-400 px-2 py-1 rounded-md hover:opacity-90 cursor-pointer"
                                                onClick={() => add()}
                                            >
                                                <BiPlus />
                                                Add option
                                            </button>

                                            <Form.ErrorList errors={errors} />
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                            : ''
                    }
                    {
                        disableBtn ?
                            <button disabled className="btn-submit">Ask</button> :
                            <button className="btn-submit">Ask</button>
                    }

                </Form>
            </Modal>
            {/* social modal ================================================ */}
            <Modal
                title="Share this question"
                open={isModalOpenSocial}
                destroyOnClose={true}
                footer={null}
                onCancel={handleCancel}
                className="anserForm"
            >
                <div className="flex items-center justify-center">
                    <ShareSocial
                        url={url}
                        onSocialButtonClicked={() => { }}
                        style={{
                            root: {
                                backgroundColor: 'transparent',
                                padding: 0,
                            },
                            copyContainer: {
                                display: 'none'
                            },
                            title: {
                                width: 24,
                                height: 24,
                                margin: 0,
                            }
                        }}
                        socialTypes={['facebook', 'twitter', 'whatsapp', 'linkedin']}
                    />
                </div>
            </Modal>
        </Card>
    );
};

export default QuestionCard2;