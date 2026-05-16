import React from 'react';
import { Skeleton, Steps } from 'antd';
import { Package, Clock, CheckCircle2, Truck, CheckCheck } from 'lucide-react';
import { STEP_STATUS_MAP } from '../../Orders/constants/statusConfig';

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

    const items = [
        {
            title: t('step_created'),
            icon: <Package size={20} />
        },
        {
            title: t('step_pending'),
            icon: <Clock size={20} />
        },
        {
            title: t('step_confirmed'),
            icon: <CheckCircle2 size={20} />
        },
        {
            title: t('step_shipping'),
            icon: <Truck size={20} />
        },
        {
            title: t('step_completed'),
            icon: <CheckCheck size={20} />
        }
    ];

    return (
        <section className="bg-white dark:bg-[#141416] rounded-2xl p-8 border border-slate-200 dark:border-white/5 relative overflow-hidden mb-8">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none"></div>
            <h2 className="text-[11px] uppercase tracking-widest font-bold text-slate-500 dark:text-[#d3c5ac] mb-8 flex items-center gap-2">
                <Package size={16} /> {t('progress_title')}
            </h2>

            <Steps
                current={currentStep}
                items={items}
                className="custom-stepper"
            />
            <style>{`
                .custom-stepper .ant-steps-item-finish .ant-steps-item-icon {
                    background-color: #eab308;
                    border-color: #eab308;
                }
                .custom-stepper .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
                    color: white;
                }
                .custom-stepper .ant-steps-item-process .ant-steps-item-icon {
                    background-color: transparent;
                    border-color: #eab308;
                }
                .custom-stepper .ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon {
                    color: #eab308;
                }
                .custom-stepper .ant-steps-item-wait .ant-steps-item-icon {
                    background-color: transparent;
                    border-color: #334155;
                }
                .custom-stepper .ant-steps-item-wait .ant-steps-item-icon > .ant-steps-icon {
                    color: #64748b;
                }
                .custom-stepper .ant-steps-item-title {
                    font-size: 11px !important;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    font-weight: 700 !important;
                    margin-top: 8px;
                }
                .dark .custom-stepper .ant-steps-item-title {
                    color: #dce1fb !important;
                }
                .dark .custom-stepper .ant-steps-item-wait .ant-steps-item-title {
                    color: #64748b !important;
                }
                .custom-stepper .ant-steps-item-tail::after {
                    background-color: #334155;
                }
                .custom-stepper .ant-steps-item-finish > .ant-steps-item-container > .ant-steps-item-tail::after {
                    background-color: #eab308;
                }
            `}</style>
        </section>
    );
};
