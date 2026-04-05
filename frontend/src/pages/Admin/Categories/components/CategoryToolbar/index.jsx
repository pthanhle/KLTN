import React from 'react';
import { Search, Rows } from 'lucide-react';

export const CategoryToolbar = ({ searchTerm, onSearch, t }) => {
    return (
        <div className="flex justify-between items-center mb-8 relative z-10 w-full">
            <h2 className="text-xl font-bold flex items-center gap-3 text-slate-900 dark:text-white">
                <Rows className="text-yellow-600 dark:text-yellow-500" size={24} />
                {t('adminCategories:titleList', 'Danh Sách Phân Loại')}
            </h2>

            <div className="flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
                <div className="w-full md:w-80 bg-white dark:bg-white/10 rounded-full h-11 px-5 flex items-center gap-3 border border-slate-200 dark:border-[#9b8f79]/15 shadow-sm transition-all focus-within:ring-2 focus-within:ring-yellow-500/30 focus-within:border-yellow-500">
                    <Search size={18} className="text-slate-400 shrink-0" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => onSearch(e.target.value)}
                        placeholder={t('adminCategories:placeholderSearch', 'Tìm kiếm danh mục...')}
                        className="bg-transparent border-none focus:ring-0 text-sm w-full text-slate-800 dark:text-white placeholder-slate-400 outline-none"
                    />
                </div>
            </div>
        </div>
    );
};
