import { TrendingUp, TrendingDown, ShoppingCart, Target, CheckCircle2 } from 'lucide-react';
import { formatVND } from '@/pages/Admin/Customers/utils/format';

const GrowthBadge = ({ value }) => {
    if (value === null || value === undefined) return null;
    const isPositive = value >= 0;
    const Icon = isPositive ? TrendingUp : TrendingDown;
    return (
        <span
            className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
                isPositive
                    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400'
            }`}
        >
            <Icon size={10} />
            {isPositive ? '+' : ''}
            {value.toFixed(1)}%
        </span>
    );
};

const SummaryCard = ({ title, value, subtitle, icon: Icon, colorClass, growth }) => (
    <article className="bg-white dark:bg-[#141416] p-6 rounded-3xl border border-slate-200/60 dark:border-white/5 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/50 transition-all duration-300 group">
        <div className="flex justify-between items-start mb-4">
            <div className="flex-1 min-w-0 pr-3">
                <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1.5">{title}</h2>
                <p className="text-2xl font-extrabold text-slate-800 dark:text-white tracking-tight truncate">{value}</p>
            </div>
            <div className={`p-3.5 rounded-2xl flex-shrink-0 ${colorClass} group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={22} strokeWidth={2.5} />
            </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500">{subtitle}</p>
            <GrowthBadge value={growth} />
        </div>
    </article>
);

export const SummaryCards = ({ summary }) => {
    if (!summary) return null;
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SummaryCard
                title="Tổng doanh thu"
                value={formatVND(summary.totalRevenue)}
                subtitle="So với kỳ trước"
                icon={TrendingUp}
                colorClass="bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-700 dark:from-emerald-500/20 dark:to-emerald-500/10 dark:text-emerald-400"
                growth={summary.revenueGrowth}
            />
            <SummaryCard
                title="Đơn hàng hoàn thành"
                value={summary.completedOrders.toLocaleString('vi-VN')}
                subtitle={`Tổng ${summary.totalOrders} đơn trong kỳ`}
                icon={ShoppingCart}
                colorClass="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 dark:from-blue-500/20 dark:to-blue-500/10 dark:text-blue-400"
                growth={summary.orderGrowth}
            />
            <SummaryCard
                title="Giá trị trung bình/đơn"
                value={formatVND(summary.avgOrderValue)}
                subtitle="Doanh thu / đơn hoàn thành"
                icon={Target}
                colorClass="bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700 dark:from-purple-500/20 dark:to-purple-500/10 dark:text-purple-400"
                growth={null}
            />
            <SummaryCard
                title="Tỉ lệ hoàn thành"
                value={`${summary.completionRate}%`}
                subtitle={`${summary.cancelledOrders} đơn đã hủy`}
                icon={CheckCircle2}
                colorClass="bg-gradient-to-br from-amber-100 to-amber-200 text-amber-700 dark:from-amber-500/20 dark:to-amber-500/10 dark:text-amber-400"
                growth={null}
            />
        </section>
    );
};
