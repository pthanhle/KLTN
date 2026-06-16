import React from 'react';
import { FileText, AlertCircle, CheckCircle2, CircleDollarSign } from 'lucide-react';
import { Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';

const ContractStats = ({ stats, loading }) => {
    const { t } = useTranslation('adminVehicleContracts');
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
            <div className="bg-white dark:bg-[#141416] rounded-2xl p-8 border border-slate-200 dark:border-white/5 transition-all group hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl">
                        <FileText className="text-blue-500" size={24} strokeWidth={2.5} />
                    </div>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{t('Tổng Hợp Đồng')}</p>
                {renderValue(stats?.total || 0)}
            </div>

            <div className="bg-white dark:bg-[#141416] rounded-2xl p-8 border border-slate-200 dark:border-white/5 transition-all group hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-orange-50 dark:bg-orange-500/10 rounded-xl">
                        <AlertCircle className="text-orange-500" size={24} strokeWidth={2.5} />
                    </div>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{t('Đang Chờ Duyệt')}</p>
                {renderValue(stats?.pending || 0)}
            </div>

            <div className="bg-white dark:bg-[#141416] rounded-2xl p-8 border border-slate-200 dark:border-white/5 transition-all group hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-green-50 dark:bg-green-500/10 rounded-xl">
                        <CheckCircle2 className="text-green-500" size={24} strokeWidth={2.5} />
                    </div>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{t('Đã Bán & Giao')}</p>
                {renderValue(stats?.completed || 0)}
            </div>

            <div className="bg-white dark:bg-[#141416] rounded-2xl p-8 border border-slate-200 dark:border-white/5 transition-all group hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-xl">
                        <CircleDollarSign className="text-purple-500" size={24} strokeWidth={2.5} />
                    </div>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{t('Tổng Doanh Thu')}</p>
                {isReady ? (
                    <p className="text-3xl font-black text-slate-800 dark:text-white animate-in fade-in">
                        {((stats?.totalRevenue || 0) / 1000000000).toFixed(1)}B <span className="text-lg font-medium text-slate-500">VNĐ</span>
                    </p>
                ) : (
                    <Skeleton.Button active size="small" style={{ width: 120, height: 36, marginTop: 4 }} block />
                )}
            </div>
        </div>
    );
};

export default ContractStats;
