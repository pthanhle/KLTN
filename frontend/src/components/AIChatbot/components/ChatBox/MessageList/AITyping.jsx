import { CarFront } from 'lucide-react';

const AITyping = () => {
    return (
        <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="bg-yellow-500 p-1.5 rounded-xl text-slate-900 shrink-0 shadow-md shadow-yellow-500/20 h-max">
                <CarFront size={18} className="stroke-slate-900" />
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/40 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1.5 items-center border border-slate-200 dark:border-white/5">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
        </div>
    );
};
export default AITyping;
