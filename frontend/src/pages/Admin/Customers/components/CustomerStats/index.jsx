import { Skeleton } from 'antd';
import { Users, Star, Activity, UserPlus } from 'lucide-react';
import { StatCard } from './StatCard';

export const CustomerStats = ({ stats, isLoading, t }) => {
    if (isLoading) {
        return (
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[1, 2, 3, 4].map(idx => (
                    <Skeleton.Button key={idx} active className="!w-full !h-[140px] !rounded-2xl" />
                ))}
            </section>
        );
    }

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
                t={t}
                title={t('adminCustomers:statsTotal', 'Tổng khách hàng')} 
                value={stats?.total_customers?.toLocaleString() || 0} 
                icon={<Users size={20} />} 
                trend={stats?.total_trend || 0} 
                trendLabel={t('adminCustomers:statsVsLastMonth', 'vs tháng trước')}
                iconBg="bg-blue-500/10 dark:bg-blue-500/20"
                iconColor="text-blue-600 dark:text-blue-400"
                delay={0}
            />
            <StatCard 
                t={t}
                title={t('adminCustomers:statsVip', 'Khách hàng VIP')} 
                value={stats?.vip_customers?.toLocaleString() || 0} 
                icon={<Star size={20} />} 
                trend={stats?.vip_trend || 0} 
                trendLabel={t('adminCustomers:statsNewUpgrades', 'thăng hạng mới')}
                iconBg="bg-yellow-500/10 dark:bg-yellow-500/20"
                iconColor="text-yellow-600 dark:text-yellow-400"
                delay={100}
            />
            <StatCard 
                t={t}
                title={t('adminCustomers:statsRetention', 'Tỷ lệ duy trì')} 
                value={`${stats?.retention_rate || 0}%`} 
                icon={<Activity size={20} />} 
                trend={stats?.retention_trend || 0} 
                trendLabel={t('adminCustomers:statsVsLastQuarter', 'so với quý trước')}
                iconBg="bg-emerald-500/10 dark:bg-emerald-500/20"
                iconColor="text-emerald-600 dark:text-emerald-400"
                delay={200}
            />
            <StatCard 
                t={t}
                title={t('adminCustomers:statsNewWeek', 'Mới tuần này')} 
                value={stats?.new_this_week?.toLocaleString() || 0} 
                icon={<UserPlus size={20} />} 
                trend={stats?.new_trend || 0} 
                trendLabel={t('adminCustomers:statsVsLastWeek', 'so với tuần trước')}
                iconBg="bg-purple-500/10 dark:bg-purple-500/20"
                iconColor="text-purple-600 dark:text-purple-400"
                delay={300}
            />
        </section>
    );
};
