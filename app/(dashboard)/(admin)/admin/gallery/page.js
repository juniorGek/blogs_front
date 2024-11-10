"use client"

import Breadcrumb from "../../../components/common/breadcums";
import { Card } from "reactstrap";
// import Button from "../../../components/common/button";
import { FiArrowLeft, FiCopy, FiDownload, FiInfo, FiMoreVertical, FiSearch, FiTrash } from "react-icons/fi";
import { useState } from "react";
import { Button, Dropdown, Form, message, Modal, notification, Upload } from "antd";
import { BiImages } from "react-icons/bi";
import { delImage, fetchImages, postImages, sendMultipleFile, uploadMultipleFile, uploadSingleFile } from "@/helpers/backend_helper";
// import { handleImageUploadCompression } from "../../../helpers/utils";
import { useAction, useActionConfirm, useFetch } from "@/helpers/hooks";
import { showLoader, hideLoader } from "@/app/(dashboard)/components/common/preloader";
import FormInput, { HiddenFormItem } from "@/app/(dashboard)/components/forms/input";
import { useI18n } from "@/context/i18n";
import Pagination from "@/components/common/pagination";
import axios from "axios";

const Gallery = () => {
    const i18n = useI18n()
    const [show, setShow] = useState(false)
    const [files, getFiles] = useFetch(fetchImages)
    const [upload, setUpload] = useState([])
    const [renameCount, setRenameCount] = useState(0)
    const [renameCountKay, setRenameCountKey] = useState()
    const [renameValue, setRenameValue] = useState()


    const [form] = Form.useForm()
    const [file, setFile] = useState(null)

    const handleFileRename = (e) => {
        setRenameValue(e.target.value)
    }

    return (
        <>
            {/* <Breadcrumb item="Gallery"/> */}
            <Card>
                <div className="title pb-0 d-flex justify-content-between">
                    <div>
                        <h5 style={{ display: show ? 'none' : 'block' }}>{i18n?.t("Gallery")}</h5>
                        <Button
                            className="mb-2.5 flex items-center bg-Primary_Color text-white"
                            style={{ display: show ? 'flex' : 'none' }}
                            onClick={() => setShow(false)}>
                            <FiArrowLeft size={14} className="me-1" style={{ marginBottom: 2 }} />
                            {i18n?.t("Back")}
                        </Button>

                    </div>
                    <div style={{ display: show ? 'none' : 'flex' }}>
                        {/* <div className="position-relative mb-2.5 me-2">
                            <input className="form-control form-control-sm text-gray-500 rounded-1 mb-0"
                                placeholder="Search"
                                onChange={(e) => {
                                    getFiles({ search: e.target.value, page: 1 })
                                }}
                                style={{ width: 220, paddingLeft: 30 }} />
                            <FiSearch className="position-absolute" color="#adb5bd" style={{ top: 10, left: 10 }} />
                        </div> */}
                        <Button className="mb-2.5" onClick={() => setShow(true)}>Upload</Button>
                    </div>

                </div>
                <div className="body">
                    <div className="overflow-x-hidden overflow-y-auto slim-scroll"
                        style={{ display: show ? 'none' : 'block' }}>
                        <div className="row p-2">
                            {files?.docs?.map((file, index) => (
                                <div className="col-sm-2 col-md-4 col-lg-3 col-xl-2" key={index}>
                                    <div className="gallery-card">
                                        <div className="options">
                                            <Dropdown menu={{
                                                items: [
                                                    {
                                                        key: '2',
                                                        label: i18n?.t("Download"),
                                                        icon: <FiDownload />,
                                                        onClick: () => {
                                                            // downloadImage(file.image, file.name)
                                                            window.open(file.image, '_blank')
                                                        }
                                                    },
                                                    {
                                                        key: '3',
                                                        label: i18n?.t("Copy Link"),
                                                        icon: <FiCopy />,
                                                        onClick: () => {
                                                            navigator.clipboard.writeText(file.image)
                                                            notification.success({ message: 'Link copied to clipboard' })
                                                        }
                                                    },
                                                    {
                                                        key: '5',
                                                        label: i18n?.t("Delete"),
                                                        icon: <FiTrash />,
                                                        className: 'text-danger',
                                                        onClick: () => {
                                                            // eslint-disable-next-line react-hooks/rules-of-hooks
                                                            return useActionConfirm(delImage, {
                                                                _id: file._id,
                                                                image: file.image
                                                            }, () => {
                                                                getFiles()
                                                            }, 'Are you sure you want to delete this file?', 'Yes, Delete')
                                                        }
                                                    },
                                                ]
                                            }}
                                                overlayStyle={{ width: 180, borderRadius: 4 }}
                                                placement="bottomRight">
                                                <FiMoreVertical role="button" />
                                            </Dropdown>
                                        </div>
                                        <div className="image">
                                            <img src={file.image} alt="" />
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='mt-1 border-t pt-3'>
                            <Pagination
                                total={files?.totalDocs}
                                page={files?.page}
                                limit={files?.limit || 12}
                                totalPages={files?.totalPages}
                                onPageChange={(page) => {
                                    getFiles({ page })
                                }}
                                onSizeChange={(limit) => {
                                    getFiles({ limit })
                                }}
                            />
                        </div>

                    </div>


                    <div className="py-2" style={{ display: show ? 'block' : 'none' }}>
                        <Upload.Dragger
                            name="file"
                            style={{ borderRadius: 4 }}
                            fileList={upload}
                            beforeUpload={file => {
                                if (file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/gif' && file.type !== 'image/svg') {
                                    message.error(`${file.name} is not a image file`);
                                    return Upload.LIST_IGNORE
                                }
                                return false
                            }}
                            onChange={({ fileList }) => {
                                setUpload(fileList)
                            }}
                            multiple={true}
                        >
                            <div className="d-flex justify-content-center align-items-center" style={{ height: 300 }}>
                                <div>
                                    <p className="ant-upload-drag-icon">
                                        <BiImages size={48} />
                                    </p>
                                    <p className="ant-upload-text">Click or drag image to this area to upload</p>
                                </div>
                            </div>
                        </Upload.Dragger>
                        {upload?.length > 0 && (
                            <Button variant="primary" className="mt-3" onClick={async () => {
                                try {
                                    let newArray = []
                                    let files = upload?.length > 1 ? upload?.map((item) => item.originFileObj) : upload[0]?.originFileObj
                                    console.log(files)

                                    if (typeof files === 'object') {
                                        showLoader()
                                        const { error, data } = await uploadSingleFile({
                                            image: files,
                                            name: files.name || 'galleries'
                                        })
                                        console.log(data)
                                        if (error === false) {
                                            let { error, message } = await postImages({
                                                image: data,
                                                name: data?.split('/').pop() || 'galleries'
                                            }, {})
                                            hideLoader()
                                            if (error === false) {
                                                setUpload([])
                                                getFiles()
                                                setShow(false)
                                                notification.success({ message: 'Success', description: message || 'Successfully uploaded' })
                                            } else {
                                                notification.error({ message: 'Error', description: message || 'Something went wrong' })
                                            }
                                        }
                                    }

                                    if (files.length > 1) {
                                        const formData = new FormData();

                                        files.forEach((item) => formData.append("images", item))
                                        formData.append("image_name", "galleries");
                                        showLoader()
                                        await axios.post(`${process.env.backend_url}api/file/multiple-image-aws`, formData, {
                                            headers: {
                                                "Content-Type": "multipart/form-data",
                                                "Authorization": `Bearer ${localStorage.getItem("token")}`
                                            }
                                        }).then(
                                            async (response) => {
                                                console.log(response)
                                                response?.data?.data?.forEach((item) => {
                                                    newArray.push({
                                                        image: item,
                                                        name: item.split('/').pop()
                                                    })
                                                })
                                                console.log("newArray", newArray)
                                                let { error, message } = await postImages(newArray, {})
                                                hideLoader()
                                                if (error === false) {
                                                    setUpload([])
                                                    getFiles()
                                                    setShow(false)
                                                    notification.success({ message: 'Success', description: message || 'Successfully uploaded' })
                                                } else {
                                                    notification.error({ message: 'Error', description: message || 'Something went wrong' })
                                                }
                                            }
                                        )
                                    }
                                } catch (e) {
                                    hideLoader()
                                    notification.error({ message: 'Error', description: 'Something went wrong' })
                                }
                            }}>Upload</Button>
                        )}
                    </div>
                </div>
            </Card>
        </>
    )
}

export default Gallery


function downloadImage(url, name) {
    fetch(url)
        .then(resp => resp.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = name;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(() => alert('Invalid File'));
}