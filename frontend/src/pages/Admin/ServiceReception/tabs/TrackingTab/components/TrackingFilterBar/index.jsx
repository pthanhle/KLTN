import React from 'react';
import { Search } from 'lucide-react';
import { TRACKING_STAGES, TRACKING_STATUS_FILTERS } from '../../constants/trackingConstants';
import FilterSelect from './FilterSelect';

const TrackingFilterBar = ({
    t,
    searchTerm,
    setSearchTerm,
    stageFilter,
    setStageFilter,
    statusFilter,
    setStatusFilter,
    stageOptions,
    statusOptions
}) => {
    return (
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white dark:bg-[#0A0A0B] p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm w-full shrink-0 relative z-10">
            <div className="flex-1 w-full lg:max-w-[400px] bg-white dark:bg-[#141416] rounded-xl h-11 px-5 flex items-center gap-3 border border-slate-200 dark:border-white/10 shadow-sm transition-all focus-within:ring-2 focus-within:ring-yellow-500/30 focus-within:border-yellow-500">
                <Search size={18} className="text-slate-400 shrink-0" />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={t('tracking_search_placeholder', 'Tìm mã RO, Tên khách, Biển số...')}
                    className="bg-transparent border-none focus:ring-0 outline-none shadow-none text-sm w-full text-slate-800 dark:text-white placeholder-slate-400 p-0"
                />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto items-center">
                <FilterSelect
                    value={stageFilter}
                    onChange={(val) => setStageFilter(val || TRACKING_STAGES.ALL)}
                    options={stageOptions}
                    placeholder={t('tracking_filter_all_stages', 'Tất cả Giai đoạn')}
                />

                <FilterSelect
                    value={statusFilter}
                    onChange={(val) => setStatusFilter(val || TRACKING_STATUS_FILTERS.ALL)}
                    options={statusOptions}
                    placeholder={t('tracking_filter_all_status', 'Tất cả Trạng thái')}
                />
            </div>
        </div>
    );
};

export default TrackingFilterBar;
