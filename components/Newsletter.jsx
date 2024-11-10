'use client'
import { useI18n } from '@/context/i18n'
import { postSubscribe } from '@/helpers/backend_helper'
import { Button, Form, Input, message } from 'antd'
import React from 'react'
import { BiSend } from 'react-icons/bi'

const Newsletter = () => {
  const i18n = useI18n()
  const [form] = Form.useForm()

  const onFinish = async (values) => {
    await postSubscribe(values)
    message.success('Subscribe success')
    form.resetFields()
  }

  return (
    <section className='bg-white dark:bg-BG_Color py-10'>
      <div className="container mx-auto">
        <div className="px-5 md:px-28 lg:px-40 bg-Primary_Color bg-opacity-10 py-10 md:py-20 rounded-[20px]">
          <h1 className='md:text-5xl text-2xl font-bold text-Font1_Color dark:text-white text-center mb-10 pb-6 leading-8'>{i18n?.t('Get The Best Blog Stories Into Your Inbox Connect Us Now.')}</h1>
          <div className="flex">
            <Form form={form} style={{ width: '100%', display: 'flex' }} onFinish={onFinish}>
              <Form.Item name="email" className='lg:basis-5/6 md:basis-4/6  bg-white w-full rounded-s-full border-none outline-none'
                rules={[
                  {
                    required: true, message: 'Please input your email!'
                  },
                  {
                    type: 'email',
                    message: i18n?.t('Please input valid email!')
                  }
                ]} style={{ boxShadow: "0px 4px 30px 0px rgba(255, 0, 0, 0.15)" }}
              >
                <Input type='email' className='outline-none border-none paragraph_1 px-8 py-1 md:py-4 rounded-l-full' />
              </Form.Item>
              <Form.Item className='lg:basis-1/6 md:basis-2/6 w-full bg-Primary_Color header_5 text-white rounded-e-full flex items-center justify-center '>
                <button className='flex items-center justify-center outline-none !border-none shadow-none text-lg hover:text-White_Color' htmltype="submit"><span className='pr-2'>{i18n?.t('Subscribe')}</span> <BiSend /></button>
              </Form.Item>
            </Form>
            {/* <input className='lg:basis-5/6 md:basis-4/6  paragraph_1 px-8 py-4 bg-white w-full rounded-s-full border-none outline-none' type="text" />
            <button className='lg:basis-1/6 md:basis-2/6 w-full bg-Primary_Color header_5 text-white flex items-center justify-center rounded-e-full'><span className='pr-2'>Subscribe</span> <BiSend /></button> */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter