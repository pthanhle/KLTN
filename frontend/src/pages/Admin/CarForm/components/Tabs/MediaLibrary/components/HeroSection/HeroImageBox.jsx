import React from 'react';
import { useTranslation } from 'react-i18next';
import { Star, Edit2, Trash2 } from 'lucide-react';
import { Image, Skeleton, Upload } from 'antd';
import { useMediaLibrary } from '../../hooks/useMediaLibrary';
import HeroImageDropzone from './HeroImageDropzone';

const HeroImageBox = () => {
    const { t } = useTranslation('adminCarForm');
    const { heroImage, handleSetHeroImage, handleRemoveHeroImage } = useMediaLibrary();

    return (
        <div className="col-span-12 lg:col-span-4">
            <div className="bg-white dark:bg-[#141416] rounded-[32px] p-8 border border-slate-100 dark:border-white/5 shadow-sm sticky top-8">
                <div className="flex items-center gap-2 mb-6 px-1">
                    <span className="w-1.5 h-4 bg-yellow-500 rounded-full"></span>
                    <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                        {t('mediaHeroTitle', 'Ảnh Đại Diện (Hero)')}
                    </h3>
                </div>

                {heroImage && (
                    <div className="relative group aspect-[4/3] rounded-[32px] overflow-hidden bg-white dark:bg-[#141416] border border-slate-200/60 dark:border-white/5 shadow-2xl shadow-slate-200/50 dark:shadow-none">
                        <Image
                            rootClassName="w-full h-full"
                            alt="Hero Car"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            src={heroImage}
                            preview={false}
                            placeholder={<Skeleton.Image active className="w-full h-full flex items-center justify-center scale-[3.0]" />}
                        />

                        {/* Premium Badge */}
                        <div className="absolute top-6 left-6 z-10 pointer-events-none">
                            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/30">
                                <Star className="w-[14px] h-[14px] text-slate-900 fill-current" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">{t('mediaHeroActiveBadge', 'Hero Active')}</span>
                            </div>
                        </div>

                        {/* Professional Edit Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4 backdrop-blur-[2px] pointer-events-none">
                            <Upload
                                name="file"
                                showUploadList={false}
                                customRequest={({ file, onSuccess }) => {
                                    handleSetHeroImage(file);
                                    onSuccess("ok");
                                }}
                            >
                                <button
                                    type="button"
                                    className="flex items-center justify-center gap-3 w-40 py-3 bg-white text-slate-900 rounded-2xl font-bold text-sm hover:bg-yellow-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 pointer-events-auto"
                                >
                                    <Edit2 size={18} />
                                    {t('mediaHeroChangeBtn', 'Thay đổi ảnh')}
                                </button>
                            </Upload>
                            <button
                                type="button"
                                onClick={handleRemoveHeroImage}
                                className="flex items-center justify-center gap-3 w-40 py-3 border border-white/30 text-white rounded-2xl font-bold text-sm hover:bg-red-500 hover:border-red-500 transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 delay-75 pointer-events-auto"
                            >
                                <Trash2 size={18} />
                                {t('mediaHeroDeleteBtn', 'Xóa ảnh')}
                            </button>
                        </div>
                    </div>
                )}

                <HeroImageDropzone />
            </div>
        </div>
    );
};

export default HeroImageBox;
