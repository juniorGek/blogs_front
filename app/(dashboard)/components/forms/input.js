import { useI18n } from "@/context/i18n";
import {Form} from "antd";
import {Input, Label} from "reactstrap";

const FormInput = ({name, label, required, isEmail, rules = [], textArea, style, initialValue, ...props}) => {
    const i18n = useI18n()
    const t = d => d

    let initRules = [
        {required: required, message: `${i18n?.t('Please provide')} ${typeof label === 'string' && label?.toLowerCase() || 'a value'}`},
    ]
    if(isEmail === true) {
        initRules.push({type: 'email', message: t('Please enter a valid email address')})
    }

    const getInput = () => {
        if(textArea) {
            return <textarea
                className="form-control"
                {...props}
            />
        }

        return <Input
            className="form-control"
            {...props}
            value={initialValue || ''}
        />
    }

    return (
        <Form.Item
            label={label}
            name={name}
            className="mb-3"
            rules={[...initRules, ...rules]}
            style={style}
            initialValue={initialValue || ""}
        >
            {getInput()}
        </Form.Item>
    )
}

export default FormInput

export const HiddenFormItem = ({name, initialValue = ''}) => {
    return (
        <Form.Item name={name} initialValue={initialValue} hidden>
            <input/>
        </Form.Item>
    )
}
