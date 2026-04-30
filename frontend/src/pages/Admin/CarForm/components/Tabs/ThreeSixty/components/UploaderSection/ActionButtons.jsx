import React from 'react';
import { useTranslation } from 'react-i18next';
import { Trash2, Sparkles } from 'lucide-react';

const ActionButtons = ({ sequenceCount, onClear, onProcessAI }) => {
    const { t } = useTranslation('adminCarForm');

    return (
        <div className="mt-auto pt-8 flex flex-col gap-3 relative z-10">
            {sequenceCount > 0 && (
                <button 
                    type="button"
                    onClick={onClear}
                    className="w-full py-4 rounded-full bg-slate-100 dark:bg-[#1c1c1e] text-slate-700 dark:text-white text-[10px] uppercase tracking-[0.15em] font-black border border-transparent dark:border-[#4f4633]/20 hover:bg-slate-200 dark:hover:bg-[#27272a]/80 hover:text-red-500 dark:hover:text-red-400 transition-colors flex items-center justify-center gap-2"
                >
                    <Trash2 className="w-4 h-4" />
                    {t('uploaderBtnClear', 'Xóa Chuỗi Hiện Tại')}
                </button>
            )}
            <button 
                type="button"
                onClick={onProcessAI}
                className="w-full py-4 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-slate-900 text-[10px] uppercase tracking-[0.15em] font-black shadow-lg hover:shadow-yellow-500/30 transition-all hover:scale-[0.98] flex items-center justify-center gap-2"
            >
                <Sparkles className="w-4 h-4" />
                {t('uploaderBtnAI', 'Xử Lý Trí Tuệ Nhân Tạo')}
            </button>
        </div>
    );
};

export default ActionButtons;
