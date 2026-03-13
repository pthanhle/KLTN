import { ChevronRight } from 'lucide-react';
import { Image } from 'antd';

const HistoryCard = ({ history }) => {
    return (
        <div className="flex flex-col min-w-[240px] w-[240px] sm:w-[280px] shrink-0 group cursor-pointer bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5 overflow-hidden transition-all hover:border-yellow-200 dark:hover:border-yellow-500/30">
            <div className="h-32 bg-slate-200 dark:bg-[#141416] w-full relative overflow-hidden">
                <Image 
                    src={history.image} 
                    alt={history.name} 
                    wrapperClassName="w-full h-full"
                    className="!w-full !h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-white line-clamp-1 mb-1">{history.name}</h4>
                    <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-semibold">{history.time}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 dark:text-slate-300">{history.engine}</span>
                    <ChevronRight size={14} className="text-slate-400 dark:text-slate-500 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors" />
                </div>
            </div>
        </div>
    );
};

export default HistoryCard;
