import { Form, Input, ColorPicker } from 'antd';
import { useTranslation } from 'react-i18next';
import { useColorPreview } from '../hooks/useColorPreview';

const ColorPickerInput = ({ name, restField, rules }) => {
    const { t } = useTranslation('adminCarForm');
    const form = Form.useFormInstance();
    const { hexColor } = useColorPreview(name);

    return (
        <Form.Item
            {...restField}
            name={[name, 'value']}
            rules={rules.value}
            className="mb-0 [&_.ant-form-item-explain-error]:text-right"
            required={false}
        >
            <Input
                prefix={
                    <div className="mr-3 ml-1 flex items-center">
                        <ColorPicker
                            value={hexColor}
                            onChangeComplete={(color) => {
                                form.setFieldValue(['colors', name, 'value'], color.toHexString().toUpperCase());
                            }}
                            format="hex"
                            size="small"
                            disabledAlpha
                        />
                    </div>
                }
                className="w-full !h-[50px] !bg-slate-50 dark:!bg-[#222225] !border-none !rounded-xl !px-4 text-sm font-mono font-bold uppercase text-slate-900 dark:text-white focus:!ring-2 focus:!ring-yellow-500/50 transition-all hover:bg-slate-100 dark:hover:bg-[#2a2a2e]"
                placeholder={t('colorHexPlaceholder', 'VD: #dc2626')}
            />
        </Form.Item>
    );
};

export default ColorPickerInput;
