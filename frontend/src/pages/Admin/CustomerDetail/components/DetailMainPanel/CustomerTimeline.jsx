import { CalendarRange, ShieldAlert, PhoneForwarded, CalendarCheck2 } from 'lucide-react';
import { formatDate } from '../../../Customers/utils/format';

export const CustomerTimeline = ({ engagements, t }) => {
    if (!engagements || engagements.length === 0) return null;

    return (
        <div className="mt-12">
            <h3 className="text-[11px] tracking-[0.2em] font-black text-yellow-600 dark:text-premium-gold uppercase mb-8">
                {t('adminCustomers:sectionEngagements', 'Upcoming Engagements')}
            </h3>
            
            <div className="space-y-4">
                {engagements.map((item, index) => (
                    <div key={item.id} className="relative flex items-center gap-4 bg-white dark:bg-[#141416] p-5 rounded-2xl border border-slate-100 dark:border-white/5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] group hover:border-yellow-500/30 transition-all">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 
                            ${item.is_overdue ? 'bg-red-50 text-red-500 dark:bg-red-500/10' : 'bg-blue-50 text-blue-500 dark:bg-blue-500/10'}`}>
                            {item.is_overdue ? <ShieldAlert size={20} className="animate-pulse" /> : <CalendarRange size={20} />}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] uppercase font-black tracking-widest px-2 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400">
                                    {item.car_name}
                                </span>
                                {item.is_overdue && (
                                    <span className="text-[10px] uppercase font-black tracking-widest px-2 py-0.5 rounded bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400">
                                        {t('adminCustomers:timelineOverdue', 'Quá lịch hẹn')}
                                    </span>
                                )}
                            </div>
                            <h5 className="font-black text-slate-800 dark:text-white tracking-tight">
                                {item.milestone} • <span className="font-bold text-slate-500 dark:text-slate-400">{item.recommended_service}</span>
                            </h5>
                            <p className="text-[10px] uppercase tracking-widest font-bold mt-1.5 text-slate-500 dark:text-slate-500 flex items-center gap-1.5 flex-wrap">
                                <span>{formatDate(item.expected_date)}</span>
                                <span className="w-1 h-1 rounded-full bg-slate-200 dark:bg-white/10"></span>
                                <span>{item.location}</span>
                                {item.advisor_info?.name && (
                                    <>
                                        <span className="w-1 h-1 rounded-full bg-slate-200 dark:bg-white/10"></span>
                                        <span className="text-yellow-600 dark:text-premium-gold">{t('adminCustomers:advisorLabel', 'Cố vấn:')} {item.advisor_info.name}</span>
                                    </>
                                )}
                            </p>
                        </div>
                        <button className={`hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-black tracking-widest uppercase transition-colors
                            ${item.status === 'PENDING_CALL' 
                                ? 'bg-yellow-500 text-white hover:bg-yellow-600 shadow-md shadow-yellow-500/20' 
                                : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/20'
                            }`}>
                            {item.status === 'PENDING_CALL' ? <PhoneForwarded size={14} /> : <CalendarCheck2 size={14} />}
                            {item.status === 'PENDING_CALL' ? t('adminCustomers:btnContact', 'Gọi Nhắc Lịch') : t('adminCustomers:btnConfirm', 'Đã Lên Lịch')}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
