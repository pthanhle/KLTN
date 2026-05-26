import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import { formatVND } from '../../../Customers/utils/format';
import dayjs from 'dayjs';

export const RevenueChart = ({ data }) => {
    const { t } = useTranslation('adminDashboard');

    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    const chartData = data?.map(item => ({
        date: dayjs(item._id).format('DD/MM'),
        revenue: item.revenue
    })) || [];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-[#141416] p-4 rounded-xl shadow-lg border border-slate-100 dark:border-white/10">
                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1">{label}</p>
                    <p className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                        {formatVND(payload[0].value)}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <section className="bg-white dark:bg-[#141416] p-6 rounded-3xl border border-slate-200/60 dark:border-white/5 shadow-sm h-full min-h-[400px] flex flex-col">
            <header className="mb-6 flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">{t('chart_revenue_title')}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{t('chart_revenue_subtitle')}</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    VNĐ
                </div>
            </header>

            <article className="flex-1 w-full h-[300px] min-h-[300px]">
                {isMounted && chartData.length > 0 ? (
                    <ResponsiveContainer width="99%" height="100%" minWidth={100} minHeight={100}>
                        <AreaChart
                            data={chartData}
                            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.5} />
                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }}
                                dy={15}
                                minTickGap={20}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }}
                                tickFormatter={(value) => value >= 1000000 ? `${(value / 1000000).toFixed(0)}M` : value}
                                dx={-15}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(148, 163, 184, 0.4)', strokeWidth: 1, strokeDasharray: '5 5' }} />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#6366f1"
                                strokeWidth={4}
                                fillOpacity={1}
                                fill="url(#colorRevenue)"
                                activeDot={{ r: 8, strokeWidth: 4, stroke: '#fff', fill: '#6366f1', className: "drop-shadow-md" }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                ) : isMounted ? (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                        {t('chart_status_empty')}
                    </div>
                ) : null}
            </article>
        </section>
    );
};
