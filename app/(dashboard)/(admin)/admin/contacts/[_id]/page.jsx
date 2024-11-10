"use client"
import { HiddenFormItem } from '@/app/(dashboard)/components/forms/input';
import { useI18n } from '@/context/i18n';
import { fetchContact, fetchSiteSettings, replyContactSms } from '@/helpers/backend_helper';
import { useAction, useFetch } from '@/helpers/hooks';
import { Card, Form, Input } from 'antd';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { HiOutlineMailOpen } from 'react-icons/hi';

const ContactReply = () => {
    const params = useParams()
    const [contactMsg, getcontactMsg, { loading, error }] = useFetch(fetchContact, {}, false)
    const [site] = useFetch(fetchSiteSettings);
    const i18n = useI18n()

    const [form] = Form.useForm();

    useEffect(() => {
        if(params?._id){
            getcontactMsg({
                _id: params?._id
            })
        }
    }, [params?._id])

    useEffect(() => {
        if (contactMsg?.email) {
            form.setFieldsValue({
                _id: contactMsg?._id,
                email: contactMsg?.email,
                subject: `Re: Reply From ${site?.name}`,
            })
        }
    }, [contactMsg?.email])

    return (
        <div>
            <Card title={i18n?.t('Contact Us SMS Reply')} className={'shadow-sm'}>
                <div className="flex justify-between lg:flex-row flex-col gap-x-8 mt-8">
                    <div className="flex flex-col lg:w-[680px] ">
                        <div className='bg-secondary_gray relative rounded'>
                            <div className='h-12'>
                                <div className='absolute w-16 h-16 bg-Primary_Color shadow-md rounded flex items-center justify-center text-white -top-5'>
                                    <span> <HiOutlineMailOpen size={35} /> </span>
                                </div>

                                <span className='capitalize ml-20 text-[18px] font-bold'>
                                    {i18n?.t('View Quote Details Information')}
                                </span>
                            </div>
                            <div className='px-[5%] py-[3%] bg-gray-200 rounded'>
                                <p className='text-[14px] font-mono'>{i18n?.t('Status')} :
                                    {contactMsg?.status == false ? <span className='bg-red-500 text-white px-2 py-1 rounded ml-2'>
                                        {i18n?.t('Pending')}
                                    </span> : <span className='bg-green-500 text-white px-2 py-1 rounded ml-2'>
                                        {i18n?.t('Replied')}
                                    </span>}

                                </p>
                                <p className='text-[14px] font-mono'>{i18n?.t('Client Name')} : {contactMsg?.name}</p>
                                <p className='text-[14px] font-mono'>{i18n?.t('Client Email')} : {contactMsg?.email}</p>
                                <p className='text-[14px] font-mono'>{i18n?.t('Message')} :</p>
                                <div className='px-[4%] py-[2%] rounded bg-gray-50 text-[14px] text-justify'>
                                    {/* <span dangerouslySetInnerHTML={{ __html: contactMsg?.message }}></span> */}
                                    { contactMsg?.message }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:mt-0 mt-8 w-full">
                        <div className='bg-secondary_gray relative rounded'>
                            <div className='h-12'>
                                <div className='absolute w-16 h-16 bg-Primary_Color shadow-md rounded flex items-center justify-center text-white -top-5'>
                                    <span> <HiOutlineMailOpen size={35} /> </span>
                                </div>

                                <span className='capitalize ml-20 text-[18px] font-bold'>
                                    {i18n?.t('Query')}
                                </span>
                            </div>
                            <div className='p-[2%] bg-gray-200 rounded'>
                                <div className='bg-gray-50 px-[4%] py-[2%] rounded shadow'>
                                    <Form
                                        form={form}
                                        layout="vertical"
                                        onFinish={async (values) => {
                                             // eslint-disable-next-line react-hooks/rules-of-hooks
                                            return useAction(replyContactSms, values, () => {
                                                getcontactMsg()
                                                form.resetFields()
                                            })
                                        }}
                                        autoComplete="off"
                                    >
                                        <HiddenFormItem name="_id" />
                                        <Form.Item
                                            name="email"
                                            label={i18n?.t('Email To')}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item name="subject" label={i18n?.t('Subject')}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item name="message" label={i18n?.t('Message')}>
                                            <Input type='text-area' />
                                        </Form.Item>
                                        <button className='w-full' type="submit">
                                            <Form.Item className='flex justify-center bg-Primary_Color rounded'>
                                                <span className="text-white header_6">
                                                    {i18n?.t('Send')}
                                                </span>
                                            </Form.Item>
                                        </button>
                                    </Form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ContactReply;
