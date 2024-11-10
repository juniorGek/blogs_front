"use client"
import Table, { TableImage } from "@/app/(dashboard)/components/common/table";
import FormInput, { HiddenFormItem } from "@/app/(dashboard)/components/forms/input";
import MultipleImageInput from "@/app/(dashboard)/components/forms/multiple_image_input";
import { useI18n } from "@/context/i18n";
import { deleteCategory, fetchCategories, postCategory, uploadSingleFile } from '@/helpers/backend_helper'
import { useAction, useActionConfirm, useFetch } from '@/helpers/hooks'
import { uploadImage } from "@/helpers/uploadFiles";
import { Button, Col, Form, Modal, Row, Upload } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react'
import { AiOutlineDownload } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";
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
                {i18n?.t('Add Category')}
            </Button>
        </div>
    );
    const [categories, getCategories, { loading, error }] = useFetch(fetchCategories)

    const columns = [
        {
            dataField: 'name',
            text: i18n?.t('category name'),
            formatter: (_, data) => <span className='capitalize'>{data?.name && data?.name[lang]}</span>,
        },
        {
            dataField: 'image',
            text: i18n?.t('category image'),
            formatter: (d) => <TableImage url={d} />,
        }
    ]

    let actions = (data) => (
        <div className="flex">
            <button className="btn btn-outline-success btn-sm focus:shadow-none me-2"
                title="Add Subcategory"
                onClick={() => push(`/admin/subcategories?_id=${data?._id}&name=${data?.name && data?.name[lang]}`)}>
                <HiOutlinePlus className='cursor-pointer' />
            </button>
        </div>)

    return (
        <>
            <Table
                columns={columns}
                data={categories}
                pagination={true}
                noActions={false}
                action={action}
                actions={actions}
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
                onDelete={deleteCategory}
                onReload={getCategories}
                error={error}
                loading={loading}
                title= {i18n?.t('Categories')}
                permission={"categories"}
            />

            {/* {/ status updated modal /} */}
            <Modal
                title={i18n?.t('Category Details')}
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
                    console.log("🚀 ~ file: page.js:141 ~ onFinish={ ~ values:", values)

                        if (!!values.image) {
                            let image = await uploadSingleFile({
                                image: values.image[0].originFileObj,
                                image_name: 'category_image',
                                _id: values._id
                            });
                            values.image = image.data
                        }

                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        return useAction(postCategory, {
                            ...values
                        }
                            , () => {
                                getCategories();
                                setIsModalVisible(false);
                            });
                    }}
                    layout='vertical'
                >

                    <HiddenFormItem name='_id' />
                    {languages?.map((l, index) => (
                        <FormInput
                            name={['name', l.key]}
                            label= {i18n?.t('category name')}
                            key={index}
                            style={{ display: l.key === lang2 ? 'block' : 'none' }}
                            required={l.code === lang}
                        />
                    ))}
                    <MultipleImageInput name='image' label={i18n?.t('category image')} required />


                    <button className="btn-submit">{isEdit ? `${i18n?.t('Update')}` : `${i18n?.t('Add Category')}`}</button>
                </Form>
            </Modal>
        </>

    )
}

export default Page