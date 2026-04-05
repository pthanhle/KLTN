import { Form, Upload } from 'antd';
import { Upload as UploadIcon } from 'lucide-react';

export const BrandLogoDragger = ({ t }) => {
    return (
        <Form.Item 
            name="image" 
            label={<span className="block text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 mb-1">{t('adminBrands:labelLogo', 'Logo Hãng')}</span>}
            className="m-0"
        >
            <Upload.Dragger 
                name="files" 
                action="/upload.do" 
                maxCount={1}
                className="group relative flex flex-col items-center justify-center w-full h-48 rounded-[24px] border-2 border-dashed border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] hover:bg-yellow-500/5 dark:hover:bg-yellow-500/10 hover:border-yellow-500/40 dark:hover:border-yellow-500/50 transition-all cursor-pointer overflow-hidden [&_.ant-upload]:!p-0 [&_.ant-upload]:!bg-transparent"
            >
                <div className="relative flex flex-col items-center justify-center w-full h-full p-8">
                    <div className="w-14 h-14 rounded-full bg-white dark:bg-white/10 shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-yellow-500 dark:group-hover:bg-yellow-500 transition-all">
                        <UploadIcon className="text-yellow-500 dark:text-yellow-400 group-hover:text-white dark:group-hover:text-slate-900" size={24} strokeWidth={2.5} />
                    </div>
                    <span className="text-sm font-bold text-[#0c1324] dark:text-white mb-1 block">
                        {t('adminBrands:uploadText', 'Kéo thả ảnh Logo vào đây')}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-medium block">
                        {t('adminBrands:uploadHint', 'Hỗ trợ định dạng .PNG, .JPG')}
                    </span>
                </div>
            </Upload.Dragger>
        </Form.Item>
    );
};
