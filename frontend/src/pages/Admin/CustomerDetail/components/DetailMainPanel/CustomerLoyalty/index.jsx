import React from 'react';
import { Skeleton } from 'antd';
import { LoyaltyBanner } from './components/LoyaltyBanner';
import { LoyaltyHistoryList } from './components/LoyaltyHistoryList';

export const CustomerLoyalty = ({ loyaltyData, loyaltyHistory, isLoading, t }) => {
    if (isLoading) {
        return (
            <div className="space-y-6 animate-pulse mt-8">
                <Skeleton.Button active block className="!h-48 !rounded-2xl" />
                <Skeleton.Button active block className="!h-32 !rounded-2xl" />
            </div>
        );
    }

    if (!loyaltyData && (!loyaltyHistory || loyaltyHistory.length === 0)) {
        return <div className="p-8 mt-6 text-center text-[10px] font-black tracking-widest text-slate-500 uppercase border border-dashed border-slate-200 dark:border-white/10 rounded-2xl">{t('adminCustomers:emptyLoyalty', 'Chưa có dữ liệu thành viên')}</div>;
    }

    return (
        <section className="space-y-8 mt-8 animate-fade-in">
            <LoyaltyBanner loyaltyData={loyaltyData} t={t} />
            
            {loyaltyHistory && loyaltyHistory.length > 0 && (
                <div>
                    <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800 dark:text-white mb-4">
                        {t('adminCustomers:lblPointsHistory', 'Lịch Sử Tích/Tiêu Điểm')}
                    </h3>
                    <LoyaltyHistoryList history={loyaltyHistory} t={t} />
                </div>
            )}
        </section>
    );
};
