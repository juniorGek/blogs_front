"use client"
import Table, { TableImage } from "@/app/(dashboard)/components/common/table";
import FormInput, { HiddenFormItem } from "@/app/(dashboard)/components/forms/input";
import MultipleImageInput from "@/app/(dashboard)/components/forms/multiple_image_input";
import { useI18n } from "@/context/i18n";
import { deleteContact, fetchContact } from '@/helpers/backend_helper'
import { useFetch } from '@/helpers/hooks'
import { Button, Col, Form, Modal, Row, Upload } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react'
import { FaReplyAll } from "react-icons/fa";
const Page = () => {

    const [form] = Form.useForm();
    const [img, setImg] = useState()
    const router = useRouter()

    const i18n = useI18n()
    // modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const editHandleAction = (_id) => {
        router.push(`/admin/contacts/${_id}`)
    }

    const [contact, getContact, { loading, error }] = useFetch(fetchContact)
    console.log("🚀 ~ Page ~ contact:", contact)
    const columns = [
        {
            dataField: 'name',
            text: i18n?.t('Name'),
            formatter: (name) => <span className='capitalize'>{name}</span>,
        },
        {
            dataField: 'email',
            text: i18n?.t("Email"),
            formatter: (email) => <span className=''>{email}</span>,
        },
        {
            dataField: 'message',
            text: i18n?.t('Message'),
            formatter: (message) => <span className=''>{message?.slice(0, 20)}</span>,
        },
        {
            dataField: 'status',
            text: i18n?.t('Status'),
            formatter: (status) => <span className={`capitalize ${status ? 'text-green-500' : 'text-red-500'} `}>{status ? "True" : "False"}</span>,
        },
        {
            dataField: '_id', text: i18n?.t('Reply Message'), formatter: (_id, data) => (
                !data?.status ? <span className='inline-block bg-[#2C9FAF] p-[4px] rounded-[3px] text-white cursor-pointer' onClick={() => editHandleAction(_id)} title="Reply the email"><FaReplyAll /></span> :
                    <span className="" >{data?.replied_message}</span>
            )
        }

    ]

    return (
        <>
            {/* <FormSelect/> */}
            <Table
                columns={columns}
                data={contact}
                pagination={true}
                noActions={false}
                // action={action}
                // actions={actions}
                indexed={true}
                shadow={false}

                onDelete={deleteContact}
                onReload={getContact}
                error={error}
                loading={loading}
                title={i18n?.t('Contact us')}
            />

            {/* status updated modal */}
            {/* <Modal
                title={`Tag Details`}
                open={isModalVisible}
                onCancel={handleCancel}
                destroyOnClose
                footer={null}
                width={569}
            >
                <Form

                    form={form}
                    onFinish={async (values) => {
                        return useAction(postTag, values, () => {
                            getTags();
                            setIsModalVisible(false);
                        });
                    }}
                    layout='vertical'
                >

                    <HiddenFormItem name='_id' />
                    <FormInput
                        name='name'
                        placeholder='Enter tag name'
                        label='Tag Name'
                        required
                    />

                    <Button htmltype="submit">{isEdit ? 'Update' : 'Add Tag'}</Button>
                </Form>
            </Modal> */}
        </>

    )
}

export default Page