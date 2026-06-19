import React from 'react';
import {
    ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Legend,
} from 'recharts';
import { formatVND } from '@/pages/Admin/Customers/utils/format';

const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const item = payload[0]?.payload;
    const label = item?.weekEnd
        ? `Tuần ${item.label} – ${item.weekEnd}`
        : item?.label;
    return (
        <div className="bg-white dark:bg-[#1a1a2e] p-4 rounded-xl shadow-xl border border-slate-100 dark:border-white/10 min-w-[170px]">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">{label}</p>
            {payload.map((entry, i) => (
                <div key={i} className="flex items-center justify-between gap-4 text-sm font-semibold" style={{ color: entry.color }}>
                    <span>{entry.name}</span>
                    <span>{entry.dataKey === 'revenue' ? formatVND(entry.value) : entry.value}</span>
                </div>
            ))}
        </div>
    );
};

const renderLegend = (props) => {
    const { payload } = props;
    return (
        <div className="flex justify-center gap-6 mt-2">
            {payload.map((entry, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <span
                        className="inline-block w-3 h-3 rounded-sm"
                        style={{ background: entry.color }}
                    />
                    {entry.value}
                </div>
            ))}
        </div>
    );
};

export const OrderAnalysisChart = ({ timeSeries, period }) => {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => { setMounted(true); }, []);

    const data = timeSeries || [];

    return (
        <section className="bg-white dark:bg-[#141416] p-6 rounded-3xl border border-slate-200/60 dark:border-white/5 shadow-sm flex flex-col h-full min-h-[380px]">
            <header className="mb-6">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Phân tích đơn hàng</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Số đơn và doanh thu theo kỳ</p>
            </header>
            <div className="flex-1 w-full min-h-[280px]">
                {mounted && data.length > 0 ? (
                    <ResponsiveContainer width="99%" height="100%">
                        <ComposedChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.5} />
                            <XAxis
                                dataKey="label"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 11, fill: '#64748b' }}
                                dy={10}
                                minTickGap={period === 'day' ? 20 : period === 'week' ? 12 : 0}
                            />
                            <YAxis
                                yAxisId="left"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 11, fill: '#64748b' }}
                                allowDecimals={false}
                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 11, fill: '#64748b' }}
                                tickFormatter={(v) => v >= 1000000 ? `${(v / 1000000).toFixed(0)}M` : v}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148,163,184,0.08)', radius: 8 }} />
                            <Legend content={renderLegend} />
                            <Bar
                                yAxisId="left"
                                dataKey="orderCount"
                                name="Số đơn"
                                fill="#818cf8"
                                radius={[5, 5, 0, 0]}
                                barSize={period === 'day' ? 8 : 22}
                            />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="revenue"
                                name="Doanh thu"
                                stroke="#f59e0b"
                                strokeWidth={2.5}
                                dot={false}
                                activeDot={{ r: 5, fill: '#f59e0b', stroke: '#fff', strokeWidth: 2 }}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                ) : mounted ? (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                        Không có dữ liệu trong kỳ này
                    </div>
                ) : null}
            </div>
        </section>
    );
};
