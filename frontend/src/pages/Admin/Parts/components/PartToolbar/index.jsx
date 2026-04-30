import React from 'react';
import { Search, Filter } from 'lucide-react';
import FilterSelect from './components/FilterSelect';
import { getStatusOptions, getCategoryOptions, getBrandOptions } from '../../constants/filterConstants';

const PartToolbar = ({ searchTerm, onSearch, categoryFilter, onCategoryFilter, brandFilter, onBrandFilter, statusFilter, onStatusFilter, categories, brands, t }) => {
    return (
        <div className="bg-white dark:bg-[#141416] rounded-2xl p-6 mb-8 border border-slate-200 dark:border-white/5 flex flex-wrap items-center gap-6">
            <div className="flex-1 min-w-[300px] relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-yellow-500 transition-colors" size={20} />
                <input 
                    type="text" 
                    className="w-full bg-slate-50 dark:bg-[#141416] border border-transparent dark:border-white/10 rounded-full py-4 pl-12 pr-6 text-slate-700 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-yellow-500/50 transition-all outline-none" 
                    placeholder={t('adminParts:searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>
            
            <div className="flex items-center gap-4 flex-wrap">
                <div className="relative">
                    <FilterSelect 
                        value={statusFilter}
                        onChange={onStatusFilter}
                        options={getStatusOptions(t)}
                    />
                </div>

                <div className="relative">
                    <FilterSelect 
                        value={categoryFilter}
                        onChange={onCategoryFilter}
                        options={getCategoryOptions(categories, t)}
                    />
                </div>
                
                <div className="relative">
                    <FilterSelect 
                        value={brandFilter}
                        onChange={onBrandFilter}
                        options={getBrandOptions(brands, t)}
                    />
                </div>
                
                <button className="w-14 h-14 flex items-center justify-center rounded-full bg-slate-50 dark:bg-[#141416] hover:bg-slate-100 dark:hover:bg-white/5 transition-colors border border-slate-200 dark:border-white/10 shadow-sm">
                    <Filter className="text-slate-500 dark:text-slate-400" size={20} />
                </button>
            </div>
        </div>
    );
};

export default PartToolbar;
