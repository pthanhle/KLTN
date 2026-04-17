import { Form, Image, Upload } from 'antd';
import { useTranslation } from 'react-i18next';
import { ImagePlus, Edit2 } from 'lucide-react';
import { useMediaLibrary } from '../../MediaLibrary/hooks/useMediaLibrary';

const CoverPreviewCard = () => {
    const { t } = useTranslation('adminCarForm');
    const { heroImage, handleSetHeroImage } = useMediaLibrary();

    const uploadProps = {
        name: 'file',
        multiple: false,
        showUploadList: false,
        customRequest: ({ file, onSuccess }) => {
            handleSetHeroImage(file);
            onSuccess("ok");
        }
    };

    return (
        <div className="bg-white dark:bg-[#141416] rounded-xl p-8 shadow-sm dark:shadow-[0_15px_30px_rgba(0,0,0,0.2)] border border-slate-200 dark:border-white/5">
            <label className="block text-[11px] uppercase tracking-widest text-slate-500 font-black mb-6">{t('coverImageHeading', 'Ảnh Bìa Đại Diện')}</label>
            <Form.Item className="mb-0">
                <Upload {...uploadProps} className="w-full block" style={{ width: '100%' }}>
                    <div className="relative group overflow-hidden rounded-2xl bg-slate-50 dark:bg-white/5 h-64 w-full flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-white/10 hover:border-yellow-500 dark:hover:border-yellow-500/50 transition-all hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer">
                        {heroImage ? (
                            <>
                                <img 
                                    src={heroImage} 
                                    alt="Cover Preview" 
                                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full text-slate-900 font-bold text-xs shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                        <Edit2 size={14} />
                                        {t('changeImage', 'Thay đổi ảnh')}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <Image
                                    preview={false}
                                    alt="Cover profile placeholder"
                                    className="absolute inset-0 object-cover opacity-10 dark:opacity-[0.15] group-hover:opacity-20 dark:group-hover:opacity-[0.25] transition-opacity grayscale group-hover:grayscale-0"
                                    style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKCxD9iXhJuS9XfA0BA1KtoyooKvQub2ckwpYEZQZQGhpwX6w5UbgIwe5xMhahT1BgvZwPekvppCda2HB3pq9J49ZN4e-695lHdEyqaPQ_Igo9wfp40M9IRHQ5NGXJwSffUjynv9VjfgDIKsNeBqahrM_mHPfmSd1G-zTHa9Udhr__lUGmqVo1htGL2AUaNLgWhXQQd2yGzI6r7RRPelbTSOt7sijRgJNra_nIqfmihxxRxtbqqWmSH2R9lVKCRsOx2503G9BeqY8"
                                />
                                <div className="relative z-10 flex flex-col items-center group-hover:-translate-y-2 transition-transform duration-300">
                                    <div className="w-14 h-14 bg-white dark:bg-[#23293c] rounded-full shadow-md flex items-center justify-center mb-4 text-slate-400 dark:text-slate-300 group-hover:text-yellow-500 dark:group-hover:text-yellow-500 transition-colors">
                                        <ImagePlus size={24} />
                                    </div>
                                    <span className="text-[12px] uppercase tracking-widest font-black text-slate-800 dark:text-white mb-1 shadow-sm">{t('uploadLbl', 'Nhấn để Tải ảnh lên')}</span>
                                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">{t('uploadDesc', 'Khuyến nghị 1920x1080')}</span>
                                </div>
                            </>
                        )}
                    </div>
                </Upload>
            </Form.Item>
        </div>
    );
};

export default CoverPreviewCard;