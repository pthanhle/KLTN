import { formatVND } from '@/pages/Admin/Customers/utils/format';

export const getRevenueTableColumns = (t, timeSeries) => [
    {
        title: t('Kỳ'),
        dataIndex: 'label',
        key: 'label',
        render: (text, row) =>
            row.weekEnd ? (
                <span className="font-semibold text-slate-800 dark:text-white">
                    {text}
                    <span className="ml-1.5 text-xs font-normal text-slate-400">→ {row.weekEnd}</span>
                </span>
            ) : (
                <span className="font-semibold text-slate-800 dark:text-white">{text}</span>
            ),
    },
    {
        title: t('Doanh thu'),
        dataIndex: 'revenue',
        key: 'revenue',
        render: (v) => (
            <span className="font-bold text-indigo-600 dark:text-indigo-400">{formatVND(v)}</span>
        ),
        sorter: (a, b) => a.revenue - b.revenue,
        defaultSortOrder: 'descend',
    },
    {
        title: t('Số đơn'),
        dataIndex: 'orderCount',
        key: 'orderCount',
        render: (v) => <span className="font-semibold">{v}</span>,
        sorter: (a, b) => a.orderCount - b.orderCount,
    },
    {
        title: t('Trung bình/đơn'),
        key: 'avg',
        render: (_, row) =>
            row.orderCount > 0 ? (
                <span className="text-slate-600 dark:text-slate-300">
                    {formatVND(Math.round(row.revenue / row.orderCount))}
                </span>
            ) : (
                <span className="text-slate-400">—</span>
            ),
        sorter: (a, b) => {
            const avgA = a.orderCount > 0 ? a.revenue / a.orderCount : 0;
            const avgB = b.orderCount > 0 ? b.revenue / b.orderCount : 0;
            return avgA - avgB;
        },
    },
    {
        title: t('% Tổng DT'),
        key: 'percent',
        render: (_, row) => {
            const total = timeSeries?.reduce((s, i) => s + i.revenue, 0) || 0;
            const pct = total > 0 ? ((row.revenue / total) * 100).toFixed(1) : '0.0';
            return (
                <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
                        <div
                            className="h-full rounded-full bg-indigo-500"
                            style={{ width: `${pct}%` }}
                        />
                    </div>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{pct}%</span>
                </div>
            );
        },
    },
];
