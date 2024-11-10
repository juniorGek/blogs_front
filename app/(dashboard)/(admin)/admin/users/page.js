"use client"


import Table, { TableImage } from "@/app/(dashboard)/components/common/table";
import Breadcrumb from "../../../components/common/breadcums";
import { useAction, useActionConfirm, useFetch } from "@/helpers/hooks";
import { fetchUsers, updateUserByAdmin, uploadSingleFile } from "@/helpers/backend_helper";
import { Button, Form, Modal, Select, Switch } from "antd";
import { useState } from "react";
import FormInput, { HiddenFormItem } from "@/app/(dashboard)/components/forms/input";
import MultipleImageInput from "@/app/(dashboard)/components/forms/multiple_image_input";
import { useI18n } from "@/context/i18n";

const Users = () => {
    const [form] = Form.useForm();
    // modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const i18n = useI18n()
    const [users, getUsers, { loading, error }] = useFetch(fetchUsers)
    const columns = [
        {
            dataField: 'name',
            text: i18n?.t('Name'),
            formatter: (name) => <span className=''>{name}</span>,
        }, {
            dataField: 'image',
            text: i18n?.t('Image'),
            formatter: (d) => <TableImage url={d} />,
        },
        {
            dataField: 'email',
            text: i18n?.t('Email'),
            formatter: (email) => <span className=''>{email}</span>,
        },
        {
            dataField: 'role',
            text: i18n?.t('Role'),
            formatter: (role) => <span className={`capitalize ${role === 'employee' ? 'text-green-500' : ''}`}>{role}</span>,
        },
        {
            dataField: 'active',
            text: i18n?.t('Account Status'),
            formatter: (_, data) => (
                <Switch
                    onChange={(e) => {
                        if (data?.active) {
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            useActionConfirm(updateUserByAdmin, { _id: data?._id, active: "false" }, () =>
                                getUsers()
                            )
                        } else {
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            useActionConfirm(updateUserByAdmin, { _id: data?._id, active: "true" }, () =>
                                getUsers()
                            )
                        }
                    }

                    }
                    checkedChildren={'Active'}
                    unCheckedChildren={'Inactive'}
                    checked={data?.active}
                    handleBg="#eb4034"
                />
            ),
        },
    ]

    //select to filter from role 
    const action = (
        <div className='flex'>
            <Select
                defaultValue="all"
                style={{ width: 120 }}
                onChange={(value) => {
                    if (value === 'all') {
                        getUsers()
                    } else {
                        getUsers({ role: value })
                    }
                }}
                allowClear
            >
                <Select.Option value="all">All</Select.Option>
                <Select.Option value="user">User</Select.Option>
                <Select.Option value="employee">Employee</Select.Option>
            </Select>
        </div>
    );

    return (
        <>
            <Table
                title={i18n?.t('Users')}
                columns={columns}
                data={users}
                pagination={true}
                indexed={true}
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
                onReload={getUsers}
                error={error}
                loading={loading}
                action={action}
                permission={'user_list'}
            />

            <Modal
                title={i18n?.t('User Details')}
                open={isModalVisible}
                onCancel={handleCancel}
                destroyOnClose
                footer={null}
                width={569}
            >
                <Form

                    form={form}
                    onFinish={async (values) => {
                        if (!!values.image) {
                            let image = await uploadSingleFile({
                                image: values.image[0].originFileObj,
                                image_name: 'user_image',
                                _id: values._id
                            });
                            values.image = image.data
                        }
                        console.log(values)
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        return useAction(updateUserByAdmin, values, () => {
                            getUsers();
                            setIsModalVisible(false);
                        });
                    }}
                    layout='vertical'
                >

                    <HiddenFormItem name='_id' />
                    <FormInput
                        name='name'
                        placeholder={i18n?.t('Enter Name')}
                        label={i18n?.t('Name')}
                        required
                    />
                    <FormInput
                        name='email'
                        placeholder={i18n?.t('Enter Email')}
                        label={i18n?.t('Email')}
                        required
                    />
                    <MultipleImageInput name='image' label={i18n?.t('Image')} required />


                    <button className='btn-submit'>{isEdit ? `${i18n?.t('Update')}` : `${i18n?.t('Add User')}`}</button>
                </Form>
            </Modal>
        </>
    )
}

export default Users