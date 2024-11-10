"use client"
import { Button, Form, Input, message, Divider } from 'antd';
import Link from 'next/link';
import React from 'react';
import { fetchSiteSettings, postLogin, verifyGoogleUser } from '@/helpers/backend_helper';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/context/user';
import { useFetch } from '@/helpers/hooks';
import { useI18n } from '@/context/i18n';
import { FcGoogle } from "react-icons/fc";

import {
    getAuth,
    Auth,
    GoogleAuthProvider,
    signInWithPopup,

} from "firebase/auth";
import { app } from '@/helpers/firebase.config';

const onFinishFailed = (errorInfo) => {
    console.log("errrrrrrrrrrrrrrrrrrrrr",errorInfo);
    message.error(' Wrong Credential ')
};

const Page = () => {
    const i18n = useI18n();
    const router = useRouter()
    const [site] = useFetch(fetchSiteSettings);
    const { user, getUser } = useUserContext({});

    const auth = getAuth(app);
    const onFinish = async (values) => {
        const { error, token, verified, role, active } = await postLogin(values);
        
        if (error === false) {
            if (active) {
                if (verified === true) {
                    message.success(i18n?.t('Login successfully'))
                    localStorage.setItem('token', token)
                    getUser()
                    if (role === 'user') {
                        router.push('/');
                    } else {
                        router.push('/admin');
                    }

                } else {
                    message.warning(i18n?.t('Please verify your email first!'))
                    router.push(`/verify-otp`)
                }

            } else {
                message.error(`${i18n?.t('your account has been deactivated! Please contact')} ${site?.email}`)
            }
        } else {
            console.log("errrrrrrrrrrrrrrrrrrrrr",error);
            message.error(i18n?.t('Wrong Credential'))
        }
    };

    const handleGoogleLogin = () => {
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider)
            .then(async (res) => {
                const data = {
                    name: res.user.displayName,
                    image: res.user.photoURL,
                    phone: res.user.phoneNumber,
                    email: res.user.email,
                    access_token: await res.user.getIdToken(),
                    auth_type: "google",
                };
                try {
                    const { error, token, verified, role, active } = await verifyGoogleUser(data);

                    if (error === true) {
                        message.error(msg);
                    }
                    if (!error) {
                        message.success(i18n?.t('Login successfully'))
                        token && localStorage.setItem("token", token);
                        user?.auth_type &&
                            localStorage.setItem("auth_type", user?.auth_type);
                        getUser()
                        switch (role) {
                            case "admin":
                                router.push("/admin");
                                break;
                            case "employee":
                                router.push("/admin");
                                break;
                            case "user":
                                router.push("/");
                                break;
                            default:
                                router.push("/");
                        }
                    } else {
                        console.log("extra data collection triggered");
                    }
                } catch (err) {
                    message.error(err.message);
                }
            })
            .catch((err) => {
                console.log("error: ", err.message);
            });
    };

    return (
        <div className='dark:bg-BG_Color'>
            <div className='flex justify-center'>
                <div className=' w-4/5 md:w-3/5 py-9'>
                    <h1 className='text-2xl md:text-5xl font-bold text-BG_Color dark:text-White_Color'>{i18n?.t('Login')}</h1>
                </div>
            </div>
            <hr className='border-Font2_Color w-full' />
            <div className='flex flex-col justify-center w-4/5 md:w-3/5 mx-auto py-20'>
                <Form
                    name="basic"
                    labelCol={{
                        span: 16,
                    }}
                    wrapperCol={{
                        span: 32,
                    }}
                    style={{
                        width: '100%',
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="vertical"

                >
                    <label className='text-2xl dark:text-White_Color'>{i18n?.t('Email')}</label>

                    <Form.Item
                        name="email"
                        className='dark:text-White_Color'
                        rules={[
                            {
                                required: true,
                                message: i18n?.t('Please input your email!'),
                                type: 'email'
                            },
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
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <button className='btn-submit  dark:text-White_Color'>{i18n?.t('Login')}</button>
                    <p className='text-base dark:text-White_Color md:pt-10'>{i18n?.t('Dont have an account')}? <Link href='/register'><span className='text-Primary_Color'>{i18n?.t('Sign Up')}</span></Link></p>
                    <p className='pb-4 text-base dark:text-White_Color'>{i18n?.t('Forgot Your Password?')} <Link href="/forgot-password" className='text-Primary_Color hover:text-Primary_Color'>{i18n?.t('Click Here')}</Link></p>

                </Form>
                <Divider
                    plain
                    className="!text-black dark:!text-White_Color text-base font-medium"
                >
                    {i18n?.t('Or')}
                </Divider>
                <button
                    onClick={handleGoogleLogin}
                    className="mx-auto mt-6 duration-500 flex items-center justify-center gap-x-2 dark:text-white text-black px-12 py-4 w-[100%] md:w-[40%] border dark:border-white border-black border-opacity-50 rounded hover:bg-Primary_Color group hover:border-Primary_Color"
                >
                    <FcGoogle className="text-2xl  " />
                    <span className="text-base ">
                        {i18n?.t('Login with Google')}
                    </span>
                </button>
            </div>

        </div>
    );
};

export default Page;