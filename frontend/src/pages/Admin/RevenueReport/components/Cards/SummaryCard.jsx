import { GrowthBadge } from './GrowthBadge';

export const SummaryCard = ({ title, value, subtitle, icon: Icon, colorClass, growth }) => (
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
