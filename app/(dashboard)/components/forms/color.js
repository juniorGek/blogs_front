import {ColorPicker, Form} from "antd";

const FormColor = ({name, label}) => {
    return (
        <Form.Item
            name={name}
            label={label}
            initialValue="#049049"
        >
            <ColorPicker
                presets={[
                    {
                        label: 'Recommended',
                        colors: [
                            '#FFFFFF',
                            '#0F3460',
                            '#049049',
                            '#FAEF8A',
                            '#9A8544',
                            '#CAAF98',
                            '#FB9D2F',
                            '#BEAD74',
                            '#75AE55',
                            '#00000012',
                            '#0000000A',
                            '#00000005',
                            '#F5222D',
                            '#FA8C16',
                            '#FADB14',
                            '#8BBB11',
                            '#52C41A',
                        ],
                    }
                ]}
            />
        </Form.Item>

    )
}

export default FormColor