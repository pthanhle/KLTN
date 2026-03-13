import React from 'react';

const BookingStepper = ({ currentStep, t }) => {
    return (
        <div className="relative flex justify-between items-start w-full max-w-4xl mx-auto mb-10 lg:mb-16 mt-6 px-4">
            
            {/* Global Background Line (Fixed z-index to 0, width starts at middle of first step and ends at middle of last) */}
            <div className="absolute top-5 left-[16.66%] right-[16.66%] h-[2px] bg-slate-200 dark:bg-white/10 z-0"></div>

            {/* Dynamic Fill Line */}
            <div 
                className="absolute top-5 left-[16.66%] h-[2px] bg-yellow-500 z-0 transition-all duration-700 ease-in-out"
                style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '33.33%' : '66.66%' }}
            ></div>

            {/* Steps Rendering */}
            {[
                { step: 1, label: t('services:step1_short', 'Vehicle Info') },
                { step: 2, label: t('services:step2_short', 'Date & Time') },
                { step: 3, label: t('services:step3_short', 'Confirmation') },
            ].map(({ step, label }) => {
                const isActive = currentStep >= step;
                return (
                    <div key={step} className="flex flex-col items-center gap-3 relative z-10 w-1/3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ring-8 ring-slate-50 dark:ring-[#0a0a0b] ${
                            isActive 
                            ? 'bg-yellow-500 text-white shadow-[0_0_15px_rgba(234,179,8,0.4)]' 
                            : 'bg-white dark:bg-[#141416] border-2 border-slate-200 dark:border-white/10 text-slate-400 dark:text-slate-500'
                        }`}>
                            {step}
                        </div>
                        <span className={`text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-center ${
                            isActive ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'
                        }`}>
                            {label}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default BookingStepper;
