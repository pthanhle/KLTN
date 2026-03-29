import React from 'react';
import { useLoyalty } from '../hooks/useLoyalty';

export const LoyaltyBanner = ({ loyaltyData, t }) => {
    if (!loyaltyData) return null;

    const {
        currentPoints,
        requiredPoints,
        progressPercent,
        nextTier,
        activeVouchers,
        bonusRate
    } = useLoyalty(loyaltyData);

    return (
        <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl p-8 flex flex-col xl:flex-row items-center justify-between shadow-2xl shadow-yellow-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
            
            <div className="mb-6 xl:mb-0 relative z-10 w-full xl:w-1/2">
                <h2 className="text-yellow-900/60 text-[10px] font-black uppercase tracking-[0.3em] mb-2">{t('adminCustomers:lblTotalAccumulated', 'Tổng điểm lũy kế')}</h2>
                <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-slate-900 tracking-tighter">{currentPoints.toLocaleString('vi-VN')}</span>
                    <span className="text-slate-900/50 font-black uppercase tracking-widest text-[10px]">{t('adminCustomers:pointsUnit', 'Điểm')}</span>
                </div>
                
                <div className="mt-8 relative w-full h-2 bg-yellow-900/10 rounded-full overflow-hidden">
                    <div 
                        className="absolute top-0 left-0 h-full bg-slate-900 rounded-full transition-all duration-1000" 
                        style={{ width: `${progressPercent}%` }}
                    ></div>
                </div>
                <p className="text-yellow-900/80 text-[10px] font-bold uppercase tracking-widest mt-3">
                    {requiredPoints.toLocaleString('vi-VN')} {t('adminCustomers:lblPointsNeeded', 'điểm nữa để thăng hạng')} <span className="font-black text-slate-900">{nextTier}</span>
                </p>
            </div>
            
            <div className="flex items-center gap-4 w-full xl:w-auto relative z-10">
                <div className="flex-1 xl:flex-none text-center bg-white/20 backdrop-blur-md p-5 rounded-2xl border border-white/30">
                    <p className="text-slate-900 font-black text-3xl tracking-tighter">{activeVouchers}</p>
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-yellow-900/60 mt-1">{t('adminCustomers:lblActiveVouchers', 'Vouchers')}</p>
                </div>
                <div className="flex-1 xl:flex-none text-center bg-white/20 backdrop-blur-md p-5 rounded-2xl border border-white/30">
                    <p className="text-slate-900 font-black text-3xl tracking-tighter text-nowrap">{bonusRate}%</p>
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-yellow-900/60 mt-1">{t('adminCustomers:lblBonusRate', 'Bonus Rate')}</p>
                </div>
            </div>
        </div>
    );
};
