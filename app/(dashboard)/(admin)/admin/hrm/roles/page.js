"use client"

import Table from '@/app/(dashboard)/components/common/table';
import FormInput, { HiddenFormItem } from '@/app/(dashboard)/components/forms/input';
import FormSelect from '@/app/(dashboard)/components/forms/select';
import { useI18n } from '@/context/i18n';
import { useSite } from '@/context/site';
import { delRole, fetchDepartmentShortList, fetchRoles, postRole } from '@/helpers/backend_helper';
import { useAction, useFetch } from '@/helpers/hooks';
import { Button, Form, Modal } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const Roles = () => {
    const site = useSite();
    const i18n = useI18n();
    const [form] = Form.useForm();
    const { push } = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [departmentElements, getDepartmentElements] = useFetch(fetchDepartmentShortList);
    const [roles, getRoles, { loading, error }] = useFetch(fetchRoles);

    let columns = [
        {
            dataField: 'department',
            text: 'Department',
            formatter: d => `${d?.name}`
        },
        {
            dataField: 'name', text: 'Role Name',
            formatter: name => <span className=''>{name}</span>
        }
    ];

    let action = (
        <div className="flex">
            <Button
                className="mr-2"
                onClick={() => {
                    form.resetFields();
                    setIsModalOpen(true)
                }
                }>{!!i18n && i18n?.t("Add Role")}</Button>
        </div>)

    let actions = ({ _id }) => (
        <button className="btn btn-outline-success btn-sm focus:shadow-none me-2"
            title="View" onClick={() => push(`/admin/hrm/roles/permissions?_id=${_id}`)}>
            <FaPlus />
        </button>
    )


    return (
        <div>
            <section className='bg-white min-h-screen rounded-md p-2'>
                <div className='card_container'>
                    <Table
                        columns={columns}
                        data={roles}
                        noActions={false}
                        action={action}
                        actions={actions}
                        indexed={true}
                        shadow={false}
                        onEdit={(data) => {
                            form.resetFields();
                            form.setFieldsValue({
                                ...data,
                                department: data?.department?._id,
                                categories: data?.categories?.map(d => d._id)
                            });
                            setIsModalOpen(true);
                        }}
                        onDelete={delRole}
                        onReload={getRoles}
                        error={error}
                        loading={loading}
                        pagination
                    />
                </div>
            </section>

            {/* modal */}
            <Modal title="Role Details" destroyOnClose open={isModalOpen} onCancel={() => setIsModalOpen(false)}
                footer={null}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={async (values) => {
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        return useAction(postRole, values, () => {
                            getRoles()
                            setIsModalOpen(false);
                        })
                    }}
                >
                    <HiddenFormItem name="_id" />
                    <FormSelect
                        name="department" label='Select Department'
                        required={true}
                        placeholder={'Select a department'}
                        options={departmentElements?.map(d => ({ label: d.name, value: d._id }))}
                    />
                    <FormInput name="name" label='Role Name' required placeholder={'Please input role name'} />
                    <button className="btn-submit">Submit</button>
                </Form>
            </Modal>
        </div>
    );
};

export default Roles;