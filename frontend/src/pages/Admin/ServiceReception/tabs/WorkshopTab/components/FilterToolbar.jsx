import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Filter } from 'lucide-react';
import { Input, Select } from 'antd';
import { RECEPTION_CONSTANTS } from '../../../constants/receptionConstants';

const FilterToolbar = ({ searchTerm, onSearchChange }) => {
    const { t } = useTranslation('adminServiceReception');

    const filterOptions = RECEPTION_CONSTANTS.BAY_FILTER_OPTIONS.map(opt => ({
        value: opt.value,
        label: t(opt.labelKey, opt.fallback)
    }));

    return (
        <div className="bg-white dark:bg-[#141416] rounded-xl p-6 mb-6 flex flex-wrap gap-6 justify-between items-center shadow-lg border border-slate-200 dark:border-white/5">
            <div className="flex gap-4 items-center">
                <div className="bg-slate-50 dark:bg-[#0a0a0b] rounded-full px-5 py-2.5 flex items-center gap-3 border border-slate-200 dark:border-white/10 focus-within:border-yellow-500 transition-colors w-64">
                    <Search className="w-4 h-4 text-slate-400" />
                    <Input
                        variant="borderless"
                        placeholder={t('search_plate_ph', 'Search License Plate...')}
                        className="bg-transparent border-none p-0 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:shadow-none hover:bg-transparent"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterToolbar;
