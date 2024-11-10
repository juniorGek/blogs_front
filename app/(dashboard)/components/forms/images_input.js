import React, {useEffect, useState} from "react"
import ImgCrop from 'antd-img-crop';
import {Upload} from "antd";

const ImageInput = ({value, onChange=()=>{}, max = 1, aspect = 1, isCrop = false, onRemove}) => {
    const [fileList, setFileList] = useState([])

    const handleChange = ({fileList}) => {
        setFileList(fileList)
        let files = fileList.map(file => file.url || file.originFileObj)
        onChange(max === 1 ? files[0] : files)
    }

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    useEffect(() => {
        if (typeof value === "string" && value.length > 0) {
            setFileList([{
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: value,
            }])
        }
        if (Array.isArray(value)) {
            const updated = value.find(image => typeof image !== "string")
            if (!updated) {
                setFileList(value.map((image, index) => ({
                    uid: '-' + (index + 1),
                    name: 'image' + index + '.png',
                    status: 'done',
                    url: image,
                })))
            }
        }
    }, [value])


    return (
        <>
            {
                isCrop ?
                    <ImgCrop aspect={aspect} showReset rotationSlider aspectSlider fillColor={'none'} quality={1}>
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={onPreview}
                            onChange={handleChange}
                            onRemove={onRemove}
                        >
                            {fileList.length < max && '+ Upload'}
                        </Upload>
                    </ImgCrop>
                    :
                    <Upload
                        fillColor={'none'}
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={onPreview}
                        onChange={handleChange}
                        onRemove={onRemove}
                    >
                        {fileList.length < max && '+ Upload'}
                    </Upload>
            }
        </>
    )

}

export default ImageInput