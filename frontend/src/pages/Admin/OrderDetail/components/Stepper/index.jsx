import React from 'react';
import { Skeleton } from 'antd';
import { Package } from 'lucide-react';
import { STEP_STATUS_MAP } from '../../../Orders/constants/statusConfig';
import { getStepperItems } from './constants';
import { StepItem } from './StepItem';

export const OrderStepper = ({ order, loading, t }) => {
    if (loading) {
        return (
            <section className="bg-white dark:bg-[#141416] rounded-2xl p-8 border border-slate-200 dark:border-white/5 mb-8">
                <Skeleton active paragraph={{ rows: 2 }} />
            </section>
        );
    }

    const currentStep = STEP_STATUS_MAP[order.order_status] ?? 0;

    if (currentStep === -1) {
        return (
            <section className="bg-red-50 dark:bg-red-500/10 rounded-2xl p-8 border border-red-200 dark:border-red-500/20 mb-8">
                <h2 className="text-[11px] uppercase tracking-widest font-bold text-red-600 dark:text-red-500 mb-2">
                    {t('step_cancelled')}
                </h2>
                <p className="text-sm font-medium text-red-700 dark:text-red-400">
                    {t('cancel_reason')} {order.cancel_reason || t('not_available')}
                </p>
            </section>
        );
    }

    const items = getStepperItems(t);
    // Calculate progress width. e.g., 5 items -> 4 segments.
    // If currentStep = 2, width = 2/4 = 50%
    const totalSegments = items.length - 1;
    const progressWidth = `${(Math.min(currentStep, totalSegments) / totalSegments) * 100}%`;

    return (
        <section className="bg-white dark:bg-[#141416] rounded-2xl p-8 border border-slate-200 dark:border-white/5 mb-8">
            <h2 className="text-[11px] uppercase tracking-widest font-bold text-slate-500 dark:text-[#d3c5ac] mb-10 flex items-center gap-2">
                <Package size={16} /> {t('progress_title')}
            </h2>

            <div className="relative max-w-4xl mx-auto px-2">
                {/* Minimal Background Line */}
                <div className="absolute top-4 left-10 right-10 sm:left-12 sm:right-12 h-[1px] bg-slate-200 dark:bg-white/10">
                    {/* Active Progress Line */}
                    <div 
                        className="absolute top-0 left-0 bottom-0 bg-emerald-500 transition-all duration-700 ease-out"
                        style={{ width: progressWidth }}
                    ></div>
                </div>

                {/* Steps Container */}
                <div className="relative flex justify-between">
                    {items.map((item, index) => (
                        <StepItem 
                            key={item.id} 
                            item={item} 
                            index={index} 
                            orderStatus={order.order_status}
                            currentStep={currentStep}
                            isFinalStep={currentStep === items.length - 1} 
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
