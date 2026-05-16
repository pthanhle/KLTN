import { LLOYALTY_TIERS } from '../../constants/loyalty';
import { Award } from 'lucide-react';
import { formatVND } from '../../../Customers/utils/format';

export const CustomerBentoHighlights = ({ customer, t }) => {
    const tier = customer.loyalty?.tier || 'BRONZE';
    const currentConfig = LLOYALTY_TIERS[tier] || LLOYALTY_TIERS['BRONZE'];
    const nextTierKey = currentConfig.next;
    const nextConfig = nextTierKey ? LLOYALTY_TIERS[nextTierKey] : null;

    const accumulatedPoints = customer.loyalty?.accumulated_points || 0;
    const pointsNeeded = nextConfig ? Math.max(nextConfig.minPoints - accumulatedPoints, 0) : 0;

    return (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-slate-50 dark:bg-[#141416] rounded-2xl p-8 border-l-4 border-yellow-500 flex flex-col justify-between h-[200px]">
                <h4 className="text-[11px] tracking-[0.2em] font-black text-yellow-600 dark:text-premium-gold uppercase mb-6 flex justify-between items-center">
                    {t('adminCustomers:bentoRecentInvoice', 'Hóa đơn dịch vụ khu vực')}
                    <span className="text-slate-400 font-bold ml-2">{customer.service_history?.[0]?.invoice_code || '#N/A'}</span>
                </h4>

                <div className="flex justify-between items-center mb-6">
                    <div>
                        <p className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-widest leading-none">
                            {customer.service_history?.[0]?.service_type || 'Chưa phát sinh'}
                        </p>
                        <p className="text-3xl font-black tracking-tighter mt-2 text-slate-800 dark:text-white">
                            {formatVND(customer.service_history?.[0]?.price || 0)}
                        </p>
                    </div>
                </div>

                <div className="mt-auto flex gap-3">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black tracking-widest uppercase ${customer.service_history?.[0]?.status === 'PAID' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`}>
                        {customer.service_history?.[0]?.status === 'PAID' ? t('adminCustomers:statusPaid', 'ĐÃ THANH TOÁN') : t('adminCustomers:statusUnpaid', 'CHƯA THANH TOÁN')}
                    </span>
                    <span className="px-3 py-1 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 rounded-lg text-[10px] font-black tracking-widest uppercase shadow-sm">
                        {customer.service_history?.[0]?.date ? new Date(customer.service_history[0].date).toLocaleDateString('vi-VN') : '-'}
                    </span>
                </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-400 to-amber-500 dark:from-premium-gold dark:to-yellow-600 rounded-2xl p-8 flex flex-col justify-between shadow-xl shadow-yellow-500/20 h-[200px]">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md mb-4">
                    <Award strokeWidth={2} size={24} />
                </div>
                <div>
                    <p className="text-[11px] tracking-[0.2em] font-black text-yellow-900/60 uppercase mb-1">
                        {t('adminCustomers:loyaltyPoints', 'Điểm thành viên')}
                    </p>
                    <p className="text-4xl font-black tracking-tighter text-slate-900 border-b border-black/10 pb-2 mb-2">
                        {accumulatedPoints.toLocaleString('vi-VN')}
                    </p>
                    {nextTierKey ? (
                        <p className="text-[10px] font-bold text-yellow-900/60 uppercase tracking-widest">
                            {pointsNeeded.toLocaleString('vi-VN')} {t('adminCustomers:loyaltyLabel', 'điểm cần cho hạng VIP')} {nextTierKey}
                        </p>
                    ) : (
                        <p className="text-[10px] font-bold text-yellow-900/60 uppercase tracking-widest">
                            MAX RANK REACHED
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
