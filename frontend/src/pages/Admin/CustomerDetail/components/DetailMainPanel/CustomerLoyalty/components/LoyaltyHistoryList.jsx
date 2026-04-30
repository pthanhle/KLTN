import React from 'react';
import { formatDate } from '../../../../../Customers/utils/format';

export const LoyaltyHistoryList = ({ history, t }) => {
    return (
        <div className="bg-slate-50 dark:bg-[#141416] rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden">
            <div className="divide-y divide-slate-200 dark:divide-white/5 max-h-[320px] overflow-y-auto custom-scrollbar">
                {history.map(item => {
                    const isEarn = item.action === 'EARN';
                    return (
                        <div key={item.id} className="flex justify-between items-center px-8 py-5 hover:bg-white/40 dark:hover:bg-white/5 transition-colors group">
                            <div className="flex items-center gap-5">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg select-none 
                                    ${isEarn ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500' : 'bg-rose-50 dark:bg-rose-500/10 text-rose-500'}`}>
                                    {isEarn ? '+' : '-'}
                                </div>
                                <div>
                                    <p className="text-sm font-black text-slate-800 dark:text-white tracking-tight leading-none mb-1.5">{item.description}</p>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{formatDate(item.date)}</p>
                                </div>
                            </div>
                            
                            <div className="text-right">
                                <p className={`text-base font-black ${isEarn ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    {isEarn ? '+' : ''}{item.points}
                                </p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                    {t('adminCustomers:lblBalance', 'Số dư')}: {item.balance}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
