import { Form, Input, Upload, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { Palette, Image as ImageIcon, Plus, Trash2, Upload as UploadIcon } from 'lucide-react';
import { getCarColorRules } from '../../../../schemas/carColorsSchema';
import ColorPickerInput from './ColorPickerInput';

const ColorInputFields = ({ name, restField }) => {
    const { t } = useTranslation('adminCarForm');
    const rules = getCarColorRules(t);
    const form = Form.useFormInstance();

    const handleFileChange = (info, fieldIndex) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} uploaded successfully`);
        }
    };

    const uploadProps = {
        name: 'file',
        maxCount: 1,
        showUploadList: false,
        customRequest: ({ file, onSuccess }) => {
            onSuccess("ok");
        },
    };

    return (
        <div className="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-6 w-full xl:pr-4">
            <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold px-1 block mb-2">{t('colorNameLabel', 'Tên màu sắc')}</label>
                <Form.Item
                    {...restField}
                    name={[name, 'name']}
                    rules={rules.name}
                    className="mb-0 [&_.ant-form-item-explain-error]:text-right"
                    required={false}
                >
                    <Input
                        prefix={<Palette size={18} className="text-yellow-500 mr-2" />}
                        className="w-full !h-[50px] !bg-slate-50 dark:!bg-[#222225] !border-none !rounded-xl !px-4 text-sm font-semibold text-slate-900 dark:text-white focus:!ring-2 focus:!ring-yellow-500/50 transition-all hover:bg-slate-100 dark:hover:bg-[#2a2a2e]"
                        placeholder={t('colorNamePlaceholder', 'VD: Đỏ Thể Thao')}
                    />
                </Form.Item>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold px-1 block mb-2">{t('colorHexLabel', 'Mã HEX')}</label>
                <ColorPickerInput name={name} restField={restField} rules={rules} />
            </div>

            <div className="space-y-2 xl:col-span-2">
                <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold px-1 block mb-2">{t('colorImageLabel', 'Ảnh Render')}</label>
                <Form.Item
                    {...restField}
                    name={[name, 'image']}
                    className="mb-0"
                    required={false}
                    getValueProps={(value) => ({
                        fileList: value ? [
                            typeof value === 'string'
                                ? { uid: '-1', name: value.split('/').pop(), status: 'done', url: value }
                                : value
                        ] : []
                    })}
                    getValueFromEvent={(e) => {
                        if (Array.isArray(e)) return e;
                        return e?.fileList?.[0]?.originFileObj || e?.file;
                    }}
                >
                    <Upload {...uploadProps}>
                        <div className="flex items-center gap-4 w-full h-[50px] bg-slate-50 dark:bg-[#222225] rounded-xl px-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-[#2a2a2e] transition-all border-none">
                            <UploadIcon size={18} className="text-slate-400" />
                            <Form.Item
                                noStyle
                                shouldUpdate={(prevValues, currentValues) => {
                                    const prevColor = prevValues.colors?.[name]?.image;
                                    const currentColor = currentValues.colors?.[name]?.image;
                                    return prevColor !== currentColor;
                                }}
                            >
                                {({ getFieldValue }) => {
                                    const imageValue = getFieldValue(['colors', name, 'image']);
                                    const isFile = imageValue instanceof File || (imageValue && imageValue.originFileObj);
                                    const isUrl = typeof imageValue === 'string';

                                    let displayName = t('uploadColorImage', 'Chọn hoặc tải ảnh lên...');
                                    if (isFile) displayName = imageValue.name || imageValue.originFileObj.name;
                                    else if (isUrl) displayName = imageValue.split('/').pop();

                                    return (
                                        <span className={`text-sm ${imageValue ? 'text-slate-900 dark:text-white font-medium' : 'text-slate-400'}`}>
                                            {displayName}
                                        </span>
                                    );
                                }}
                            </Form.Item>
                        </div>
                    </Upload>
                </Form.Item>
            </div>
        </div>
    );
};

export default ColorInputFields;
