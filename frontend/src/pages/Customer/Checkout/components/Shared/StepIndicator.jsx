import React from 'react';
import { Check } from 'lucide-react';

const StepIndicator = ({ currentStep, t }) => {
    const steps = [
        { key: 1, label: t('step_1', 'Giỏ hàng') },
        { key: 2, label: t('step_2', 'Thanh toán') },
        { key: 3, label: t('step_3', 'Hoàn tất') }
    ];

    return (
        <div className="flex items-center justify-center mb-12 animate-in fade-in zoom-in-95 duration-500">
            <div className="flex items-center w-full max-w-2xl">
                {steps.map((step, index) => {
                    const isCompleted = currentStep > step.key;
                    const isActive = currentStep === step.key;
                    const isPending = currentStep < step.key;
                    
                    return (
                        <React.Fragment key={step.key}>
                            <div className="flex flex-col items-center flex-1 z-10 relative">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-all duration-300 ${
                                    isCompleted ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/20' :
                                    isActive ? 'border-2 border-yellow-500 bg-yellow-50/50 dark:bg-yellow-500/10 text-yellow-500 shadow-md' :
                                    'border-2 border-slate-200 dark:border-white/10 text-slate-400 dark:text-slate-500'
                                }`}>
                                    {isCompleted ? <Check strokeWidth={3} size={18} /> : step.key}
                                </div>
                                <span className={`text-[11px] tracking-widest uppercase font-bold transition-colors ${
                                    isActive || isCompleted ? 'text-slate-900 dark:text-yellow-500' : 'text-slate-400 dark:text-slate-500'
                                }`}>
                                    {step.label}
                                </span>
                            </div>
                            
                            {index < steps.length - 1 && (
                                <div className={`h-[2px] flex-[2] -mt-6 transition-colors duration-500 ${
                                    currentStep > index + 1 ? 'bg-yellow-500' : 'bg-slate-200 dark:bg-white/10'
                                }`} />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default StepIndicator;
