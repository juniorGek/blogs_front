import React, { useState } from "react"
import { Form, Select, Radio, DatePicker, Space } from "antd"



const onOk = (value) => {
    console.log('onOk: ', value);
};

const onChange = (date, dateString) => {
    console.log(date, dateString);
};

const FormMultiTextSelect = ({
    name,
    label,
    initialValue,
    onChange,
    options
}) => {




    return (
        <Form.Item
            name={name}
            label={label}
            initialValue={initialValue}
        >
            <Select

                mode="multiple"
                style={{
                    width: '100%',
                }}
                tokenSeparators={[',']}
                options={options || null}
            />
        </Form.Item>

    )
}
export default FormMultiTextSelect

