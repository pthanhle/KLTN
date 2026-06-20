import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import { STATUS_MAP } from '../../constants/revenue.constants';
import { ChartTooltipWrapper } from './Shared/ChartTooltipWrapper';

const CustomTooltip = ({ active, payload, t }) => {
    if (!active || !payload?.length) return null;
    const entry = payload[0];
    return (
        <ChartTooltipWrapper active={active} payload={payload}>
            <p className="text-sm font-bold" style={{ color: entry.payload.fill }}>{entry.name}</p>
            <p className="text-lg font-black text-slate-800 dark:text-white">{entry.value} {t('đơn')}</p>
        </ChartTooltipWrapper>
    );
};

export const OrderStatusDonut = ({ distribution }) => {
    const { t } = useTranslation('adminRevenueReport');
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => { setMounted(true); }, []);

    const chartData = Object.entries(distribution || {})
        .filter(([, v]) => v > 0)
        .map(([key, value]) => ({
            name: t(STATUS_MAP[key]?.label ?? key),
            value,
            fill: STATUS_MAP[key]?.color ?? '#94a3b8',
        }));

    const total = chartData.reduce((s, d) => s + d.value, 0);

    return (
        <section className="bg-white dark:bg-[#141416] p-6 rounded-3xl border border-slate-200/60 dark:border-white/5 shadow-sm h-full flex flex-col">
            <header className="mb-4">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">{t('Phân loại đơn hàng')}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t('Tổng cộng {{count}} đơn trong kỳ', { count: total })}</p>
            </header>

            {chartData.length > 0 ? (
                <>
                    <div className="w-full h-[180px]">
                        {mounted && (
                            <ResponsiveContainer width="99%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={55}
                                        outerRadius={82}
                                        paddingAngle={3}
                                        dataKey="value"
                                        strokeWidth={0}
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip t={t} />} />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                    <div className="space-y-2 mt-3">
                        {chartData.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.fill }} />
                                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{item.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-20 h-1.5 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
                                        <div
                                            className="h-full rounded-full"
                                            style={{ width: `${(item.value / total) * 100}%`, background: item.fill }}
                                        />
                                    </div>
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 w-8 text-right">{item.value}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
                    {t('Không có dữ liệu')}
                </div>
            )}
        </section>
    );
};
