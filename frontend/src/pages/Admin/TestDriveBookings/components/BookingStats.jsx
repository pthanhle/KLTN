import React from 'react';
import { Calendar, AlertCircle, Home, Store } from 'lucide-react';

const BookingStats = ({ stats, t }) => {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in">
            <StatCard 
                icon={<Calendar className="w-16 h-16" />} 
                title={t('adminTestDriveBookings:stat_today', 'Hôm Nay')} 
                value={stats.total} 
                iconSmall={<Calendar className="w-5 h-5" />} 
                colorClass="text-yellow-500" 
            />
            <StatCard 
                icon={<AlertCircle className="w-16 h-16" />} 
                title={t('adminTestDriveBookings:stat_pending', 'Chờ Phân Công')} 
                value={stats.pending} 
                iconSmall={<AlertCircle className="w-5 h-5" />} 
                colorClass="text-red-500" 
            />
            <StatCard 
                icon={<Home className="w-16 h-16" />} 
                title={t('adminTestDriveBookings:stat_home', 'Lái Thử Tại Nhà')} 
                value={stats.home} 
                iconSmall={<Home className="w-5 h-5" />} 
                colorClass="text-secondary" 
            />
            <StatCard 
                icon={<Store className="w-16 h-16" />} 
                title={t('adminTestDriveBookings:stat_showroom', 'Tại Showroom')} 
                value={stats.showroom} 
                iconSmall={<Store className="w-5 h-5" />} 
                colorClass="text-tertiary" 
            />
        </section>
    );
};

const StatCard = ({ icon, title, value, iconSmall, colorClass }) => (
    <div className="bg-white dark:bg-[#141416] rounded-xl p-6 border border-slate-200 dark:border-white/5 shadow-sm relative overflow-hidden group flex flex-col justify-between h-32 transition-all hover:border-yellow-500/30">
        <div className="flex items-center justify-between relative z-10 w-full">
            <h3 className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold flex-1 pr-2">{title}</h3>
            <div className={`w-10 h-10 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center border border-slate-100 dark:border-white/5 flex-shrink-0 ${colorClass}`}>
                {iconSmall}
            </div>
        </div>
        <p className="text-3xl font-black text-slate-800 dark:text-white relative z-10 tracking-tight mt-auto">{value}</p>
    </div>
);

export default BookingStats;
