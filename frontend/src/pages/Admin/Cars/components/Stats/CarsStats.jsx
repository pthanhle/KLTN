import { Skeleton } from 'antd';
import { Car, Wallet, AlertTriangle, Key, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import StatCard from './StatCard';

const CarsStats = ({ stats, isLoading }) => {
    const { t, i18n } = useTranslation('adminCars');

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10 w-full relative z-10">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="bg-white dark:bg-[#141416] p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
                        <Skeleton active paragraph={{ rows: 2 }} />
                    </div>
                ))}
            </div>
        );
    }

    if (!stats) return null;

    const lastUpdateStr = i18n.language === 'en' ? stats.lastUpdateEn : stats.lastUpdateVi;

    const formatBillion = (val) => {
        if (!val) return '0';
        const inBillion = val / 1000000000;
        return new Intl.NumberFormat('vi-VN', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 3
        }).format(inBillion);
    };

    const formatNumber = (val) => {
        if (!val) return '0';
        return new Intl.NumberFormat('vi-VN').format(val);
    };
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10 w-full relative z-10">
            <StatCard
                title={t('statsTitleFleet', 'Tổng Quy Mô Xe')}
                value={formatNumber(stats.totalFleet)}
                unit={t('statsUnitCar', 'Xe')}
                icon={Car}
                valueColorClass="text-slate-900 dark:text-white"
                iconGradientClass="from-blue-500 to-blue-700 shadow-blue-200"
                shadowHoverClass="hover:shadow-blue-500/10 dark:hover:shadow-blue-500/5"
                footerContent={
                    <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 rounded-full bg-green-50 dark:bg-green-500/10 px-2 py-0.5 text-xs font-bold text-green-600 dark:text-green-400">
                            <TrendingUp size={14} strokeWidth={3} />
                            +{stats.fleetGrowthPercentage}%
                        </span>
                        <span className="text-xs text-slate-400 font-medium">{t('statsDescFleet', 'so với tháng trước')}</span>
                    </div>
                }
            />

            <StatCard
                title={t('statsTitleValue', 'Tổng Giá Trị Kho')}
                value={formatBillion(stats.totalValue)}
                unit={t('statsUnitBillion', 'Tỷ')}
                icon={Wallet}
                valueColorClass="text-amber-600 dark:text-[#ffd165]"
                iconGradientClass="from-amber-400 to-amber-600 shadow-amber-200"
                shadowHoverClass="hover:shadow-yellow-500/10 dark:hover:shadow-yellow-500/5"
                footerContent={
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter italic">{t('statsDescValue', 'VNĐ • Cập nhật {{time}}', { time: lastUpdateStr })}</span>
                }
            />

            <StatCard
                title={t('statsTitleLowStock', 'Cảnh Báo Sắp Hết Hàng')}
                value={formatNumber(stats.lowStockModels)}
                unit={t('statsUnitModel', 'Mẫu')}
                icon={AlertTriangle}
                valueColorClass="text-slate-900 dark:text-white"
                iconGradientClass="from-orange-500 to-red-600 shadow-orange-200"
                shadowHoverClass="hover:shadow-red-500/10 dark:hover:shadow-red-500/5"
                borderHoverClass="border-red-50 dark:border-red-500/20"
                footerContent={
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                        <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase">{t('statsDescLowStock', 'Yêu cầu nhập hàng ngay')}</span>
                    </div>
                }
            />

            <StatCard
                title={t('statsTitleDemo', 'Đội Xe Lái Thử')}
                value={formatNumber(stats.demoCars)}
                unit={t('statsUnitCar', 'Xe')}
                icon={Key}
                valueColorClass="text-slate-900 dark:text-white"
                iconGradientClass="from-indigo-500 to-indigo-700 shadow-indigo-200"
                shadowHoverClass="hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/5"
                footerContent={
                    <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                            <div className="h-6 w-6 rounded-full border-2 border-white dark:border-[#141416] bg-slate-200 dark:bg-slate-700"></div>
                            <div className="h-6 w-6 rounded-full border-2 border-white dark:border-[#141416] bg-slate-300 dark:bg-slate-600"></div>
                            <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white dark:border-[#141416] bg-indigo-100 dark:bg-indigo-500/20 text-[10px] font-bold text-indigo-600 dark:text-indigo-400">+{stats.activeDemoChange}</div>
                        </div>
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-tighter">{t('statsDescDemo', 'Đang hoạt động')}</span>
                    </div>
                }
            />
        </div>
    );
};

export default CarsStats;
