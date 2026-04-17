import { Loader2, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const BuilderHeader = ({ handleSaveDraft, handlePublish, isSubmitting }) => {
    const { t } = useTranslation('adminCarForm');
    const navigate = useNavigate();

    return (
        <header className="w-full bg-transparent flex-shrink-0 z-10 relative pt-8 pb-4">
            <div className="w-full max-w-[1600px] mx-auto px-6 md:px-10 xl:px-12 flex justify-between items-center">
                <div className="flex items-center gap-5">
                    <button onClick={() => navigate('/admin/cars', { replace: true })} className="hidden md:flex p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors hover:bg-slate-200/50 dark:hover:bg-[#191f31] rounded-lg cursor-pointer border border-transparent">
                        <ArrowLeft size={20} />
                    </button>
                    <div className="flex flex-col">
                        <div className="flex items-baseline gap-4">
                            <h2 className="text-[22px] font-black text-slate-800 dark:text-white tracking-tight m-0 leading-none">{t('createNewVehicle', 'Khởi Tạo Mẫu Xe')}</h2>
                            <span className="px-2.5 py-1 rounded-md bg-yellow-100/50 dark:bg-yellow-500/10 text-[10px] font-bold uppercase tracking-wider text-yellow-700 dark:text-premium-gold leading-none">{t('draftStatus', 'Bản Nháp')}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                <button 
                    type="button"
                    onClick={handleSaveDraft}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 dark:bg-[#191f31] text-slate-600 dark:text-slate-300 text-[13px] font-bold hover:bg-slate-200 dark:hover:bg-[#2e3447] transition-all border border-transparent cursor-pointer shadow-sm disabled:opacity-50"
                >
                    {isSubmitting && <Loader2 size={14} className="animate-spin" />}
                    {t('saveDraftBtn', 'Lưu Nháp')}
                </button>
                <button 
                    type="button"
                    onClick={handlePublish}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-8 py-3 rounded-xl bg-slate-900 dark:bg-gradient-to-r dark:from-[#eab308] dark:to-[#ffd165] text-white dark:text-slate-900 text-[13px] font-black tracking-wide shadow-xl shadow-slate-900/10 dark:shadow-yellow-500/10 active:scale-95 transition-all cursor-pointer border-none disabled:opacity-50"
                >
                    {isSubmitting && <Loader2 size={14} className="animate-spin" />}
                    {t('publishBtn', 'Xuất Bản')}
                </button>
            </div>
            </div>
        </header>
    );
};

export default BuilderHeader;
