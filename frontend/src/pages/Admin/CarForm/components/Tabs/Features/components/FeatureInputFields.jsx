import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { Sparkles, FileText, Image as ImageIcon } from 'lucide-react';
import { getFeatureRules } from '../schemas/feature.schema';

const FeatureInputFields = ({ name, restField }) => {
    const { t } = useTranslation('adminCarForm');
    const rules = getFeatureRules(t);

    return (
        <div className="space-y-6">
            {/* Feature Title */}
            <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1 mb-2">
                    {t('featureGroupNameLabel', 'Tiêu đề Tính năng (H2)')}
                </label>
                <Form.Item
                    {...restField}
                    name={[name, 'title']}
                    rules={rules.title}
                    className="mb-0 [&_.ant-form-item-explain-error]:text-right"
                >
                    <Input
                        prefix={<Sparkles size={18} className="text-yellow-500 mr-2" />}
                        className="w-full !h-[50px] !bg-slate-50 dark:!bg-[#222225] !border-none !rounded-xl !px-4 text-sm font-bold text-slate-900 dark:text-white focus-within:!ring-2 focus-within:!ring-yellow-500/50 transition-all hover:bg-slate-100 dark:hover:bg-[#2a2a2e]"
                        placeholder={t('featureGroupNamePlaceholder', 'VD: CÔNG NGHỆ ÁNH SÁNG ĐỈNH CAO')}
                    />
                </Form.Item>
            </div>

            {/* Feature Image URL */}
            <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1 mb-2">
                    {t('featureGroupImageLabel', 'Ảnh Đại Diện (URL)')}
                </label>
                <Form.Item
                    {...restField}
                    name={[name, 'image']}
                    rules={rules.image}
                    className="mb-0 [&_.ant-form-item-explain-error]:text-right"
                    required={false}
                >
                    <Input
                        prefix={<ImageIcon size={18} className="text-slate-400 mr-2" />}
                        className="w-full !h-[50px] !bg-slate-50 dark:!bg-[#222225] !border-none !rounded-xl !px-4 text-xs font-mono font-medium text-slate-500 dark:text-slate-400 focus-within:!ring-2 focus-within:!ring-yellow-500/50 transition-all hover:bg-slate-100 dark:hover:bg-[#2a2a2e]"
                        placeholder={t('featureGroupImagePlaceholder', 'VD: https://storage.com/cover.jpg')}
                    />
                </Form.Item>
            </div>

            {/* Feature Description */}
            <div className="space-y-2 relative pt-2">
                <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1 mb-2">
                    {t('featureItemDescLabel', 'Nội dung mô tả (Paragraph)')}
                </label>
                <div className="relative">
                    <FileText size={18} className="absolute left-4 top-[16px] text-yellow-500 pointer-events-none z-10" />
                    <Form.Item
                        {...restField}
                        name={[name, 'desc']}
                        rules={rules.desc}
                        className="mb-0 [&_.ant-form-item-explain-error]:text-right"
                    >
                        <Input.TextArea
                            rows={4}
                            className="w-full !bg-slate-50 dark:!bg-[#222225] !border-none !rounded-xl !p-4 !pl-12 text-sm text-slate-800 dark:text-slate-300 focus:!ring-2 focus:!ring-yellow-500/50 transition-all hover:bg-slate-100 dark:hover:bg-[#2a2a2e] resize-none custom-scrollbar"
                            placeholder={t('featureItemDescPlaceholder', 'Mô tả chi tiết tính năng...')}
                        />
                    </Form.Item>
                </div>
            </div>
        </div>
    );
};

export default FeatureInputFields;
