'use client'
import React, { useEffect } from 'react'
import MultipleImageInput from '@/app/(dashboard)/components/forms/multiple_image_input'
import { Input, Form, Button, Row, Col, message } from 'antd';
import TextArea from 'antd/es/input/TextArea'
import { Card, CardBody } from 'reactstrap'
import FormInput from '@/app/(dashboard)/components/forms/input'
import { useAction, useFetch } from '@/helpers/hooks'
import { fetchAdminSettings, postAdminSettings, uploadSingleFile } from '@/helpers/backend_helper'
import { uploadImage } from '@/helpers/uploadFiles'
import { useI18n } from '@/context/i18n'

const Page = () => {
    const i18n = useI18n()
     // eslint-disable-next-line react-hooks/rules-of-hooks
    const [form] = Form.useForm();
     // eslint-disable-next-line react-hooks/rules-of-hooks
    const [settings, getSettings] = useFetch(fetchAdminSettings);

     // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (settings) {
            form.setFieldsValue({
                ...settings,
                logo:
                    settings?.logo?.length > 0
                        ? [
                              {
                                  uid: '-1',
                                  name: 'image.png',
                                  status: 'done',
                                  url: settings?.logo,
                              },
                          ]
                        : []
            });
        }
    }, [settings]);

  return (
    <div>
        <h1>Update Profile</h1>
        <Form
                    layout='vertical'
                    form={form}
                    onFinish={async (values) => {
                        if (!!values.logo) {
                            let image = await uploadSingleFile({
                                image: values.logo[0].originFileObj,
                                image_name: 'admin_image',
                                _id: values._id
                            });
                            values.logo = image.data
                        }

                        const res = await postAdminSettings(values);
                        if(res?.error === false) {
                            message.success(res?.msg)
                            getSettings();
                        }
                    }}
                >
                    <Row>
                        <Col span={24}>
                            <FormInput name='name' label='Site Name' required />
                        </Col>
                        <Col span={24}>
                            <FormInput name='email' label='Site Email' isEmail required />
                        </Col>
                        <Col span={24}>
                            <FormInput name='phone' label='Site Phone Number' required />
                        </Col>
                        <Col span={24}>
                            <FormInput name='footer' label='Site Footer' required />
                        </Col>
                        
                        <Col span={24}>
                        <MultipleImageInput name='logo' label='Category Image' required />
                        </Col>
                        
                        <Col span={24}>
                            <FormInput name='address' label='Address' textArea required />
                            <FormInput name='description' label='Description' textArea required />
                        </Col>

                    </Row>

                    {/* <Button htmltype='submit'>Submit</Button> */}
                    <button className='btn-submit'>{i18n?.t('Submit')}</button>

                </Form>
        {/* <Form>
            <div className="">
                <h1 className='paragraph_1'>Email</h1>
                <Input name='email' className='!paragraph_1 px-4 py-2 border-none outline-none !border-BG_Line_Color border'></Input>
            </div>
            <div className="py-2">
                <h1 className='paragraph_1'>User name</h1>
                <Input name='name' className='!paragraph_1 px-4 py-2 border-none outline-none !border-BG_Line_Color border'></Input>
            </div>
            <div className="py-2">
                <h1 className='paragraph_1'>About Me</h1>
                <TextArea name='about' className='!paragraph_1 px-4 py-2 border-none outline-none !border-BG_Line_Color border'></TextArea>
            </div>
            <div className="py-2">
                <h1 className='paragraph_1'>Facebook Url</h1>
                <Input type='url' name='facebook' className='!paragraph_1 px-4 py-2 border-none outline-none !border-BG_Line_Color border'></Input>
            </div>
            <div className="py-2">
                <h1 className='paragraph_1'>Twitter Url</h1>
                <Input type='url' name='twitter' className='!paragraph_1 px-4 py-2 border-none outline-none !border-BG_Line_Color border'></Input>
            </div>
            <div className="py-2">
                <h1 className='paragraph_1'>Instagram Url</h1>
                <Input type='url' name='instagram' className='!paragraph_1 px-4 py-2 border-none outline-none !border-BG_Line_Color border'></Input>
            </div>
            <div className="py-2">
                <h1 className='paragraph_1'>Website Link</h1>
                <Input type='url' name='facebook' className='!paragraph_1 px-4 py-2 border-none outline-none !border-BG_Line_Color border'></Input>
            </div>
            <div className="py-2">
                <h1 className='paragraph_1'>Website Link</h1>
                <MultipleImageInput name="logo" />
            </div>
            <Button htmltype='submit' className='hover:bg-Primary_Color !hover:text-white'>Submit</Button>
        </Form> */}
    </div>
  )
}

export default Page