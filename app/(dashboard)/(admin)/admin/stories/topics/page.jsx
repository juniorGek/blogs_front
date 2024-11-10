"use client"
import Table, { TableImage } from "@/app/(dashboard)/components/common/table";
import FormInput, { HiddenFormItem } from "@/app/(dashboard)/components/forms/input";
import MultipleImageInput from "@/app/(dashboard)/components/forms/multiple_image_input";
import { useI18n } from "@/context/i18n";
import { deleteCategory, deleteStoryTopic, fetchCategories, fetchStoryTopic, postCategory, postStoryTopic, uploadSingleFile } from '@/helpers/backend_helper'
import { useAction, useActionConfirm, useFetch } from '@/helpers/hooks'
import { Button, Col, Form, Modal, Row, Upload } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react'
import { HiOutlinePlus } from "react-icons/hi";

const Page = () => {

    const [form] = Form.useForm();
    const [img, setImg] = useState()

    let { lang, languages } = useI18n()
    const i18n = useI18n()

    const [lang2, setLang] = useState('en')
    const { push } = useRouter()


    // modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    let action = (
        <div className='flex'>
            <Button
                className='mr-2'
                onClick={() => {
                    form.resetFields();
                    setIsModalVisible(true);
                    setIsEdit(false);
                }}
            >
                {i18n?.t('Add Topic')}
            </Button>
        </div>
    );
    const [topics, getTopics, { loading, error }] = useFetch(fetchStoryTopic)
    console.log("🚀 ~ Page ~ topics:", topics)

    const columns = [
        {
            dataField: 'title',
            text: i18n?.t('Topic name'),
            formatter: (_, data) => <span className='capitalize'>{data?.title && data?.title[lang]}</span>,
        },
        {
            dataField: 'image',
            text: i18n?.t('Topic image'),
            formatter: (d) => <TableImage url={d} />,
        }
    ]

    // let actions = (data) => (
    //     <div className="flex">
    //         <button className="btn btn-outline-success btn-sm focus:shadow-none me-2"
    //             title="Add Subcategory"
    //             onClick={() => push(`/admin/subcategories?_id=${data?._id}&name=${data?.name && data?.name[lang]}`)}>
    //             <HiOutlinePlus className='cursor-pointer' />
    //         </button>
    //     </div>)

    return (
        <>
            <Table
                columns={columns}
                data={topics}
                pagination={true}
                noActions={false}
                action={action}
                indexed={true}
                shadow={false}
                onEdit={(data) => {
                    form.resetFields();
                    form.setFieldsValue({
                        ...data,
                        image:
                            data?.image?.length > 0
                                ? [
                                    {
                                        uid: '-1',
                                        name: 'image.png',
                                        status: 'done',
                                        url: data?.image,
                                    },
                                ]
                                : [],
                    });
                    setIsModalVisible(true);
                    setIsEdit(true);
                }}
                onDelete={deleteStoryTopic}
                onReload={getTopics}
                error={error}
                loading={loading}
                title={i18n?.t('Categories')}
            />

            {/* {/ status updated modal /} */}
            <Modal
                title={i18n?.t('Topics')}
                open={isModalVisible}
                onCancel={handleCancel}
                destroyOnClose
                footer={null}
                width={569}
            >
                < >
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
                </>
                <Form

                    form={form}
                    onFinish={async (values) => {

                        if (!!values.image) {
                            let image = await uploadSingleFile({
                                image: values.image[0].originFileObj,
                                image_name: 'topic_image',
                                _id: values._id
                            });
                            values.image = image.data
                        }

                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        return useAction(postStoryTopic, {
                            ...values
                        }
                            , () => {
                                getTopics();
                                setIsModalVisible(false);
                            });
                    }}
                    layout='vertical'
                >

                    <HiddenFormItem name='_id' />
                    {languages?.map((l, index) => (
                        <FormInput
                            name={['title', l.key]}
                            label={i18n?.t('topic title')}
                            key={index}
                            style={{ display: l.key === lang2 ? 'block' : 'none' }}
                            required={l.code === lang}
                        />
                    ))}
                    <MultipleImageInput name='image' label={i18n?.t('topic image')} required />


                    <button className="btn-submit">{isEdit ? `${i18n?.t('Update')}` : `${i18n?.t('Add topic')}`}</button>
                </Form>
            </Modal>
        </>

    )
}

export default Page