import React from 'react';
import { Search } from 'lucide-react';

const SearchInput = ({ searchTerm, setSearchTerm, t }) => {
    return (
        <div className="relative w-full md:flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('adminServiceItems:search_placeholder', 'Tìm kiếm theo Tên/SKU...')}
                className="w-full bg-white dark:bg-[#141416] border border-slate-200 dark:border-white/10 rounded-full py-3 pl-12 pr-4 text-[14px] font-medium text-slate-900 dark:text-white focus:outline-none focus:border-yellow-500 transition-colors placeholder:text-slate-400"
            />
        </div>
    );
};

export default SearchInput;
