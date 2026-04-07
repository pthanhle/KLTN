import React from 'react';
import { Package, AlertTriangle, CircleDollarSign, Layers } from 'lucide-react';
import { Skeleton } from 'antd';

const PartStats = ({ stats, t, loading }) => {
    const isReady = !loading && stats;

    const renderValue = (value) => {
        return isReady ? (
            <p className="text-3xl font-black text-slate-800 dark:text-white animate-in fade-in">{value}</p>
        ) : (
            <Skeleton.Button active size="small" style={{ width: 80, height: 36, marginTop: 4 }} block />
        );
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
            <div className="bg-white dark:bg-[#191f31] rounded-2xl p-8 border border-slate-200 dark:border-white/5 transition-all group hover:bg-slate-50 dark:hover:bg-[#23293c]">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-500/10 rounded-xl">
                        <Package className="text-yellow-500" size={24} strokeWidth={2.5} />
                    </div>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{t('adminParts:statTotal')}</p>
                {renderValue(stats?.totalParts || 0)}
            </div>

            <div className="bg-white dark:bg-[#191f31] rounded-2xl p-8 border border-slate-200 dark:border-white/5 transition-all group hover:bg-slate-50 dark:hover:bg-[#23293c]">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-red-50 dark:bg-red-500/10 rounded-xl">
                        <AlertTriangle className="text-red-500" size={24} strokeWidth={2.5} />
                    </div>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{t('adminParts:statOutOfStock')}</p>
                {renderValue(stats?.outOfStock || 0)}
            </div>

            <div className="bg-white dark:bg-[#191f31] rounded-2xl p-8 border border-slate-200 dark:border-white/5 transition-all group hover:bg-slate-50 dark:hover:bg-[#23293c]">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-green-50 dark:bg-green-500/10 rounded-xl">
                        <CircleDollarSign className="text-green-500" size={24} strokeWidth={2.5} />
                    </div>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{t('adminParts:statValue')}</p>
                {isReady ? (
                    <p className="text-3xl font-black text-slate-800 dark:text-white animate-in fade-in">
                        {((stats?.totalValue || 0) / 1000000000).toFixed(1)}B <span className="text-lg font-medium text-slate-500">{t('adminParts:currency')}</span>
                    </p>
                ) : (
                    <Skeleton.Button active size="small" style={{ width: 120, height: 36, marginTop: 4 }} block />
                )}
            </div>

            <div className="bg-white dark:bg-[#191f31] rounded-2xl p-8 border border-slate-200 dark:border-white/5 transition-all group hover:bg-slate-50 dark:hover:bg-[#23293c]">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl">
                        <Layers className="text-blue-500" size={24} strokeWidth={2.5} />
                    </div>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{t('adminParts:statCategories')}</p>
                {renderValue(stats?.totalCategories || 0)}
            </div>
        </div>
    );
};

export default PartStats;
