import { Check } from 'lucide-react';

const OrderProgress = ({ timelineSteps }) => {
    return (
        <div className="max-w-3xl mx-auto mb-20 px-4">
            <div className="relative flex items-center justify-between">
                {/* Connecting Line */}
                <div className="absolute left-[10%] right-[10%] h-[2px] bg-slate-200 dark:bg-white/10 top-5 -z-10">
                    <div className="h-full bg-emerald-500 w-[25%] transition-all duration-1000 ease-out"></div>
                </div>

                {timelineSteps.map((step) => (
                    <div key={step.id} className="flex flex-col items-center gap-4 bg-[#f8fafc] dark:bg-[#0a0a0b] px-4">
                        <div 
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm transition-all duration-500
                                ${step.status === 'completed' 
                                    ? 'bg-emerald-500 text-white !shadow-emerald-500/30' 
                                    : 'bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400 border border-white dark:border-[#0a0a0b]'
                                }
                            `}
                        >
                            {step.status === 'completed' ? <Check size={20} strokeWidth={3} /> : `0${step.id}`}
                        </div>
                        <span 
                            className={`text-[10px] sm:text-xs font-black uppercase tracking-widest
                                ${step.status === 'completed' ? 'text-emerald-500 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}
                            `}
                        >
                            {step.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderProgress;
