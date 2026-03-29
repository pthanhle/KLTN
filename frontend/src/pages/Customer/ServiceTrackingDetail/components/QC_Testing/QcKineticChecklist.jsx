import React from 'react';
import { useTranslation } from 'react-i18next';
import { Cpu, Wind, Sparkles, Disc, CheckCircle2 } from 'lucide-react';

const iconMap = {
    Cpu: Cpu,
    Wind: Wind,
    Sparkles: Sparkles,
    Disc: Disc
};

const QcKineticChecklist = ({ tasks }) => {
    const { t } = useTranslation('tracking');

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tasks.map(task => {
                const IconComponent = iconMap[task.icon] || Cpu;
                const isCompleted = task.status === 'completed';
                const isProcessing = task.status === 'processing';
                const isPending = task.status === 'pending';

                return (
                    <div key={task.id} className={`group p-8 rounded-xl transition-all duration-300 relative border ${isPending ? 'bg-slate-50/50 dark:bg-[#070d1f] border-slate-200 dark:border-white/10' : 'bg-white dark:bg-[#191f31] hover:bg-slate-50 dark:hover:bg-[#23293c] border-slate-200 dark:border-white/10 shadow-sm'}`}>
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-2xl ${
                                isCompleted ? 'bg-emerald-50 dark:bg-[#4edea3]/10 text-emerald-600 dark:text-[#4edea3]' :
                                isProcessing ? 'bg-yellow-50 dark:bg-[#ffd165]/10 text-yellow-600 dark:text-[#ffd165]' :
                                'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-[#d3c5ac]'
                            }`}>
                                <IconComponent className="w-6 h-6" />
                            </div>

                            {isCompleted && <CheckCircle2 className="w-8 h-8 text-emerald-500 dark:text-[#4edea3]" />}
                            {isProcessing && <span className="text-xs font-bold uppercase tracking-widest text-yellow-600 dark:text-[#ffd165] animate-pulse">{t('status_processing', 'Đang xử lý')}</span>}
                            {isPending && <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-[#d3c5ac]">{t('status_pending', 'Chờ thực hiện')}</span>}
                        </div>
                        <h3 className={`text-lg font-bold uppercase tracking-tight mb-2 ${isPending ? 'text-slate-400 dark:text-white/50' : 'text-slate-900 dark:text-white'}`}>
                            {task.title}
                        </h3>
                        <p className={`text-sm leading-relaxed ${isPending ? 'text-slate-400 dark:text-[#d3c5ac]/50' : 'text-slate-600 dark:text-[#d3c5ac]'}`}>
                            {task.desc}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default QcKineticChecklist;
