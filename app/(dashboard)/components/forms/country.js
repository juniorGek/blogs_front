import { initI18n } from "@/context/i18n";
import {Form} from "antd";
import {CountryDropdown, RegionDropdown} from "react-country-region-selector";
import ReactFlagsSelect from "react-flags-select";


const CountryInput = ({name = 'country', label = 'Country', setCountry, whitelist, required}) => {
    return (
        <Form.Item
            name={name}
            label={label}
            rules={[
                {required: required, message: "Please provide country"},
            ]}
            className="mb-3"
            initialValue="">
            <CountryDropdown valueType="full" whitelist={whitelist} onChange={val => setCountry && setCountry(val)}
                             className="form-control"/>
        </Form.Item>
    )
}
export default CountryInput

export const CityInput = ({name = 'city', label = 'City', country, onSelect, required}) => {
    return (
        <Form.Item
            name={name}
            label={label}
            rules={[
                {required: required, message: "Please provide country"},
            ]}
            className="mb-3"
            initialValue="">
            <RegionDropdown
                valueType="full"
                country={country}
                onChange={onSelect}
                countryValueType="full"
                className="form-control"/>
        </Form.Item>
    )
}
export const CountryFlagInput = ({name = 'country', label = 'Country', setCountry, whitelist, required}) => {
    const i18n = initI18n()
    return (
        <Form.Item
            name={name}
            label={!!i18n.t ? i18n.t(label) : label}
            rules={[
                {required: required , message: "Please provide country"},
            ]}
            initialValue="">
           <FlatSelect/>
        </Form.Item>
    )
}

const FlatSelect = ({value, onChange}) => {
    return (
        <ReactFlagsSelect
            selected={value}
            searchable
            onSelect={onChange}
        />
    )
}