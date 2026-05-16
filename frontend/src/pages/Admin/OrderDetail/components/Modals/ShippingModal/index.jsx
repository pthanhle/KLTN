import { Modal, Form, Input, Select, DatePicker } from 'antd';
import { Truck, X, ScanBarcode } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import { useShippingModalLogic } from '../../../hooks/useShippingModalLogic';
import { SHIPPING_PROVIDERS } from '../../../constants/shippingProviders';
import { getShippingMethodConfig } from '../../../constants/shippingMethods';

export const ShippingModal = ({ isOpen, onCancel, onSubmit, order }) => {
    const { t } = useTranslation('adminOrderDetail');
    const { control, handleSubmit, errors, handleCancel } = useShippingModalLogic({
        order,
        onSubmit,
        onCancel
    });

    const methodConfig = order?.shipping?.method ? getShippingMethodConfig(order.shipping.method) : null;
    const allowedProviders = methodConfig
        ? SHIPPING_PROVIDERS.filter(p => methodConfig.allowedProviders.includes(p.id))
        : SHIPPING_PROVIDERS;

    return (
        <Modal
            open={isOpen}
            onCancel={handleCancel}
            footer={null}
            closeIcon={null}
            closable={false}
            width={512}
            destroyOnClose
            classNames={{ content: 'bg-white dark:bg-[#141416] border border-slate-200 dark:border-white/10 rounded-2xl p-0 overflow-hidden shadow-2xl' }}
            wrapClassName="backdrop-blur-sm"
        >
            <div className="w-full relative">
                <button
                    onClick={handleCancel}
                    className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors z-50"
                >
                    <X size={24} />
                </button>

                {/* Header */}
                <div className="p-8 pb-6 relative z-10">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center justify-center shrink-0">
                            <Truck className="text-yellow-600 dark:text-yellow-500" size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                                {t('shipping_modal_title')}
                            </h2>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                                {t('order_label')} {order?.order_code}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit}>
                    <div className="p-8 pt-0 space-y-6 relative z-10">
                        <div className="space-y-2">
                            <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-slate-400">
                                {t('shipping_provider')}
                            </label>
                            <div className="relative">
                                <Controller
                                    name="provider"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            className="w-full custom-antd-select"
                                            size="large"
                                            placeholder={t('provider_placeholder')}
                                            status={errors.provider ? 'error' : ''}
                                            options={allowedProviders.map(p => ({ label: p.name, value: p.name }))}
                                        />
                                    )}
                                />
                            </div>
                            {errors.provider && <p className="text-xs text-red-500 mt-1">{t(errors.provider.message)}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-slate-400">
                                {t('tracking_code')}
                            </label>
                            <div className="relative">
                                <Controller
                                    name="tracking_code"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            className="w-full pr-12 custom-antd-input"
                                            size="large"
                                            placeholder={t('tracking_placeholder')}
                                            status={errors.tracking_code ? 'error' : ''}
                                        />
                                    )}
                                />
                                <button type="button" className="absolute inset-y-1 right-2 px-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-yellow-600 transition-colors flex items-center justify-center z-10">
                                    <ScanBarcode size={18} />
                                </button>
                            </div>
                            {errors.tracking_code && <p className="text-xs text-red-500 mt-1">{t(errors.tracking_code.message)}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 dark:text-slate-400">
                                {t('estimated_delivery')}
                            </label>
                            <div className="relative">
                                <Controller
                                    name="estimated_delivery"
                                    control={control}
                                    render={({ field }) => (
                                        <DatePicker
                                            {...field}
                                            className="w-full custom-antd-input"
                                            size="large"
                                            format="DD/MM/YYYY"
                                            disabledDate={(current) => current && current < dayjs().startOf('day')}
                                            placeholder={t('estimated_delivery')}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-transparent p-6 px-8 flex justify-end gap-3 relative z-10 border-t border-slate-200 dark:border-white/5">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-2.5 rounded-xl bg-white dark:bg-transparent text-slate-700 dark:text-slate-300 font-bold border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors duration-200"
                        >
                            {t('cancel_btn')}
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-bold transition-colors duration-200 shadow-lg shadow-yellow-500/20"
                        >
                            {t('confirm_update_btn')}
                        </button>
                    </div>
                </form>

                <div className="absolute -top-32 -right-32 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none z-0"></div>
            </div>
        </Modal>
    );
};
