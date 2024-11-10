"use client"
import Table from '@/app/(dashboard)/components/common/table';
import FormInput, { HiddenFormItem } from '@/app/(dashboard)/components/forms/input';
import FormSelect from '@/app/(dashboard)/components/forms/select_2';
import { useI18n } from '@/context/i18n';
import { useSite } from '@/context/site';
import { deleteUserAPI, fetchDepartmentOrCategoryWise, fetchDepartmentShortList, fetchEmployee, fetchRole, postEmployee, updateUserByAdmin } from '@/helpers/backend_helper';
import { useAction, useActionConfirm, useFetch } from '@/helpers/hooks';
import { Button, DatePicker, Form, Modal, Switch } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';

const Employee = () => {
    const site = useSite();
    const i18n = useI18n();
    const [form] = Form.useForm();
    const [employees, getEmployees, { loading, error }] = useFetch(fetchEmployee);
    const [departmentElements, getDepartmentElements] = useFetch(fetchDepartmentShortList);
    // const [ticketDepartment, getTicketDepartment] = useFetch(fetchTicketDepartments);
    // const [ticketCategories, getTicketCategories] = useFetch(fetchTicketDepartments, {}, false);
    // const [ticketTypes, getTicketTypes] = useFetch(fetchTicketTypes);
    const [roles, getRoles] = useFetch(fetchDepartmentOrCategoryWise);
    const [role, getRole] = useFetch(fetchRole);
    const [ticketDepartmentId, setTicketDepartmentId] = useState('');

    let columns = [
        {
            dataField: 'key', text: 'Employee ID',
            formatter: key => <span className=''>{key}</span>
        },
        {
            dataField: 'name', text: 'Name',
            formatter: (name, data) => <span className='capitalize'>{data?.first_name + " " + data?.last_name}</span>
        },
        {
            dataField: 'email', text: 'Email',
            formatter: email => <span className=''>{email}</span>
        },
        // {
        //     dataField: 'phone', text: 'Phone',
        //     formatter: phone => <span className='capitalize'>{phone}</span>
        // },
        {
            dataField: 'department', text: 'Department',
            formatter: department => <span className='capitalize'>{department?.name}</span>
        },
        {
            dataField: 'permission', text: 'Role Type',
            formatter: permission => <span className='capitalize'>{permission?.name}</span>
        },
        {
            dataField: 'joining_date', text: 'Joining Date',
            formatter: joining_date => <span className='capitalize'>{
                dayjs(joining_date).format("DD MMM YYYY")
            }
            </span>
        },
        {
            dataField: 'verified', text: 'Verified',
            formatter: (verified, data) => (<div className=''>
                <span>{verified ? "Yes" : 'No'}</span>
            </div>)
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
                                getEmployees()
                            )
                        } else {
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            useActionConfirm(updateUserByAdmin, { _id: data?._id, active: "true" }, () =>
                                getEmployees()
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
    ];

    // modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const handleCancel = () => {
        setIsModalVisible(false);
    }

    let action = (
        <div className='flex'>
            <Button
                className='mr-2'
                onClick={() => {
                    getRole()
                    form.resetFields();
                    setIsModalVisible(true);
                    setIsEdit(false)
                }}>{!!i18n && i18n?.t("Add Employee")}
            </Button>
        </div>
    )


    return (
        <main>
            <section className='bg-white min-h-screen rounded-md p-2'>
                <div className='card_container'>
                    <Table
                        columns={columns}
                        data={employees}
                        pagination={true}
                        noActions={false}
                        action={action}
                        indexed={true}
                        shadow={false}
                        onEdit={(data) => {
                            form.resetFields();
                            form.setFieldsValue({
                                ...data,
                                first_name: data?.first_name,
                                last_name: data?.last_name,
                                department: data?.department?._id,
                                permission: data.permission._id,
                                joining_date: dayjs(data?.joining_date),
                            });
                            setIsModalVisible(true);
                            setIsEdit(true)
                            getRoles({ department: data?.department?._id })
                        }}
                        onDelete={deleteUserAPI}
                        onReload={getEmployees}
                        error={error}
                        loading={loading}
                    />
                </div>
            </section>

            {/* status updated modal */}
            <Modal title={!!i18n && i18n?.t("Employee Details")} open={isModalVisible} onCancel={handleCancel} destroyOnClose
                footer={null} width={569}>
                <Form
                    form={form}
                    onFinish={async (values) => {
                        values.role = "employee";
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        return useAction(postEmployee, values, () => {
                            getEmployees();
                            setIsModalVisible(false);
                        })
                    }}
                    layout='vertical'
                >
                    <HiddenFormItem name="_id" />
                    <Row>
                        <Col>
                            <FormInput name='first_name' placeholder='Enter first name' label='First Name' required />
                        </Col>
                        <Col>
                            <FormInput name='last_name' placeholder='Enter last name' label='Last Name' required />
                        </Col>
                    </Row>
                    {/* <PhoneNumberInput
                        name='phone' placeholder='Enter phone number' label='Phone' required
                    /> */}
                    <Row>
                        <Col md={6}>
                            <FormInput name='email' type='email' placeholder='Enter email' label='Email' required />
                        </Col>
                        <Col md={6}>
                            <Form.Item name='joining_date' label='Joining Data' rules={[{ required: true }]}>
                                <DatePicker style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <FormInput name='password' type='password' placeholder='Input strong password'
                                label='Password' required={isEdit === false} />
                        </Col>
                        <Col md={6}>
                            <FormInput
                                name='confirm_password'
                                type='password'
                                placeholder='Confirm password'
                                label='Confirm Password'
                                rules={[
                                    {
                                        required: isEdit === false,
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue("password") === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject("Incorrect Password!")
                                        }
                                    })
                                ]}
                                hasFeedback
                            />
                        </Col>
                    </Row>
                    <Row>
                        {
                            isEdit === true &&
                            <Col md={12}>
                                <FormInput name='key' placeholder='Auto' label='Employee Id' disabledDate readOnly />
                            </Col>
                        }
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormSelect
                                name="department" label='Select Department'
                                required={true}
                                placeholder={'Select a department'}
                                options={departmentElements}
                                onSelect={e => {
                                    getRoles({ department: e })
                                }}
                                clearable
                            />
                        </Col>
                        <Col md={6}>
                            <FormSelect
                                name="permission"
                                label='Designation'
                                placeholder='Select permission type'
                                options={roles?.docs}
                                required={true}
                                clearable
                                onSelect={e => {
                                    getRole({ _id: e })
                                }}
                            />
                        </Col>
                    </Row>
                    {
                        role?.name === "support" &&
                        <div>
                            <Row>
                                <Col md={6}>
                                    <FormSelect
                                        name="ticket_departments" label='Ticket Department'
                                        required={true}
                                        placeholder={'Select a department'}
                                        options={ticketDepartment?.docs}
                                        onSelect={e => {
                                            setTicketDepartmentId(e)
                                            getTicketCategories({ category: true, parent: e })
                                        }}
                                        clearable
                                    />
                                </Col>
                                <Col md={6}>
                                    <FormSelect
                                        name="ticket_categories"
                                        label='Ticket Categories'
                                        placeholder='Select ticket categories'
                                        options={ticketCategories?.docs}
                                        required={true}
                                        clearable
                                        onSelect={e => {
                                            getTicketTypes({ department: ticketDepartmentId, category: e })
                                        }}
                                    />
                                </Col>
                            </Row>
                            <FormSelect
                                name="ticket_types"
                                label='Ticket Types'
                                placeholder='Select ticket types'
                                options={ticketTypes?.docs}
                                required={true}
                                clearable
                                isMulti={true}
                            />
                        </div>
                    }
                    <button className='btn-submit' >{isEdit ? !!i18n && i18n?.t("Update") : !!i18n && i18n?.t("Add Employee")}</button>
                </Form>
            </Modal>
        </main>
    );
};

export default Employee;