"use client"
import Table from '@/app/(dashboard)/components/common/table';
import FormInput, { HiddenFormItem } from '@/app/(dashboard)/components/forms/input';
import { useI18n } from '@/context/i18n';
import { useSite } from '@/context/site';
import { delDepartment, fetchDepartmentList, postDepartment } from '@/helpers/backend_helper';
import { useAction, useFetch } from '@/helpers/hooks';
import { Button, Form, Modal } from 'antd';
import React from 'react';
import { useState } from 'react';

const EmployeeDepartment = () => {
    const site = useSite();
    const i18n = useI18n();
    const [form] = Form.useForm();
    const [departments, getDepartments, { loading, error }] = useFetch(fetchDepartmentList);

    let columns = [
        {
            dataField: 'name', text: 'Name',
            formatter: promo_name => <span className='capitalize'>{promo_name}</span>
        },
    ];

    // modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const handleCancel = () => {
        setIsModalVisible(false);
    }

    let action = (
        <div className="flex">
            <Button
                className="mr-2"
                onClick={() => {
                    form.resetFields();
                    setIsModalVisible(true);
                    setIsEdit(false)
                }}>{!!i18n && i18n?.t("Add Department")}</Button>
        </div>)

    return (
        <main>
            <section className='bg-white min-h-screen rounded-md p-2'>
                <div className='card_container'>
                    <Table
                        columns={columns}
                        data={departments}
                        pagination={true}
                        noActions={false}
                        action={action}
                        indexed={true}
                        shadow={false}
                        onEdit={(data) => {
                            form.resetFields();
                            form.setFieldsValue(data);
                            setIsModalVisible(true);
                            setIsEdit(true)
                        }}
                        onDelete={delDepartment}
                        onReload={getDepartments}
                        error={error}
                        loading={loading}
                    />
                </div>
            </section>

            {/* status updated modal */}
            <Modal title={`${site?.site_name ? site?.site_name : ""} Department`} open={isModalVisible}
                onCancel={handleCancel} destroyOnClose footer={null} width={569}>
                <Form
                    form={form}
                    onFinish={
                        async (values) => {
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            return useAction(postDepartment, values, () => {
                                getDepartments();
                                setIsModalVisible(false);
                            })
                        }
                    }
                    layout='vertical'
                >
                    <HiddenFormItem name="_id" />
                    <FormInput name='name' placeholder='Enter department name' required />

                    <button className="btn-submit">{isEdit ? `${i18n?.t('Update')}` : `${i18n?.t('Add Department')}`}</button>
                </Form>
            </Modal>
        </main>
    );
};

export default EmployeeDepartment;