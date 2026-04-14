import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { Palette, Image as ImageIcon, Sliders, Trash2 } from 'lucide-react';
import { getCarColorRules } from '../../../../schemas/carColorsSchema';
import ColorPickerInput from './ColorPickerInput';

const ColorInputFields = ({ name, restField }) => {
    const { t } = useTranslation('adminCarForm');
    const rules = getCarColorRules(t);

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

            <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold px-1 block mb-2">{t('colorImageLabel', 'Ảnh Render (URL)')}</label>
                <Form.Item
                    {...restField}
                    name={[name, 'image']}
                    className="mb-0 [&_.ant-form-item-explain-error]:text-right"
                    required={false}
                >
                    <Input
                        prefix={<ImageIcon size={18} className="text-slate-400 mr-2" />}
                        className="w-full !h-[50px] !bg-slate-50 dark:!bg-[#222225] !border-none !rounded-xl !px-4 text-sm font-medium text-slate-900 dark:text-white focus:!ring-2 focus:!ring-yellow-500/50 transition-all hover:bg-slate-100 dark:hover:bg-[#2a2a2e]"
                        placeholder={t('colorImagePlaceholder', 'VD: https://storage.com/red_car.png')}
                    />
                </Form.Item>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold px-1 block mb-2">{t('colorFilterLabel', 'CSS Filter')}</label>
                <Form.Item
                    {...restField}
                    name={[name, 'filterStyle']}
                    className="mb-0 [&_.ant-form-item-explain-error]:text-right"
                    required={false}
                >
                    <Input
                        prefix={<Sliders size={18} className="text-slate-400 mr-2" />}
                        className="w-full !h-[50px] !bg-slate-50 dark:!bg-[#222225] !border-none !rounded-xl !px-4 text-sm font-mono font-medium text-slate-900 dark:text-white focus:!ring-2 focus:!ring-yellow-500/50 transition-all hover:bg-slate-100 dark:hover:bg-[#2a2a2e]"
                        placeholder={t('colorFilterPlaceholder', 'VD: hue-rotate(45deg)')}
                    />
                </Form.Item>
            </div>
        </div>
    );
};

export default ColorInputFields;
