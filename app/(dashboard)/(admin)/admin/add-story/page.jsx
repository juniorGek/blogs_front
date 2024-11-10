'use client'
import dynamic from 'next/dynamic';

import { fetchAllStoryTopic, fetchStoryElement, postStory, uploadSingleFile } from '@/helpers/backend_helper';
import { useAction, useFetch } from '@/helpers/hooks';
import { Button, Form, Input, Radio, Upload, message } from 'antd';
import React, { useRef, useState } from 'react';
import { AiOutlineDownload, AiOutlineLoading } from 'react-icons/ai';
import { useRouter, useSearchParams } from 'next/navigation';
import { useI18n } from '@/context/i18n';
import FormInput, { HiddenFormItem } from '@/app/(dashboard)/components/forms/input';
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;
import { UploadOutlined } from '@ant-design/icons';
import FormSelect from '@/app/(dashboard)/components/forms/select_2';

const Page = () => {
    const [lang2, setLang] = useState('en')
    let { lang, languages } = useI18n()
    const i18n = useI18n()

    const [form] = Form.useForm();
    const [imageUrl2, setImageUrl2] = useState('')

    const [loading, setLoading] = useState(false);
    const [valueIs, setValueIs] = useState('');
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const router = useRouter();

    const [linkOrFile, setLinkOrFile] = useState('')
    const [videoUrl, setVideoUrl] = useState('')

    const [topic, getTopic] = useFetch(fetchStoryElement)


    const config = {
        readonly: false,
        placeholder: 'Start typing...',
    };


    const onFinish = async (values) => {

        //eslint-disable-next-line react-hooks/rules-of-hooks
        return useAction(postStory, {
            ...values,
            image_url: imageUrl2,
            start_time: values.publish_date[0],
            end_time: values.publish_date[1],
            video_url: linkOrFile === 'link' ? values.video_url : videoUrl,
        }
            , () => {
                router.push('/admin/stories')
            });
    }



    const handleVideoUpload = async (e) => {
        const { error, data: video } = await uploadSingleFile({
            image: e?.originFileObj,
            image_name: 'story_video_file',
        });
        form.setFieldsValue({ video_file: video })
        setVideoUrl(video);
    }

    const uploadButton = (
        <div className='flex justify-center items-center flex-col dark:text-White_Color'>
            {loading ? <AiOutlineLoading /> : <AiOutlineDownload />}
            <div className='' style={{ marginTop: 8 }}>{i18n?.t('Upload')}</div>
        </div>
    );
    const handleImgUpload2 = async (e) => {

        const { error, data: image } = await uploadSingleFile({
            image: e?.originFileObj,
            image_name: 'story_image_url',
        });
        setImageUrl2(image);
        // setImg(image);
    }

    const uploadButton2 = (
        <div className='flex justify-center items-center flex-col dark:text-White_Color'>
            {loading ? <AiOutlineLoading /> : <AiOutlineDownload />}
            <div className='' style={{ marginTop: 8 }}>{i18n?.t('Upload')}</div>
        </div>
    );


    return (
        <div>
            <div className='w-full flex md:flex-row flex-col justify-between items-center'>
                <h1 className='header_3'>{i18n.t('Add Story')}</h1>
                <div className="flex justify-center flex-wrap gap-3 md:mt-0 mt-2">
                    {languages?.map((l, index) => (
                        <p
                            onClick={() => setLang(l.key)}
                            style={{
                                fontSize: 13,
                                color: l?.key === lang2 ? '#FD4B5F' : '#74788d',
                            }}
                            className={"cursor-pointer " + (l?.key === lang2 ? 'fw-bold' : '') + " capitalize"}
                            role="button"
                            key={index}>
                            {l.name}
                        </p>
                    ))}
                </div>

            </div>

            <div className=''>
                <Form onFinish={onFinish} form={form} layout="vertical">
                    {/* {languages?.map((l, index) => (
                        <FormInput
                            name={['title', l.key]}
                            label={i18n.t('Story Title')}
                            key={index}
                            style={{ display: l.key === lang2 ? 'block' : 'none' }}
                            required={l.code === lang}
                        />
                    ))} */}


                    <FormSelect
                        name='topic'
                        label={i18n?.t('Topic')}
                        options={topic?.map((item) => {
                            return {
                                label: item?.title?.fr || item?.title?.en,
                                value: item?._id
                            }
                        })}
                        required
                    />




                    <Form.Item label={i18n?.t('Story Type')} name={'type'} >
                        <div>
                            <Radio.Group onChange={(e) => {
                                setValueIs(e.target.value);
                                setLinkOrFile('')
                            }}>
                                <Radio value={'video'}>{i18n?.t('Video')}</Radio>
                                {/* <Radio value={'text'}>{i18n?.t('Text')}</Radio> */}
                                <Radio value={'image'}>{i18n?.t('Image')}</Radio>
                            </Radio.Group>

                        </div>
                    </Form.Item>
                    {
                        valueIs === 'video' &&

                        <Radio.Group className='mb-4' onChange={(e) => {
                            setLinkOrFile(e.target.value);
                        }}>
                            <Radio value={'link'}>{i18n?.t('Link')}</Radio>
                            <Radio value={'file'}>{i18n?.t('File')}</Radio>
                        </Radio.Group>

                    }
                    {
                        linkOrFile === 'link' &&
                        <Form.Item label={i18n?.t('Video URL')} name={'video_url'}>
                            <Input placeholder={i18n?.t('Enter Content URL')}></Input>
                        </Form.Item>

                    }
                    {
                        linkOrFile === 'file' &&
                        <Form.Item label={i18n?.t('Video File')} name={'video_file'}>
                            <Upload maxCount={1}
                                onChange={(e) => handleVideoUpload(e?.file)} >
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                        </Form.Item>
                    }
                    {
                        valueIs === 'text' &&
                        languages?.map((l, index) => (
                            <Form.Item key={index} name={['content', l.key]} label={i18n?.t('Text')} style={{ display: l.key === lang2 ? 'block' : 'none' }}
                                required={l.code === lang}>
                                <JoditEditor
                                    ref={editor}
                                    // value={privacyPageData?.content?.value}
                                    config={config}
                                    onBlur={(newContent) => setContent(newContent)}
                                />
                            </Form.Item>
                        ))
                    }
                    {
                        valueIs === 'image' &&
                        <Form.Item>
                            <Upload className="avatar-uploader" maxCount={1}
                                onChange={(e) => handleImgUpload2(e?.file)} listType="picture-card">
                                {imageUrl2 ? <img src={imageUrl2} alt="avatar" style={{ width: '100%' }} /> : uploadButton2}
                            </Upload>
                        </Form.Item>
                    }
                    <Form.Item label={i18n?.t('Publish Date')} name={'publish_date'}>
                        <RangePicker showTime />
                    </Form.Item>

                    <button className='btn-submit mt-4 md:mt-0'>{i18n?.t('Submit')}</button>

                </Form>
            </div>
        </div >
    );
};

export default Page;