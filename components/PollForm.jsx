"use client";
import dynamic from 'next/dynamic';
import { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import { message } from 'antd';


import { useI18n } from "@/context/i18n";
import { useUserContext } from "@/context/user";
import { MdDelete } from "react-icons/md";


import { FaPoll } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import { useAction } from "@/helpers/hooks";
import { postQuestion, uploadSingleFile } from "@/helpers/backend_helper";
import MultipleImageInput from "@/app/(dashboard)/components/forms/multiple_image_input";
const DraftEditor = dynamic(() => import('@/app/(dashboard)/components/forms/text-editor'), { ssr: false });

const PollForm = ({ getData, setFirstModalOpen }) => {
    const i18n = useI18n();
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useUserContext();
    const [loading, setloading] = useState(false)

    const showModal = () => {
        // console.log(user)
        user._id ?
            setIsModalOpen(true)
            :
            message.warning("Please login first!")
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [editorValue, setEditorValue] = useState("");

    const handleFinish = async (values) => {
        setloading(true)
        if (!!values.image) {
            let image = await uploadSingleFile({
                image: values.image[0].originFileObj,
                image_name: 'question_image'
            });
            values.media = image.data
        }

        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useAction(postQuestion, {
            type: 'poll',
            question: values.question,
            media: values?.media,
            user: user?._id,
            options: values?.options.map((option) => {
                return { text: option }
            })

        }
            , () => {
                setloading(false)
                setIsModalOpen(false);
                setFirstModalOpen(false)
                getData()
                form.resetFields();
            });
    }


    return (
        <div>
            <div
                onClick={showModal}
                className="cursor-pointer flex flex-col gap-4 p-2 mb-[30px]  border-2 dark:border-BG_Line_Color border-Light_Line_Color hover:border-[#fd4b5f] dark:!text-white w-full rounded-lg group hover:opacity-90"
            >
                <div className="flex justify-around text-md">
                    <div className="flex gap-2 items-center group-hover:text-[#fd4b5f]">
                        <FaPoll />
                        <p>Create poll?</p>
                    </div>
                </div>
            </div>

            <Modal
                title="Create Poll"
                open={isModalOpen}
                destroyOnClose={true}
                footer={null}
                onCancel={handleCancel}
                className="anserForm"
            >

                <Form
                    form={form}
                    onFinish={handleFinish}
                    layout='vertical'
                >
                    <Form.Item name="question" label="Type your question here">
                        <DraftEditor value={editorValue} onChange={(val) => setEditorValue(val)} />
                    </Form.Item>
                    <MultipleImageInput name='image' />
                    <Form.List
                        name="options"
                        rules={[
                            {
                                validator: async (_, options) => {
                                    if (!options || options.length < 2) {
                                        return Promise.reject(new Error('Please add at least two options'));
                                    }
                                },
                            },
                        ]}
                    >
                        {(fields, { add, remove }, { errors }) => (
                            <>
                                {fields.map((field, index) => (
                                    <Form.Item
                                        label={index === 0 ? 'Answer Options' : ''}
                                        required
                                        key={field.key}
                                    >
                                        <Form.Item
                                            {...field}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={[
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message: "Please input option for your question",
                                                },
                                            ]}
                                            noStyle
                                        >
                                            <Input
                                                placeholder={`option ${index + 1}`}
                                                style={{
                                                    width: '100%',
                                                }}
                                            />
                                        </Form.Item>
                                        {fields.length > 1 ? (
                                            <MdDelete
                                                className="text-[26px] text-red-600 cursor-pointer"
                                                onClick={() => remove(field.name)}
                                            />
                                        ) : null}
                                    </Form.Item>
                                ))}
                                <Form.Item>
                                    <button className="flex gap-2 text-white items-center bg-green-400 px-2 py-1 rounded-md hover:opacity-90 cursor-pointer"
                                        onClick={() => add()}
                                    >
                                        <BiPlus />
                                        Add option
                                    </button>

                                    <Form.ErrorList errors={errors} />
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                    {
                        loading ?
                            <button disabled className="btn-submit">Create poll</button> :
                            <button className="btn-submit">Create poll</button>
                    }
                </Form>
            </Modal>
        </div>
    );
};

export default PollForm;