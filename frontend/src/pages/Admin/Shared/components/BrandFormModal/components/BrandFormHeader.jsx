import { Tag, X } from 'lucide-react';

export const BrandFormHeader = ({ isEditing, onClose, t }) => {
    return (
        <div className="px-8 pt-8 pb-6 flex items-center justify-between border-b border-transparent dark:border-white/5">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-yellow-500/10 dark:bg-yellow-500/20 flex items-center justify-center">
                    <Tag className="text-yellow-600 dark:text-yellow-500 fill-yellow-600/20 dark:fill-yellow-500/20" size={20} />
                </div>
                <h2 className="text-xl font-extrabold text-[#0c1324] dark:text-white tracking-tight">
                    {isEditing ? t('adminBrands:editTitle', 'Cập Nhật Thiết Lập Hãng') : t('adminBrands:createTitle', 'Thêm Mới Thương Hiệu')}
                </h2>
            </div>
            <button 
                onClick={onClose}
                type="button"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-red-500 hover:text-slate-800 dark:hover:text-white transition-all outline-none"
            >
                <X size={20} strokeWidth={2.5} />
            </button>
        </div>
    );
};
