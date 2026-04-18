import { Form, Input, Upload, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { Sparkles, FileText, Image as ImageIcon, Upload as UploadIcon, X } from 'lucide-react';
import { getFeatureRules } from '../schemas/feature.schema';

const FeatureInputFields = ({ name, restField }) => {
    const { t } = useTranslation('adminCarForm');
    const rules = getFeatureRules(t);

    const normFile = (e) => {
        if (Array.isArray(e)) return e;
        return e?.fileList;
    };

    return (
        <div className="space-y-6">
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

            <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold ml-1 mb-2">
                    {t('featureGroupImageLabel', 'Ảnh Đại Diện (Upload)')}
                </label>
                <Form.Item
                    {...restField}
                    name={[name, 'image']}
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    className="mb-0"
                >
                    <Upload
                        listType="picture-card"
                        maxCount={1}
                        beforeUpload={() => false}
                        className="feature-image-upload [&_.ant-upload]:!w-full [&_.ant-upload]:!h-32 [&_.ant-upload]:!bg-slate-50 dark:[&_.ant-upload]:!bg-[#222225] [&_.ant-upload]:!border-dashed [&_.ant-upload]:!border-slate-200 dark:[&_.ant-upload]:!border-white/10 [&_.ant-upload]:!rounded-2xl [&_.ant-upload-list-item-container]:!w-full [&_.ant-upload-list-item-container]:!h-32"
                    >
                        <div className="flex flex-col items-center gap-2">
                            <UploadIcon size={24} className="text-slate-400" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                {t('uploadFeatureImg', 'Click hoặc kéo thả ảnh')}
                            </span>
                        </div>
                    </Upload>
                </Form.Item>
            </div>

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
