import { Check, Loader2 } from 'lucide-react';

const ServiceProgressSteps = ({ isCompleted, isInProgress, t }) => {
    const renderStep = (label, isActive, isDone, stepNumber) => (
        <div className="flex flex-col items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold ${isDone ? 'bg-[#0a0a0b] dark:bg-white text-white dark:text-[#0a0a0b]' :
                    isActive ? 'border-2 border-yellow-500 text-yellow-600 dark:text-yellow-500 animate-pulse' :
                        'border-2 border-slate-200 dark:border-white/10 text-slate-400'
                }`}>
                {isDone ? <Check size={14} /> : (isActive && label === t('service_step_progress', 'Đang xử lý')) ? <Loader2 size={14} className="animate-spin" /> : stepNumber}
            </div>
            <span className={`text-[10px] sm:text-xs font-bold ${isDone ? 'text-slate-900 dark:text-white' :
                    isActive ? 'text-yellow-600 dark:text-yellow-500' :
                        'text-slate-400'
                }`}>
                {label}
            </span>
        </div>
    );

    return (
        <div className="flex items-center justify-between mb-8 opacity-90">
            {renderStep(t('service_step_checkin', 'Tiếp nhận'), true, true, 1)}
            <div className={`flex-1 h-px mx-2 sm:mx-4 ${isCompleted || isInProgress ? 'bg-slate-900 dark:bg-white' : 'bg-slate-200 dark:bg-slate-800'}`}></div>
            {renderStep(t('service_step_progress', 'Đang xử lý'), isInProgress, isCompleted, 2)}
            <div className={`flex-1 h-px mx-2 sm:mx-4 ${isCompleted ? 'bg-slate-900 dark:bg-white' : 'bg-slate-200 dark:bg-slate-800'}`}></div>
            {renderStep(t('service_step_completed', 'Hoàn thành'), false, isCompleted, 3)}
        </div>
    );
};

export default ServiceProgressSteps;
