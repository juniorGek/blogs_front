"use client"

import {Checkbox, Form, message, Modal, notification, Tabs, Upload} from 'antd'
import {useEffect, useRef, useState} from "react";
import { useFetch } from '@/helpers/hooks';
// import {fetchFiles, postFiles} from "@/helpers/backend_helper";
import {BiImages} from "react-icons/bi";
import Button from "../common/button";
import {hideLoader, showLoader} from "../common/preloader";
import {FiSearch, FiXCircle} from "react-icons/fi";
import Pagination from "../common/pagination";
import {AiOutlineCheckCircle} from "react-icons/ai";

const FormImage = ({name, label, max = 1, seller, disabled, ...rest}) => {
    const [files, getFiles] = useFetch(seller ? fetchSellerFiles : fetchFiles, {per_page: 12})
    const [visible, setVisible] = useState(false)


    const [tab, setTab] = useState('gallery')
    const [upload, setUpload] = useState([])
    const [showSelected, setShowSelected] = useState(false)


    const onChangeRef = useRef()
    const [selected, setSelected] = useState([])
    const onChange = onChangeRef.current || (() => {
        console.log('onChange is not defined')
    })

    let images = showSelected ? selected : files?.data

    const handleClick = (file) => {
        let find = selected?.find(d => d.id === file.id)
        if (find) {
            onChange(selected?.filter(d => d.id !== file.id))
        } else {
            if (selected?.length >= max) {
                message.error(`You can select maximum ${max} file`)
            } else {
                onChange([...(selected || []), file])
            }
        }
    }




    const Input = ({value, onChange}) => {
        onChangeRef.current = onChange
        useEffect(() => {
            setSelected(value)
        }, [value])

        return (
            <>
                <div className="form-control form-image" role="button" onClick={() => !disabled && setVisible(true)}
                     style={{opacity: disabled ? 0.6 : 1}}>
                    <span>Browse</span>
                    <span>{value?.length > 0 ? `${value?.length} file selected` : 'Select file'}</span>
                </div>
                <div className="d-flex flex-wrap my-2">
                    {value?.map((file, index) => (
                        <div className="p-4 position-relative" style={{height: 140}} key={index}>
                            <FiXCircle
                                role="button"
                                onClick={() => onChange(value?.filter(d => d.id !== file.id))}
                                className="position-absolute shadow-lg text-danger"
                                style={{right: 8, top: 8}} size={20}/>
                            <img style={{maxHeight: '100%', width: 'auto'}} src={file.path} alt=""/>
                        </div>
                    ))}
                </div>
            </>
        )
    }

    return (
        <>
            <Form.Item name={name} label={label} className="mb-2" initialValue={[]}>
                <Input/>
            </Form.Item>
            <Modal open={visible} onCancel={() => setVisible(false)} title={null} width={1200} footer={null}>
                <Tabs activeKey={tab} onChange={setTab}>
                    <Tabs.TabPane tab="Gallery" key="gallery">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <div>
                                <Checkbox
                                    checked={showSelected}
                                    onChange={e => setShowSelected(e.target.checked)}>
                                    Show Selected Only
                                </Checkbox>
                            </div>
                            <div className="position-relative mb-2.5 me-2">
                                <input className="form-control form-control-sm text-gray-500 rounded-1 mb-0"
                                       placeholder="Search"
                                       onChange={(e) => {
                                           getFiles({search: e.target.value, page: 1})
                                       }}
                                       style={{width: 220, paddingLeft: 30}}/>
                                <FiSearch className="position-absolute" color="#adb5bd"
                                          style={{top: 10, left: 10}}/>
                            </div>
                        </div>
                        <div className="row p-2">
                            {images?.map((file, index) => (
                                <div className="col-sm-2 col-md-4 col-lg-3 col-xl-2" key={index}>
                                    <div className="gallery-card" role="button" onClick={() => handleClick(file)}>
                                        <div className="options">
                                            {selected?.find(d => d.id === file.id) &&
                                                <AiOutlineCheckCircle size={20} className="text-primary"/>}
                                        </div>
                                        <div className="image">
                                            <img src={file.path} alt=""/>
                                        </div>
                                        <div className="title">{file.name}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {images?.length === 0 && (
                            <div className="d-flex justify-content-center align-items-center"
                                 style={{height: 300}}>
                                <div className="text-center">
                                    <p className="ant-upload-drag-icon">
                                        <BiImages size={48}/>
                                    </p>
                                    <p className="ant-upload-text">No image found</p>
                                </div>
                            </div>
                        )}
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <div style={{display: showSelected ? 'none' : 'block'}}>
                                    <Pagination
                                        showLeftTab={false}
                                        total={files?.total}
                                        page={files?.current_page}
                                        limit={files?.per_page}
                                        totalPages={files?.last_page}
                                        onPageChange={(page) => {
                                            getFiles({page})
                                        }}
                                    />
                                </div>
                            </div>
                            <Button variant="primary" onClick={() => {
                                setVisible(false)
                            }}>Add Files</Button>
                        </div>

                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Upload" key="upload">
                        <div className="py-3">
                            <Upload.Dragger
                                name="file"
                                style={{borderRadius: 4}}
                                fileList={upload}
                                beforeUpload={file => {
                                    if (file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/gif' && file.type !== 'image/svg') {
                                        message.error(`${file.name} is not a image file`);
                                        return Upload.LIST_IGNORE
                                    }
                                    return false
                                }}
                                onChange={({fileList}) => {
                                    setUpload(fileList)
                                }}
                                multiple={true}
                            >
                                <div className="d-flex justify-content-center align-items-center"
                                     style={{height: 300}}>
                                    <div>
                                        <p className="ant-upload-drag-icon">
                                            <BiImages size={48}/>
                                        </p>
                                        <p className="ant-upload-text">Click or drag image to this area to
                                            upload</p>
                                    </div>
                                </div>
                            </Upload.Dragger>
                            {upload?.length > 0 && (
                                <Button variant="primary" className="mt-3" onClick={async () => {
                                    try {
                                        let galleries = upload?.map(d => d.originFileObj)
                                        showLoader()
                                        let func = seller ? postSellerFiles : postFiles
                                        let {success, message} = await func({galleries}, {
                                            headers: {
                                                'Content-Type': 'multipart/form-data'
                                            }
                                        })
                                        hideLoader()
                                        if (success === true) {
                                            setUpload([])
                                            getFiles()
                                            setTab('gallery')
                                            notification.success({
                                                message: 'Success',
                                                description: message || 'Successfully uploaded'
                                            })
                                        } else {
                                            notification.success({
                                                message: 'Error',
                                                description: message || 'Something went wrong'
                                            })
                                        }
                                    } catch (e) {
                                        hideLoader()
                                        notification.success({
                                            message: 'Error',
                                            description: 'Something went wrong'
                                        })
                                    }
                                }}>Upload</Button>
                            )}
                        </div>
                    </Tabs.TabPane>
                </Tabs>

            </Modal>
        </>
    )
}

export default FormImage