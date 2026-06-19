import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import { transformDailyRevenueData } from '../../utils/dashboard.utils';
import { formatVND } from '../../../Customers/utils/format';

const CustomTooltip = ({ active, payload, label, t }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-xl shadow-xl border border-slate-100 dark:border-white/10">
                <p className="text-xs text-slate-500 mb-1">{label}</p>
                <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                    {t('chart_revenue_label')}: {formatVND(payload[0].value)}
                </p>
            </div>
        );
    }
    return null;
};

export const RevenueTrendChart = ({ data }) => {
    const { t } = useTranslation('adminDashboard');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const chartData = transformDailyRevenueData(data);

    return (
        <section className="bg-white dark:bg-[#141416] p-6 rounded-3xl border border-slate-200/60 dark:border-white/5 shadow-sm h-full flex flex-col">
            <header className="mb-6 flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">{t('chart_revenue_title')}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{t('chart_revenue_subtitle')}</p>
                </div>
            </header>

            {chartData.length > 0 ? (
                <div className="flex-1 w-full h-[250px] min-h-[250px]">
                    {isMounted && (
                        <ResponsiveContainer width="99%" height="100%" minWidth={100} minHeight={100}>
                            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-white/10" />
                                <XAxis 
                                    dataKey="name" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#64748b', fontSize: 12 }} 
                                    dy={10}
                                    minTickGap={20}
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                    tickFormatter={(value) => {
                                        if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)}B`;
                                        if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                                        return value;
                                    }}
                                    width={50}
                                />
                                <Tooltip content={<CustomTooltip t={t} />} cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '4 4' }} />
                                <Area 
                                    type="monotone" 
                                    dataKey="revenue" 
                                    stroke="#6366f1" 
                                    strokeWidth={3}
                                    fillOpacity={1} 
                                    fill="url(#colorRevenue)" 
                                    activeDot={{ r: 6, fill: '#6366f1', stroke: '#fff', strokeWidth: 2 }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">{t('chart_revenue_empty')}</div>
            )}
        </section>
    );
};
