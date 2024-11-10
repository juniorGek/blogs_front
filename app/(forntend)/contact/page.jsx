'use client'
import { Button, Form, Input, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'
import { HiOutlineMail } from 'react-icons/hi'
import { FaLocationDot, FaPhoneFlip } from "react-icons/fa6";
import { contactUs, fetchSiteSettings } from '@/helpers/backend_helper'
import { useFetch } from '@/helpers/hooks'
import { useI18n } from '@/context/i18n'

const Page = () => {
    const i18n = useI18n()
    let { lang, languages } = useI18n()

     // eslint-disable-next-line react-hooks/rules-of-hooks
    const [site] = useFetch(fetchSiteSettings);
    // console.log(site)

     // eslint-disable-next-line react-hooks/rules-of-hooks
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const Success = (msg) => {
        messageApi.open({
            type: 'success',
            content: msg,
        });
    };
    const Error = (msg) => {
        messageApi.open({
            type: 'error',
            content: msg,
        });
    };
    const onFinish = async (values) => {
        const { error, msg, data } = await contactUs(values)
        if (error) {
            Error(msg)
        } else {
            form.resetFields();
            Success(msg)

        }
    }

    return (
        <>
            {contextHolder}
            <section className='dark:bg-BG_Color bg-white py-10'>
                <div className="container mx-auto">
                    <div className="md:px-0 px-5">
                        <h1 className='header_1 pb-7 dark:text-white text-Font1_Color'>{i18n?.t('Contact')}</h1>
                        <p className='dark:text-white text-Font1_Color paragraph_1 text-justify'>
                            {site?.contact_page_description && site?.contact_page_description[lang]}
                        </p>
                        <div className="md:py-20 py-6">
                            <h1 className='dark:text-white text-Font1_Color text-[32px] pb-7'>{i18n?.t('Leave A Message')}</h1>
                            <div className="md:flex gap-14">
                                <div className="basis-2/3">
                                    <Form
                                        form={form}
                                        layout="vertical" 
                                        onFinish={onFinish}>
                                        <Form.Item name={"name"}>
                                            <div className="w-full">
                                                <Input type='text' placeholder={i18n?.t('Name')} className='paragraph_1 p-3 !outline-none placeholder:text-Font2_Color text-Font2_Color bg-transparent' />
                                            </div>

                                        </Form.Item>
                                        <Form.Item name={"email"}>
                                            <div className="w-full">
                                                <Input type='email' placeholder={i18n?.t('Email')} className='paragraph_1 p-3 !outline-none placeholder:text-Font2_Color text-Font2_Color bg-transparent' />
                                            </div>
                                        </Form.Item>
                                        <Form.Item name={"message"}>
                                            <div className="w-full">
                                                <TextArea
                                                    className='paragraph_1 p-3 !outline-none placeholder:text-Font2_Color text-Font2_Color bg-transparent'
                                                    placeholder={i18n?.t('Message')}
                                                    autoSize={{ minRows: 3, maxRows: 5 }}
                                                />
                                            </div>
                                        </Form.Item>
                                     
                                            <button className='px-5 py-2 border paragraph_1 rounded border-Primary_Color text-Primary_Color hover:bg-Primary_Color hover:text-white duration-300 md:mb-0 mb-10' type="submit">{i18n?.t('Submit')}</button>
                          
                                    </Form>
                                </div>
                                <div className="basis-1/3">
                                    <div className="flex items-center mb-8">
                                        <div className="header_3 mr-4 text-Font1_Color dark:text-white">
                                            <FaPhoneFlip />
                                        </div>
                                        <a href={`tel:${site?.phone}`} className="paragraph_1 text-Font1_Color dark:text-white">
                                            {site?.phone}
                                        </a>
                                    </div>
                                    <div className="flex items-center mb-8">
                                        <div className="header_3 mr-4 text-Font1_Color dark:text-white">
                                            <HiOutlineMail />
                                        </div>
                                        <a href='mailto:' className="paragraph_1 text-Font1_Color dark:text-white">
                                            {site?.email}
                                        </a>
                                    </div>
                                    <div className="flex items-center mb-8">
                                        <div className="header_3 mr-4 text-Font1_Color dark:text-white">
                                            <FaLocationDot />
                                        </div>
                                        <div className="paragraph_1 text-Font1_Color dark:text-white">
                                            {site?.address && site?.address[lang]}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </section>
            <section className='dark:bg-BG_Color bg-white md:py-10 '>
                <div>
                    <iframe src={site?.map_link} className="w-full h-[464px]" loading="lazy"></iframe>
                </div>
            </section>
        </>
    )
}

export default Page