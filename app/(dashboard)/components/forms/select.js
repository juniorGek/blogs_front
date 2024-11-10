import {Form, Select} from "antd";

const FormSelect = ({label, name, required, initialValue, options, search, rules = [], multi, tags, placeholder, onSelect, onChange, allowClear}) => {

    let initRules = [
        {required: required, message: `Please select ${label || 'a option'}`},
    ]

    return (
        <Form.Item
            label={label}
            name={name}
            className="mb-3"
            rules={[...initRules, ...rules]}
            initialValue={initialValue}
        >
            <Select
                mode={multi ? 'multiple' : tags ? 'tags' : 'default'}
                popupClassName={tags ? 'd-none' : ''}
                allowClear={allowClear}
                onSelect={onSelect}
                onChange={onChange}
                placeholder={placeholder}
                filterOption={(input, option) => {
                    if (typeof option.children === 'string') {
                        return option.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    return 0
                }}
                showSearch={search}
            >
                {options?.map((option, index) => (
                    <Select.Option key={index} disabled={option.disabled} value={option?.id || option?.value}>{option.name || option?.label}</Select.Option>
                ))}
            </Select>
        </Form.Item>

    )
}

export default FormSelect



export const LangSelector = ({lang, setLang, languages}) => {
    return (
        <div className="d-flex flex-wrap gap-3">
            {languages?.map((l, index) => (
                <div
                    onClick={() => setLang(l?.code)}
                    style={{
                        fontSize: 13,
                        color: l?.code === lang ? '#564ab1' : '#74788d',
                    }}
                    role="button"
                    key={index}>
                    {l?.name}
                </div>
            ))}
        </div>
    )
}


export const SelectorTab = ({value, setValue, options}) => {
    return (
        <div className="d-flex flex-wrap gap-2">
            {options?.map((l, index) => (
                <div
                    onClick={() => setValue(l?.value)}
                    className={"btn btn-sm " + (l?.value === value ? "btn-primary" : "btn-outline-primary")}
                    role="button"
                    key={index}>
                    {l?.label}
                </div>
            ))}
        </div>
    )
}


export const LangSelectorTab = ({lang, setLang, languages}) => {
    return (
        <div className="d-flex flex-wrap gap-2">
            {languages?.map((l, index) => (
                <div
                    onClick={() => setLang(l?.code)}
                    className={"btn btn-sm " + (l?.code === lang ? "btn-primary" : "btn-outline-primary")}
                    role="button"
                    key={index}>
                    {l?.name}
                </div>
            ))}
        </div>
    )
}