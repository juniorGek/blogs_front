"use client";

import { useI18n } from '@/context/i18n';
import { signupOtpVerify, signupResendOtp } from '@/helpers/backend_helper';
import { Form, message } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import OTPInput from 'react-otp-input';
import { useTimer } from 'use-timer';
import { Suspense } from 'react';

const OtpPage = () => {
    const i18n = useI18n();
    const [email, setEmail] = useState(null);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Initialiser l'email uniquement côté client
        if (typeof window !== 'undefined') {
            setEmail(searchParams.get('email'));
        }
    }, [searchParams]);

    const { time, start, pause, reset, status } = useTimer({
        initialTime: 120,
        timerType: 'DECREMENTAL',
    });

    useEffect(() => {
        if (email) {
            start();
        }
        if (time === 0) pause();
    }, [time, start, pause, email]);

    const onFinish = async (values) => {
        if (email) {
            const { error, msg, data } = await signupOtpVerify({ email, otp: values.otp });
            if (error) {
                Error(msg);
            } else {
                Success(i18n?.t('OTP Matched.Profile Verified Successfully'));
                router.push('/login');
            }
        } else {
            Error("No email provided");
        }
    };

    const [messageApi, contextHolder] = message.useMessage();

    const Error = (msg) => {
        messageApi.open({
            type: 'error',
            content: msg,
        });
    };

    const Success = (msg) => {
        messageApi.open({
            type: 'success',
            content: msg,
        });
    };

    return (
        <>
            {contextHolder}
            <div className='dark:bg-BG_Color'>
                <div className='flex justify-center'>
                    <div className='flex items-center justify-between w-4/5 md:w-3/5 py-9'>
                        <h1 className='text-2xl md:text-5xl font-bold text-BG_Color dark:text-White_Color'>{i18n?.t('OTP')}</h1>
                    </div>
                </div>
                <hr className='border-Font2_Color w-full' />
                <div className='w-4/5 md:w-3/5 mx-auto py-20'>
                    <h1 className='header_3 pb-2 dark:text-white'>{i18n?.t('Verify Code')}</h1>
                    <p className='paragraph_2 text-Font2_Color pb-4'>{i18n?.t('Your code to this')} <span className='text-Primary_Color'>{email}</span> {i18n?.t('email account.')}</p>

                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{
                            width: '100%',
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="otp"
                        >
                            <OTPInput
                                numInputs={4}
                                renderInput={(props) => <input {...props} />}
                                inputStyle={{
                                    width: '50px',
                                    height: '48px',
                                    marginRight: '1rem',
                                    fontSize: '20px',
                                    border: '1px solid rgba(0,0,0,0.3)',
                                    outline: 'none',
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <button className='px-5 py-2 border paragraph_1 rounded border-Primary_Color text-Primary_Color hover:bg-Primary_Color hover:text-white duration-300'>{i18n?.t('Verify')}</button>
                        </Form.Item>
                    </Form>
                    <div>
                        <p className="dark:text-White_Color">
                            {
                                time === 0 ? <button onClick={async () => {
                                    reset();
                                    const { error } = await signupResendOtp({ email });
                                    if (!error) {
                                        Success('OTP Resend');
                                    }
                                }}>{i18n?.t('Resend OTP')}</button> : <span>{i18n?.t('Resend in')} {time}{i18n?.t('s')}</span>
                            }
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

const WrappedOtpPage = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <OtpPage />
    </Suspense>
);

export default WrappedOtpPage;
