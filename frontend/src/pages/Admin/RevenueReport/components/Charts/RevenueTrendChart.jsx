import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { useTranslation } from 'react-i18next';
import { formatVND } from '@/pages/Admin/Customers/utils/format';
import { ChartTooltipWrapper } from './Shared/ChartTooltipWrapper';

const CustomTooltip = ({ active, payload, t }) => {
    if (!active || !payload?.length) return null;
    const item = payload[0]?.payload;
    const label = item?.weekEnd
        ? `${t('Tuần')} ${item.label} – ${item.weekEnd}`
        : item?.label;
    return (
        <ChartTooltipWrapper active={active} payload={payload}>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{label}</p>
            <p className="text-base font-extrabold text-indigo-600 dark:text-indigo-400">{formatVND(payload[0]?.value)}</p>
            <p className="text-xs text-slate-400 mt-1">{item?.orderCount} {t('đơn hoàn thành')}</p>
        </ChartTooltipWrapper>
    );
};

export const RevenueTrendChart = ({ timeSeries, period }) => {
    const { t } = useTranslation('adminRevenueReport');
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => { setMounted(true); }, []);

    const data = timeSeries || [];

    return (
        <section className="bg-white dark:bg-[#141416] p-6 rounded-3xl border border-slate-200/60 dark:border-white/5 shadow-sm flex flex-col h-full min-h-[380px]">
            <header className="mb-6 flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">{t('Xu hướng doanh thu')}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t('Doanh thu từ đơn đã hoàn thành')}</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full flex-shrink-0">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    VNĐ
                </div>
            </header>
            <div className="flex-1 w-full min-h-[280px]">
                {mounted && data.length > 0 ? (
                    <ResponsiveContainer width="99%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.5} />
                            <XAxis
                                dataKey="label"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }}
                                dy={15}
                                minTickGap={period === 'day' ? 20 : period === 'week' ? 12 : 0}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 11, fill: '#64748b' }}
                                tickFormatter={(v) => v >= 1000000 ? `${(v / 1000000).toFixed(0)}M` : v}
                                dx={-15}
                            />
                            <Tooltip content={<CustomTooltip t={t} />} cursor={{ stroke: 'rgba(148,163,184,0.4)', strokeWidth: 1, strokeDasharray: '5 5' }} />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#6366f1"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#revenueGrad)"
                                activeDot={{ r: 7, strokeWidth: 3, stroke: '#fff', fill: '#6366f1' }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                ) : mounted ? (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                        {t('Không có dữ liệu trong kỳ này')}
                    </div>
                ) : null}
            </div>
        </section>
    );
};
