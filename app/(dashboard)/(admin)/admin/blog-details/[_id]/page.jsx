"use client";
import Banner from "@/components/common/Banner";
import MediaLink from "@/components/common/btn/MediaLink";
import ReactPlayer from 'react-player'
import { useUserContext } from "@/context/user";
import {
  fetchComments,
  getSingleBlog,
  postCommentReply,
  postComments,
} from "@/helpers/backend_helper";
import { useAction, useFetch } from "@/helpers/hooks";
import { Button, Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsReplyFill } from "react-icons/bs";
import { FiClock } from "react-icons/fi";
import dayjs from "dayjs";
import Link from "next/link";
import { ShareSocial } from 'react-share-social'
import { BiReply } from "react-icons/bi";
import { useI18n } from "@/context/i18n";
import ArticalCard from "@/components/common/card/ArticalCard";


const Page = () => {
  const i18n = useI18n();
  let { lang, languages } = useI18n()

  const [formComment] = Form.useForm();
  const [formCommentReply] = Form.useForm();
  const para = useParams();
  const [id] = useState(para?._id);
  const [blogId, setBlogId] = useState(null);
  const [blogCommentId, setBlogCommentId] = useState('');
  const { user } = useUserContext();
  const [url, setUrl] = useState('')
  const [showId, setShowId] = useState("");
  const [show, setShow] = useState(false);
  const [blog, getBlog] = useFetch(
    getSingleBlog,
    {},
    false
  );
  const [size, setSize] = useState(5)
  const [comments, getComments] = useFetch(fetchComments, { size }, false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUrl(window.location.href)
    if (!!id) {
      getBlog({
        _id: id,
      });
      setBlogId(id);
    }
  }, [id]);
  const handleShow = (id) => {
    setShowId(id);
    setShow(!show);
  };


  useEffect(() => {
    if (!!id) {
      getComments({
        blog: id,
      });
    }
  }, [id]);

  return (
    <div className="dark:bg-BG_Color">
      <Banner item={blog}></Banner>
      <div className="pt-16 md:pt-32">
        <div className="container mx-auto">
          {blog?.post_type === 'video' ?
            <div className="mb-10">
              <div className="w-full h-[400px]">
                {blog?.post_type === 'video' ? <ReactPlayer controls={true} playing={false} width='100%'
                  height='100%' url={blog?.video_url} /> : ""}

              </div>
            </div> : ""
          }
        </div>
        <div className="mx-2 container-md">
          <div className="text-[#7C7C7C] dark:text-Light_Line_Color ">
            <div
              dangerouslySetInnerHTML={{
                __html: blog?.details ? blog?.details[lang] : "",
              }}
            />
          </div>
        </div>
        <div className="container mx-auto">
          <div className="md:flex items-center justify-between py-9 md:py-16 gap-4 text-lg">
            <div className="flex items-center gap-4 text-lg">
              <h1 className="font-bold dark:text-White_Color">{i18n?.t('Tags')}:</h1>
              <div className="text-Font2_Color  flex flex-wrap gap-3">
                {blog?.tags?.map((tag) => (
                  <Link
                    href={`/blogs?tag_id=${tag?._id}`}
                    className="py-1 px-2 text-sm md:text-lg md:px-4 border border-Font2_Color rounded-md"
                    key={tag?._id}
                  >
                    {tag?.name && tag?.name[lang]}
                  </Link>
                ))}
              </div>
            </div>
            <div className='md:flex items-center gap-4 text-lg md:mt-0 mt-5'>
              <h1 className='font-bold dark:text-White_Color'>{i18n?.t('Share On')}:</h1>
              <div className='dark:text-White_Color'>
                <div className='flex items-center space-x-5 text-lg'>

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
              </div>

            </div>
          </div>
          {/* <hr className="border-Font2_Color w-full" /> */}
          <div className="">
            <div className="py-12">
              <div className="">
                <div className="flex items-center">
                  {
                    comments?.totalDocs > 0 ?
                      <h1 className="md:header_2 header_3 dark:text-white text-Font1_Color w-60">
                        {comments?.totalDocs} {i18n?.t('Comments')}
                      </h1> : <h1 className="md:header_2 header_3 dark:text-white text-Font1_Color w-60">
                        {comments?.totalDocs} {i18n?.t('Comment')}
                      </h1>
                  }
                  <div className="w-full h-[2px] bg-BG_Line_Color"></div>
                </div>
                <div>
                  {comments?.docs?.map((item) => (
                    <div key={item?._id} className="">
                      <div className="flex gap-2 md:gap-4 py-5">
                        <div className="">
                          <div className="md:h-[100px] md:w-[100px] h-14 w-14">
                            <img
                              className="h-full w-full rounded-full object-cover"
                              src={item?.user_id?.image || "/blank-profile.png"}
                              alt=""
                            />
                          </div>
                        </div>

                        <div className=" w-full">
                          <div className="flex items-center justify-between ">
                            <h1 className="header_4 dark:text-white">
                              {item?.user_id?.name}
                            </h1>
                            <div className="flex items-center dark:text-white">
                              <FiClock />
                              <span className="m-2">
                                {dayjs(item?.createdAt).format(" MMM. DD, YYYY")}
                              </span>
                            </div>
                          </div>
                          <p className="paragraph_1 text-Font2_Color py-4">
                            {item?.content}
                          </p>
                          <div
                            onClick={() => {
                              handleShow(item?._id), setBlogCommentId(item?._id);
                            }}
                            className="cursor-pointer"
                          >
                            <div className="text-Primary_Color flex items-center ">
                              <BiReply className="text-2xl" />{" "}
                              <p className="ms-2 text-Primary_Color">{i18n?.t('Reply')}</p>
                            </div>
                          </div>
                          <div
                            className={`${showId === item?._id
                              ? show
                                ? "block mb-5"
                                : "hidden"
                              : "hidden"
                              }`}
                          >
                            <div className="grid grid-cols-12 items-start gap-3 pt-3 w-full">
                              <div className="md:h-[100px] h-12 col-span-1">
                                <img
                                  src={user?.image || "/blank-profile.png"}
                                  width={70}
                                  height={70}
                                  alt="images"
                                  className="rounded-full object-cover w-[70px] h-[70px]"
                                ></img>
                              </div>
                              <div className="col-span-11">
                                <Form
                                  form={formCommentReply}
                                  onFinish={async (values) => {
                                    setLoading(true);
                                    (values.user_id = user?._id),
                                      (values.blog_id = blogId),
                                      (values.parent_comment_id = blogCommentId),
                                      // eslint-disable-next-line react-hooks/rules-of-hooks
                                      await useAction(
                                        postCommentReply,
                                        values,
                                        () => {
                                          formCommentReply.resetFields();
                                          setShow(false);
                                          getComments();
                                          setLoading(false);
                                        }
                                      );
                                  }}
                                >
                                  <div className="border-2 border-Font2_Color rounded-lg w-full ">
                                    <Form.Item name="comment">
                                      <TextArea
                                        // autoSize={{ minRows: 4, maxRows: 6 }}
                                        style={{ width: "100%" }}
                                        className="border-none bg-transparent dark:text-white w-full"
                                        placeholder="Comment"
                                      ></TextArea>
                                    </Form.Item>
                                    <hr className="border-Font2_Color w-full" />
                                    <div className="flex justify-end gap-3 p-3">
                                      <p
                                        onClick={() => handleShow(item?._id)}
                                        className="py-1 px-3 rounded-md bg-red-300 hover:bg-Primary_Color text-white cursor-pointer"
                                      >
                                        Cancel
                                      </p>
                                      <button
                                        disabled={loading}
                                        className="btn-submit dark:text-white">
                                        Submit
                                      </button>
                                    </div>
                                  </div>
                                </Form>
                              </div>
                            </div>
                          </div>
                          {item?.replies?.map((reply) => (
                            <div key={reply?._id} className="flex py-5">
                              <div className="">
                                <div className="md:h-[70px] md:w-[70px] h-12 w-12 mr-4">
                                  <img
                                    className="h-full w-full rounded-full object-cover"
                                    src={
                                      reply?.user_id?.image ||
                                      "/blank-profile.png"
                                    }
                                    alt=""
                                  />
                                </div>
                              </div>

                              <div className="w-full">
                                <div className="flex items-center justify-between ">
                                  <h1 className="header_4 dark:text-white">
                                    {reply?.user_id?.name}
                                  </h1>
                                  <div className="flex items-center dark:text-white">
                                    <FiClock />
                                    <span className="m-2">
                                      {dayjs(item?.createdAt).format(
                                        " MMM. DD, YYYY"
                                      )}
                                    </span>
                                  </div>
                                </div>
                                <p className="paragraph_1 text-Font2_Color py-4">
                                  {reply?.comment}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>


                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className='my-8'>
                <div className="flex items-center justify-center mt-8">

                  {
                    comments?.hasNextPage &&
                    <Button className="!border !border-Primary_Color !text-Primary_Color hover:bg-Primary_Color hover:!text-white" onClick={() => {
                      getComments({ size: size + 5 })
                      setSize(size + 5)
                    }}>Load More</Button>
                  }

                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex items-center">
              <h1 className="header_2 dark:text-white text-Font1_Color w-80">
                {i18n?.t('Leave A Comment')}
              </h1>
              <div className="w-full h-[2px] bg-BG_Line_Color"></div>
            </div>
            <div className="">
              <div className="py-6">
                <Form
                  form={formComment}
                  onFinish={async (values) => {
                    setLoading(true);
                    (values.user_id = user?._id),
                      (values.blog_id = blogId),
                      // eslint-disable-next-line react-hooks/rules-of-hooks
                      await useAction(postComments, values, () => {
                        formComment.resetFields();
                        getComments();
                        setLoading(false);
                      });
                  }}
                >
                  <Form.Item name="content" rules={[{ required: true, message: "Please input your comment!" }]}>
                    <TextArea
                      className="paragraph_1 p-3 !outline-none placeholder:text-Font2_Color text-Font2_Color bg-transparent"
                      placeholder={i18n?.t('Write a comment')}
                      autoSize={{ minRows: 3, maxRows: 5 }}
                    ></TextArea>
                  </Form.Item>
                  {/* <Form.Item> */}
                  <button disabled={loading} className='btn-submit dark:text-white'>{i18n?.t('Submit')}</button>

                  {/* </Form.Item> */}
                </Form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
