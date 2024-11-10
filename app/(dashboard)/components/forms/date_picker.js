import React, {useState} from "react"
import {Form, DatePicker, Tooltip} from "antd"

const onOk = (value) => {
    console.log('onOk: ', value);
};

const onChange = (date, dateString) => {
    console.log(date, dateString);
};

const FormDatePicker = ({name, label, initialValue, onChange, placeholder, extra, disabled=false, tooltip=''}) => {

    return (
        <Form.Item
            name={name}
            label={label}
            initialValue={initialValue || ''}
            placeholder={placeholder}
            extra={extra && extra}
        >
            <DatePicker title={disabled && tooltip} disabled={disabled} showTime onOk={onChange} className={'form-control'}/>
        </Form.Item>
    )
}
export default FormDatePicker




