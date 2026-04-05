export const CategoryFormFooter = ({ onClose, isEditing, t }) => {
    return (
        <footer className="p-8 pt-4 pb-6 mt-4 flex items-center gap-4 bg-slate-50/50 dark:bg-slate-900/40 rounded-b-[32px]">
            <button 
                type="button" 
                onClick={onClose}
                className="flex-[1] py-4 rounded-full text-[11px] font-black uppercase tracking-[0.15em] text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-800 dark:hover:text-white transition-colors active:scale-95 outline-none"
            >
                {t('common:cancel', 'Hủy thao tác')}
            </button>
            <button 
                type="submit"
                className="w-[60%] py-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full text-slate-950 text-[12px] font-black uppercase tracking-[0.2em] shadow-xl shadow-yellow-500/20 active:scale-95 transition-all outline-none"
            >
                {isEditing ? t('common:save', 'LƯU DANH MỤC') : t('common:create', 'LƯU DANH MỤC')}
            </button>
        </footer>
    );
};
