import React from 'react';
import { FileText } from 'lucide-react';
import { formatVND } from '../../../../../Customers/utils/format';

export const ContractOverviewCard = ({ stats, isLoading, t }) => {
    return (
        <div className="bg-slate-50 dark:bg-[#141416] rounded-2xl p-8 border-l-4 border-blue-500 flex flex-col justify-between h-[200px]">
            <h4 className="text-[11px] tracking-[0.2em] font-black text-blue-600 dark:text-blue-400 uppercase mb-4 flex justify-between items-center">
                {t('Hợp đồng Khách hàng')}
                {isLoading ? (
                    <div className="w-20 h-4 bg-slate-200 dark:bg-slate-700 animate-pulse rounded"></div>
                ) : (
                    <span className="text-slate-400 font-bold ml-2 text-xs">{stats.count} {t('hợp đồng')}</span>
                )}
            </h4>

            <div className="flex justify-between items-end">
                <div>
                    <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none mb-2">
                        {t('Tổng giá trị hợp đồng')}
                    </p>
                    {isLoading ? (
                        <div className="w-32 h-8 bg-slate-200 dark:bg-slate-700 animate-pulse rounded mt-1"></div>
                    ) : (
                        <p className="text-3xl font-black tracking-tighter text-slate-800 dark:text-white">
                            {formatVND(stats.totalValue)}
                        </p>
                    )}
                </div>
                <div className="w-12 h-12 bg-blue-500/10 dark:bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <FileText size={22} className="text-blue-500" />
                </div>
            </div>

            <div className="mt-auto flex gap-3">
                <span className="px-3 py-1 rounded-lg text-[10px] font-black tracking-widest uppercase bg-blue-500/10 text-blue-600 dark:text-blue-400">
                    {stats.count > 0 ? t('Có hợp đồng') : t('Chưa có hợp đồng')}
                </span>
            </div>
        </div>
    );
};
