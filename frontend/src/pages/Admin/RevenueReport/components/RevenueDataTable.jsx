import { Table } from 'antd';
import { formatVND } from '@/pages/Admin/Customers/utils/format';

export const RevenueDataTable = ({ timeSeries }) => {
    const columns = [
        {
            title: 'Kỳ',
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
            title: 'Doanh thu',
            dataIndex: 'revenue',
            key: 'revenue',
            render: (v) => (
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{formatVND(v)}</span>
            ),
            sorter: (a, b) => a.revenue - b.revenue,
            defaultSortOrder: 'descend',
        },
        {
            title: 'Số đơn',
            dataIndex: 'orderCount',
            key: 'orderCount',
            render: (v) => <span className="font-semibold">{v}</span>,
            sorter: (a, b) => a.orderCount - b.orderCount,
        },
        {
            title: 'Trung bình/đơn',
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
            title: '% Tổng DT',
            key: 'percent',
            render: (_, row, index) => {
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

    const tableData = (timeSeries || []).map((item, i) => ({ ...item, key: i }));

    return (
        <section className="bg-white dark:bg-[#141416] p-6 rounded-3xl border border-slate-200/60 dark:border-white/5 shadow-sm">
            <header className="mb-5">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Dữ liệu chi tiết</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Tổng hợp {tableData.length} kỳ — có thể sắp xếp theo cột
                </p>
            </header>
            <div className="overflow-x-auto">
                <Table
                    columns={columns}
                    dataSource={tableData}
                    pagination={{ pageSize: 15, showSizeChanger: false, size: 'small' }}
                    size="small"
                    rowClassName="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                />
            </div>
        </section>
    );
};
