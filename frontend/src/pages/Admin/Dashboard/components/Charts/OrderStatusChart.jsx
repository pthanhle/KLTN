import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';
import { ORDER_STATUS_MAP } from '../../constants/dashboardConstants';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const entry = payload[0];
        return (
            <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-xl shadow-xl border border-slate-100 dark:border-white/10">
                <p className="text-sm font-bold" style={{ color: entry.payload.fill }}>{entry.name}</p>
                <p className="text-lg font-black text-slate-800 dark:text-white">{entry.value}</p>
            </div>
        );
    }
    return null;
};

export const OrderStatusChart = ({ data }) => {
    const { t } = useTranslation('adminDashboard');

    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    const chartData = Object.entries(data || {})
        .filter(([, v]) => v > 0)
        .map(([key, value]) => ({
            name: ORDER_STATUS_MAP[key] ? t(ORDER_STATUS_MAP[key].labelKey) : key,
            value,
            fill: ORDER_STATUS_MAP[key]?.color || '#94a3b8',
        }));

    const total = chartData.reduce((s, d) => s + d.value, 0);

    return (
        <section className="bg-white dark:bg-[#141416] p-6 rounded-3xl border border-slate-200/60 dark:border-white/5 shadow-sm h-full flex flex-col">
            <header className="mb-4">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">{t('chart_status_title')}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{t('chart_status_total')} {total} {t('chart_status_unit')}</p>
            </header>

            {chartData.length > 0 ? (
                <>
                    <div className="flex-1 w-full h-[180px] min-h-[180px]">
                        {isMounted && (
                            <ResponsiveContainer width="99%" height="100%" minWidth={100} minHeight={100}>
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={55}
                                        outerRadius={85}
                                        paddingAngle={3}
                                        dataKey="value"
                                        strokeWidth={0}
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                    <article className="space-y-2 mt-2">
                        {chartData.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.fill }}></span>
                                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{item.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-20 h-1.5 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
                                        <div className="h-full rounded-full" style={{ width: `${(item.value / total) * 100}%`, background: item.fill }}></div>
                                    </div>
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 w-8 text-right">{item.value}</span>
                                </div>
                            </div>
                        ))}
                    </article>
                </>
            ) : (
                <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">{t('chart_status_empty')}</div>
            )}
        </section>
    );
};
