import React from 'react';
import { Skeleton } from 'antd';

const StatCard = ({ title, value, subValue, icon: Icon, colorClass, bgGlowClass, isLoading }) => {
    if (isLoading) {
        return (
            <div className="bg-white dark:bg-[#141416] rounded-xl p-6 border border-slate-200 dark:border-white/5 shadow-sm">
                <Skeleton active title={false} paragraph={{ rows: 2, width: ['40%', '80%'] }} />
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-[#1c1c1e] rounded-xl p-6 border border-slate-200 dark:border-white/5 relative overflow-hidden group hover:border-slate-300 dark:hover:border-white/10 transition-all shadow-sm hover:shadow-md">
            {/* Background Glow */}
            <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full blur-2xl transition-all opacity-50 group-hover:opacity-100 ${bgGlowClass}`}></div>
            
            <div className="flex justify-between items-start mb-6 relative z-10">
                <div className={`p-3 rounded-xl border flex items-center justify-center ${colorClass}`}>
                    <Icon size={20} strokeWidth={2.5} />
                </div>
            </div>
            
            <div className="relative z-10">
                <h3 className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-1 font-bold">
                    {title}
                </h3>
                <div className={`text-3xl font-bold flex items-baseline gap-1 ${colorClass.split(' ')[0]}`}>
                    {value}
                    {subValue && (
                        <span className="text-slate-500 dark:text-slate-400 text-lg font-medium">
                            {subValue}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StatCard;
