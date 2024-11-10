"use client"
import Table from "@/app/(dashboard)/components/common/table";
import { useI18n } from "@/context/i18n";
import { blogPublish, deletePost, fetchBlogAll } from '@/helpers/backend_helper'
import { useActionConfirm, useFetch } from '@/helpers/hooks'
import { Button, Form, Switch } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react'
import { TbListDetails } from "react-icons/tb";

const Page = () => {
  let { lang, languages } = useI18n()
  const i18n = useI18n()

  const { push } = useRouter();
  const [post, getPost, { loading, error }] = useFetch(fetchBlogAll)

  const handelChange = async (id, e) => {
    if (e) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      await useActionConfirm(blogPublish, { _id: id }, () => { getPost() }, 'Are you sure you want to publish this post')
    } else {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      await useActionConfirm(blogPublish, { _id: id }, () => { getPost() }, 'Are you sure you want to Unpublish this post')
    }
  }

  let action = (
    <div className='flex'>
      <Button className="" onClick={() => { push('/admin/add-post') }}>
        {i18n?.t('Add Blog')}
      </Button>
      {/* <button className='px-5 py-2 border outline-none !border-Primary_Color  hover:bg-Primary_Color hover:text-white duration-300 text-Primary_Color header_4' type='submit'  onClick={() => {push('/admin/add-post')}}>Add Blog</button> */}
    </div>
  );

  const columns = [
    {
      dataField: 'title',
      text: i18n?.t('post'),
      formatter: (_, data) => <Link href={`/admin/blog-details/${data?._id}`}>
        <div className="flex items-center gap-2 text-Font1_Color hover:text-Primary_Color duration-300">
          {/* <Image src={i?.cover_image} width={100} height={100} alt="image"></Image> */}
          <img className="w-12 h-12" src={data?.cover_image || "/Logo (1).png"} alt="image" />
          <span className="hidden md:block lg:hidden">{data?.title && data?.title[lang]?.slice(0, 15)}...</span>
          <span className="md:hidden w-24">{data?.title && data?.title[lang]?.slice(0, 7)}...</span>
          <span className="hidden lg:block">{data?.title && data?.title[lang]?.slice(0, 30)}</span>
        </div>
      </Link>,
    },
    {
      dataField: 'category',
      text: i18n?.t('category'),
      formatter: (category) => <span className='capitalize'>{category?.name && category?.name[lang]}</span>,
    },
    {
      dataField: 'createdAt',
      text: i18n?.t('date'),
      formatter: (Date) => <span className='capitalize'>{dayjs(Date).format('DD-MM-YYYY')}</span>,
    },
    {
      dataField: '_id',
      text: i18n?.t('published'),
      formatter: (_id, i) => <div>
        <Switch className="" defaultChecked={i?.published} onClick={(e) => handelChange(_id, e)}></Switch>
      </div>,
    }
  ]

  let actions = (data) => (
    <div className="flex">
      <button
        className="p-1.5 border border-green-500 text-green-500 hover:bg-green-500 hover:text-white rounded mr-2"
        title="View Comments"
        onClick={() =>
          push(`/admin/comments/${data?._id}`)
        }
      >
        <TbListDetails className="cursor-pointer" />
      </button>
    </div>
  );

  return (
    <>
      {/* <FormSelect/> */}
      <Table
        columns={columns}
        data={post}
        pagination={true}
        noActions={false}
        action={action}
        actions={actions}
        indexed={true}
        shadow={false}
        onEdit={(data) => {
          push(`/admin/edit-post?id=${data._id}`)
        }}
        onDelete={deletePost}
        onReload={getPost}
        error={error}
        loading={loading}
        // title={ i18n?.t('All Blog') }
        permission={'blog_list'}
      />


    </>

  )
}

export default Page