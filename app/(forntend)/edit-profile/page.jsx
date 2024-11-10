"use client"
import { UploadOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useUserContext } from '@/context/user';
import { PasswordResetByOtpToken, fetchProfile, removeFile, uploadSingleFile, userProfileUpdate } from '@/helpers/backend_helper';
import { Button, Form, Input, Upload, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';
import { AiOutlineDownload, AiOutlineLoading, AiTwotoneDelete } from 'react-icons/ai';
import Head from 'next/head';
import { useI18n } from '@/context/i18n';
import { useFetch } from '@/helpers/hooks';

const Page = () => {
    const i18n = useI18n();
    const [form] = useForm();
    // const { user } = useUserContext();
    const [user, getUser] = useFetch(fetchProfile)

    const [messageApi, contextHolder] = message.useMessage();
    const [img, setImg] = useState({})

    const [imageUrl, setImageUrl] = useState('')
    const [loading, setLoading] = useState(false);
    const [profileImage, setProfileImage] = useState(false);

    const ProDelete = async () => {
        const data = await removeFile({ 'file': user?.image })
        if (data?.error === false) {
            const { error, msg } = await userProfileUpdate({
                ...user, image: ''
            })
            if (!error) {
                Success(msg)
            } else {
                Error(msg)
            }
            // console.log('data:', data)
            setProfileImage(false)
        }

    }


    useEffect(() => {
        if (!!user) {
            if (user?.image) {
                setProfileImage(true)
            }
            form.setFieldsValue({
                name: user?.name,
                username: user?.username,
                email: user?.email,
                image:
                    user?.image?.length > 0
                        ? [
                            {
                                uid: '-1',
                                name: 'image.png',
                                status: 'done',
                                url: user?.image,
                            },
                        ]
                        : [],
            })
        }
    }, [user])

    const onFinish = async (values) => {
        console.log("loggggggggggggg..",values);
        values.image = img?.originFileObj || undefined
        if (!!values?.image) {
            let image = await uploadSingleFile({ _id: user?._id, image: values?.image, image_name: 'profile_image' });
            setImageUrl(image?.data)
            if (!image?.error) {
                const data = {
                    "name": values?.name,
                    "username": values?.username,
                    "image": image?.data,
                    "email": values?.email,
                }
                const { error, msg } = await userProfileUpdate(data);
                if (error) {
                    Error(msg)
                } else {
                    Success(i18n?.t('Profile Successfully Updated'))
                    setProfileImage(true)
                    getUser()
                }
            }
        } else {
            Warning(i18n?.t('Please select image'));
        }

    };
    const onFinish2 = async (values) => {
        console.log('Success:', values);
        if (values?.password === values?.confirmPassword) {
            const { error, msg } = await PasswordResetByOtpToken({ password: values?.password, currentPassword: values?.currentPassword })
            if (error) {
                Error(msg)
            } else {
                Success(msg)
            }
        } else {
            Warning(i18n?.t('Passwords do not match!'));
        }
    };

    const Warning = (msg) => {
        messageApi.open({
            type: 'warning',
            content: msg,
        });
    };

    const Error = (msg) => {
        messageApi.open({
            type: 'warning',
            content: msg,
        });
    };

    const Success = (msg) => {
        messageApi.open({
            type: 'success',
            content: msg,
        });
    };

    const uploadButton = (
        <div className='flex justify-center items-center flex-col dark:text-White_Color'>
            {loading ? <AiOutlineLoading /> : <AiOutlineDownload />}
            <div className='' style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <>
            {contextHolder}
            <div className='dark:bg-BG_Color'>
                <Head>
                    <title>Profile Edit</title>
                    <meta property="og:title" content="My page title" key="title" />
                </Head>

                <div className='flex mx-auto w-4/5 md:w-3/5 py-9'>
                    <h1 className='text-2xl md:text-5xl font-bold text-BG_Color dark:text-White_Color'>{i18n?.t('Edit Profile')}</h1>

                </div>

                <hr className='border-Font2_Color w-full' />
                <div className='flex flex-col gap-8 justify-center w-4/5 md:w-3/5 mx-auto py-20'>
                    {
                        profileImage && <div className='relative group cursor-pointer w-[100px]'>
                            {imageUrl ? <Image className='rounded-full w-[100px] h-[100px]' src={imageUrl} width={100} height={100} alt='image'></Image> : <Image className='rounded-full w-[100px] h-[100px]' src={user?.image} width={100} height={100} alt='image'></Image>}
                            <AiTwotoneDelete onClick={() => {
                                ProDelete()
                                setImageUrl('')
                            }} className='absolute hidden group-hover:block top-9 text-3xl left-9 cursor-pointer text-red-500'></AiTwotoneDelete>
                        </div>
                    }
                    <Form
                        form={form}

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
                        {/* <HiddenFormItem name='_id'></HiddenFormItem> */}
                        <label className='text-2xl dark:text-White_Color'>{i18n?.t('Name')}</label>
                        <Form.Item
                            name="name"
                        >
                            <Input />
                        </Form.Item>

                        <label className='text-2xl dark:text-White_Color'>{i18n?.t('Username')}</label>
                        <Form.Item
                            name="username"
                        >
                            <Input />
                        </Form.Item>

                        <label className='text-2xl dark:text-White_Color'>{i18n?.t('Email')}</label>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: i18n?.t('Please input your email!'),
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        {!profileImage &&
                            <>
                                <label className='text-2xl dark:text-White_Color'>{i18n?.t('Image')}</label>
                                <Form.Item
                                    name="image"
                                    maxCount={1}
                                >
                                    <Upload className="avatar-uploader" maxCount={1} onChange={(e) => {
                                        setImg(e?.fileList[0]);
                                        if (e?.fileList[0]?.originFileObj) {
                                            const url = URL.createObjectURL(e.fileList[0].originFileObj);
                                            setImageUrl(url);
                                        }
                                    }} name="image" listType="picture-card" fileList={img ? [img] : []}>
                                        {
                                            imageUrl ? <Image src={imageUrl} width={100} height={100} alt="avatar" /> : uploadButton
                                        }
                                    </Upload>

                                    
                                    
                                    {/* <div>

                                        <Upload onChange={(e) => setImg(e?.file)}>
                                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                        </Upload>
                                    </div> */}
                                </Form.Item>
                            </>
                        }

                        {/* <MultipleImageInput name="image"></MultipleImageInput> */}
                        {/* <UploadImage name="image" img={img} setImg={setImg}></UploadImage> */}

                        {/* <label className='text-2xl dark:text-White_Color'>About</label>
                        <Form.Item
                            name="about"
                        >
                            <TextArea />
                        </Form.Item> */}
                        <div className='flex items-center gap-3'>
                            {/* <Form.Item>
                                <Button className='bg-Primary_Color text-White_Color' htmlType="submit">
                                    {i18n?.t('Save')}
                                </Button>
                            </Form.Item>htmltype
                            <Form.Item>
                                <Button className='bg-Primary_Color text-White_Color' htmlType="">
                                    {i18n?.t('Cancel')}
                                </Button>
                            </Form.Item> */}
                            <button className='btn-submit  dark:text-White_Color'>{i18n?.t('Save')}</button>

                        </div>

                    </Form>
                </div>

                {/* password */}
                <div className='flex justify-center w-4/5 md:w-3/5 mx-auto pb-20'>
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
                        onFinish={onFinish2}

                        layout="vertical"

                    >
                        <label className='text-2xl dark:text-White_Color'>{i18n?.t('Old Password')}</label>
                        <Form.Item
                            // label="old-password"
                            name="currentPassword"
                            rules={[
                                {
                                    required: true,
                                    message: i18n?.t('Please input your old password!'),
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <label className='text-2xl dark:text-White_Color'>{i18n?.t('New Password')}</label>
                        <Form.Item
                            // label="new-password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: i18n?.t('Please input your password!'),
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
                        <div className='flex items-center gap-3'>
                            {/* <Form.Item>
                                <Button className='bg-Primary_Color text-White_Color' htmlType="submit">
                                    {i18n?.t('Save')}
                                </Button>
                            </Form.Item>htmltype
                            <Form.Item>
                                <Button className='bg-Primary_Color text-White_Color' htmlType="submit">
                                    {i18n?.t('Cancel')}
                                </Button>
                            </Form.Item> */}
                            <button className='btn-submit  dark:text-White_Color'>{i18n?.t('Save')}</button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default Page;