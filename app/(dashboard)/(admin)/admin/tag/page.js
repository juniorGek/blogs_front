"use client"
import Table, { TableImage } from "@/app/(dashboard)/components/common/table";
import FormInput, { HiddenFormItem } from "@/app/(dashboard)/components/forms/input";
import MultipleImageInput from "@/app/(dashboard)/components/forms/multiple_image_input";
import { useI18n } from "@/context/i18n";
import { deleteTag, fetchTags, postTag } from '@/helpers/backend_helper'
import { useAction, useActionConfirm, useFetch } from '@/helpers/hooks'
import { Button, Col, Form, Modal, Row, Upload } from "antd";
import React, { useEffect, useState } from 'react'
const Page = () => {
    let { lang, languages } = useI18n()
    const [lang2, setLang] = useState('en')
    const i18n = useI18n()

    const [form] = Form.useForm();
    const [img, setImg] = useState()


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
                {i18n?.t('Add Tag')}
            </Button>
        </div>
    );
    const [tags, getTags, { loading, error }] = useFetch(fetchTags)
    const columns = [
        {
            dataField: 'name',
            text: i18n?.t('Tag') + ' ' + i18n?.t('Name'),
            formatter: (_, data) => <span className='capitalize'>{data?.name && data?.name[lang]}</span>,
        },
        {
            dataField: 'description',
            text: i18n?.t('Tag') + ' ' + i18n?.t('Description'),
            formatter: (description) => <span className='capitalize'>{description}</span>,
        },
    ]

    return (
        <>
            {/* <FormSelect/> */}
            <Table
                columns={columns}
                data={tags}
                pagination={true}
                noActions={false}
                action={action}
                // actions={actions}
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
                onDelete={deleteTag}
                onReload={getTags}
                error={error}
                loading={loading}
                title={i18n?.t('Tags') + ' ' + i18n?.t('Blog')}
                permission={'tags'}
            />

            {/* status updated modal */}
            <Modal
                title={`Tag Details`}
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
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        return useAction(postTag, values, () => {
                            getTags();
                            setIsModalVisible(false);
                        });
                    }}
                    layout='vertical'
                >

                    <HiddenFormItem name='_id' />

                    {languages?.map((l, index) => (
                        <FormInput
                            name={['name', l.key]}
                            label="Tag Name"
                            key={index}
                            style={{ display: l.key === lang2 ? 'block' : 'none' }}
                            required={l.code === lang}
                        />
                    ))}

                    {/* <FormInput
                        name='name'
                        placeholder='Enter tag name'
                        label='Tag Name'
                        required
                    /> */}
                    <FormInput
                        name='description'
                        placeholder='Enter tag description'
                        label='Tag Description'
                    />
                    {/* <Button htmltype="submit">{isEdit ? 'Update' : 'Add Tag'}</Button> */}
                    <button className='btn-submit'>{i18n?.t('Submit')}</button>

                </Form>
            </Modal>
        </>

    )
}

export default Page