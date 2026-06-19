import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { formatVND } from '@/pages/Admin/Customers/utils/format';

const COLORS = ['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe', '#e0e7ff'];

const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const item = payload[0]?.payload;
    return (
        <div className="bg-white dark:bg-[#1a1a2e] p-3 rounded-xl shadow-xl border border-slate-100 dark:border-white/10 max-w-[220px]">
            <p className="text-xs font-bold text-slate-700 dark:text-white mb-1 break-words">{item?.fullName}</p>
            <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{formatVND(payload[0]?.value)}</p>
            <p className="text-xs text-slate-500 mt-0.5">{item?.totalSold} đã bán</p>
        </div>
    );
};

export const TopProductsChart = ({ topProducts }) => {
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => { setMounted(true); }, []);

    const data = (topProducts || []).map((p, i) => ({
        name: p.name?.length > 22 ? p.name.substring(0, 22) + '…' : (p.name || 'Không xác định'),
        fullName: p.name || 'Không xác định',
        revenue: p.totalRevenue,
        totalSold: p.totalSold,
        color: COLORS[i] ?? '#6366f1',
    }));

    return (
        <section className="bg-white dark:bg-[#141416] p-6 rounded-3xl border border-slate-200/60 dark:border-white/5 shadow-sm flex flex-col h-full min-h-[380px]">
            <header className="mb-6">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Top sản phẩm bán chạy</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Xếp hạng theo doanh thu trong kỳ</p>
            </header>
            <div className="flex-1 w-full min-h-[260px]">
                {mounted && data.length > 0 ? (
                    <ResponsiveContainer width="99%" height="100%">
                        <BarChart
                            layout="vertical"
                            data={data}
                            margin={{ top: 0, right: 24, left: 0, bottom: 0 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" strokeOpacity={0.5} />
                            <XAxis
                                type="number"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 11, fill: '#64748b' }}
                                tickFormatter={(v) => v >= 1000000 ? `${(v / 1000000).toFixed(0)}M` : v}
                            />
                            <YAxis
                                type="category"
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 11, fill: '#64748b' }}
                                width={130}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148,163,184,0.08)' }} />
                            <Bar dataKey="revenue" radius={[0, 5, 5, 0]} barSize={24}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                ) : mounted ? (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">
                        Không có dữ liệu sản phẩm trong kỳ này
                    </div>
                ) : null}
            </div>
        </section>
    );
};
