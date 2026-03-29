import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const StatCard = ({ title, value, icon, trend, trendLabel, iconColor, iconBg, delay, t }) => {
    return (
        <div 
            className={`bg-white dark:bg-[#141416] p-7 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm relative overflow-hidden group hover:border-yellow-500/50 dark:hover:border-premium-gold/50 transition-all cursor-default animate-fade-in-up`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="flex justify-between items-start relative z-10">
                <div>
                    <h3 className="uppercase text-[10px] tracking-[0.2em] font-black text-slate-500 dark:text-slate-400 mb-1">{title}</h3>
                    <p className="text-3xl font-black text-slate-800 dark:text-white">{value}</p>
                </div>
                <div className={`${iconBg} ${iconColor} p-2.5 rounded-xl`}>
                    {icon}
                </div>
            </div>
            
            <div className="mt-8 flex items-center gap-2 text-xs font-bold">
                {trend > 0 ? (
                    <span className="text-emerald-500 flex items-center gap-1"><TrendingUp size={14} /> +{trend}%</span>
                ) : trend < 0 ? (
                    <span className="text-red-500 flex items-center gap-1"><TrendingDown size={14} /> {trend}%</span>
                ) : (
                    <span className="text-slate-400 flex items-center gap-1"><Minus size={14} /> {t('adminCustomers:statsEqual', 'Tương đương')}</span>
                )}
                <span className="text-slate-400 font-medium">{trendLabel}</span>
            </div>
            
            {/* Sparkline Mask (Abstract representation) */}
            <div className="absolute bottom-0 left-0 w-full h-16 opacity-5 pointer-events-none" style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
                <svg className="w-full h-full" viewBox="0 0 100 20">
                    <path d={trend > 0 ? "M0 15 Q 10 5, 20 12 T 40 8 T 60 14 T 80 5 T 100 10" : trend < 0 ? "M0 5 Q 10 15, 30 12 T 60 18 T 100 15" : "M0 10 Q 25 10, 50 10 T 100 10"} fill="transparent" stroke="currentColor" strokeWidth="1.5"></path>
                </svg>
            </div>
        </div>
    );
};
