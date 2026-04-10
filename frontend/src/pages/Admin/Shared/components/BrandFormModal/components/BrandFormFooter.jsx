export const BrandFormFooter = ({ onClose, isEditing, t }) => {
    return (
        <div className="p-8 pb-6 flex items-center gap-4 bg-slate-50/50 dark:bg-[#141416] mt-2 rounded-b-[32px]">
            <button 
                type="button"
                onClick={onClose}
                className="flex-[1] h-14 rounded-full text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[11px] hover:bg-slate-100 dark:hover:bg-white/5 transition-all outline-none"
            >
                {t('common:cancel', 'Hủy bỏ')}
            </button>
            <button 
                type="submit"
                className="flex-[2] h-14 rounded-full bg-gradient-to-br from-[#eab308] to-[#ffd165] dark:from-[#eab308] dark:to-[#facc15] text-[#251a00] font-black uppercase tracking-[0.15em] text-[11px] shadow-lg shadow-yellow-500/20 hover:scale-[1.02] active:scale-95 transition-all outline-none"
            >
                {isEditing ? t('common:save', 'LƯU Thay Đổi') : t('common:create', 'LƯU THƯƠNG HIỆU')}
            </button>
        </div>
    );
};
