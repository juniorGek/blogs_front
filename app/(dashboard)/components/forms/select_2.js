import React from "react"
import { Form, Select } from "antd"
import reactElementToJSXString from 'react-element-to-jsx-string';
// import {checkIsItExitInDB} from "./utils";
import { useI18n } from "@/context/i18n";

const FormSelect = ({
    name,
    label,
    initialValue,
    options = [],
    onSelect,
    onChange,
    className,
    optionClassName,
    required = false,
    rules = [],
    search = false,
    isMulti = false,
    placeholder,
    disabled,
    clearable = false,
    extra,
    extraData,
    ...rest
}) => {
    const i18n = useI18n()
    let initRules = [
        { required: required, message: `Please select ${label || 'a option'}` },
    ]

    return (
        <Form.Item
            name={name}
            className={className}
            style={{ pointerEvents: disabled ? 'none' : undefined, cursor: disabled ? 'not-allowed' : undefined }}
            label={!!i18n?.t && label ? i18n?.t(label) : label}
            initialValue={initialValue}
            rules={[...initRules, ...rules]}
            extra={extra}
        >
            <Select
                allowClear={clearable}
                onClear={() => onSelect && onSelect(undefined)}
                size="large"
                placeholder={placeholder} onSelect={onSelect} onChange={onChange}
                mode={isMulti ? 'multiple' : ''}
                filterOption={(input, option) => {
                    if (typeof option.children === 'string') {
                        return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    return reactElementToJSXString(option.children).toLowerCase().indexOf(input.toLowerCase()) >= 0
                }}
                showSearch={search}
            >
                {options?.map((option, index) => (
                    <Select.Option
                        key={index}
                        disabled={option.disabled}
                        value={option?._id || option?.value}
                    // className={!!extraData ? (checkIsItExitInDB(option, extraData) ? optionClassName : '') : ''}
                    >
                        {option.name || option?.label}
                    </Select.Option>
                ))}
            </Select>
        </Form.Item>
    )
}
export default FormSelect