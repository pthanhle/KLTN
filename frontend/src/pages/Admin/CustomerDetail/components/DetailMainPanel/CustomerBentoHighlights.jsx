import { LLOYALTY_TIERS } from '../../constants/loyalty';
import { Award, FileText } from 'lucide-react';
import { formatVND } from '../../../Customers/utils/format';
import { useState, useEffect } from 'react';
import axiosClient from '../../../../../utils/axiosClient';

export const CustomerBentoHighlights = ({ customer, t }) => {
    const tier = customer.loyalty?.tier || 'BRONZE';
    const currentConfig = LLOYALTY_TIERS[tier] || LLOYALTY_TIERS['BRONZE'];
    const nextTierKey = currentConfig.next;
    const nextConfig = nextTierKey ? LLOYALTY_TIERS[nextTierKey] : null;

    const accumulatedPoints = customer.loyalty?.accumulated_points || 0;
    const pointsNeeded = nextConfig ? Math.max(nextConfig.minPoints - accumulatedPoints, 0) : 0;

    const [contractStats, setContractStats] = useState({ count: 0, totalValue: 0 });

    useEffect(() => {
        if (!customer._id) return;
        axiosClient.get(`/admin/contracts?customerId=${customer._id}&limit=100`).then(res => {
            if (res && res.success && res.data) {
                const total = res.total || res.data.length;
                const totalValue = res.data.reduce((sum, c) => sum + (c.total_value || 0), 0);
                setContractStats({ count: total, totalValue });
            }
        }).catch(() => {});
    }, [customer._id]);

    return (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-slate-50 dark:bg-[#141416] rounded-2xl p-8 border-l-4 border-blue-500 flex flex-col justify-between h-[200px]">
                <h4 className="text-[11px] tracking-[0.2em] font-black text-blue-600 dark:text-blue-400 uppercase mb-4 flex justify-between items-center">
                    Hợp Đồng Khách Hàng
                    <span className="text-slate-400 font-bold ml-2 text-xs">{contractStats.count} hợp đồng</span>
                </h4>

                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none mb-2">
                            Tổng giá trị hợp đồng
                        </p>
                        <p className="text-3xl font-black tracking-tighter text-slate-800 dark:text-white">
                            {formatVND(contractStats.totalValue)}
                        </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/10 dark:bg-blue-500/20 rounded-xl flex items-center justify-center">
                        <FileText size={22} className="text-blue-500" />
                    </div>
                </div>

                <div className="mt-auto flex gap-3">
                    <span className="px-3 py-1 rounded-lg text-[10px] font-black tracking-widest uppercase bg-blue-500/10 text-blue-600 dark:text-blue-400">
                        {contractStats.count > 0 ? 'Có hợp đồng' : 'Chưa có hợp đồng'}
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
