'use client'
import { useI18n } from '@/context/i18n';
import { PasswordResetByOtp } from '@/helpers/backend_helper';
import { Button, Form, Input, message } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

const Page = () => {
    const i18n = useI18n();
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values) => {
        if (values?.password === values?.confirmPassword) {
            const { error, msg, data } = await PasswordResetByOtp({ password: values?.password, confirmPassword: values?.confirmPassword })
            if (error) {
                Error(msg)
            } else {
                Success()
                router.push('/login')
                localStorage.removeItem('token')
            }
        }
    }

    const Error = (msg) => {
        messageApi.open({
            type: 'error',
            content: msg,
        });
    };
    const Success = () => {
        messageApi.open({
            type: 'success',
            content: i18n?.t('Success full verified'),
        })
    }

    return (
        <>
            {contextHolder}
            <div className='dark:bg-BG_Color'>
                <div className='flex justify-center'>
                    <div className='flex items-center justify-between w-4/5 md:w-3/5 py-9'>
                        <h1 className='text-2xl md:text-5xl font-bold text-BG_Color dark:text-White_Color'>{i18n?.t('Change Password')}</h1>
                    </div>
                </div>
                <hr className='border-Font2_Color w-full' />
                <div className=' w-4/5 md:w-3/5 mx-auto py-20'>
                    <p className='paragraph_2 text-Font2_Color pb-4'>{i18n?.t('Please confirm your email address below and we will send you a verification code.')}</p>
                    <Form
                        name="basic1"
                        labelCol={{
                            span: 16,
                        }}
                        wrapperCol={{
                            span: 32,
                        }}
                        style={{
                            // maxWidth: 1000,
                            width: '100%',
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}

                        layout="vertical"

                    >

                        <label className='text-2xl dark:text-White_Color'>{i18n?.t('New Password')}</label>
                        <Form.Item
                            // label="new-password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: i18n?.t('Please input your new password!'),
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <label className='text-2xl dark:text-White_Color'>{i18n?.t('Confirm Password')}</label>

                        <Form.Item
                            // label="Confirm Password"
                            name="confirmPassword"
                            rules={[
                                {
                                    required: true,
                                    message: i18n?.t('Please input your confirm password!'),
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        {/* <Form.Item>
                            <Button className='bg-Primary_Color text-White_Color' htmltype="submit">
                                {i18n?.t('Change Password')}
                            </Button>
                        </Form.Item> */}
                        <button className='btn-submit'>{i18n?.t('Change Password')}</button>


                    </Form>
                </div>
            </div>
        </>
    );
};

export default Page;