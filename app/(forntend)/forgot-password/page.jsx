'use client'
import { useI18n } from '@/context/i18n'
import { PasswordResetEmail } from '@/helpers/backend_helper'
import { Button, Form, Input, message } from 'antd'
import { useRouter } from 'next/navigation'
import React from 'react'

const Page = () => {
    const i18n = useI18n()
    const [messageApi, contextHolder] = message.useMessage()
    const router = useRouter()

    const onFinish = async (values) => {
        // console.log('Success:', values);
        const { error, msg, data } = await PasswordResetEmail(values)
        if (error) {
            Error(msg)
        } else {
            router.push(`/reset-otp?email=${values.email}`)
        }
        // console.log("🚀 ~ file: page.jsx:28 ~ onFinish ~ data:", data)
    }

    const Error = (msg) => {
        messageApi.open({
            type: 'error',
            content: msg,
        });
    }

    return (
        <>
            {contextHolder}
            <div className='dark:bg-BG_Color'>
                <div className='flex justify-center'>
                    <div className='flex items-center justify-between w-4/5 md:w-3/5 py-9'>
                        <h1 className='text-2xl md:text-5xl font-bold text-BG_Color dark:text-White_Color'>{i18n?.t('Forgot Password')}</h1>
                    </div>
                </div>
                <hr className='border-Font2_Color w-full' />
                <div className=' w-4/5 md:w-3/5 mx-auto py-20'>
                    <p className='paragraph_2 text-Font2_Color pb-4'>{i18n?.t('Please confirm your email address below and we will send you a verification code.')}</p>
                    <Form onFinish={onFinish}>
                        <label className='paragraph_1 pb-2 dark:text-white'>{i18n?.t('Email')}</label>
                        <Form.Item name="email">
                            <Input />
                        </Form.Item>
                        {/* <Form.Item className=''>
                            <Button className='px-5 border paragraph_1 rounded border-Primary_Color text-Primary_Color hover:bg-Primary_Color hover:text-white duration-300' htmlType="submit">{i18n?.t('Continue')}</Button>
                        </Form.Item> */}
                        <button className='btn-submit  dark:text-White_Color'>{i18n?.t('Continue')}</button>

                        {/* <div className="pb-6">
                        <h1 className='paragraph_1 pb-2 dark:text-white'>Email</h1>
                        <Input type='email' placeholder="Email" className='paragraph_1 p-3 !outline-none placeholder:text-Font2_Color text-Font2_Color bg-transparent' />
                    </div> */}
                        {/* <button className='px-5 py-2 border paragraph_1 rounded border-Primary_Color text-Primary_Color hover:bg-Primary_Color hover:text-white duration-300'>Continue</button> */}

                    </Form>
                </div>
            </div>
        </>
    )
}

export default Page