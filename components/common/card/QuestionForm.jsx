"use client";
import { useState } from "react";
import { Modal, Form } from "antd";
import MultipleImageInput from "@/app/(dashboard)/components/forms/multiple_image_input";
import { message } from 'antd';
import { RiQuestionnaireLine } from "react-icons/ri";
import { useI18n } from "@/context/i18n";
import { useUserContext } from "@/context/user";
import { postQuestion, uploadSingleFile } from "@/helpers/backend_helper";
import { useAction } from "@/helpers/hooks";
import dynamic from "next/dynamic";
import { Loader } from "@/app/(dashboard)/components/common/preloader";
const DraftEditor = dynamic(() => import('@/app/(dashboard)/components/forms/text-editor'), { ssr: false });


const QuestionForm = ({ getData, setFirstModalOpen }) => {
    const i18n = useI18n();
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useUserContext();
    const [loading, setloading] = useState(false)
    const showModal = () => {
        user._id ?
            setIsModalOpen(true) :
            message.warning("Please login first!")
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const [editorValue, setEditorValue] = useState("");

    return (
        <div>
            <div
                onClick={showModal}
                className="cursor-pointer flex flex-col gap-4 p-2 mb-[30px]  border-2 dark:border-BG_Line_Color border-Light_Line_Color hover:border-[#fd4b5f] dark:!text-white w-full rounded-lg group hover:opacity-90"
            >
                <div className="flex justify-around text-md">
                    <div className="flex gap-2 items-center group-hover:text-[#fd4b5f]">
                        <RiQuestionnaireLine />
                        <p>
                            {i18n?.t('Ask a question')}?
                        </p>
                    </div>
                </div>
            </div>

            <Modal
                title={i18n?.t('Ask a question')}
                open={isModalOpen}
                destroyOnClose={true}
                footer={null}
                onCancel={handleCancel}
                className="anserForm"
            >

                {
                    DraftEditor ?
                        <Form
                            form={form}
                            onFinish={async (values) => {
                                setloading(true)
                                values.user = user._id

                                if (!!values.image) {
                                    let image = await uploadSingleFile({
                                        image: values.image[0].originFileObj,
                                        image_name: 'question_image'
                                    });
                                    values.media = image.data
                                }
                                // eslint-disable-next-line react-hooks/rules-of-hooks
                                return useAction(postQuestion, {
                                    type: 'question',
                                    question: values.question,
                                    user: values.user,
                                    media: values.media
                                }
                                    , () => {
                                        setloading(false)
                                        setIsModalOpen(false);
                                        setFirstModalOpen(false);
                                        getData()
                                        form.resetFields();
                                    });
                            }}
                            layout='vertical'
                        >

                            <Form.Item name="question" >
                                <DraftEditor value={editorValue} onChange={(val) => setEditorValue(val)} />
                            </Form.Item>
                            <label className="font-bold mb-2" htmlFor="image">
                                {i18n?.t('Upload an image here')}(optional)
                            </label>
                            <MultipleImageInput name='image' />


                            {
                                loading ?
                                    <button disabled className="btn-submit">Ask</button> :
                                    <button className="btn-submit">Ask</button>
                            }
                        </Form> :
                        <div className="flex justify-center items-center h-[300px]">
                            <Loader />
                        </div>
                }
            </Modal>
        </div>
    );
};

export default QuestionForm;