'use client'
import { PasswordResetEmail, signupResendOtp } from '@/helpers/backend_helper'
import { Button, Form, Input, message } from 'antd'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useI18n } from '@/context/i18n';

const Page = () => {
    const [messageApi, contextHolder] = message.useMessage()
    const router = useRouter()
    const i18n = useI18n()

    const onFinish = async (values) => {
        const { error, msg, data } = await signupResendOtp(values)
        if (error) {
            Error(msg)
        } else {
            router.push(`/otp?email=${values.email}`)
        }
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
                        <h1 className='text-2xl md:text-5xl font-bold text-BG_Color dark:text-White_Color'>{i18n?.t('Verify Email')}</h1>
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
                            <Button className='px-5 border paragraph_1 rounded border-Primary_Color text-Primary_Color hover:bg-Primary_Color hover:text-white duration-300' htmltype="submit">{i18n?.t('Continue')}</Button>
                        </Form.Item> */}
                        <button className='btn-submit'>{i18n?.t('Continue')}</button>

                    </Form>
                </div>
            </div>
        </>
    )
}

export default Page