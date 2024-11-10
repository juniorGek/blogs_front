"use client"
import { Button, Form, message } from 'antd';
import { Col, Row } from 'antd';
import FormInput from '@/app/(dashboard)/components/forms/input';
import React, { useEffect, useState } from 'react';
import { useFetch, useAction } from '@/helpers/hooks';

import MultipleImageInput from '@/app/(dashboard)/components/forms/multiple_image_input';
import { fetchAdminSettings, postAdminSettings, removeFile, uploadSingleFile } from '@/helpers/backend_helper';
import ImageInput from '@/app/(dashboard)/components/forms/images_input';
import { FiTrash } from 'react-icons/fi';
import axios from 'axios';
import { useI18n } from '@/context/i18n';



const SiteSettings = () => {
  const i18n = useI18n();
  let { lang, languages } = useI18n()
  const [lang2, setLang] = useState('en')


  const [form] = Form.useForm();
  const [settings, getSettings] = useFetch(fetchAdminSettings);

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
    <>
      <div className={"rounded bg-white p-4"}>
        <Form
          layout="vertical"
          form={form}
          onFinish={async (values) => {
            if (!!values.logo) {
              await removeFile({
                file: settings?.logo,
              });
              let image = await uploadSingleFile({
                image: values.logo[0].originFileObj,
                image_name: values.logo[0].name || "logo",
                _id: settings?._id
              });
              values.logo = image?.data;
            }
            const confi = {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            };
            const res = await axios.post(
              process.env.backend_url + "api" + "/settings",
              values,
              confi
            );
            if (res?.status === 200) {
              message.success(i18n?.t("Settings updated successfully"));
              getSettings();
              form.resetFields();
            }

            // return useAction(postAdminSettings, values, () => {
            //     getSettings();
            //     form.resetFields()
            // });
          }}
        >
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
          <Row>
            <Col span={24}>
              <FormInput name="name" label={i18n?.t("Site Name")} required placeholder={i18n?.t("Enter your site name")} />

            </Col>
            <Col span={24}>
              <FormInput name="email" label={i18n?.t("Site Email")} isEmail required placeholder={i18n?.t("Enter your site email")} />
            </Col>
            <Col span={24}>
              <FormInput name="phone" label={i18n?.t("Site Phone Number")} required placeholder={i18n?.t("Enter your site phone number")} />
            </Col>
            <Col span={24}>
              <FormInput name="footer" label={i18n?.t("Site Footer")} required placeholder={i18n?.t("Enter your site footer")} />
            </Col>
            <Col span={24}>
              <MultipleImageInput name="logo" label={i18n?.t("Logo")} />
            </Col>
            <Col span={24}>
              {/* <FormInput name="city" label={i18n?.t("City")} required placeholder={i18n?.t("Enter your city")} /> */}
              {languages?.map((l, index) => (
                <FormInput
                  name={['city', l.key]}
                  label={i18n?.t("City")}
                  key={index}
                  placeholder={i18n?.t("Enter your city")}
                  style={{ display: l.key === lang2 ? 'block' : 'none' }}
                  required={l.code === lang}
                />
              ))}
              {languages?.map((l, index) => (
                <FormInput
                  name={['address', l.key]}
                  label={i18n?.t("Address")}
                  key={index}
                  placeholder={i18n?.t("Enter your address")}
                  style={{ display: l.key === lang2 ? 'block' : 'none' }}
                  required={l.code === lang}
                />
              ))}
              {/* <FormInput name="address" label={i18n?.t("Address")} required placeholder={i18n?.t("Enter your address")} /> */}
              <FormInput name="map_link" label={i18n?.t("Map Link")} required placeholder={i18n?.t("Enter your map link")} />

              {/* <FormInput
                name="description"
                label={i18n?.t("Description")}
                placeholder={i18n?.t("Enter your site description")}
                textArea
                required
              /> */}

              {languages?.map((l, index) => (
                <FormInput
                  name={['description', l.key]}
                  label={i18n?.t("Description")}
                  key={index}
                  placeholder={i18n?.t("Enter your site description")}
                  style={{ display: l.key === lang2 ? 'block' : 'none' }}
                  required={l.code === lang}
                />
              ))}

              {/* <FormInput
                name="contact_page_description"
                label={i18n?.t("Contact Page Description")}
                placeholder={i18n?.t("Enter your contact page description")}
                textArea
                required
              /> */}
              {languages?.map((l, index) => (
                <FormInput
                  name={['contact_page_description', l.key]}
                  label={i18n?.t("Contact Page Description")}
                  key={index}
                  placeholder={i18n?.t("Enter your contact page description")}
                  style={{ display: l.key === lang2 ? 'block' : 'none' }}
                  required={l.code === lang}
                />
              ))}

              {/* <FormInput
                name="about_page_description"
                label={i18n?.t("About Page Description")}
                placeholder={i18n?.t("Enter your about page description")}
                textArea
                required
              /> */}
              {languages?.map((l, index) => (
                <FormInput
                  name={['about_page_description', l.key]}
                  label={i18n?.t("About Page Description")}
                  key={index}
                  placeholder={i18n?.t("Enter your about page description")}
                  style={{ display: l.key === lang2 ? 'block' : 'none' }}
                  required={l.code === lang}
                />
              ))}
            </Col>
          </Row>

          {/* social link */}
          <div className="px-10 py-5">
            <Row className="mb-3">
              <Col xs={24}>
                <p className="text-xl font-bold text-Primary_Color">
                  {i18n?.t('Stay Connected Section')}
                </p>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col xs={24}>
                <FormInput
                  name={["stay_connected", "twitter"]}
                  placeholder={i18n?.t("Enter your twitter followers number")}
                  label={i18n?.t("Number of Twitter Followers")}
                />
              </Col>
              <Col xs={24}>
                <FormInput
                  name={["stay_connected", "facebook"]}
                  placeholder={i18n?.t("Enter your facebook followers number")}
                  label={i18n?.t("Number of Facebook Followers")}
                />
              </Col>
              <Col xs={24}>
                <FormInput
                  name={["stay_connected", "linkedin"]}
                  placeholder={i18n?.t("Enter your linkedin followers number")}
                  label={i18n?.t("Number of Linkedin Followers")}
                />
              </Col>
              <Col xs={24}>
                <FormInput
                  name={["stay_connected", "instagram"]}
                  placeholder={i18n?.t("Enter your instagram followers number")}
                  label={i18n?.t("Number of Instagram Followers")}
                />
              </Col>
            </Row>
          </div>

          {/* social link */}
          <div className="px-10 py-5">
            <Row className="mb-3">
              <Col xs={24}>
                <p className="text-xl font-bold text-Primary_Color">
                  {i18n?.t('Footer Social Links Section')}
                </p>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col xs={24}>
                <FormInput
                  name={["social_media_link", "facebook"]}
                  placeholder={i18n?.t("Enter your facebook link")}
                  label={i18n?.t("Facebook Link")}
                />
              </Col>
              <Col xs={24}>
                <FormInput
                  name={["social_media_link", "twitter"]}
                  placeholder={i18n?.t("Enter your twitter link")}
                  label={i18n?.t("Twitter Link")}
                />
              </Col>
              <Col xs={24}>
                <FormInput
                  name={["social_media_link", "instagram"]}
                  placeholder={i18n?.t("Enter your instagram link")}
                  label={i18n?.t("Instagram Link")}
                />
              </Col>
              <Col xs={24}>
                <FormInput
                  name={["social_media_link", "linkedin"]}
                  placeholder={i18n?.t("Enter your linkedin link")}
                  label={i18n?.t("Linkedin Link")}
                />
              </Col>
              <Col xs={24}>
                <FormInput
                  name={["social_media_link", "youtube"]}
                  placeholder={i18n?.t("Enter your youtube link")}
                  label={i18n?.t("Youtube Link")}
                />
              </Col>
              <Col xs={24}>
                <FormInput
                  name={["social_media_link", "whatsapp"]}
                  placeholder={i18n?.t("Enter your whatsapp number")}
                  label={i18n?.t("Whatsapp Number")}
                />
              </Col>
            </Row>
          </div>

          {/* <Button htmltype="submit">{i18n?.t("Submit")}</Button> */}
          <button className='btn-submit'>{i18n?.t('Submit')}</button>

        </Form>
      </div>
    </>
  );
};

SiteSettings.getLayout = function getLayout(page) {
  // eslint-disable-next-line react/jsx-no-undef
  return <AdminLayout>{page}</AdminLayout>;
};

export default SiteSettings;
