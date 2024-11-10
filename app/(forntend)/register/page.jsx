"use client"
import { useI18n } from '@/context/i18n';
import { postSignup } from '@/helpers/backend_helper';
import { Button, Form, Input, message } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';

const Page = () => {
    const i18n = useI18n();
    const router = useRouter();

    const [messageApi, contextHolder] = message.useMessage();

    const Error = (msg) => {
        messageApi.open({
            type: 'error',
            content: msg,
        });
    };
    const Warning = () => {
        messageApi.open({
            type: 'warning',
            content: i18n?.t('Passwords do not match!'),
        });
    };

    const onFinish = async (values) => {
        console.log('Success:', values);
        if (values.password === values.confirmPassword) {
            const { error, msg, data } = await postSignup(values)
            if (error) {
                Error(msg)
            } else {
                router.push(`/otp?email=${values?.email}`)
            }
        } else {
            Warning();
        }
    };

    return (
        <>
            {contextHolder}
            <div className='dark:bg-BG_Color'>
                <div className='flex justify-center'>
                    <div className=' w-4/5 md:w-3/5 py-9'>
                        <h1 className='text-2xl md:text-5xl font-bold text-BG_Color dark:text-White_Color'>{i18n?.t('Register')}</h1>
                        {/* <button className='py-2 px-4 md:px-16 rounded-full bg-Primary_Color text-White_Color text-base'>Edit profile</button> */}
                    </div>
                </div>
                <hr className='border-Font2_Color w-full' />
                <div className='flex justify-center w-4/5 md:w-3/5 mx-auto py-20'>
                    <Form
                        name="basic"
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
                        <label className='text-2xl dark:text-White_Color'>{i18n?.t('Name')}</label>
                        <Form.Item
                            name="name"
                        >
                            <Input />
                        </Form.Item>
                        <label className='text-2xl dark:text-White_Color'>{i18n?.t('Username')}</label>
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: i18n?.t('please input your username!'),
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <label className='text-2xl dark:text-White_Color'>{i18n?.t('Email')}</label>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: i18n?.t('please input your email!'),
                                },
                                {
                                    type: 'email',
                                    message: i18n?.t('Please input valid email!'),
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <label className='text-2xl dark:text-White_Color'>{i18n?.t('Password')}</label>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: i18n?.t('Please input your password!'),
                                },
                                {
                                    min: 6,
                                    message: i18n?.t('Password must be at least 6 characters!'),
                                }
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <label className='text-2xl dark:text-White_Color'>{i18n?.t('Confirm Password')}</label>
                        <Form.Item
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

                        {/* <Form.Item
                        >
                            <Button className='bg-Primary_Color text-White_Color' htmlType="submit">
                                {i18n?.t('Register')}
                            </Button>
                        </Form.Item> */}
                        <button className='btn-submit  dark:text-White_Color'>{i18n?.t('Register')}</button>

                    </Form>
                </div>
            </div>
        </>
    );
};

export default Page;