import React from 'react';
import { Card, Skeleton } from 'antd';
import { Megaphone, Ticket, Flame } from 'lucide-react';
import { formatVND } from '../../../../Customer/Cars/utils/formatters';

const PromotionsStats = ({ stats, loading, t }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border border-slate-100 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-[#141416]">
                <Skeleton loading={loading} active avatar={{ shape: 'square', size: 48 }} paragraph={{ rows: 1 }}>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-500">
                            <Megaphone size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">{t('stats_active')}</p>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-none">{stats.active_campaigns}</h3>
                        </div>
                    </div>
                </Skeleton>
            </Card>

            <Card className="border border-slate-100 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-[#141416]">
                <Skeleton loading={loading} active avatar={{ shape: 'square', size: 48 }} paragraph={{ rows: 1 }}>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                            <Ticket size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">{t('stats_claimed')}</p>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-none">{stats.total_claimed?.toLocaleString('vi-VN')}</h3>
                        </div>
                    </div>
                </Skeleton>
            </Card>

            <Card className="border border-slate-100 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-[#141416]">
                <Skeleton loading={loading} active avatar={{ shape: 'square', size: 48 }} paragraph={{ rows: 1 }}>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-orange-500">
                            <Flame size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">{t('stats_burned')}</p>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-none">{stats.points_burned?.toLocaleString('vi-VN')}</h3>
                        </div>
                    </div>
                </Skeleton>
            </Card>
        </div>
    );
};

export default PromotionsStats;


