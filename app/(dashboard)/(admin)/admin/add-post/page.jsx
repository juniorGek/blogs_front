'use client'
import dynamic from 'next/dynamic';

import { AddBlog, fetchAllSubCategoriesByCategory, fetchTags, getAllCategoryData, getAllTags, uploadSingleFile } from '@/helpers/backend_helper';
import { useAction, useFetch } from '@/helpers/hooks';
import { Button, Checkbox, Form, Input, Radio, Select, Switch, Upload, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Option } from 'antd/es/mentions';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineDownload, AiOutlineLoading } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/context/i18n';
import FormInput from '@/app/(dashboard)/components/forms/input';
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });


const Page = () => {
    const [lang2, setLang] = useState('en')
    let { lang, languages } = useI18n()
    const i18n = useI18n()

    const [form] = Form.useForm();

    const [category, getcategory] = useFetch(getAllCategoryData);
    const [subcategory, setSubcategory] = useState([]);
    const [show, setShow] = useState(true)
    const [tags, getTag] = useFetch(getAllTags);
    const [imageUrl, setImageUrl] = useState('')
    const [loading, setLoading] = useState(false);
    const [valueIs, setValueIs] = useState('');
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const router = useRouter();


    const config = {
        readonly: false,
        placeholder: 'Start typings...',
    };

    const onChangeIs = (e) => {
        setValueIs(e.target.value);
    };

    const handleImgUpload = async (e) => {
        const { error, data: image } = await uploadSingleFile({
            image: e?.originFileObj,
            image_name: 'blog_image',
        });
        setImageUrl(image);
        // setImg(image);
    }



    const onFinish = async (values) => {

        const payload = {
            ...values,
            cover_image: imageUrl,
        }

        if (subcategory?.find(d => d._id === payload?.subcategory)) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            return useAction(AddBlog, payload, () => {
                router.push('/admin/blogs')
            })
        } else {
            if (payload?.subcategory === undefined) {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                return useAction(AddBlog, payload, () => {
                    router.push('/admin/blogs')
                })
            } else {
                message.warning(i18n?.t('please select subcategory'))
            }
        }

    }

    const uploadButton = (
        <div className='flex justify-center items-center flex-col dark:text-White_Color'>
            {loading ? <AiOutlineLoading /> : <AiOutlineDownload />}
            <div className='' style={{ marginTop: 8 }}>{i18n?.t('Upload')}</div>
        </div>
    );



    return (
        <div>
            <div className='w-2/3 flex md:flex-row flex-col justify-between items-center'>
                <h1 className='header_3'>{i18n.t('Add') + " " + i18n.t('Post')}</h1>
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
                <Form onFinish={onFinish} layout="vertical">
                    <div className='w-full flex md:flex-row flex-col gap-3'>
                        <div className='md:w-2/3'>
                            {languages?.map((l, index) => (
                                <FormInput
                                    name={['title', l.key]}
                                    label={i18n.t('Post') + " " + i18n.t('Title')}
                                    key={index}
                                    style={{ display: l.key === lang2 ? 'block' : 'none' }}
                                    required={l.code === lang}
                                />
                            ))}
                            {languages?.map((l, index) => (
                                <FormInput
                                    name={['time_to_read', l.key]}
                                    label={i18n?.t('Time to Read')}
                                    placeholder="10 min"
                                    key={index}
                                    style={{ display: l.key === lang2 ? 'block' : 'none' }}
                                    required={l.code === lang}
                                />
                            ))}
                            {languages?.map((l, index) => (
                                <FormInput
                                    name={['short_info', l.key]}
                                    label={i18n?.t('Description')}
                                    key={index}
                                    style={{ display: l.key === lang2 ? 'block' : 'none' }}
                                    required={l.code === lang}
                                />
                            ))}
                            <Form.Item label={i18n?.t('Tags')} name={"tags"} rules={[{ required: true, message: i18n?.t('Please select tags') }]}>
                                <Checkbox.Group>
                                    {
                                        tags?.map((tag, index) => (
                                            <Checkbox key={index} value={tag?._id}>{tag?.name && tag?.name[lang]}</Checkbox>

                                        ))
                                    }
                                </Checkbox.Group>
                            </Form.Item>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6' >
                                <Form.Item label={i18n?.t('Category')} name="category" rules={[{ required: true, message: i18n?.t('Please select category!') }]}>
                                    <Select
                                        style={{
                                            width: '100%',
                                        }}
                                        placeholder="Please select category"
                                        onChange={async (e) => {
                                            const { data } = await fetchAllSubCategoriesByCategory({ parent: e })
                                            setSubcategory(data)
                                            if (data?.length > 0) {
                                                setShow(true)
                                            } else {
                                                setShow(false)
                                            }
                                        }}
                                    >
                                        {
                                            category?.map((category, index) => (
                                                <Option key={index}
                                                    value={category?._id}>{category?.name && category?.name[lang]}</Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>

                                {
                                    show && <Form.Item label={i18n?.t('Sub Category')} name="subcategory" rules={[{ required: false, message: i18n?.t('Please select subcategory!') }]}>
                                        <Select
                                            style={{
                                                width: '100%',
                                            }}
                                            placeholder="Please select subcategory"
                                            allowClear
                                        >
                                            {
                                                subcategory?.length > 0 &&
                                                subcategory?.map((subcategory, index) => (
                                                    <Option key={index}
                                                        value={subcategory?._id}>{subcategory?.name && subcategory?.name[lang]}</Option>
                                                ))
                                            }
                                        </Select>
                                    </Form.Item>
                                }
                            </div>

                            <Form.Item label={i18n?.t('Blog Type')} name={'post_type'} >
                                <div>
                                    <Radio.Group onChange={onChangeIs}>
                                        <Radio value={'video'}>{i18n?.t('Video')}</Radio>
                                        <Radio value={'content'}>{i18n?.t('Content')}</Radio>
                                    </Radio.Group>

                                </div>
                            </Form.Item>
                            {
                                valueIs === 'video' && <div className='flex items-center'>
                                    <div className='w-1/5'>
                                        <Form.Item label={i18n?.t('Featured Video')} name={'add_to_featured'} valuePropName='checked'>
                                            <Checkbox>{i18n?.t('Featured Video')}</Checkbox>
                                        </Form.Item>
                                    </div>
                                    <div className='w-4/5'>
                                        <Form.Item label={i18n?.t('Video URL')} name={'video_url'}>
                                            <Input placeholder={i18n?.t('Enter Content URL')}></Input>
                                        </Form.Item>
                                    </div>
                                </div>
                            }
                            {
                                languages?.map((l, index) => (

                                    <Form.Item key={index} name={['details', l.key]} label={i18n?.t('Content')} style={{ display: l.key === lang2 ? 'block' : 'none' }}
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
                        </div>
                        <div className='md:w-1/3'>
                            <div className='bg-[#D9D9D9] p-3 rounded-sm'>
                                <Form.Item
                                    label={i18n?.t('Cover Image')} name={"cover_image"}
                                    rules={[{ required: true, message: i18n?.t('Please upload an image!') }]}
                                >
                                    <Upload className="avatar-uploader" maxCount={1}
                                        onChange={(e) => handleImgUpload(e?.file)} listType="picture-card">
                                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}

                                    </Upload>
                                </Form.Item>
                            </div>

                            <div className='bg-[#D9D9D9] mt-8 p-3 rounded-sm'>
                                <h1>{i18n?.t('Publish')}</h1>
                                <hr className='my-3 w-full px-3' />
                                <div className='flex items-center gap-3'>
                                    <p>{i18n?.t('Do want to published Post')}</p>
                                    <div>
                                        <Form.Item name={"published"} valuePropName='checked'>
                                            <Switch defaultChecked={false} />
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-[#D9D9D9] mt-8 p-3 rounded-sm'>
                                <h1>{i18n?.t('Editor Choice')}</h1>
                                <hr className='my-3 w-full px-3' />
                                <div className='flex items-center gap-3'>
                                    <p>{i18n?.t('Mark as Editor Choice')}</p>
                                    <div>
                                        <Form.Item name={"editors_choice"} valuePropName='checked'>
                                            <Switch defaultChecked={false} />
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-[#D9D9D9] mt-8 p-3 rounded-sm'>
                                <h1>{i18n?.t('Trending')}</h1>
                                <hr className='my-3 w-full px-3' />
                                <div className='flex items-center gap-3'>
                                    <p>{i18n?.t('Mark as Trending')}</p>
                                    <div>
                                        <Form.Item name={"is_trending"} valuePropName='checked'>
                                            <Switch defaultChecked={false} />
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className='btn-submit mt-4 md:mt-0'>{i18n?.t('Submit')}</button>

                </Form>
            </div>
        </div>
    );
};

export default Page;