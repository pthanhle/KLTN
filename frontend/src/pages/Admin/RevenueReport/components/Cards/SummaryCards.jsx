import { TrendingUp, ShoppingCart, Target, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { formatVND } from '@/pages/Admin/Customers/utils/format';
import { SummaryCard } from './SummaryCard';

export const SummaryCards = ({ summary }) => {
    const { t } = useTranslation('adminRevenueReport');
    if (!summary) return null;
    
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SummaryCard
                title={t('Tổng doanh thu')}
                value={formatVND(summary.totalRevenue)}
                subtitle={t('So với kỳ trước')}
                icon={TrendingUp}
                colorClass="bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-700 dark:from-emerald-500/20 dark:to-emerald-500/10 dark:text-emerald-400"
                growth={summary.revenueGrowth}
            />
            <SummaryCard
                title={t('Đơn hàng hoàn thành')}
                value={summary.completedOrders.toLocaleString('vi-VN')}
                subtitle={t('Tổng {{count}} đơn trong kỳ', { count: summary.totalOrders })}
                icon={ShoppingCart}
                colorClass="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 dark:from-blue-500/20 dark:to-blue-500/10 dark:text-blue-400"
                growth={summary.orderGrowth}
            />
            <SummaryCard
                title={t('Giá trị trung bình/đơn')}
                value={formatVND(summary.avgOrderValue)}
                subtitle={t('Doanh thu / đơn hoàn thành')}
                icon={Target}
                colorClass="bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700 dark:from-purple-500/20 dark:to-purple-500/10 dark:text-purple-400"
                growth={null}
            />
            <SummaryCard
                title={t('Tỉ lệ hoàn thành')}
                value={`${summary.completionRate}%`}
                subtitle={t('{{count}} đơn đã hủy', { count: summary.cancelledOrders })}
                icon={CheckCircle2}
                colorClass="bg-gradient-to-br from-amber-100 to-amber-200 text-amber-700 dark:from-amber-500/20 dark:to-amber-500/10 dark:text-amber-400"
                growth={null}
            />
        </section>
    );
};
