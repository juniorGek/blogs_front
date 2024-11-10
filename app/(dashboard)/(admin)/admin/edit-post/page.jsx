'use client'
import dynamic from 'next/dynamic';

import { AddBlog, fetchAllSubCategoriesByCategory, fetchCategories, fetchSubCategoriesByCategory, fetchTags, getAllTags, singleBlogDetails, uploadSingleFile } from '@/helpers/backend_helper';
import { useAction, useFetch } from '@/helpers/hooks';
import { Button, Checkbox, Form, Input, Radio, Select, Switch, Upload, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Option } from 'antd/es/mentions';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineDownload, AiOutlineLoading } from 'react-icons/ai';
import Swal from 'sweetalert2';
import { useRouter, useSearchParams } from 'next/navigation';
import FormInput, { HiddenFormItem } from '@/app/(dashboard)/components/forms/input';
import axios from 'axios';
import { useI18n } from '@/context/i18n';
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

const Page = () => {
    let { lang, languages } = useI18n()
    const [lang2, setLang] = useState('en')

    const i18n = useI18n()

    const [form] = Form.useForm();
    const router = useRouter();
    const [imageUrl, setImageUrl] = useState('')
    const [valueIs, setValueIs] = useState('');
    const editor = useRef(null);
    const [content, setContent] = useState('');

    const path = useSearchParams().get('id');
    const [category, getcategory] = useFetch(fetchCategories);
    const [tags, getTags] = useFetch(getAllTags)
    const [blog, getBlog, { loading, error }] = useFetch(singleBlogDetails, {}, false)

    const [subcategory, getSubcategory] = useFetch(fetchAllSubCategoriesByCategory, {}, false);
    const [show, setShow] = useState(true);


    useEffect(() => {
        getSubcategory({
            parent: blog?.category?._id
        })

        if (!!path) {
            getBlog({
                _id: path
            })
        }
    }, [path, blog?.category?._id])


    useEffect(() => {
        if (!!blog?._id) {
            form.resetFields()
            form.setFieldsValue({
                ...blog,
                category: blog?.category?._id,
                tags: blog?.tags?.map(d => d?._id),
                subcategory: blog?.subcategory?._id,
                cover_image: setImageUrl(blog?.cover_image),
            })
        }
    }, [blog?._id])

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
        // console.log(payload)
        if (subcategory?.find(d => d._id === payload?.subcategory)) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            return useAction(AddBlog, payload, () => {
                message.success(i18n?.t('Post update successfully'));
                router.push('/admin/blogs')
            })
        } else {
            if (payload?.subcategory === undefined) {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                return useAction(AddBlog, payload, () => {
                    message.success(i18n?.t('Post update successfully'));
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
            <div className='w-2/3 flex justify-between items-center'>
                <h1 className='header_3'>{i18n?.t('Edit Blog')}</h1>
                <div className="flex justify-center flex-wrap gap-3">
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

            </div>            <div className=''>
                <Form form={form} onFinish={onFinish} layout="vertical">
                    <HiddenFormItem name='_id' />

                    <div className='w-full flex gap-3'>
                        <div className='w-2/3'>
                            {/* <Form.Item label="Title" name={"title"} rules={[{ required: true, message: 'Please input title!' }]}>
                                <Input placeholder="Post title"></Input>
                            </Form.Item>
                            <Form.Item label="Read Time" name={"time_to_read"} rules={[{ required: true, message: 'Please input read time!' }]}>
                                <Input placeholder="10 min"></Input>
                            </Form.Item>
                            <Form.Item label="Description" name={'short_info'}>
                                <TextArea placeholder="Post description" autoSize={{ minRows: 3, maxRows: 5 }}></TextArea>
                            </Form.Item> */}

                            {languages?.map((l, index) => (
                                <FormInput
                                    name={['title', l.key]}
                                    label={i18n?.t('Post Title')}
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

                            <Form.Item label={i18n?.t('Tags')} name={"tags"} rules={[{ required: true, message: 'Please select tags!' }]}>
                                <Checkbox.Group>
                                    {
                                        tags?.map((tag, index) => (
                                            <Checkbox key={index} value={tag?._id}>{tag?.name && tag?.name[lang]}</Checkbox>

                                        ))
                                    }
                                </Checkbox.Group>
                            </Form.Item>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <Form.Item label={i18n?.t('Category')} name="category" rules={[{ required: true, message: 'Please select category!' }]}>
                                    <Select
                                        style={{
                                            width: '100%',
                                        }}
                                        placeholder="Please select"
                                        onChange={async (e) => {
                                            getSubcategory({ parent: e })
                                            const { data } = await fetchSubCategoriesByCategory({ parent: e })
                                            // setSubcategory(data?.docs)
                                            if (data?.docs.length > 0) {
                                                setShow(true)
                                            } else {
                                                setShow(false)
                                            }
                                        }}
                                    >
                                        {
                                            category?.docs?.map((ctg, index) => (
                                                <Option key={index}
                                                    value={ctg?._id}>{ctg?.name && ctg?.name[lang]}</Option>
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
                                            placeholder={i18n?.t('Please select subcategory!')}
                                            allowClear
                                        >
                                            {console.log(subcategory)}
                                            {
                                                subcategory?.length > 0 &&
                                                subcategory?.map((sub, index) => (
                                                    <Option key={index} value={sub?._id}>
                                                        {console.log(sub)}
                                                        {sub?.name && sub?.name[lang]}
                                                    </Option>
                                                ))
                                            }
                                        </Select>
                                    </Form.Item>
                                }
                            </div>

                            <Form.Item label={i18n?.t('Blog Type')} name={'post_type'} >
                                <Radio.Group onChange={onChangeIs}>
                                    <Radio value={'video'}>Video</Radio>
                                    <Radio value={'content'}>Content</Radio>
                                </Radio.Group>
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
                                            <Input placeholder='Enter Content URL'></Input>
                                        </Form.Item>
                                    </div>
                                </div>
                            }

                            {/* <Form.Item label="Blog Details" name={'details'} >
                                <JoditEditor
                                    ref={editor}
                                    // value={privacyPageData?.content?.value}
                                    config={config}
                                    onBlur={(newContent) => setContent(newContent)}
                                />
                            </Form.Item> */}
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
                        <div className='w-1/3'>
                            <div className='bg-[#D9D9D9] p-3 rounded-sm'>
                                <Form.Item>
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
                    {/* <Form.Item>
                        <Button className='' htmltype="submit">{i18n?.t('Submit')}</Button>
                    </Form.Item> */}
                    <button className='btn-submit'>{i18n?.t('Submit')}</button>


                </Form>
            </div >
        </div >
    );
};

export default Page;