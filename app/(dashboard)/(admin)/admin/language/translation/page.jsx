'use client'

import { useI18n } from '@/context/i18n';
import { fetchTranslations, postTranslations } from '@/helpers/backend_helper';
import { useAction, useFetch } from '@/helpers/hooks';
import { translations } from '@/helpers/translations';
import { Button, Form } from 'antd';
import React, { useEffect } from 'react';

const AddTranslationPage = () => {
    const i18n = useI18n()
    const [form] = Form.useForm()
    const [languages, getLanguages] = useFetch(fetchTranslations);

    useEffect(() => {
        if (languages?.length > 0) {
            form.setFieldsValue(languages?.filter(d => d.flag !== 'US').reduce((acc, lang) => {
                acc[lang._id] = lang.translation
                return acc
            }, {}))
        }
    }, [languages]);

    return (
        <>
            <div className="bg-white p-4 rounded-sm shadow-sm overflow-x-auto" >
                <div className="overflow-x-auto">
                    <Form form={form} onFinish={values => {
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        return useAction(postTranslations, values, () => {
                            getLanguages()
                        })
                    }}>

                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-xl font-semibold">Add Translation</h1>
                        </div>

                        <table className="table-auto w-full mb-2">
                            <thead className="text-xs font-semibold uppercase bg-gray-50 text-gray-500">
                                <tr>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">English</div>
                                    </th>
                                    {languages?.filter(d => d.flag !== 'US').map((language, index) => (
                                        <th className="p-2 whitespace-nowrap" key={index}>
                                            <div className="font-semibold text-left">{language?.name}</div>
                                        </th>))}
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100">
                                {translations()?.map((translation, index) => (<tr key={index} >
                                    <td className="p-2 whitespace-nowrap text-gray-500">{translation}</td>
                                    {languages?.filter(d => d.flag !== 'US').map((language, index) => (
                                        <th className="p-2 whitespace-nowrap" key={index}>
                                            <div className="font-semibold text-left">
                                                <Form.Item className="mb-0" name={[language._id, translation]}>
                                                    <input
                                                        className="hover:outline-none focus:outline-none hover:border-blue-600"
                                                        placeholder="Write Translation" />
                                                </Form.Item>
                                            </div>
                                        </th>))}
                                </tr>))}
                            </tbody>
                        </table>
                        <button className="btn-submit">{i18n?.t('Submit')}</button>
                    </Form>
                </div>
            </div>
        </>
    );
};



export default AddTranslationPage;