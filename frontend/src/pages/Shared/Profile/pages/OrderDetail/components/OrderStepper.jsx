export const OrderStepper = ({ status, steps, currentStepIndex }) => {
    const isOrderDone = status === 'COMPLETED' || status === 'DELIVERED';

    return (
        <section className="bg-white dark:bg-[#141416] rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 dark:border-white/5" data-purpose="order-stepper">
            <div className="relative flex items-center justify-between">
                {/* Background Line */}
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 dark:bg-slate-800 -translate-y-1/2 -z-0 rounded-full"></div>
                {/* Active Line */}
                <div 
                    className={`absolute top-1/2 left-0 h-0.5 ${isOrderDone ? 'bg-green-500' : 'bg-yellow-500'} -translate-y-1/2 -z-0 transition-all duration-500 rounded-full`}
                    style={{ width: `${(currentStepIndex / Math.max(1, steps.length - 1)) * 100}%` }}
                ></div>

                {steps.map((step, idx) => {
                    const isCompleted = isOrderDone ? idx <= currentStepIndex : idx < currentStepIndex;
                    const isActive = isOrderDone ? false : idx === currentStepIndex;
                    const isPending = idx > currentStepIndex;
                    
                    const IconObj = step.icon;

                    return (
                        <div key={idx} className="relative z-10 flex flex-col items-center group w-1/4">
                            <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-[#141416] transition-all duration-300 ${
                                isCompleted ? 'bg-green-500 text-white' : 
                                isActive ? 'bg-yellow-500 text-slate-900 shadow-[0_0_15px_rgba(234,179,8,0.5)] scale-110' : 
                                'bg-slate-100 dark:bg-slate-800 text-slate-400'
                            }`}>
                                <IconObj className={`${isActive ? 'w-5 h-5 sm:w-6 sm:h-6' : 'w-4 h-4 sm:w-5 sm:h-5'}`} />
                            </div>
                            <p className={`mt-3 text-[10px] sm:text-xs md:text-sm font-bold text-center ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                                {step.label}
                            </p>
                            <p className={`text-[9px] sm:text-xs text-center hidden sm:block ${isActive ? 'text-yellow-500 font-medium' : 'text-slate-400'}`}>
                                {step.time}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default OrderStepper;
