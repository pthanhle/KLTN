import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { formatVND } from '../../Customers/utils/format';

const MONTHS_VI = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];
const currentMonth = new Date().getMonth() + 1;

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl border border-slate-100 dark:border-white/10">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">{label}</p>
                <p className="text-lg font-black text-indigo-600 dark:text-indigo-400">{formatVND(payload[0].value)}</p>
                <p className="text-xs text-slate-400">{payload[0].payload.count} đơn</p>
            </div>
        );
    }
    return null;
};

export const MonthlyRevenueChart = ({ data }) => {
    const chartData = MONTHS_VI.map((month, idx) => {
        const found = data?.find(d => d._id === idx + 1);
        return {
            month,
            revenue: found?.revenue || 0,
            count: found?.count || 0,
            isCurrent: idx + 1 === currentMonth,
        };
    });

    return (
        <div className="bg-white dark:bg-[#141416] p-6 rounded-3xl border border-slate-200/60 dark:border-white/5 shadow-sm flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">Doanh thu theo tháng</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Biểu đồ doanh thu năm {new Date().getFullYear()}</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <span className="w-3 h-3 rounded bg-indigo-500"></span>
                        Tháng khác
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <span className="w-3 h-3 rounded bg-indigo-200 dark:bg-indigo-900"></span>
                        Tháng hiện tại
                    </div>
                </div>
            </div>
            <div className="flex-1 min-h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }} barSize={24}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.5} />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(v) => v >= 1000000 ? `${(v / 1000000).toFixed(0)}M` : v} dx={-5} />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f1f5f9', radius: 8 }} />
                        <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.isCurrent ? '#6366f1' : '#e0e7ff'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
