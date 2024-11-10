"use client"
import Table, { TableImage } from '@/app/(dashboard)/components/common/table';
import FormInput, { HiddenFormItem } from '@/app/(dashboard)/components/forms/input';
import MultipleImageInput from '@/app/(dashboard)/components/forms/multiple_image_input';
import { useI18n } from '@/context/i18n';
import { useSite } from '@/context/site';
import { addSubCategories, delSubCategories, fetchSubCategoriesByCategory, uploadSingleFile } from '@/helpers/backend_helper';
import { useAction, useFetch } from '@/helpers/hooks';
import { uploadImage } from '@/helpers/uploadFiles';
import { Button, Card, Form, message, Modal } from 'antd';
import Head from 'next/head';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';



const CourseSubCategories = () => {
    const site = useSite();
    let { lang, languages } = useI18n()
    const i18n = useI18n();
    const [form] = Form.useForm();
    const searchParams = useSearchParams()
    const id =searchParams.get('_id')
    const [lang2, setLang] = useState('en')

    const [subcategories, getSubcategories, { loading, error }] = useFetch(
        fetchSubCategoriesByCategory,
        { parent: id }
    );
        console.log(subcategories)
    let columns = [
        {
            dataField: 'image',
            text: 'image',
            formatter: (d) => <TableImage url={d} />,
        },
        {
            dataField: 'name',
            text: i18n?.t('category name'),
            formatter: (_, data) => <span className='capitalize'>{data?.name && data?.name[lang]}</span>,
        },
        // {
        //     dataField: 'courses',
        //     text: 'Total Books',
        //     formatter: (courses) => <span className=''>{courses ?? 0}</span>,
        // },
    ];

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
                Add Sub-Category
            </Button>
        </div>
    );

    

    return (
        <section>
            <Head>
                <title>{site?.site_name} | SubCategories</title>
            </Head>
            <Card className={'shadow-sm'}>
                <h1 className={'text-gray-600 text-[16px] font-semibold tracking-wider'}>
                    {!!i18n && i18n?.t(`Subcategories of  ${searchParams.get('name')}` )}
                </h1>
            </Card>
            <div className='card_container'>
                <Table
                    columns={columns}
                    data={subcategories}
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
                    onDelete={delSubCategories}
                    onReload={getSubcategories}
                    error={error}
                    loading={loading}
                    title=' Sub-Categories'
                />
            </div>
            <Modal
                title={i18n?.t('Sub-Categories Details')}
                visible={isModalVisible}
                onCancel={handleCancel}
                destroyOnClose
                footer={null}
                width={569}
            >                < >
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
                                image: values?.image[0]?.originFileObj,
                                image_name: 'subcategory_image',
                                _id: values._id
                            });
                            values.image = image.data
                        }
                        values.parent = id;
                        if (!!values.parent) {

                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            return useAction(addSubCategories, values, () => {
                                getSubcategories();
                                setIsModalVisible(false);
                            });
                        } else {
                            message.warning('Information missing, try again');
                        }
                    }}
                    layout='vertical'
                >
                    <HiddenFormItem name='_id' />
                    {languages?.map((l, index) => (
                        <FormInput
                            name={['name', l.key]}
                            label= {i18n?.t('Sub Category name')}
                            key={index}
                            style={{ display: l.key === lang2 ? 'block' : 'none' }}
                            required={l.code === lang}
                        />
                    ))}
                    <MultipleImageInput name='image' label='Sub-Category Image' max={1} />
                    <FormInput name='description' label='Description' textArea />
                    <button className='btn-submit'>{isEdit ? 'Update' : 'Add Sub-Category'}</button>
                </Form>
            </Modal>
        </section>
    );
};
CourseSubCategories.getLayout = function getLayout(page) {
    // eslint-disable-next-line react/jsx-no-undef
    return <AdminLayout>{page}</AdminLayout>;
};
export default CourseSubCategories;
