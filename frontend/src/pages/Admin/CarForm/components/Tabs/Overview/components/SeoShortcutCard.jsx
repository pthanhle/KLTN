import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const { TextArea } = Input;

const SeoShortcutCard = () => {
    const { t } = useTranslation('adminCarForm');

    return (
        <div className="bg-white dark:bg-[#141416] rounded-xl p-8 shadow-sm dark:shadow-[0_15px_30px_rgba(0,0,0,0.2)] border border-slate-200 dark:border-white/5">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-white/5 shadow-inner-sm flex items-center justify-center text-yellow-500 border border-slate-200/50 dark:border-white/5">
                    <Globe size={22} className="opacity-80" />
                </div>
                <div>
                    <h4 className="text-base font-black tracking-tight text-slate-900 dark:text-white uppercase">{t('seoHeading', 'Cấu hình SEO')}</h4>
                    <p className="text-[12px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">{t('seoSubtext', 'Tối ưu hóa hiển thị trên các công cụ tìm kiếm.')}</p>
                </div>
            </div>
            
            <div className="space-y-5">
                <Form.Item name="metaTitle" className="mb-0">
                    <Input 
                        className="w-full !bg-slate-50 dark:!bg-white/5 !border-none !rounded-xl !px-6 !py-4 font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:!ring-2 focus:!ring-yellow-500/30 transition-all hover:!bg-slate-100 dark:hover:!bg-white/10" 
                        placeholder={t('metaTitlePlaceholder', 'Meta Title')} 
                    />
                </Form.Item>
                <Form.Item name="metaDescription" className="mb-0">
                    <TextArea 
                        className="w-full !bg-slate-50 dark:!bg-white/5 !border-none !rounded-xl !px-6 !py-4 font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:!ring-2 focus:!ring-yellow-500/30 transition-all hover:!bg-slate-100 dark:hover:!bg-white/10 custom-scrollbar min-h-[100px]" 
                        placeholder={t('metaDescPlaceholder', 'Meta Description')} 
                        autoSize={{ minRows: 3, maxRows: 6 }}
                    />
                </Form.Item>
            </div>
        </div>
    );
};

export default SeoShortcutCard;
