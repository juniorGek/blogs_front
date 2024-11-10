'use client';

import Table from "../../../components/common/table.js";
import { CountryFlagInput } from '@/app/(dashboard)/components/forms/country';
import { HiddenFormItem } from '@/app/(dashboard)/components/forms/input';
import FormSelect from '@/app/(dashboard)/components/forms/select';
import { useI18n } from '../../../../../context/i18n';
import { delLanguage, fetchAllLanguages, postLanguage } from '@/helpers/backend_helper';
import { useAction, useFetch } from '@/helpers/hooks';
import { languages } from '@/helpers/utils';
import { Button, Checkbox, Form, Modal, Switch } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Flag from 'react-world-flags'

const LanguageSettings = () => {

    const router = useRouter();
    const i18n = useI18n();
    const [languageSettings, getLanguageSettings] = useFetch(fetchAllLanguages);
    const [form] = Form.useForm();
    const [check, setCheck] = useState(false);
    const [open, setOpen] = useState(false);


    const handleSubmit = async (values) => {
        values.name = languages?.find(d => d.value === values.code)?.label;

        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useAction(postLanguage, values, () => {
            getLanguageSettings()
            setOpen(false)
        })
    }

    return (
        <>
            {/* <PageTitle title={!!i18n && i18n?.t("Languages")}/> */}
            <Table
                title={i18n?.t('Language Settings')} //empty space string to avoid both title and search bar
                indexed
                data={languageSettings}
                onReload={getLanguageSettings}
                columns={
                    [
                        {
                            dataField: "name",
                            text: i18n?.t("Language"),
                            formatter: (d, dd) => <span> <Flag className="h-4 mr-2 inline-block" code={dd.flag} /> {d}</span>
                        },
                        {
                            dataField: "active",
                            text: i18n?.t("Active"),
                            formatter: (d, dd) => (
                                <Switch
                                    className="text-black bg-[#505d69] !rounded-full"
                                    checked={d}
                                    onChange={(value) => handleSubmit({
                                        _id: dd._id, active: value
                                    })} />
                            )
                        },
                        {
                            dataField: "default",
                            text: i18n?.t("Default"),
                            formatter: (d, dd) => (
                                <Switch
                                    className="text-black bg-[#505d69] !rounded-full"
                                    checked={d}
                                    onChange={(value) => handleSubmit({
                                        _id: dd._id, default: value
                                    })} />
                            )
                        },
                    ]
                }
                onDelete={delLanguage}
                onEdit={values => {
                    form.resetFields();
                    form.setFieldsValue(values);
                    setOpen(true);
                }}

                action={
                    <div className={'flex gap-3'}>
                        <Button
                            onClick={() => router.push('/admin/language/translation')}>
                            {i18n?.t('Translation')}
                        </Button>

                        <Button onClick={() => {
                            form.resetFields();
                            form.setFieldsValue({
                                _id: languageSettings?._id,
                            });
                            setOpen(true)
                        }}>
                            {i18n?.t('Add Language')}
                        </Button>
                    </div>
                }
            />

            <Modal open={open} onCancel={() => setOpen(false)} footer={null} title={i18n?.t('Add Language')}>
                <Form form={form} layout="vertical" className="mt-4" onFinish={(values) => handleSubmit(values)}>
                    <HiddenFormItem name="_id" />
                    <FormSelect required name="code" label={i18n?.t('Language')} options={languages} search placeholder={'Select a language'} />
                    <CountryFlagInput required name="flag" label={i18n?.t('Country')} />
                    <Form.Item name="rtl" initialValue={false} valuePropName="checked">
                        <Checkbox> RTL support</Checkbox>
                    </Form.Item>
                    {/* <Button htmltype="submit">
                        {i18n?.t('Submit')}
                    </Button> */}
                    <button className='btn-submit'>{i18n?.t('Submit')}</button>

                </Form>
            </Modal>
        </>
    );
};


LanguageSettings.getLayout = function getLayout(page) {
    // eslint-disable-next-line react/jsx-no-undef
    return <AdminLayout>{page}</AdminLayout>;
};
export default LanguageSettings;