"use client"
import UserContext from '@/context/user'
import FormInput from '@/app/(dashboard)/components/forms/input';
import { fetchUser, passwordUpdate, postUser, updateUserByAdmin, uploadSingleFile } from '@/helpers/backend_helper';
import { useAction, useFetch } from '@/helpers/hooks';
import { uploadImage } from '@/helpers/uploadFiles';
import { Button, Card, Col, Form, Row } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { HiOutlineIdentification } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import MultipleImageInput from '@/app/(dashboard)/components/forms/multiple_images_input';
import { useI18n } from '@/context/i18n';

const AdminProfileComponent = () => {
    const [loading, setLoading] = useState(false);
    const [tab, setTab] = useState('profile');
    const [show, setShow] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showOld, setShowOld] = useState(false);
    let {user}= useContext(UserContext)
    const [form] = Form.useForm();
    const i18n = useI18n()

    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                ...user,
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
                        : []
            });
        }
    }, [user]);
    return (
        <div>
            <Card className={'shadow-sm'}>
                <h1 className={'text-[16px] font-semibold tracking-wider text-gray-600'}>
                    <p className='font-medium'>Admin Profile</p>
                </h1>
            </Card>
            <div className='rounded-lg bg-white p-7 shadow-sm'>
                <div className='mt-5 mb-10 flex justify-center gap-10'>
                    <div
                        onClick={() => setTab('profile')}
                        className='group flex cursor-pointer items-center gap-x-4'
                    >
                        <div
                            className={`bg-[#DEDCDC] group-hover:bg-[#DAD4FF] ${
                                tab === 'profile' && 'bg-[#DAD4FF]'
                            } w-fit rounded-full p-3`}
                        >
                            <HiOutlineIdentification size={36} />
                        </div>
                        <p
                            className={`text-base font-medium text-content_tertiary group-hover:text-primary ${
                                tab === 'profile' && '!text-primary'
                            }`}
                        >
                            Basic Information
                        </p>
                    </div>
                    <div
                        onClick={() => setTab('change_password')}
                        className='group flex cursor-pointer items-center gap-x-4'
                    >
                        <div
                            className={`bg-[#DEDCDC] group-hover:bg-[#DAD4FF] ${
                                tab === 'change_password' && 'bg-[#DAD4FF]'
                            } w-fit rounded-full p-3`}
                        >
                            <RiLockPasswordLine size={36} />
                        </div>
                        <p
                            className={`text-base font-medium text-content_tertiary group-hover:text-primary ${
                                tab === 'change_password' && '!text-primary'
                            }`}
                        >
                            Change Password
                        </p>
                    </div>
                </div>
                {tab === 'profile' && (
                    <Form
                        form={form}
                        onFinish={async (values) => {                         
                            setLoading(true);
                            if (!!values.image) {
                                if(values.image.length > 0){
                                    let image = await uploadSingleFile({
                                image: values.image[0].originFileObj,
                                image_name: 'Profile_image',
                                _id: values._id
                            });
                            values.image = image.data
                                }else{
                            values.image = ""
                                }
                        }
                             // eslint-disable-next-line react-hooks/rules-of-hooks
                            return useAction(postUser, values, () => {
                                setLoading(false);
                            });
                        }}
                        layout='vertical'
                    >
                        <Row gutter={24}>
                            <Col xs={24}>
                                <FormInput name='name' label='Name' required />
                            </Col>
                            <Col xs={24}>
                                <FormInput name='email' label='Email' required />
                            </Col>
                        </Row>
                       
        
                        <p>Profile image</p>
                        <MultipleImageInput name='image' />

                        <div className={'mt-4 flex items-center justify-end gap-5'}>
                            {/* <Button htmltype='submit'>Save</Button> */}
                            <button className='btn-submit'>{i18n?.t('Submit')}</button>

                        </div>
                    </Form>
                )}

                {tab === 'change_password' && (
                    <Form
                        form={form}
                        onFinish={async (values) => {
                            setLoading(true);
                             // eslint-disable-next-line react-hooks/rules-of-hooks
                            return useAction(passwordUpdate, values, () => {
                                setLoading(false);
                                form.resetFields();
                            });
                        }}
                        layout='vertical'
                    >
                        <Row gutter={24}>
                            <Col md={8} xs={24} className='relative'>
                                <FormInput
                                    name='currentPassword'
                                    placeholder='Old Password'
                                    label='Old Password'
                                    type={showOld ? 'text' : 'password'}
                                    required
                                />
                                <span
                                    className='absolute right-6 top-1/2 text-lg'
                                    role='button'
                                    onClick={() => setShowOld(!showOld)}
                                >
                                    {showOld ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </Col>
                            <Col md={8} xs={24} className='relative'>
                                <FormInput
                                    name='password'
                                    placeholder='Password'
                                    label='New Password'
                                    type={show ? 'text' : 'password'}
                                    rules={[ { min: 5, message: 'Username must be minimum 5 characters.' },]}
                                    required
                                />
                                <span
                                    className='absolute right-6 top-1/2 text-lg'
                                    role='button'
                                    onClick={() => setShow(!show)}
                                >
                                    {show ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </Col>
                            <Col md={8} xs={24} className='relative'>
                                <FormInput
                                    name='confirm_password'
                                    placeholder='Confirm Password'
                                    label='Confirm New Password'
                                    type={showConfirm ? 'text' : 'password'}
                                    required
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                    new Error(
                                                        'The two passwords that you entered do not match!'
                                                    )
                                                );
                                            },
                                        }),
                                    ]}
                                />
                                <span
                                    className='absolute right-6 top-1/2 text-lg'
                                    role='button'
                                    onClick={() => setShowConfirm(!showConfirm)}
                                >
                                    {showConfirm ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </Col>
                        </Row>

                        <div className={'mt-4 flex items-center justify-end gap-5'}>
                            {/* <Button htmltype='submit'>Change</Button> */}
                            <button className='btn-submit'>{i18n?.t('Submit')}</button>

                        </div>
                    </Form>
                )}
            </div>
        </div>
    );
};

export default AdminProfileComponent;
